<template>
  <div class="GeoloniaMap w-full h-full">
    <div id="map" data-gesture-handling="off" class="w-full h-full"></div>
  </div>
</template>

<style>
.mapboxgl-popup-content {
  width: 300px;
  background-color: rgb(245, 245, 245) !important;
}
</style>

<script>
import constant from "../constant";

/**
 * ポップアップの中身(HTML)を作成
 */
const createPopupHTML = props => {
  return `
    <strong>店舗名:</strong> ${props.shop_name}<br>
    <strong>ジャンル:</strong> ${props.genre_name} <br>
    <strong>住所:</strong> ${props.address} <br>
    ${props.area_name ? `<strong>エリア</strong>: ${props.area_name} <br>` : ""}
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

    <!-- icons -->
    <div class="flex justify-end space-x-2">
      ${
        props.google_map_url
          ? `<a href="${props["google_map_url"]}" target="_blank">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <title>Google Map</title>
                <path fill="currentColor" d="M18.27 6C19.28 8.17 19.05 10.73 17.94 12.81C17 14.5 15.65 15.93 14.5 17.5C14 18.2 13.5 18.95 13.13 19.76C13 20.03 12.91 20.31 12.81 20.59C12.71 20.87 12.62 21.15 12.53 21.43C12.44 21.69 12.33 22 12 22H12C11.61 22 11.5 21.56 11.42 21.26C11.18 20.53 10.94 19.83 10.57 19.16C10.15 18.37 9.62 17.64 9.08 16.93L18.27 6M9.12 8.42L5.82 12.34C6.43 13.63 7.34 14.73 8.21 15.83C8.42 16.08 8.63 16.34 8.83 16.61L13 11.67L12.96 11.68C11.5 12.18 9.88 11.44 9.3 10C9.22 9.83 9.16 9.63 9.12 9.43C9.07 9.06 9.06 8.79 9.12 8.43L9.12 8.42M6.58 4.62L6.57 4.63C4.95 6.68 4.67 9.53 5.64 11.94L9.63 7.2L9.58 7.15L6.58 4.62M14.22 2.36L11 6.17L11.04 6.16C12.38 5.7 13.88 6.28 14.56 7.5C14.71 7.78 14.83 8.08 14.87 8.38C14.93 8.76 14.95 9.03 14.88 9.4L14.88 9.41L18.08 5.61C17.24 4.09 15.87 2.93 14.23 2.37L14.22 2.36M9.89 6.89L13.8 2.24L13.76 2.23C13.18 2.08 12.59 2 12 2C10.03 2 8.17 2.85 6.85 4.31L6.83 4.32L9.89 6.89Z">
              </svg>
            </a>`
          : ""
      }
      ${
        props.official_page
          ? `<a href="${props["official_page"]}" target="_blank">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <title>公式ホームページ</title>
                <path fill="currentColor" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </a>`
          : ""
      }
      ${
        props.detail_page
          ? `<a href="${props["detail_page"]}" target="_blank">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <title>GoToEatの詳細ページ</title>
                <path fill="currentColor" d="M15.58,16.8L12,14.5L8.42,16.8L9.5,12.68L6.21,10L10.46,9.74L12,5.8L13.54,9.74L17.79,10L14.5,12.68M20,12C20,10.89 20.9,10 22,10V6C22,4.89 21.1,4 20,4H4A2,2 0 0,0 2,6V10C3.11,10 4,10.9 4,12A2,2 0 0,1 2,14V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V14A2,2 0 0,1 20,12Z" />
            </svg>
          </a>`
          : ""
      }
    </div>
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

  computed: {
    layers: {
      get() {
        return this.$store.getters.layers;
      }
    }
  },

  watch: {
    /** 左袖メニューのジャンル選択状態を監視、変更があったらレイヤーの再表示 */
    layers() {
      this.showLayer();
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

      this.$loadScript(
        `https://cdn.geolonia.com/v1/embed?geolonia-api-key=${constant.GEOLONIA_API_KEY}`
      )
        .then(() => {
          console.log("geolonia embed.js is loaded.");
          (async () => {
            // mapの作成
            await this.createMapObject();
            // mapの読み込み完了を待機(map.on('load'))
            await mapOnLoadAsPromise(this.map);
          })()
            .then(() => {
              // レイヤーの作成・表示
              this.setupLayer();
              this.showLayer();
            })
            .catch(e => {
              this.$alert("地図の描画に失敗しました。");
              console.log(e);
            });
        })
        .catch(e => {
          this.$alert("geoloniaの外部js読み込みに失敗しました。");
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
            "icon-size": 0.7,
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
    /** 左袖メニューのジャンル選択状態に応じてレイヤーを出し分け */
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
