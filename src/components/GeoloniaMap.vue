<template>
  <div class="GeoloniaMap">
    <div id="map" class="w-screen h-screen"></div>
  </div>
</template>

<script>
import constant from "../constant";

/**
 * ポップアップの中身(HTML)を作成
 * @param {*} props
 */
const createPopupHTML = props => {
  return `
    <strong>店舗名:</strong> ${props.shop_name}<br>
    <strong>公式サイトの住所:</strong> ${props.address} <br>
    ${
      props.detail_page
        ? `<a href="${props.detail_page}" target="_blank">[GoTo詳細ページ]</a><br>`
        : ""
    }
    ${props.area_name ? `<strong>エリア</strong>: ${props.area_name} <br>` : ""}
    <strong>ジャンル:</strong> ${props.genre_name} <br>
    ${
      props.closing_day
        ? `<strong>定休日:</strong> ${props.closing_day} <br>`
        : ""
    }
    ${
      props.opening_hours
        ? `<strong>営業時間:</strong> ${props.opening_hours} <br>`
        : ""
    }
    ${props.tel ? `<strong>電話番号:</strong> ${props.tel} <br>` : ""}
    ${
      props.offical_page
        ? `<a href="${props.offical_page}" target="_blank">【link to 公式HP】</a><br>`
        : ""
    }
    <a href="${
      props["google_map_url"]
    }" target="_blank">【link to GoogleMap】</a><br>
`;
};

// MEMO: map.on('load')をPromise対応させたもの
// @see https://github.com/mapbox/mapbox-gl-js/issues/10192
const mapOnLoadAsPromise = m => {
  return new Promise(resolve => {
    m.on("load", () => resolve());
  });
};

// MEMO: map.loadImage()をPromise対応させたもの
// @see https://qiita.com/amay077/items/e85249ffe898f3d48cef
const loadImageAsPromise = (map, url) => {
  return new Promise((resolve, reject) => {
    map.loadImage(url, (error, image) => {
      return image === null ? reject(error) : resolve(image);
    });
  });
};

export default {
  name: "GeoloniaMap",
  mounted: function() {
    // geoloniaの外部jsをvue-plugin-load-scriptで読み込む
    this.$loadScript(
      `https://api.geolonia.com/v1/embed?geolonia-api-key=${constant.GEOLONIA_API_KEY}`
    )
      .then(() => {
        console.log("geolonia script is loaded !!");
      })
      .catch(e => {
        console.log("Failed to fetch geolonia js script...");
        console.log(e);
      });

    // vuexに格納されているレイヤーの選択状態を監視、変更があったらレイヤーの再レンダリング
    this.$store.watch(
      (_, getters) => getters.layers,
      () => {
        this.showLayer();
      }
    );
  },

  computed: {
    layers: {
      get() {
        return this.$store.getters.layers;
      }
    }
  },

  methods: {
    /** map描画 */
    init(lat, lng, prefNameJa, zoom = 15) {
      console.log("init geolonia Map.......");
      // this.lat = lat;
      // this.lng = lng;
      // this.zoom = zoom;
      // this.prefNameJa = prefNameJa;
      this.pref = constant.PREFS[prefNameJa].en;

      // geoloniaの外部jsが明示的にimportしたものではないため、
      // eslintが geolonia.XXXX をerrorにしてくるので黙らせる
      // @see https://github.com/tserkov/vue-plugin-load-script/issues/21#issuecomment-723508237
      /* eslint-disable */
      this.map = new geolonia.Map({
        container: "#map",
        center: [lng, lat],
        zoom: zoom,
      })
        .addControl(
          new geolonia.ScaleControl({
            maxWidth: 200,
            unit: "metric",
          })
        )
        .addControl(
          new geolonia.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            fitBoundsOptions: {
              linear: true,
              zoom: zoom,
            },
            trackUserLocation: false,
            showUserLocation: true,
          })
        );
      /* eslint-enable */

      // その他の初期化
      (async () => {
        // mapの読み込み(map.on('load'))完了を待機
        await mapOnLoadAsPromise(this.map);

        // マーカー画像の読み込み(loadImage)完了を待機
        const images = await Promise.all(
          Object.values(constant.GENRES).map(value => {
            return loadImageAsPromise(this.map, value.icon);
          })
        );

        return images;
      })()
        .then(images => {
          console.log("Sucesss wait on load !!");
          this.setupLayer(images);
          this.showLayer();
        })
        .catch(e => {
          console.log("[failed] load map error.....");
          console.log(e);
        });
    },
    /** レイヤー作成 */
    setupLayer(images) {
      for (const [key, value] of Object.entries(constant.GENRES)) {
        // ジャンルごとにマーカー(アイコン)を描画したレイヤーを追加
        // 1レイヤーに1アイコン、1データソースが紐づく
        const layer_id = `layer-${key}`;
        const icon_image = `image-${key}`;
        const datasource_id = `datasource-${key}`;

        // loadImageで読み込んだ画像を追加
        this.map.addImage(icon_image, images[key - 1]);

        // GeoJSONのURLをデータソースとして追加
        this.map.addSource(datasource_id, {
          type: "geojson",
          data: `${constant.GEOJSON_BASE}/${this.pref}/genre${key}.geojson`
        });

        // レイヤー設定
        this.map.addLayer({
          id: layer_id,
          source: datasource_id,
          type: "symbol",
          layout: {
            visibility: "none",
            // マーカー画像(アイコン画像)の設定
            "icon-image": icon_image,
            "icon-allow-overlap": true,
            "icon-size": 1,
            // アイコンの下にshop_nameをラベル表示させる設定
            "text-field": "{shop_name}",
            "text-font": ["Noto Sans Regular"],
            "text-radial-offset": 1.8,
            "text-size": 12,
            "text-variable-anchor": ["top", "bottom", "left", "right"]
          },
          paint: {
            // shop_nameを表示している、ラベルテキスト関係の設定
            "text-color": `${value.color_rgba}`, // ラベルテキストの文字色
            "text-halo-color": "rgba(255,255,255,1)", // 縁取りの色
            "text-halo-width": 2
          }
        });

        // @see https://docs.mapbox.com/jp/mapbox-gl-js/example/popup-on-click/
        this.map.on("click", layer_id, e => {
          // マーカークリックでポップアップ(吹き出し)表示
          const coordinates = e.lngLat;
          const feature = e.features[0];
          while (Math.abs(coordinates.lng - coordinates[0]) > 180) {
            coordinates[0] += coordinates.lng > coordinates[0] ? 360 : -360;
          }
          /* eslint-disable */
          new geolonia.Popup()
            .setLngLat(coordinates)
            .setHTML(createPopupHTML(feature.properties))
            .addTo(this.map);
          /* eslint-enable */
        });
        this.map.on("mouseenter", layer_id, () => {
          // マーカーにマウスオーバーでポインタを人差し指にする
          this.map.getCanvas().style.cursor = "pointer";
        });
        this.map.on("mouseleave", layer_id, () => {
          // マーカーへのマウスフォーカスが外れたらポインタを通常に戻す
          this.map.getCanvas().style.cursor = "";
        });
      }
    },
    /** ジャンルの選択状態に応じてレイヤーを表示 */
    showLayer() {
      this.layers.forEach((value, i) => {
        if (i === 0) {
          return;
        }
        const layer_id = `layer-${i}`;
        const visible = value ? "visible" : "none";
        this.map.setLayoutProperty(layer_id, "visibility", visible);
      });
    }
  }
};
</script>
