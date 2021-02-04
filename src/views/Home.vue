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
                  v-model="place"
                />
              </form>
            </div>
          </div>

          <!-- 都道府県名 -->
          <div class="flex items-center">
            <DropDownMenu ref="dropdown" />
          </div>
        </header>

        <!-- main contains(WebMap) -->
        <main class="flex-1 w-full h-full bg-gray-200">
          <p v-show="loadingText">{{ loadingText }}</p>
          <GeoloniaMap ref="webmap" />
        </main>
      </div>
    </div>
  </div>
</template>

<style>
div.draw {
  display: inline-block;
  position: relative;
}

div.draw-success span {
  display: block;
  content: "";
  position: absolute;
  top: 70%;
  left: 90%;
  width: 45%;
  height: 95%;
  margin: -30% 0 0 -40%;
  border-radius: 50%;
  border: solid 1.25em #132af7;
}

div.draw-failed span::before,
div.draw-failed span::after {
  display: block;
  content: "";
  position: absolute;
  top: 70%;
  left: 90%;
  width: 50%;
  height: 10%;
  margin: -8% 0 0 -42%;
  background: #f71313;
  border-radius: 1.25em;
}
div.draw-failed span::before {
  transform: rotate(-45deg);
}
div.draw-failed span::after {
  transform: rotate(45deg);
}
</style>

<script>
import GeoloniaMap from "@/components/GeoloniaMap.vue";
import DrawerMenu from "@/components/DrawerMenu.vue";
import DropDownMenu from "@/components/DropDownMenu.vue";

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
    DrawerMenu,
    DropDownMenu
  },
  data: function() {
    return {
      loadingText: "",
      prefNameJa: null,
      officialPage: "",
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
      this.loadingText = `community-geocoderを読み込んでいます...`;

      // community-geocoderの外部jsをvue-plugin-load-scriptで読み込む
      this.$loadScript("https://cdn.geolonia.com/community-geocoder.js")
        .then(() => {
          (async () => {
            this.loadingText = `${place}に対応する位置情報を取得しています...`;
            return await getLatLngAsPromise(place);
          })()
            .then(res => {
              const prefNameJa = res.addr.match(/^(.{2,3}[都道府県]).*$/)[1];
              this.draw(res.lat, res.lng, prefNameJa);
            })
            .catch(e => {
              this.$alert(
                `${e} (都道府県名や市区町村名は省略せずに入力してください。また、駅名などのロケーション情報には対応していません。)`
              );
            });
        })
        .catch(e => {
          this.$alert("community-geocoderのjs読み込みに失敗しました。");
          console.log(e);
        });
    } else {
      // 現在地からlatlngを取得、そこを中心として地図表示
      this.loadingText = `現在地を取得しています...`;
      (async () => {
        const position = await getCurrentPositionAsPromise();
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 農研の逆ジオコーディングAPIを利用して、latlngから都道府県名を取得
        this.loadingText = `現在地に対応する位置情報を取得しています...`;
        const response = await fetch(
          `https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json&lat=${lat}&lon=${lng}`
        );
        const json = await response.json();
        this.place = `${json.result.prefecture.pname}${json.result.municipality.mname}`;

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
      this.loadingText = "";
      this.prefNameJa = prefNameJa;
      if (prefNameJa === "徳島県") {
        this.$alert(
          "徳島県のGoToEat公式サイトには「※本サイトのコンテンツの無断転載を禁じます。」という一文があるため、現時点では対応を見送っています。"
        );
        return;
      }
      this.notice(prefNameJa);

      this.$refs.webmap.init(lat, lng, prefNameJa, this.zoom);
      this.$refs.dropdown.init(prefNameJa);
    },
    notice(prefNameJa) {
      if (this.$cookies.get(prefNameJa)) {
        return;
      }
      const messages = {
        静岡県: `
          <div class="text-xm">
            <p>本サービスは<a href="https://premium-gift.jp/fujinokunigotoeat/" class="underline text-xl" target="_blank">「ふじのくに静岡県Go To Eatキャンペーン(通称: 赤券)」</a>に対応しています。</p>
            <div class="draw draw-success">
              <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/shokujiken_shizuoka.jpg"/>
              <span></span>
            </div>
            <br/>
            <p>現時点では<a href="https://gotoeat-shizuoka.com/" class="underline text-xl" target="_blank">「静岡県商工会Go To Eatキャンペーン(通称: 青券)」</a>には対応していません。</p>
            <div class="draw draw-failed">
              <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/shizuoka.jpg"/>
              <span></span>
            </div>
          </div>
        `,
        鹿児島県: `
          <div class="text-xm">
            <p>本サービスは<a href="http://www.kagoshima-cci.or.jp/?tag=gotoeat" class="underline text-xl" target="_blank">「鹿児島県商工会連合会版Go To Eatキャンペーン」</a>に対応しています。</p>
            <div class="draw draw-success">
              <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/kagoshima.jpg"/>
              <span></span>
            </div>
            <br/>
            <p>現時点では<a href="http://www.kagoshima-cci.or.jp/" class="underline text-xl" target="_blank">「鹿児島商工会議所版Go To Eatキャンペーン」</a>には対応していません。</p>
            <div class="draw draw-failed">
              <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/kagoshima_2.jpg"/>
              <span></span>
            </div>
          </div>
        `
      };
      if (messages[prefNameJa]) {
        this.$fire({
          title: `${prefNameJa}のGoToEat商品券について`,
          html: messages[prefNameJa],
          width: "90%"
        }).then(() => {
          this.$cookies.config("1m"); // 1 month after, expire
          this.$cookies.set(prefNameJa, "yes");
        });
      }
    }
  }
};
</script>
