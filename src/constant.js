export default Object.freeze({
  /** GEOLONIAのAPI_KEY */
  GEOLONIA_API_KEY: process.env.VUE_APP_GEOLONIA_API_KEY,

  /** ジャンル定義 */
  GENRES: {
    1: {
      name: "居酒屋・バー・バル",
      color: "yellow-500",
      icon: require("@/assets/img/marker/genre1.png")
    },
    2: {
      name: "和食・寿司",
      color: "green-500",
      icon: require("@/assets/img/marker/genre2.png")
    },
    3: {
      name: "洋食",
      color: "blue-500",
      icon: require("@/assets/img/marker/genre3.png")
    },
    4: {
      name: "中華",
      color: "red-500",
      icon: require("@/assets/img/marker/genre4.png")
    },
    5: {
      name: "麺類(ラーメン、そば、うどん)",
      color: "yellow-300",
      icon: require("@/assets/img/marker/genre5.png")
    },
    6: {
      name: "カレー・各国料理・創作料理",
      color: "purple-400",
      icon: require("@/assets/img/marker/genre6.png")
    },
    7: {
      name: "ステーキ・鉄板焼き・焼肉",
      color: "yellow-600",
      icon: require("@/assets/img/marker/genre7.png")
    },
    8: {
      name: "ファーストフード・ファミレス・食堂",
      color: "blue-300",
      icon: require("@/assets/img/marker/genre8.png")
    },
    9: {
      name: "カフェ・スイーツ",
      color: "pink-400",
      icon: require("@/assets/img/marker/genre9.png")
    },
    10: {
      name: "その他",
      color: "gray-400",
      icon: require("@/assets/img/marker/genre10.png")
    }
  }
});
