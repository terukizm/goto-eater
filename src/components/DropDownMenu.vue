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

  mounted: function() {
    if (!this.$cookies.get("TermsOfUse")) {
      this.about();
    }
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
      <div class="text-sm">
      <p class="p-2">・各都道府県のGoToEat公式サイトの情報を元に、地図にプロットしています。</p>
      <p class="p-2">・現在地取得のために端末の位置情報を取得する場合がありますが、<strong>利用者個人を特定できるような情報は保持していません。</strong></p>
      <p class="p-2">・店舗データは<strong>1日1回自動更新しています</strong>が、<strong>内容の即時性、および正当性を担保するものではありません。</strong></p>
      <p class="p-2">・<a href="https://newspat.csis.u-tokyo.ac.jp/geocode/modules/dams/index.php?content_id=1" class="underline">使用しているジオコーダ(DAMS)</a>が番地・マンション名レベルでの精度を持たないため、<strong>店舗のおおよその位置しか表示できません。</strong>また、<strong>ズレが発生する場合があります。</strong></p>
      <p class="p-2">・お店の場所については、<strong>必ずGoogleMapなど、他サービスでもご確認ください。</strong></p>
      <p class="p-2 mt-2"><b>本サービスを用いたことで発生した問題に関して、開発者は一切の責任を負いません。</b></p>
      </div>
      `;
      this.$fire({
        title: "本サービスについて",
        html: html,
        width: "95%"
      }).then(() => {
        this.$cookies.config("1m"); // 1 month after, expire
        this.$cookies.set("TermsOfUse", "yes");
      });
      this.dropdownOpen = false;
    }
  }
};
</script>
