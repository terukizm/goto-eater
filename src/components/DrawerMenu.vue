<template>
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
      class="fixed h-screen z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mx-2 my-4">
        <!-- LOGO -->
        <span class="text-white text-xl font-semibold">後藤イー太(β)</span>
        <span class="text-white text-sm">(GoToEatMap)</span>
      </div>

      <nav class="mt-5">
        <!-- 全選択/全選択解除 -->
        <!-- <div class="mx-auto flex flex-col h-12 p-2">
          <label class="inline-flex items-center ml-2">
            <input
              type="checkbox"
              class="form-checkbox h-6 w-6 text-gray-500"
              checked
            />
            <span class="text-gray-300 mx-3">全選択</span>
          </label>
        </div> -->

        <div
          v-for="(genre, i) in genres"
          :key="genre.name"
          class="flex flex-col p-2"
        >
          <!-- ジャンル選択用のチェックボックス -->
          <label class="inline-flex items-center h-12">
            <input
              type="checkbox"
              :class="`form-checkbox h-6 w-6 ml-2 text-${genre.color}`"
              v-model="layers[i]"
              checked
            />
            <img class="ml-2" :src="genre.icon" :alt="genre.name" />
            <!-- FIXME: 動的にtext-color(例: "text-yellow-300")を組み立てると、PurgeCSSでは該当クラスを利用しているのがわからずに
            Purgeされてしまう。とりあえずtailwind.config.jsで暫定対応。
            -->
            <span :class="`text-${genre.color} mx-2`">{{ genre.name }}</span>
          </label>
        </div>
      </nav>

      <div class="flex items-center mx-4 mt-12">
        <!-- その他適当なリンク -->
        <ul>
          <li>
            <a href="#" target="_blank">
              <span class="text-white text-sm">(注釈)</span>
            </a>
          </li>
          <li>
            <a href="https://geolonia.com/" target="_blank">
              <span class="text-white text-sm">Powerd by geolonia</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/terukizm/goto-eater-data/"
              target="_blank"
            >
              <span class="text-white text-sm"
                >GitHub Repository(goto-eater-data)</span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

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
      },
      set(value) {
        this.$store.dispatch("setLayers", value);
      }
    }
  }
};
</script>
