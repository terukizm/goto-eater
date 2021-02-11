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
      ></div>

      <div
        v-show="dropdownOpen"
        class="absolute right-0 mt-2 w-56 bg-white rounded-md overflow-hidden shadow-xl z-10"
      >
        <a
          target="_blank"
          href="https://github.com/terukizm/goto-eater-data#%E6%B3%A8%E6%84%8F%E5%85%8D%E8%B2%AC"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
          >注意・免責</a
        >
        <hr />
        <a
          v-if="infoPage"
          :href="infoPage"
          target="_blank"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
          >{{ prefNameJa }}からのお知らせ<span class="text-xs"
            ><br />(外部リンク)</span
          ></a
        >
        <hr />
        <a
          :href="officialPage"
          target="_blank"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right"
          >{{ prefNameJa }}GoToEat公式サイト<span class="text-xs"
            ><br />(外部リンク)</span
          ></a
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
