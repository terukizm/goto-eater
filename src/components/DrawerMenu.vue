<template>
  <!-- 左袖(ドロワー)メニュー -->
  <div class="DrawerMenu">
    <div
      :class="sidebarOpen ? 'block' : 'hidden'"
      @click="sidebarOpen = !sidebarOpen"
      class="fixed h-screen z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>

    <div
      :class="
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
      "
      class="fixed h-screen z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mx-2 my-2">
        <!-- LOGO -->
        <span class="text-white text-xl font-semibold">後藤イー太(β)</span>
        <span class="text-white text-sm">(GoToEatMap)</span>
      </div>

      <nav class="mt-5">
        <!-- 全選択/全選択解除 -->
        <div class="mx-auto flex flex-col h-12 p-2">
          <label class="inline-flex items-center ml-2">
            <input
              type="checkbox"
              class="form-checkbox h-6 w-6 text-gray-500"
              v-model="checked_all"
            />
            <span class="text-gray-300 mx-3">全選択</span>
          </label>
        </div>

        <!-- ジャンル選択用のチェックボックス -->
        <div
          v-for="(genre, i) in genres"
          :key="genre.name"
          class="flex flex-col p-2"
        >
          <label class="inline-flex items-center h-10">
            <input
              type="checkbox"
              :class="`form-checkbox h-6 w-6 ml-2 text-${genre.color}`"
              v-model="layers[i]"
            />
            <img
              class="ml-2 icon"
              :id="`image-${i}`"
              :src="genre.icon"
              :alt="genre.name"
            />
            <!-- FIXME: 動的にtext-color(例: "text-yellow-300")を組み立てると、PurgeCSSでは該当クラスを利用しているのがわからないので
            Purgeされてしまう。とりあえずtailwind.config.jsで暫定対応。
            -->
            <span :class="`text-${genre.color} mx-2`">{{ genre.name }}</span>
          </label>
        </div>
      </nav>

      <div class="flex items-center mx-2 mt-4">
        <!-- その他適当なリンク -->
        <ul class="contents text-white text-sm">
          <li class="mx-1">
            <a href="https://github.com/terukizm/goto-eater/" target="_blank">
              <mdicon name="github" />
            </a>
          </li>
          <li class="mx-1">
            <a href="https://twitter.com/terukizm" target="_blank">
              <mdicon name="twitter" />
            </a>
          </li>
          <li class="mx-2">
            <a href="https://geolonia.com/" target="_blank">
              Powered by geolonia
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
img.icon {
  width: 32px;
  height: 32px;
}
</style>

<script>
import constant from "../constant";

export default {
  name: "DrawerMenu",

  data: function() {
    return {
      sidebarOpen: false
    };
  },

  computed: {
    genres: function() {
      return constant.GENRES;
    },
    layers: {
      get() {
        return this.$store.getters.layers;
      }
    },
    checked_all: {
      get() {
        const selected = this.layers.filter(function(x) {
          return x === true;
        });
        return selected.length === Object.keys(this.genres).length;
      },
      set(checked) {
        // [null, ${checked}, ${checked}, ...] という配列を作成
        const value = [null].concat(Array(10).fill(checked));
        this.$store.dispatch("setLayers", value);
      }
    }
  }
};
</script>
