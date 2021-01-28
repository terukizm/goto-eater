export default Object.freeze({
  /** GEOLONIAのAPI_KEY */
  GEOLONIA_API_KEY: process.env.VUE_APP_GEOLONIA_API_KEY,

  /** GeoJSONのBase Path */
  GEOJSON_BASE: process.env.VUE_APP_GEOJSON_BASE,

  /** ジャンル定義 */
  GENRES: {
    1: {
      name: "居酒屋・バー・バル",
      color: "yellow-500",
      color_rgba: "rgba(245, 158, 11, 1)",
      icon: require("@/assets/img/marker/genre1.png")
    },
    2: {
      name: "和食・寿司",
      color: "green-500",
      color_rgba: "rgba(16, 185, 129, 1)",
      icon: require("@/assets/img/marker/genre2.png")
    },
    3: {
      name: "洋食",
      color: "blue-500",
      color_rgba: "rgba(37, 99, 235, 1)",
      icon: require("@/assets/img/marker/genre3.png")
    },
    4: {
      name: "中華",
      color: "red-500",
      color_rgba: "rgba(239, 68, 68, 1)",
      icon: require("@/assets/img/marker/genre4.png")
    },
    5: {
      name: "麺類(ラーメン、そば、うどん)",
      color: "yellow-300",
      color_rgba: "rgba(252, 211, 77, 1)",
      icon: require("@/assets/img/marker/genre5.png")
    },
    6: {
      name: "カレー・各国料理・創作料理",
      color: "purple-400",
      color_rgba: "rgba(167, 139, 250, 1)",
      icon: require("@/assets/img/marker/genre6.png")
    },
    7: {
      name: "ステーキ・鉄板焼き・焼肉",
      color: "yellow-600",
      color_rgba: "rgba(217, 119, 6, 1)",
      icon: require("@/assets/img/marker/genre7.png")
    },
    8: {
      name: "ファーストフード・ファミレス・食堂",
      color: "blue-300",
      color_rgba: "rgba(147, 197, 253, 1)",
      icon: require("@/assets/img/marker/genre8.png")
    },
    9: {
      name: "カフェ・スイーツ",
      color: "pink-400",
      color_rgba: "rgba(244, 114, 182, 1)",
      icon: require("@/assets/img/marker/genre9.png")
    },
    10: {
      name: "その他",
      color: "gray-400",
      color_rgba: "rgba(156, 163, 175, 1)",
      icon: require("@/assets/img/marker/genre10.png")
    }
  }
});
