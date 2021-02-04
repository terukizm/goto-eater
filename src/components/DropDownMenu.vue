<template>
  <!-- 左袖(ドロワー)メニュー -->
  <div class="DropDownMenu">
    <div class="relative">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="relative block focus:outline-none leading-tight font-semibold text-gray-900"
      >
        {{ dropdownOpen ? "▲" : "▼" }}{{ prefNameJa }}
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
          @click.prevent.stop="about()"
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
          >本サービスについて</a
        >
        <hr />
        <a
          :href="officialPage"
          target="_blank"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
          >{{ prefNameJa }}GoToEat公式サイト<br />(外部リンク)</a
        >
        <hr />
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
</template>

<style>
strong {
  background: linear-gradient(transparent 30%, rgb(187, 250, 255) 30%);
}
</style>

<script>
import constant from "@/constant";

export default {
  name: "DropDownMenu",

  data: function() {
    return {
      dropdownOpen: false,
      prefNameJa: null,
      infoPage: null,
      officialPage: null
    };
  },

  methods: {
    /** map描画 */
    init(prefNameJa) {
      this.prefNameJa = prefNameJa;
      this.officialPage = constant.PREFS[prefNameJa]["offical_page"];
      this.infoPage = constant.PREFS[prefNameJa]["info_page"];
    },
    /** 本サービスについて */
    about() {
      const html = `
      <p>・各都道府県のGoToEat公式サイトが公開している店舗情報を元に、地図にマッピングしています。</p>
      <p>・地図表示には<a href="https://geolonia.com/" class="underline text-xl" target="_blank"><strong>Geoloniaのホスティングサービス(β)</strong></a>を利用しています。</p>
      <br/>
      <p>・地図表示のために端末の位置情報を取得していますが、<strong>利用者個人を特定できるような情報は保持していません。</strong></p>
      <p>・また、サービスのソースコードはすべて公開しています。</p>
      <p>・それでも気になる場合、ブラウザから位置情報取得をOFFにして、住所入力からの検索機能だけでご利用ください。</p>
      <br/>
      <p>・店舗データは公式サイトから<strong>1日1回自動更新</strong>していますが、正しく追従できていない可能性があります。</p>
      <p>・本サービスが提供している情報については、内容の即時性、および正当性を担保するものではありません。</p>
      <br/>
      <p>・<a href="https://newspat.csis.u-tokyo.ac.jp/geocode/modules/dams/index.php?content_id=1" class="underline">利用しているジオコーダ(DAMS)</a>の都合上、<strong>店舗のおおよその位置しか表示できません。</strong><br/>
      <span class="text-sm">(<a href="https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi" class="underline" target="_blank">国土交通省が提供している位置参照情報</a>を元にしているため、番地以降およびビル名に相当する解像度での位置情報が取得できません。)</span>
      </p>
      <p>・そのため、最終的なお店の位置については、必ず<strong>GoogleMapなどの他サービスと合わせて確認してください。</strong></p>
      <br/>
      <p class="text-xl"><strong>本サービスを用いたことにより発生した不具合に関して、開発者は一切の責任を負いません。</strong></p>
      `;
      this.$fire({
        title: "本サービスについて",
        html: html,
        width: "90%"
      });
      this.dropdownOpen = false;
    }
  }
};
</script>
