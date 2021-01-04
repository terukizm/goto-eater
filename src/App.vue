<template>
  <div id="app">
    <!-- @see https://github.com/tailwindcomponents/dashboard -->
    <!-- 左袖メニュー (ハンバーガーメニュー) -->
    <div class="flex h-screen bg-gray-200">
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="sidebarOpen = false"
        class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      ></div>

      <div
        :class="
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        "
        class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
      >
        <!-- LOGO -->
        <div class="flex items-center justify-center my-4">
          <a href="#">
            <span class="text-white text-2xl font-semibold">後藤イー太</span
            ><span class="text-white text-sm">(GoToEatMap)</span>
          </a>
        </div>

        <!-- menuの中身 -->
        <nav class="mt-5">
          <!-- 全選択/全選択解除 -->
          <div class="mx-auto flex flex-col h-12 p-2">
            <label class="inline-flex items-center ml-2">
              <input
                type="checkbox"
                class="form-checkbox h-6 w-6 text-gray-500"
                checked
              />
              <span class="text-gray-300 mx-3">全選択</span>
            </label>
          </div>

          <!-- 最大10カテゴリ -->
          <div
            v-for="genre of genres"
            :key="genre.name"
            class="flex flex-col p-2"
          >
            <label class="inline-flex items-center h-12">
              <input
                type="checkbox"
                :class="`form-checkbox h-6 w-6 ml-2 text-${genre.color}`"
                checked
              />
              <img class="ml-2" :src="genre.icon" :alt="genre.name" />
              <span :class="`text-${genre.color} mx-2`">{{ genre.name }}</span>
            </label>
          </div>
        </nav>

        <!-- その他適当なリンク -->
        <div class="flex items-center mx-4 mt-12">
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

      <!-- 上部メニュー -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header
          class="flex justify-between items-center py-2 px-2 bg-gray-300 border-b-4 border-indigo-600"
        >
          <div class="flex items-center">
            <!-- ハンバーガーアイコン -->
            <button
              @click="sidebarOpen = true"
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
              <input
                class="form-input w-56 rounded-md pl-10 pr-4 focus:border-indigo-600"
                type="text"
                placeholder="栃木県佐野市"
              />
            </div>
          </div>

          <!-- 都道府県名 -->
          <div class="flex items-center">
            <div class="relative">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="relative block focus:outline-none leading-tight font-semibold text-gray-900"
              >
                和歌山県
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

        <!-- main contains -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div class="container mx-2">
            <p id="title">
              Built on top of modern-normalize, Preflight is a set of base
              styles for Tailwind projects that are designed to smooth over
              cross-browser inconsistencies and make it easier for you to work
              within the constraints of your design system.
            </p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
/* pass */
</style>

<script>
import constant from './constant';

export default {
  data() {
    return {
      sidebarOpen: false,
      dropdownOpen: false
    };
  },
  computed: {
    genres: () => {
      return constant.GENRES;
    }
  }
};
</script>
