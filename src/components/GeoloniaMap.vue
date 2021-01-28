<template>
  <div class="GeoloniaMap">
    <div id="map" class="w-full h-screen"></div>
  </div>
</template>

<script>
import constant from "../constant";

// MEMO: map.on('load')をPromise対応させたもの
// @see https://github.com/mapbox/mapbox-gl-js/issues/10192
const mapOnLoadAsPromise = (m) => {
  return new Promise((resolve) => {
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

/**
 * ポップアップの中身(HTML)を作成
 * @param {*} feature
 */
const createPopupHTML = (feature) => {
  const props = feature.properties;

  // TODO: component化、HTML組み立て
  let popup_html = `<strong>店舗名:</strong> ${props.shop_name}<br>`;
  popup_html += `<strong>公式サイトの住所:</strong> ${props.address} <br>`;
  popup_html += props.detail_page
    ? `<a href="${props.detail_page}" target="_blank">[GoTo詳細ページ]</a><br>`
    : "";
  popup_html += props.area_name
    ? `<strong>エリア</strong>: ${props.area_name} <br>`
    : "";
  popup_html += `<strong>ジャンル:</strong> ${props.genre_name} <br>`;
  popup_html += props.closing_day
    ? `<strong>定休日:</strong> ${props.closing_day} <br>`
    : "";
  popup_html += props.opening_hours
    ? `<strong>営業時間:</strong> ${props.opening_hours} <br>`
    : "";
  popup_html += props.tel ? `<strong>電話番号:</strong> ${props.tel} <br>` : "";
  popup_html += props.offical_page
    ? `<a href="${props.offical_page}" target="_blank">[公式HP]</a><br>`
    : "";
  popup_html += `<a href="${props["google_map_url"]}" target="_blank">【link to GoogleMap】</a><br>`;

  return popup_html;
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
      .catch((e) => {
        console.log("Failed to fetch geolonia js script...");
        console.log(e);
      });

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
      },
    },
  },

  methods: {
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
    },
    /** マーカーをクリックした場合のポップアップ作成 */
    createPopup(e) {
      console.log(e);
      const coordinates = e.lngLat;
      const feature = e.features[0];
      while (Math.abs(coordinates.lng - coordinates[0]) > 180) {
        coordinates[0] += coordinates.lng > coordinates[0] ? 360 : -360;
      }
      // geoloniaの外部jsが明示的にimportしたものではないため、
      // eslintが geolonia.XXXX をerrorにしてくるので黙らせる
      // @see https://github.com/tserkov/vue-plugin-load-script/issues/21#issuecomment-723508237
      /* eslint-disable */
      new geolonia.Popup()
        .setLngLat(coordinates)
        .setHTML(createPopupHTML(feature))
        .addTo(this.map);
      /* eslint-enable */
    },
    /** map描画 */
    init(lat, lng, prefNameJa, zoom = 15) {
      console.log("init geolonia Map.......");

      this.lat = lat;
      this.lng = lng;
      this.prefNameJa = prefNameJa;
      this.pref = constant.PREFS[prefNameJa].en;
      this.zoom = zoom;

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
        // mapの読み込み完了を待機
        await mapOnLoadAsPromise(this.map);

        // マーカー画像の読み込み完了を待機
        const images = await Promise.all(
          Object.values(constant.GENRES).map((value) => {
            return loadImageAsPromise(this.map, value.icon);
          })
        );

        return images;
      })()
        .then((images) => {
          console.log("Sucesss wait on load !!");

          // ジャンルごとにマーカー(アイコン)を描画したレイヤーを追加
          for (const [key, value] of Object.entries(constant.GENRES)) {
            // 1レイヤーに1アイコン、1データソースが紐づく
            const layer_id = `layer-${key}`;
            const icon_image = `image-${key}`;
            const datasource_id = `datasource-${key}`;

            // loadImageで読み込んだ画像を追加
            this.map.addImage(icon_image, images[key - 1]);

            // GeoJSONのURLをデータソースとして追加
            this.map.addSource(datasource_id, {
              type: "geojson",
              data: `${constant.GEOJSON_BASE}/${this.pref}/genre${key}.geojson`,
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
                "text-variable-anchor": ["top", "bottom", "left", "right"],
              },
              paint: {
                // shop_nameを表示している、ラベルテキスト関係の設定
                "text-color": `${value.color_rgba}`, // ラベルテキストの文字色
                "text-halo-color": "rgba(255,255,255,1)", // 縁取りの色
                "text-halo-width": 2,
              },
            });

            // @see https://docs.mapbox.com/jp/mapbox-gl-js/example/popup-on-click/
            this.map.on("click", layer_id, (e) => {
              // マーカークリックで吹き出し表示(レイヤーにクリックイベントを紐付ける))
              this.createPopup(e);
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

          // 左袖メニューのチェックボックスの選択状態と連動して、レイヤーの表示/非表示
          this.showLayer();
        })
        .catch((e) => {
          console.log("[failed] load map error.....");
          console.log(e);
        });
    },
  },
};
</script>
