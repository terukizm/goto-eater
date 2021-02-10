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
  methods: {
    /** map描画 */
    init(prefNameJa) {
      this.prefNameJa = prefNameJa;
      this.officialPage = constant.PREFS[prefNameJa]["offical_page"];
      this.infoPage = constant.PREFS[prefNameJa]["info_page"];
    }
  }
};
</script>
