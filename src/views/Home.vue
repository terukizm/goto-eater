<template>
  <div id="Home">
    <!-- @see https://github.com/tailwindcomponents/dashboard -->
    <div class="flex w-screen h-screen bg-gray-200">
      <!-- 左袖メニュー (ハンバーガーメニュー) -->
      <DrawerMenu ref="menu" />

      <!-- 上部メニュー -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header
          class="flex justify-between items-center py-2 px-2 bg-gray-300 border-b-4 border-indigo-600"
        >
          <div class="flex items-center">
            <!-- ハンバーガーアイコン -->
            <button
              @click="openMenu"
              class="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>

            <!-- 検索フォーム -->
            <div class="relative mx-2">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  class="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <form method="get" @submit.prevent="submit()">
                <input
                  class="form-input w-56 rounded-md pl-10 pr-4 focus:border-indigo-600"
                  type="text"
                  placeholder="栃木県佐野市"
                  v-model="place"
                />
              </form>
            </div>
          </div>

          <!-- 都道府県名 -->
          <div class="flex items-center">
            <div class="relative">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="relative block focus:outline-none leading-tight font-semibold text-gray-900"
              >
                {{ prefNameJa }}
              </button>

              <div
                v-show="dropdownOpen"
                @click="dropdownOpen = false"
                class="fixed inset-0 h-full w-full z-10"
                style="display: none;"
              ></div>

              <div
                v-show="dropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-md overflow-hidden shadow-xl z-10"
                style="display: none;"
              >
                <a
                  :href="officialPage"
                  target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
                  >{{ prefNameJa }}GoToEat公式サイト<br />(外部リンク)</a
                >

                <a
                  v-if="infoPage"
                  :href="infoPage"
                  target="_blank"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
                  >{{ prefNameJa }}からのお知らせ<br />(外部リンク)</a
                >
              </div>
            </div>
          </div>
        </header>

        <!-- main contains(WebMap) -->
        <main class="flex-1 w-full h-full bg-gray-200">
          <GeoloniaMap ref="webmap" />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import constant from "@/constant";
import GeoloniaMap from "@/components/GeoloniaMap.vue";
import DrawerMenu from "@/components/DrawerMenu.vue";

/** 現在地を取得(Promise) */
const getCurrentPositionAsPromise = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

/** community-geocoder.getLatLng()を使ってlatlngを取得(Promise) */
const getLatLngAsPromise = place => {
  return new Promise((resolve, reject) => {
    /* eslint-disable */
    getLatLng(place, resolve, reject);
    /* eslint-enable */
  });
};

export default {
  components: {
    GeoloniaMap,
    DrawerMenu
  },
  data: function() {
    return {
      prefNameJa: null,
      dropdownOpen: false,
      officialPage: "",
      infoPage: "",
      place: "",
      zoom: 15
    };
  },
  created: function() {
    const place = this.$route.query.place;
    this.zoom = this.$route.query.zoom;

    if (place) {
      // ?place=で指定された場所を中心として地図表示
      this.place = place;
      // community-geocoderの外部jsをvue-plugin-load-scriptで読み込む
      this.$loadScript("https://cdn.geolonia.com/community-geocoder.js")
        .then(() => {
          (async () => {
            return await getLatLngAsPromise(place);
          })()
            .then(res => {
              const prefNameJa = res.addr.match(/^(.{2,3}[都道府県]).*$/)[1];
              this.draw(res.lat, res.lng, prefNameJa);
            })
            .catch(e => {
              this.$alert(`${e} (都道府県名や市区町村名は省略せずに入力してください。また、駅名などのロケーション情報には対応していません。)`);
            });
        })
        .catch(e => {
          this.$alert("community-geocoderのjs読み込みに失敗しました。");
          console.log(e);
        });
    } else {
      // 現在地からlatlngを取得、そこを中心として地図表示
      (async () => {
        const position = await getCurrentPositionAsPromise();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 農研の逆ジオコーディングAPIを利用して、latlngから都道府県名を取得
        const response = await fetch(
          `https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json&lat=${lat}&lon=${lng}`
        );
        const json = await response.json();

        return [parseFloat(lat), parseFloat(lng), json.result.prefecture.pname];
      })()
        .then(res => {
          this.draw(...res);
        })
        .catch(e => {
          this.$alert("現在地取得からの逆ジオコーディングに失敗しました。");
          console.log(e);
        });
    }
  },
  methods: {
    openMenu() {
      this.$refs.menu.sidebarOpen = true;
    },
    submit() {
      // あえて再描画ありのlocation.hrefで画面遷移
      // (都道府県単位でGeoJSONが作成されており、都道府県が変わるとGeoJSONを読み込み直さないといけないので)
      window.location.href = `./?place=${this.place}`;
    },
    draw(lat, lng, prefNameJa) {
      if (prefNameJa === "徳島県") {
        this.$alert("徳島県のGoToEat公式サイトには「※本サイトのコンテンツの無断転載を禁じます。」という一文があるため、対応を見送っています。");
        return;
      }
      this.prefNameJa = prefNameJa;
      this.officialPage = constant.PREFS[prefNameJa]["offical_page"];
      this.infoPage = constant.PREFS[prefNameJa]["info_page"];
      this.$refs.webmap.init(lat, lng, prefNameJa, this.zoom);
    }
  }
};
</script>
