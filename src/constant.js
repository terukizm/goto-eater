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
      color_rgba: "rgb(245, 158, 11)",
      icon: require("@/assets/img/marker/genre1.svg")
    },
    2: {
      name: "和食・寿司",
      color: "green-500",
      color_rgba: "rgb(16, 185, 129)",
      icon: require("@/assets/img/marker/genre2.svg")
    },
    3: {
      name: "洋食",
      color: "blue-500",
      color_rgba: "rgb(37, 99, 235)",
      icon: require("@/assets/img/marker/genre3.svg")
    },
    4: {
      name: "中華",
      color: "red-500",
      color_rgba: "rgb(239, 68, 68)",
      icon: require("@/assets/img/marker/genre4.svg")
    },
    5: {
      name: "麺類(ラーメン、そば、うどん)",
      color: "yellow-300",
      color_rgba: "rgb(252, 211, 77)",
      icon: require("@/assets/img/marker/genre5.svg")
    },
    6: {
      name: "カレー・各国料理・創作料理",
      color: "purple-400",
      color_rgba: "rgb(167, 139, 250)",
      icon: require("@/assets/img/marker/genre6.svg")
    },
    7: {
      name: "ステーキ・鉄板焼き・焼肉",
      color: "yellow-600",
      color_rgba: "rgb(217, 119, 6)",
      icon: require("@/assets/img/marker/genre7.svg")
    },
    8: {
      name: "ファーストフード・ファミレス・食堂",
      color: "blue-300",
      color_rgba: "rgb(147, 197, 253)",
      icon: require("@/assets/img/marker/genre8.svg")
    },
    9: {
      name: "カフェ・スイーツ",
      color: "pink-400",
      color_rgba: "rgb(244, 114, 182)",
      icon: require("@/assets/img/marker/genre9.svg")
    },
    10: {
      name: "その他",
      color: "gray-400",
      color_rgba: "rgb(156, 163, 175)",
      icon: require("@/assets/img/marker/genre10.svg")
    }
  },
  /** 各都道府県定義 */
  PREFS: {
    北海道: {
      en: "hokkaido",
      offical_page: "https://gotoeat-hokkaido.jp/",
      info_page: "https://gotoeat-hokkaido.jp/news_list.html"
    },
    青森県: {
      en: "aomori",
      offical_page: "https://premium-gift.jp/aomori",
      info_page: "https://premium-gift.jp/aomori/news"
    },
    岩手県: {
      en: "iwate",
      offical_page: "https://www.iwate-gotoeat.jp/",
      info_page: "https://www.iwate-gotoeat.jp/topics/index.html"
    },
    宮城県: {
      en: "miyagi",
      offical_page: "https://gte-miyagi.jp/"
    },
    秋田県: {
      en: "akita",
      offical_page: "https://gotoeat-akita.com/"
    },
    山形県: {
      en: "yamagata",
      offical_page: "https://yamagata-gotoeat.com/",
      info_page: "https://yamagata-gotoeat.com/news/"
    },
    福島県: {
      en: "fukushima",
      offical_page: "https://gotoeat-fukushima.jp/",
      info_page: "https://gotoeat-fukushima.jp/news/"
    },
    茨城県: {
      en: "ibaraki",
      offical_page: "https://www.gotoeat-ibaraki.com/",
      info_page:
        "https://www.gotoeat-ibaraki.com/%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9-%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E4%B8%80%E8%A6%A7"
    },
    栃木県: {
      en: "tochigi",
      offical_page: "https://www.gotoeat-tochigi.jp/",
      info_page: "https://www.gotoeat-tochigi.jp/topics/index.php"
    },
    群馬県: {
      en: "gunma",
      offical_page: "https://gunma-gotoeat-campaign.com/",
      info_page: "https://gunma-gotoeat-campaign.com/user_topics/"
    },
    埼玉県: {
      en: "saitama",
      offical_page: "https://saitama-goto-eat.com/"
    },
    千葉県: {
      en: "chiba",
      offical_page: "https://www.chiba-gte.jp/user/"
    },
    東京都: {
      en: "tokyo",
      offical_page: "https://r.gnavi.co.jp/plan/campaign/gotoeat-tokyo/",
      info_page:
        "https://r.gnavi.co.jp/plan/campaign/gotoeat-tokyo/news/?tab=customer&sc_lid=gtetokyo_top_news_all"
    },
    神奈川県: {
      en: "kanagawa",
      offical_page: "https://www.kanagawa-gte.jp/user/"
    },
    新潟県: {
      en: "niigata",
      offical_page: "https://niigata-gte.com/",
      info_page: "https://niigata-gte.com/news/"
    },
    富山県: {
      en: "toyama",
      offical_page: "https://www.toyamagotoeat.jp/",
      info_page: ""
    },
    石川県: {
      en: "ishikawa",
      offical_page: "https://ishikawa-gotoeat-cpn.com/",
      info_page: "https://www.toyamagotoeat.jp/news/"
    },
    福井県: {
      en: "fukui",
      offical_page: "https://gotoeat-fukui.com/"
    },
    山梨県: {
      en: "yamanashi",
      offical_page: "https://www.gotoeat-yamanashi.jp/",
      info_page: "https://www.gotoeat-yamanashi.jp/news"
    },
    長野県: {
      en: "nagano",
      offical_page: "https://shinshu-gotoeat.com/",
      info_page: "https://shinshu-gotoeat.com/news_list.php"
    },
    岐阜県: {
      offical_page: "https://www.gotoeat-gifu.jp/",
      info_page: "https://www.gotoeat-gifu.jp/news/"
    },
    静岡県: {
      en: "shizuoka",
      offical_page: "https://gotoeat.s-reserve.com/",
      info_page: "https://premium-gift.jp/fujinokunigotoeat/news"
    },
    愛知県: {
      en: "aichi",
      offical_page: "https://www.gotoeat-aichi.jp/",
      info_page: "https://www.gotoeat-aichi.jp/news/category/user/"
    },
    三重県: {
      en: "mie",
      offical_page: "https://gotoeat-mie.com/",
      info_page: "https://gotoeat-mie.com/news/"
    },
    滋賀県: {
      en: "shiga",
      offical_page: "https://www.shiga-gte.jp/user/"
    },
    京都府: {
      en: "kyoto",
      offical_page: "https://kyoto-gotoeat.com/",
      info_page: "https://premium-gift.jp/kyoto-eat/news"
    },
    大阪府: {
      en: "osaka",
      offical_page: "https://goto-eat.weare.osaka-info.jp/"
    },
    兵庫県: {
      en: "hyogo",
      offical_page: "https://gotoeat-hyogo.com/"
    },
    奈良県: {
      en: "nara",
      offical_page: "https://tinyurl.com/yx8ocwwc",
      info_page: ""
    },
    和歌山県: {
      en: "wakayama",
      offical_page: "https://gotoeat-wakayama.com/",
      info_page: ""
    },
    鳥取県: {
      en: "tottori",
      offical_page: "https://tottori-gotoeat.jp/",
      info_page: "https://tottori-gotoeat.jp/category/news/"
    },
    島根県: {
      en: "shimane",
      offical_page: "https://www.gotoeat-shimane.jp/",
      info_page: "https://www.gotoeat-shimane.jp/news/"
    },
    岡山県: {
      en: "okayama",
      offical_page: "https://www.gotoeat-okayama.com/"
    },
    広島県: {
      en: "hiroshima",
      offical_page: "https://gotoeat.hiroshima.jp/"
    },
    山口県: {
      en: "yamaguchi",
      offical_page: "https://gotoeat-yamaguchi.com/"
    },
    徳島県: {
      en: "tokushima",
      offical_page: "https://gotoeat.tokushima.jp/"
    },
    香川県: {
      en: "kagawa",
      offical_page: "https://www.kagawa-gotoeat.com/",
      info_page: "https://www.kagawa-gotoeat.com/category/news/"
    },
    愛媛県: {
      en: "ehime",
      offical_page: "https://www.goto-eat-ehime.com/",
      info_page: "https://www.goto-eat-ehime.com/news/"
    },
    高知県: {
      en: "kochi",
      offical_page: "https://www.gotoeat-kochi.com/"
    },
    福岡県: {
      en: "fukuoka",
      offical_page: "https://gotoeat-fukuoka.jp/",
      info_page: "https://gotoeat-fukuoka.jp/news/"
    },
    佐賀県: {
      en: "saga",
      offical_page: "https://www.gotoeat-saga.jp/",
      info_page: "https://www.gotoeat-saga.jp/news/"
    },
    長崎県: {
      en: "nagasaki",
      offical_page: "https://www.gotoeat-nagasaki.jp/",
      info_page: "https://www.gotoeat-nagasaki.jp/news/"
    },
    熊本県: {
      en: "kumamoto",
      offical_page: "https://gotoeat-kumamoto.jp/",
      info_page: "https://gotoeat-kumamoto.jp/news"
    },
    大分県: {
      en: "oita",
      offical_page: "https://oita-gotoeat.com/"
    },
    宮崎県: {
      en: "miyazaki",
      offical_page: "https://premium-gift.jp/gotoeatmiyazaki/",
      info_page: "https://premium-gift.jp/gotoeatmiyazaki/news"
    },
    鹿児島県: {
      en: "kagoshima",
      offical_page: "http://www.kagoshima-cci.or.jp/?p=20375",
      info_page: "http://www.kagoshima-cci.or.jp/"
    },
    沖縄県: {
      en: "okinawa",
      offical_page: "https://gotoeat.okinawa.jp/",
      info_page: "https://gotoeat.okinawa.jp/news/"
    }
  }
});
