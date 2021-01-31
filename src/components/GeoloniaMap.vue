<template>
  <div class="GeoloniaMap w-full h-full">
    <div id="map" class="w-full h-full"></div>
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

export default {
  name: "GeoloniaMap",
  mounted: function() {
    // geoloniaの外部jsをvue-plugin-load-scriptで読み込む
    this.$loadScript(
      `https://api.geolonia.com/v1/embed?geolonia-api-key=${constant.GEOLONIA_API_KEY}`
    )
      .then(() => {
        console.log("geolonia　embed.js is loaded.");
      })
      .catch(e => {
        console.log("embed.jsの読み込みに失敗しました。");
        console.log(e);
      });

    // 左袖メニューのジャンル選択状態を監視、変更があったらレイヤーの再表示
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
      this.lat = lat;
      this.lng = lng;
      this.prefNameJa = prefNameJa;
      this.pref = constant.PREFS[prefNameJa].en;
      this.zoom = zoom;
      console.log(`lat: ${lat}, lng: ${lng}, prefNameJa: ${prefNameJa}`);
      console.log("init geolonia Map.......");

      (async () => {
        // mapの作成
        await this.createMapObject();
        // mapの読み込み完了を待機(map.on('load'))
        await mapOnLoadAsPromise(this.map);

        return;
      })()
        .then(() => {
          // レイヤーの作成・表示
          this.setupLayer();
          this.showLayer();
        })
        .catch(e => {
          console.log("地図の描画に失敗しました。");
          console.log(e);
        });
    },
    /** geolonia.Mapの作成 */
    createMapObject() {
      // geoloniaの外部jsが明示的にimportしたものではないため、eslintが geolonia.XXXX をerrorにしてくるので黙らせる
      // @see https://github.com/tserkov/vue-plugin-load-script/issues/21#issuecomment-723508237
      /* eslint-disable */
      this.map = new geolonia.Map({
        container: "#map",
        center: [this.lng, this.lat],
        zoom: this.zoom,
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
              zoom: this.zoom,
            },
            trackUserLocation: false,
            showUserLocation: true,
          })
        );
      /* eslint-enable */
    },
    /** レイヤー作成 */
    setupLayer() {
      for (const [key, value] of Object.entries(constant.GENRES)) {
        // ジャンル単位でマーカーを配置したレイヤーを追加
        // 1レイヤーに1マーカー(アイコン)画像、1データソースが紐づく
        const layer_id = `layer-${key}`;
        const icon_image = `image-${key}`;
        const datasource_id = `datasource-${key}`;
        // 左袖メニューで表示されているマーカー画像を追加
        this.map.addImage(icon_image, document.getElementById(icon_image));
        // GeoJSONのURLをデータソースとして追加
        this.map.addSource(datasource_id, {
          type: "geojson",
          data: `${constant.GEOJSON_BASE}/${this.pref}/genre${key}.geojson`
        });

        // レイヤーの設定
        this.map.addLayer({
          id: layer_id,
          source: datasource_id,
          type: "symbol",
          layout: {
            visibility: "none",
            // マーカー画像(アイコン画像)の設定
            "icon-image": icon_image,
            "icon-allow-overlap": true,
            "icon-size": 0.75,
            // アイコンの上下左右にshop_nameをラベル表示させる設定
            "text-field": "{shop_name}",
            "text-font": ["Noto Sans Regular"],
            "text-radial-offset": 1.8,
            "text-size": 12,
            "text-variable-anchor": ["top", "bottom", "left", "right"]
          },
          paint: {
            // shop_nameを表示している、ラベルテキスト関係の設定
            "text-color": `${value.color_rgba}`, // 文字色
            "text-halo-color": "rgba(255,255,255,1)", // 縁取りの色
            "text-halo-width": 2
          }
        });

        // マーカーの設定
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
    /** 左袖メニューのジャンルの選択状態に応じてレイヤーを出し分け */
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
