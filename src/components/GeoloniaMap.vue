<template>
  <div class="GeoloniaMap">
    <div id="map" class="w-full h-screen"></div>
  </div>
</template>

<script>
import constant from "../constant";

// MEMO: map.on('load')相当
// @see https://github.com/mapbox/mapbox-gl-js/issues/10192
const mapOnLoadAsPromise = m => {
  return new Promise(resolve => {
    m.on("load", () => resolve());
  });
};

// MEMO: map.loadImage()相当
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
  },

  methods: {
    /** map描画 */
    init(lat, lng, prefNameJa, zoom = 15) {
      console.log("init geolonia Map.......");

      this.lat = lat;
      this.lng = lng;
      this.prefNameJa = prefNameJa;
      this.pref = "tochigi"; // TODO: const prefix = PREFS[pref_name_ja].en; // jp => en (例: "栃木県" => "tochigi")
      this.zoom = zoom;

      // geoloniaの外部jsが明示的にimportしたものではないため、
      // eslintが geolonia.XXXX をerrorにしてくるので黙らせる
      // @see https://github.com/tserkov/vue-plugin-load-script/issues/21#issuecomment-723508237

      /* eslint-disable */
      this.map = new geolonia.Map({
        container: "#map",
        center: [lng, lat],
        zoom: zoom
      }).addControl(
          new geolonia.ScaleControl({
            maxWidth: 200,
            unit: "metric"
          })
        )
        .addControl(
          new geolonia.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            fitBoundsOptions: {
              linear: true,
              zoom: zoom
            },
            trackUserLocation: false,
            showUserLocation: true
          })
        );
      /* eslint-enable */

      // MEMO: 標準の"geolonia/basic"だと Expected value to be of type number, but found null instead.が
      // 頻繁に出るので、暫定的にモノクロのgeolonia/notebookスタイルを当てている
      this.map.setStyle("geolonia/notebook");

      // その他の初期化
      (async () => {
        // mapの読み込み完了を待機
        await mapOnLoadAsPromise(this.map);

        // マーカー画像の読み込み完了を待機
        const images = await Promise.all(
          Object.values(constant.GENRES).map(value => {
            return loadImageAsPromise(this.map, value.icon);
          })
        );

        return images;
      })()
        .then(images => {
          console.log("Sucesss wait on load !!");

          // ジャンルごとにマーカー(アイコン)を描画したレイヤーを追加
          // 1レイヤーに1アイコン、1データソースが紐づく
          for (const [key, value] of Object.entries(constant.GENRES)) {
            console.log(value);

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
                visibility: "visible",
                // アイコン画像(Marker画像)の設定
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
                // "text-color": `${value.color}`, // ラベルテキストの文字色   -> TODO: tailwindcssの形式(class名)だと当然ダメなので、別に持つ必要がある
                "text-color": `rgba(0,0,0,1)`, // ラベルテキストの文字色
                "text-halo-color": "rgba(255,255,255,1)", // 縁取りの色
                "text-halo-width": 2
              }
            });

            // TODO:
            // - [ ] マーカークリックで吹き出し表示(レイヤーにクリックイベントを紐付ける))
            // - [ ] 左袖メニューのチェックボックスの選択状態と連動して、レイヤーの表示/非表示
          }
        })
        .catch(e => {
          console.log("[failed] load map error.....");
          console.log(e);
        });
    }
  }
};
</script>
