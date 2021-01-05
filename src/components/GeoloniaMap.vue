<template>
  <div class="GeoloniaMap">
    <div id="map" class="w-full h-screen"></div>
  </div>
</template>

<script>
import constant from "../constant";

export default {
  name: "GeoloniaMap",

  created: function() {
    // geoloniaの外部jsをvue-plugin-load-scriptで読み込む
    this.$loadScript(
      `https://api.geolonia.com/v1/embed?geolonia-api-key=${constant.GEOLONIA_API_KEY}`
    )
      .then(() => {
        console.log("geolonia script is loaded !!");
      })
      .catch(e => {
        // Failed to fetch script
        console.log("Failed to fetch geolonia js script...");
        console.log(e);
      });
  },

  methods: {
    /** map描画 */
    init(lat, lng, prefNameJa, zoom) {
      console.log("init geolonia Map.......");

      // geoloniaの外部jsが明示的にimportしたものではないため、
      // eslintが geolonia.XXXX をerrorにしてくるので黙らせる
      // @see https://github.com/tserkov/vue-plugin-load-script/issues/21#issuecomment-723508237

      /* eslint-disable */
      const map = new geolonia.Map({
        container: "#map",
        center: [lng, lat],
        zoom: zoom
      })
        .addControl(
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

      // マーカー用アイコン画像読み込み
      for (const [key, value] of Object.entries(constant.GENRES)) {
        map.loadImage(value.icon, (error, res) => {
          map.addImage(`marker-genre${key}`, res);
        });
      }

      // MEMO: 標準の"geolonia/basic"だと Expected value to be of type number, but found null instead.が
      // 頻繁に出るので暫定的にモノクロのgeolonia/notebookスタイルを当てる
      map.setStyle("geolonia/notebook");

      this.map = map;
    }
  }
};
</script>
