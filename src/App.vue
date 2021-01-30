<template>
  <div id="app">
    <!-- @see https://github.com/tailwindcomponents/dashboard -->
    <div class="flex h-screen bg-gray-200">
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
                {{ prefNameJa || "[Unknown]" }}
              </button>

              <div
                v-show="dropdownOpen"
                @click="dropdownOpen = false"
                class="fixed inset-0 h-full w-full z-10"
                style="display: none;"
              ></div>

              <div
                v-show="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
                style="display: none;"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >GoToEat公式サイト</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >都道府県からのお知らせ</a
                >
              </div>
            </div>
          </div>
        </header>

        <!-- main contains(WebMap) -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div class="container mx-2">
            <!-- FIXME: 横幅が確保できなくて崩れるので入れてる -->
            <p id="title">
              Built on top of modern-normalize, Preflight is a set of base
              styles for Tailwind projects that are designed to smooth over
              cross-browser inconsistencies and make it easier for you to work
              within the constraints of your design system.
            </p>
            <!-- <GeoloniaMap
              :lat="36.304365"
              :lng="139.5962079"
              :pref-name-ja="'栃木県'"
              :zoom="zoom"
            /> -->
            <GeoloniaMap ref="webmap" />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import constant from "./constant";
import GeoloniaMap from "@/components/GeoloniaMap.vue";
import DrawerMenu from "@/components/DrawerMenu.vue";

/** 現在地を取得 */
const getCurrentPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
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
      place: "",
    };
  },
  computed: {
    genres: function() {
      return constant.GENRES;
    }
  },
  created: function() {
    const place = this.$route.query.place;
    const zoom = 15;

    if (place) {
      this.place = place;
      // ?placeで指定された場所を中心として地図表示

      // TODO:

    } else {
      // 現在地からlatlngを取得、そこを中心として地図表示
      (async () => {
        const position = await getCurrentPosition();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 農研の逆ジオコーディングAPIを利用して、latlngから都道府県名を取得
        const response = await fetch(
          `https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json&lat=${lat}&lon=${lng}`
        );
        const json = await response.json();
        const prefNameJa = json.result.prefecture.pname;
        console.log(`current positon: ${prefNameJa} ${lat}, ${lng}`);

        this.prefNameJa = prefNameJa;
        return [parseFloat(lat), parseFloat(lng), prefNameJa, zoom];
      })()
        .then(res => {
          console.log("Sucesss loadByCurrentPosition...");
          this.$refs.webmap.init(...res);
        })
        .catch(e => {
          console.log("[failed] init map error.....");
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
      // (GeoJSONの読み込みとかも都道府県単位で行うため)
      window.location.href = `./?place=${this.place}`;
    }
  }
};
</script>
