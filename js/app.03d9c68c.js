(function(t){function e(e){for(var o,s,r=e[0],c=e[1],l=e[2],g=0,f=[];g<r.length;g++)s=r[g],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);p&&p(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],o=!0,r=1;r<a.length;r++){var c=a[r];0!==n[c]&&(o=!1)}o&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var o={},n={app:0},i=[];function s(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=o,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(a,o,function(e){return t[e]}.bind(null,o));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/goto-eater/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var p=c;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"02a6":function(t,e,a){t.exports=a.p+"img/genre9.75e6a0c3.svg"},"21c2":function(t,e,a){"use strict";a("fd6e")},2357:function(t,e,a){"use strict";a("f655")},3670:function(t,e,a){t.exports=a.p+"img/genre10.d6875b3c.svg"},5348:function(t,e,a){t.exports=a.p+"img/genre3.82043cec.svg"},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var o=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",[a("router-view")],1)},i=[],s=a("2877"),r={},c=Object(s["a"])(r,n,i,!1,null,null,null),l=c.exports,p=a("8c4f"),g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Home"}},[a("div",{staticClass:"flex w-screen h-screen bg-gray-200"},[a("DrawerMenu",{ref:"menu"}),a("div",{staticClass:"flex-1 flex flex-col overflow-hidden"},[a("header",{staticClass:"flex justify-between items-center py-2 px-2 bg-gray-300 border-b-4 border-indigo-600"},[a("div",{staticClass:"flex items-center"},[a("button",{staticClass:"text-gray-500 focus:outline-none lg:hidden",on:{click:t.openMenu}},[a("svg",{staticClass:"h-6 w-6",attrs:{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M4 6H20M4 12H20M4 18H11",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}})])]),a("div",{staticClass:"relative mx-2"},[a("span",{staticClass:"absolute inset-y-0 left-0 pl-3 flex items-center"},[a("svg",{staticClass:"h-5 w-5 text-gray-500",attrs:{viewBox:"0 0 24 24",fill:"none"}},[a("path",{attrs:{d:"M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}})])]),a("form",{attrs:{method:"get"},on:{submit:function(e){return e.preventDefault(),t.submit()}}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.place,expression:"place"}],staticClass:"form-input w-56 rounded-md pl-10 pr-4 focus:border-indigo-600",attrs:{type:"text"},domProps:{value:t.place},on:{input:function(e){e.target.composing||(t.place=e.target.value)}}})])])]),a("div",{staticClass:"flex items-center"},[a("DropDownMenu",{ref:"dropdown"})],1)]),a("main",{staticClass:"flex-1 w-full h-full bg-gray-200"},[a("p",{directives:[{name:"show",rawName:"v-show",value:t.loadingText,expression:"loadingText"}]},[t._v(t._s(t.loadingText))]),a("GeoloniaMap",{ref:"webmap"})],1)])],1)])},f=[],u=(a("99af"),a("d3b7"),a("ac1f"),a("466d"),a("2909")),h=(a("96cf"),a("1da1")),m=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},d=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"GeoloniaMap w-full h-full"},[a("div",{staticClass:"w-full h-full",attrs:{id:"map","data-gesture-handling":"off"}})])}],w=(a("4160"),a("d81d"),a("4fad"),a("159b"),a("3835")),_=(a("dca8"),Object.freeze({GEOLONIA_API_KEY:"24dd300b3e134672a9c7b7c58d43a93f",GEOJSON_BASE:"https://raw.githubusercontent.com/terukizm/goto-eater-data/main/data/output",GENRES:{1:{name:"居酒屋・バー・バル",color:"yellow-500",color_rgba:"rgb(245, 158, 11)",icon:a("5f6f")},2:{name:"和食・寿司",color:"green-500",color_rgba:"rgb(16, 185, 129)",icon:a("fea4")},3:{name:"洋食",color:"blue-500",color_rgba:"rgb(37, 99, 235)",icon:a("5348")},4:{name:"中華",color:"red-500",color_rgba:"rgb(239, 68, 68)",icon:a("aabe")},5:{name:"麺類(ラーメン、そば、うどん)",color:"yellow-300",color_rgba:"rgb(252, 211, 77)",icon:a("81c4")},6:{name:"カレー・各国料理・創作料理",color:"purple-400",color_rgba:"rgb(167, 139, 250)",icon:a("9836")},7:{name:"ステーキ・鉄板焼き・焼肉",color:"yellow-600",color_rgba:"rgb(217, 119, 6)",icon:a("7a8f")},8:{name:"ファーストフード・ファミレス・食堂",color:"blue-300",color_rgba:"rgb(147, 197, 253)",icon:a("d5b7")},9:{name:"カフェ・スイーツ",color:"pink-400",color_rgba:"rgb(244, 114, 182)",icon:a("02a6")},10:{name:"その他",color:"gray-400",color_rgba:"rgb(156, 163, 175)",icon:a("3670")}},PREFS:{"北海道":{en:"hokkaido",offical_page:"https://gotoeat-hokkaido.jp/",info_page:"https://gotoeat-hokkaido.jp/news_list.html"},"青森県":{en:"aomori",offical_page:"https://premium-gift.jp/aomori",info_page:"https://premium-gift.jp/aomori/news"},"岩手県":{en:"iwate",offical_page:"https://www.iwate-gotoeat.jp/",info_page:"https://www.iwate-gotoeat.jp/topics/index.html"},"宮城県":{en:"miyagi",offical_page:"https://gte-miyagi.jp/"},"秋田県":{en:"akita",offical_page:"https://gotoeat-akita.com/"},"山形県":{en:"yamagata",offical_page:"https://yamagata-gotoeat.com/",info_page:"https://yamagata-gotoeat.com/news/"},"福島県":{en:"fukushima",offical_page:"https://gotoeat-fukushima.jp/",info_page:"https://gotoeat-fukushima.jp/news/"},"茨城県":{en:"ibaraki",offical_page:"https://www.gotoeat-ibaraki.com/",info_page:"https://www.gotoeat-ibaraki.com/%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9-%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B%E4%B8%80%E8%A6%A7"},"栃木県":{en:"tochigi",offical_page:"https://www.gotoeat-tochigi.jp/",info_page:"https://www.gotoeat-tochigi.jp/topics/index.php"},"群馬県":{en:"gunma",offical_page:"https://gunma-gotoeat-campaign.com/",info_page:"https://gunma-gotoeat-campaign.com/user_topics/"},"埼玉県":{en:"saitama",offical_page:"https://saitama-goto-eat.com/"},"千葉県":{en:"chiba",offical_page:"https://www.chiba-gte.jp/user/"},"東京都":{en:"tokyo",offical_page:"https://r.gnavi.co.jp/plan/campaign/gotoeat-tokyo/",info_page:"https://r.gnavi.co.jp/plan/campaign/gotoeat-tokyo/news/?tab=customer&sc_lid=gtetokyo_top_news_all"},"神奈川県":{en:"kanagawa",offical_page:"https://www.kanagawa-gte.jp/user/"},"新潟県":{en:"niigata",offical_page:"https://niigata-gte.com/",info_page:"https://niigata-gte.com/news/"},"富山県":{en:"toyama",offical_page:"https://www.toyamagotoeat.jp/",info_page:""},"石川県":{en:"ishikawa",offical_page:"https://ishikawa-gotoeat-cpn.com/",info_page:"https://www.toyamagotoeat.jp/news/"},"福井県":{en:"fukui",offical_page:"https://gotoeat-fukui.com/"},"山梨県":{en:"yamanashi",offical_page:"https://www.gotoeat-yamanashi.jp/",info_page:"https://www.gotoeat-yamanashi.jp/news"},"長野県":{en:"nagano",offical_page:"https://shinshu-gotoeat.com/",info_page:"https://shinshu-gotoeat.com/news_list.php"},"岐阜県":{offical_page:"https://www.gotoeat-gifu.jp/",info_page:"https://www.gotoeat-gifu.jp/news/"},"静岡県":{en:"shizuoka",offical_page:"https://gotoeat.s-reserve.com/",info_page:"https://premium-gift.jp/fujinokunigotoeat/news"},"愛知県":{en:"aichi",offical_page:"https://www.gotoeat-aichi.jp/",info_page:"https://www.gotoeat-aichi.jp/news/category/user/"},"三重県":{en:"mie",offical_page:"https://gotoeat-mie.com/",info_page:"https://gotoeat-mie.com/news/"},"滋賀県":{en:"shiga",offical_page:"https://www.shiga-gte.jp/user/"},"京都府":{en:"kyoto",offical_page:"https://kyoto-gotoeat.com/",info_page:"https://premium-gift.jp/kyoto-eat/news"},"大阪府":{en:"osaka",offical_page:"https://goto-eat.weare.osaka-info.jp/"},"兵庫県":{en:"hyogo",offical_page:"https://gotoeat-hyogo.com/"},"奈良県":{en:"nara",offical_page:"https://tinyurl.com/yx8ocwwc",info_page:""},"和歌山県":{en:"wakayama",offical_page:"https://gotoeat-wakayama.com/",info_page:""},"鳥取県":{en:"tottori",offical_page:"https://tottori-gotoeat.jp/",info_page:"https://tottori-gotoeat.jp/category/news/"},"島根県":{en:"shimane",offical_page:"https://www.gotoeat-shimane.jp/",info_page:"https://www.gotoeat-shimane.jp/news/"},"岡山県":{en:"okayama",offical_page:"https://www.gotoeat-okayama.com/"},"広島県":{en:"hiroshima",offical_page:"https://gotoeat.hiroshima.jp/"},"山口県":{en:"yamaguchi",offical_page:"https://gotoeat-yamaguchi.com/"},"徳島県":{en:"tokushima",offical_page:"https://gotoeat.tokushima.jp/"},"香川県":{en:"kagawa",offical_page:"https://www.kagawa-gotoeat.com/",info_page:"https://www.kagawa-gotoeat.com/category/news/"},"愛媛県":{en:"ehime",offical_page:"https://www.goto-eat-ehime.com/",info_page:"https://www.goto-eat-ehime.com/news/"},"高知県":{en:"kochi",offical_page:"https://www.gotoeat-kochi.com/"},"福岡県":{en:"fukuoka",offical_page:"https://gotoeat-fukuoka.jp/",info_page:"https://gotoeat-fukuoka.jp/news/"},"佐賀県":{en:"saga",offical_page:"https://www.gotoeat-saga.jp/",info_page:"https://www.gotoeat-saga.jp/news/"},"長崎県":{en:"nagasaki",offical_page:"https://www.gotoeat-nagasaki.jp/",info_page:"https://www.gotoeat-nagasaki.jp/news/"},"熊本県":{en:"kumamoto",offical_page:"https://gotoeat-kumamoto.jp/",info_page:"https://gotoeat-kumamoto.jp/news"},"大分県":{en:"oita",offical_page:"https://oita-gotoeat.com/"},"宮崎県":{en:"miyazaki",offical_page:"https://premium-gift.jp/gotoeatmiyazaki/",info_page:"https://premium-gift.jp/gotoeatmiyazaki/news"},"鹿児島県":{en:"kagoshima",offical_page:"http://www.kagoshima-cci.or.jp/?p=20375",info_page:"http://www.kagoshima-cci.or.jp/"},"沖縄県":{en:"okinawa",offical_page:"https://gotoeat.okinawa.jp/",info_page:"https://gotoeat.okinawa.jp/news/"}}})),b=function(t){return"\n    <strong>店舗名:</strong> ".concat(t.shop_name,"<br>\n    <strong>ジャンル:</strong> ").concat(t.genre_name," <br>\n    <strong>住所:</strong> ").concat(t.address," <br>\n    ").concat(t.area_name?"<strong>エリア</strong>: ".concat(t.area_name," <br>"):"",'\n    <a href="').concat(t["google_map_url"],'" class="underline" target="_blank">【GoogleMapで開く】</a><br>\n    ').concat(t.closing_day?"<strong>定休日:</strong> ".concat(t.closing_day," <br>"):"","\n    ").concat(t.opening_hours?"<strong>営業時間:</strong> ".concat(t.opening_hours," <br>"):"","\n    ").concat(t.tel?"<strong>電話番号:</strong> ".concat(t.tel," <br>"):"","\n    ").concat(t.offical_page?'<a href="'.concat(t.offical_page,'" class="underline" target="_blank">【公式HPを開く】</a><br>'):"","\n    ").concat(t.detail_page?'<a href="'.concat(t.detail_page,'" class="underline" target="_blank">【GoToEatのページを開く】</a><br>'):"","\n")},y=function(t){return new Promise((function(e){t.on("load",(function(){return e()}))}))},v={name:"GeoloniaMap",mounted:function(){var t=this;this.$loadScript("https://api.geolonia.com/v1/embed?geolonia-api-key=".concat(_.GEOLONIA_API_KEY)).then((function(){console.log("geolonia embed.js is loaded.")})).catch((function(e){t.$alert("geoloniaの外部js読み込みに失敗しました。"),console.log(e)}))},computed:{layers:{get:function(){return this.$store.getters.layers}}},watch:{layers:function(){this.showLayer()}},methods:{init:function(t,e,a){var o=this,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:15;this.lat=t,this.lng=e,this.prefNameJa=a,this.pref=_.PREFS[a].en,this.zoom=n,console.log("lat: ".concat(t,", lng: ").concat(e,", prefNameJa: ").concat(a)),console.log("init geolonia Map......."),Object(h["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.createMapObject();case 2:return t.next=4,y(o.map);case 4:case"end":return t.stop()}}),t)})))().then((function(){o.setupLayer(),o.showLayer()})).catch((function(t){o.$alert("地図の描画に失敗しました。"),console.log(t)}))},createMapObject:function(){this.map=new geolonia.Map({container:"#map",center:[this.lng,this.lat],zoom:this.zoom}).addControl(new geolonia.ScaleControl({maxWidth:200,unit:"metric"})).addControl(new geolonia.GeolocateControl({positionOptions:{enableHighAccuracy:!0},fitBoundsOptions:{linear:!0,zoom:this.zoom},trackUserLocation:!1,showUserLocation:!0}))},setupLayer:function(){for(var t=this,e=0,a=Object.entries(_.GENRES);e<a.length;e++){var o=Object(w["a"])(a[e],2),n=o[0],i=o[1],s="layer-".concat(n),r="image-".concat(n),c="datasource-".concat(n);this.map.addImage(r,document.getElementById(r)),this.map.addSource(c,{type:"geojson",data:"".concat(_.GEOJSON_BASE,"/").concat(this.pref,"/genre").concat(n,".geojson")}),this.map.addLayer({id:s,source:c,type:"symbol",layout:{visibility:"none","icon-image":r,"icon-allow-overlap":!0,"icon-size":.7,"text-field":"{shop_name}","text-font":["Noto Sans Regular"],"text-radial-offset":1.8,"text-size":12,"text-variable-anchor":["top","bottom","left","right"]},paint:{"text-color":"".concat(i.color_rgba),"text-halo-color":"rgba(255,255,255,1)","text-halo-width":2}}),this.map.on("click",s,(function(e){var a=e.lngLat,o=e.features[0];while(Math.abs(a.lng-a[0])>180)a[0]+=a.lng>a[0]?360:-360;(new geolonia.Popup).setLngLat(a).setHTML(b(o.properties)).addTo(t.map)})),this.map.on("mouseenter",s,(function(){t.map.getCanvas().style.cursor="pointer"})),this.map.on("mouseleave",s,(function(){t.map.getCanvas().style.cursor=""}))}},showLayer:function(){var t=this;this.layers.forEach((function(e,a){if(0!==a){var o="layer-".concat(a),n=e?"visible":"none";t.map.setLayoutProperty(o,"visibility",n)}}))}}},x=v,k=(a("21c2"),Object(s["a"])(x,m,d,!1,null,null,null)),j=k.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"DrawerMenu"},[a("div",{staticClass:"fixed h-screen z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden",class:t.sidebarOpen?"block":"hidden",on:{click:function(e){t.sidebarOpen=!t.sidebarOpen}}}),a("div",{staticClass:"fixed h-screen z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-800 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0",class:t.sidebarOpen?"translate-x-0 ease-out":"-translate-x-full ease-in"},[t._m(0),a("nav",{staticClass:"mt-5"},[a("div",{staticClass:"mx-auto flex flex-col h-12 p-2"},[a("label",{staticClass:"inline-flex items-center ml-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.checked_all,expression:"checked_all"}],staticClass:"form-checkbox h-6 w-6 text-gray-500",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.checked_all)?t._i(t.checked_all,null)>-1:t.checked_all},on:{change:function(e){var a=t.checked_all,o=e.target,n=!!o.checked;if(Array.isArray(a)){var i=null,s=t._i(a,i);o.checked?s<0&&(t.checked_all=a.concat([i])):s>-1&&(t.checked_all=a.slice(0,s).concat(a.slice(s+1)))}else t.checked_all=n}}}),a("span",{staticClass:"text-gray-300 mx-3"},[t._v("全選択")])])]),t._l(t.genres,(function(e,o){return a("div",{key:e.name,staticClass:"flex flex-col p-2"},[a("label",{staticClass:"inline-flex items-center h-10"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.layers[o],expression:"layers[i]"}],class:"form-checkbox h-6 w-6 ml-2 text-"+e.color,attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.layers[o])?t._i(t.layers[o],null)>-1:t.layers[o]},on:{change:function(e){var a=t.layers[o],n=e.target,i=!!n.checked;if(Array.isArray(a)){var s=null,r=t._i(a,s);n.checked?r<0&&t.$set(t.layers,o,a.concat([s])):r>-1&&t.$set(t.layers,o,a.slice(0,r).concat(a.slice(r+1)))}else t.$set(t.layers,o,i)}}}),a("img",{staticClass:"ml-2 icon",attrs:{id:"image-"+o,src:e.icon,alt:e.name}}),a("span",{class:"text-"+e.color+" mx-2"},[t._v(t._s(e.name))])])])}))],2),t._m(1)])])},O=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex items-center justify-center mx-2 my-2"},[a("span",{staticClass:"text-white text-xl font-semibold"},[t._v("後藤イー太(β)")]),a("span",{staticClass:"text-white text-sm"},[t._v("(GoToEatMap)")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex items-center mx-4 mt-4"},[a("ul",[a("li",{staticClass:"text-white text-sm mt-2"},[t._v(" GitHub: "),a("a",{staticClass:"underline",attrs:{href:"https://github.com/terukizm/goto-eater/",target:"_blank"}},[t._v(" terukizm/goto-eater ")])]),a("li",{staticClass:"text-white text-sm mt-2"},[a("a",{staticClass:"underline",attrs:{href:"https://geolonia.com/",target:"_blank"}},[t._v(" Powered by geolonia ")])])])])}],E=(a("cb29"),a("4de4"),a("b64b"),{name:"DrawerMenu",data:function(){return{sidebarOpen:!1}},computed:{genres:function(){return _.GENRES},layers:{get:function(){return this.$store.getters.layers}},checked_all:{get:function(){var t=this.layers.filter((function(t){return!0===t}));return t.length===Object.keys(this.genres).length},set:function(t){var e=[null].concat(Array(10).fill(t));this.$store.dispatch("setLayers",e)}}}}),M=E,P=(a("7598"),Object(s["a"])(M,C,O,!1,null,"1aa48f7e",null)),$=P.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"DropDownMenu"},[a("div",{staticClass:"relative"},[a("button",{staticClass:"relative block focus:outline-none leading-tight font-semibold text-gray-900",on:{click:function(e){t.dropdownOpen=!t.dropdownOpen}}},[t._v(" "+t._s(t.dropdownOpen?"▲":"▼")+t._s(t.prefNameJa)+" ")]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dropdownOpen,expression:"dropdownOpen"}],staticClass:"fixed inset-0 h-full w-full z-10",staticStyle:{display:"none"},on:{click:function(e){t.dropdownOpen=!1}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dropdownOpen,expression:"dropdownOpen"}],staticClass:"absolute right-0 mt-2 w-56 bg-white rounded-md overflow-hidden shadow-xl z-10",staticStyle:{display:"none"}},[a("a",{staticClass:"block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.about()}}},[t._v("本サービスについて")]),a("hr"),a("a",{staticClass:"block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right",attrs:{href:t.officialPage,target:"_blank"}},[t._v(t._s(t.prefNameJa)+"GoToEat公式サイト"),a("br"),t._v("(外部リンク)")]),a("hr"),t.infoPage?a("a",{staticClass:"block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white text-right",attrs:{href:t.infoPage,target:"_blank"}},[t._v(t._s(t.prefNameJa)+"からのお知らせ"),a("br"),t._v("(外部リンク)")]):t._e()])])])},z=[],N={name:"DropDownMenu",data:function(){return{dropdownOpen:!1,prefNameJa:null,infoPage:null,officialPage:null}},mounted:function(){this.$cookies.get("TermsOfUse")||this.about()},methods:{init:function(t){this.prefNameJa=t,this.officialPage=_.PREFS[t]["offical_page"],this.infoPage=_.PREFS[t]["info_page"]},about:function(){var t='\n      <p>・各都道府県のGoToEat公式サイトが公開している店舗情報を元に、地図にマッピングしています。</p>\n      <p>・地図表示には<a href="https://geolonia.com/" class="underline text-xl" target="_blank"><strong>Geoloniaのホスティングサービス(β)</strong></a>を利用しています。</p>\n      <br/>\n      <p>・地図表示のために端末の位置情報を取得していますが、<strong>利用者個人を特定できるような情報は保持していません。</strong></p>\n      <p>・また、サービスのソースコードはすべて公開しています。</p>\n      <p>・それでも気になる場合、ブラウザから位置情報取得をOFFにして、住所入力からの検索機能だけでご利用ください。</p>\n      <br/>\n      <p>・店舗データは公式サイトから<strong>1日1回自動更新</strong>していますが、正しく追従できていない可能性があります。</p>\n      <p>・本サービスが提供している情報については、内容の即時性、および正当性を担保するものではありません。</p>\n      <br/>\n      <p>・<a href="https://newspat.csis.u-tokyo.ac.jp/geocode/modules/dams/index.php?content_id=1" class="underline">利用しているジオコーダ(DAMS)</a>の都合上、<strong>店舗のおおよその位置しか表示できません。</strong><br/>\n      <span class="text-sm">(<a href="https://nlftp.mlit.go.jp/cgi-bin/isj/dls/_choose_method.cgi" class="underline" target="_blank">国土交通省が提供している位置参照情報</a>を元にしているため、番地以降およびビル名に相当する解像度での位置情報が取得できません。)</span>\n      </p>\n      <p>・そのため、最終的なお店の位置については、必ず<strong>GoogleMapなどの他サービスと合わせて確認してください。</strong></p>\n      <br/>\n      <p class="text-xl"><strong>本サービスを用いたことにより発生した不具合に関して、開発者は一切の責任を負いません。</strong></p>\n      ';this.$fire({title:"本サービスについて",html:t,width:"90%"});var e=2592e3;this.$cookies.config(e,""),this.$cookies.set("TermsOfUse",1),this.dropdownOpen=!1}}},A=N,L=(a("2357"),Object(s["a"])(A,S,z,!1,null,"e22589c4",null)),G=L.exports,T=function(t){return new Promise((function(e,a){navigator.geolocation.getCurrentPosition(e,a,t)}))},D=function(t){return new Promise((function(e,a){getLatLng(t,e,a)}))},R={components:{GeoloniaMap:j,DrawerMenu:$,DropDownMenu:G},data:function(){return{loadingText:"",prefNameJa:null,officialPage:"",place:"",zoom:15}},created:function(){var t=this,e=this.$route.query.place;this.zoom=this.$route.query.zoom,e?(this.place=e,this.loadingText="community-geocoderを読み込んでいます...",this.$loadScript("https://cdn.geolonia.com/community-geocoder.js").then((function(){Object(h["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.loadingText="".concat(e,"に対応する位置情報を取得しています..."),a.next=3,D(e);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop()}}),a)})))().then((function(e){var a=e.addr.match(/^(.{2,3}[都道府県]).*$/)[1];t.draw(e.lat,e.lng,a)})).catch((function(e){t.$alert("".concat(e," (都道府県名や市区町村名は省略せずに入力してください。また、駅名などのロケーション情報には対応していません。)"))}))})).catch((function(e){t.$alert("community-geocoderのjs読み込みに失敗しました。"),console.log(e)}))):(this.loadingText="現在地を取得しています...",Object(h["a"])(regeneratorRuntime.mark((function e(){var a,o,n,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,T();case 2:return a=e.sent,o=a.coords.latitude,n=a.coords.longitude,t.loadingText="現在地に対応する位置情報を取得しています...",e.next=8,fetch("https://aginfo.cgk.affrc.go.jp/ws/rgeocode.php?json&lat=".concat(o,"&lon=").concat(n));case 8:return i=e.sent,e.next=11,i.json();case 11:return s=e.sent,t.place="".concat(s.result.prefecture.pname).concat(s.result.municipality.mname),e.abrupt("return",[parseFloat(o),parseFloat(n),s.result.prefecture.pname]);case 14:case"end":return e.stop()}}),e)})))().then((function(e){t.draw.apply(t,Object(u["a"])(e))})).catch((function(e){t.$alert("現在地取得からの逆ジオコーディングに失敗しました。"),console.log(e)})))},methods:{openMenu:function(){this.$refs.menu.sidebarOpen=!0},submit:function(){window.location.href="./?place=".concat(this.place)},draw:function(t,e,a){this.loadingText="","徳島県"!==a?(this.prefNameJa=a,this.$refs.webmap.init(t,e,a,this.zoom),this.$refs.dropdown.init(a)):this.$alert("徳島県のGoToEat公式サイトには「※本サイトのコンテンツの無断転載を禁じます。」という一文があるため、対応を見送っています。")}}},J=R,B=Object(s["a"])(J,g,f,!1,null,null,null),F=B.exports;o["a"].use(p["a"]);var H=[{path:"/",name:"Home",component:F}],I=new p["a"]({mode:"history",base:"/goto-eater/",routes:H}),U=I,q=a("2f62");o["a"].use(q["a"]);var K=new q["a"].Store({state:{layers:[null,!0,!0,!0,!0,!0,!0,!0,!0,!0,!0]},getters:{layers:function(t){return t.layers}},mutations:{updateLayers:function(t,e){t.layers=e}},actions:{setLayers:function(t,e){var a=t.commit;a("updateLayers",e)}}}),Y=K,W=(a("843b"),a("67b0")),Z=a("683f"),Q=a("2b27"),V=a.n(Q);o["a"].use(W["a"]),o["a"].use(Z["a"]),o["a"].use(V.a),o["a"].config.productionTip=!1,new o["a"]({router:U,store:Y,render:function(t){return t(l)}}).$mount("#app")},"5f6f":function(t,e,a){t.exports=a.p+"img/genre1.5655a578.svg"},"63ff":function(t,e,a){},7598:function(t,e,a){"use strict";a("63ff")},"7a8f":function(t,e,a){t.exports=a.p+"img/genre7.06f7e1ee.svg"},"81c4":function(t,e,a){t.exports=a.p+"img/genre5.0783d260.svg"},"843b":function(t,e,a){},9836:function(t,e,a){t.exports=a.p+"img/genre6.deec835c.svg"},aabe:function(t,e,a){t.exports=a.p+"img/genre4.26530a60.svg"},d5b7:function(t,e,a){t.exports=a.p+"img/genre8.381f4829.svg"},f655:function(t,e,a){},fd6e:function(t,e,a){},fea4:function(t,e,a){t.exports=a.p+"img/genre2.ff84914d.svg"}});
//# sourceMappingURL=app.03d9c68c.js.map