<template>
  <!-- 左袖(ドロワー)メニュー -->
  <div class="DropDownMenu">
    <div class="relative">
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="relative block focus:outline-none leading-tight font-semibold text-gray-900"
      >
        {{ dropdownOpen ? "▲" : "▼"}}{{prefNameJa}}
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
          @click.prevent.stop="about(); " href="#"
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
      <p>・各都道府県のGoToEat公式サイトが公開しているお店の住所を元に、地図にマッピングしています。</p>
      <p>・初回表示で端末の位置情報を取得しますが、利用者を特定できるような情報は保持していません。</p>
      <p>・それでも気になる場合、位置情報取得をOFFにして、住所入力からの検索機能だけでご利用ください。</p>
      <br>
      <p>・データは公式サイトから1日1回自動更新していますが、正しく追従できていない可能性があります。</p>
      <p>・住所から位置情報を取得するライブラリの都合上、<strong>店舗のおおよその位置しか表示できません。</strong></p>
      <p>・最終的なお店の位置や、お店の情報については、<strong>GoogleMapなど他サービスと合わせて</strong>確認してください。</p>
      <br>
      <p>本サービスを用いたことにより発生した不具合に関して、開発者は一切の責任を負いません。</p>
      <p>詳しくは<a href="https://github.com/terukizm/goto-eater/terms_of_use.md" class="underline" target="_blank">こちら</a></p>
      `;
      this.$fire({
        title: "本サービスについて",
        html: html,
        width: "90%",
      });
      this.dropdownOpen = false;
    }
  }
};
</script>
