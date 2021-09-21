<template>
  <div class="Dialog" />
</template>

<script>
export default {
  name: "Dialog",

  data: function() {
    return {
      prefNameJa: null,
      modals: []
    };
  },

  methods: {
    /** 利用規約 */
    term() {
      return new Promise(resolve => {
        const html = `
        <div class="text-sm">
        <p class="p-2">・各都道府県のGoToEat公式サイトの情報を元に地図にプロットしていますが、内容の即時性、および正当性を担保するものではありません。</p>
        <p class="p-2">・特にお店の場所は<a href="https://newspat.csis.u-tokyo.ac.jp/geocode/modules/dams/index.php?content_id=1" target="_blank" class="underline">使用しているライブラリ</a>の都合上、おおよその位置しか表示できません。
          </strong><strong>必ずGoogleMapなど、他サービスの結果と合わせてご確認ください。</strong></p>
        <p class="p-2">・現在地取得のために端末の位置情報を取得しますが、<strong>利用者個人を特定できるような情報は保持していません。</strong><br>
          ただし、アクセス解析目的で<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" class="underline">Google Analytics</a>を有効化しています。<strong>気になる方はCookieをオプトアウト</strong>してご利用ください。</p>
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
          resolve();
        });
      });
    },
    /** 商品券についてのお知らせ */
    info() {
      if (this.prefNameJa !== "静岡県" && this.prefNameJa !== "鹿児島県") {
        return;
      }

      return new Promise(resolve => {
        const messages = {
          静岡県: `
            <div class="text-sm">
              <p>本サービスは<a href="https://premium-gift.jp/fujinokunigotoeat/" class="underline" target="_blank">「ふじのくに静岡県Go To Eatキャンペーン(通称: 赤券)」</a>に対応しています。</p>
              <div class="draw draw-success mt-2">
                <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/shokujiken_shizuoka.jpg"/>
                <span></span>
              </div>
              <p>現時点では<a href="https://gotoeat-shizuoka.com/" class="underline" target="_blank">「静岡県商工会Go To Eatキャンペーン(通称: 青券)」</a>には対応していません。</p>
              <div class="draw draw-failed">
                <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/shizuoka.jpg"/>
                <span></span>
              </div>
            </div>
          `,
          鹿児島県: `
            <div class="text-sm">
              <p>本サービスは<a href="http://www.kagoshima-cci.or.jp/?tag=gotoeat" class="underline" target="_blank">「鹿児島県商工会連合会版Go To Eatキャンペーン」</a>に対応しています。</p>
              <div class="draw draw-success mt-2">
                <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/kagoshima.jpg"/>
                <span></span>
              </div>
              <p>現時点では<a href="http://www.kagoshima-cci.or.jp/" class="underline" target="_blank">「鹿児島商工会議所版Go To Eatキャンペーン」</a>には対応していません。</p>
              <div class="draw draw-failed">
                <img class="p-2 mx-auto" src="https://gotoeat.maff.go.jp/images/kagoshima_2.jpg"/>
                <span></span>
              </div>
            </div>
          `
        };

        this.$fire({
          title: `${this.prefNameJa}のGoToEat商品券について`,
          html: messages[this.prefNameJa],
          width: "95%"
        }).then(() => {
          this.$cookies.config("1m"); // 1 month after, expire
          this.$cookies.set(this.prefNameJa, "yes");
          resolve();
        });
      });
    },
    init(prefNameJa) {
      this.prefNameJa = prefNameJa;
      // (async () => {
      //   if (!this.$cookies.get("TermsOfUse")) {
      //     await this.term();
      //   }
      //   if (!this.$cookies.get(this.prefNameJa)) {
      //     await this.info();
      //   }
      // })();
    }
  }
};
</script>
