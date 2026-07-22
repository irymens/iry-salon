/* ============================================================
   FACE ZONES — 実写ベースのインタラクティブ施術部位ビューア v2
   ============================================================
   「1つの顔ビューア + ゾーン切替ボタン + 右側ディテールパネル」構成。
   実際の施術写真の上に照射範囲を #00D9FF の発光ゾーンでオーバーレイし、
   ゾーンを選ぶと写真が切り替わり、右パネルに料金・効果・痛み・施術時間を表示します。

   ・CSSはこのファイルが自分で注入します(サイトのカラー変数があれば利用、無ければ既定色)
   ・部位名と料金は window.SITE_DATA(parts.face / partPrice)から自動取得(日英中 共通)
   ・効果/痛み/施術時間は下の DETAILS(言語別)を編集すれば変更できます
     └ 日本語は SITE_DATA.faceZoneDetails があればそちらを優先(オーナーが1ファイルで編集可能)
   ・写真を差し替える場合は images/face-parts のファイルを置き換え、必要なら ZONES の crop/path を調整
   ・WordPress へは「このJS + images/face-parts + 空の <div id="face-zones"></div>」を移植するだけ
   ============================================================ */
(function () {
  "use strict";

  var ACCENT = "#00D9FF";

  /* ---- ゾーン定義 ----
     idx  : SITE_DATA.parts.face.items の並び順に対応(価格・部位名の取得元)
     key  : DETAILS辞書のキー
     img  : 写真ファイル / vw,vh: SVG座標系 / r: 写真の縦横比
     crop : 写真の表示窓 x/y=左上(%) w=表示幅(%) / path: 照射範囲(写真上の座標)
     ※ 表示順 = メンズで需要の高い部位から(鼻下→あご…)。番号01〜08はこの順。 */
  var ZONES = [
    {
      idx: 3, key: "hanashita", img: "images/face-parts/master-front.jpg", vw: 1212, vh: 2000, r: 1.6506,
      crop: { x: 2.5, y: 30.5, w: 95 },
      path: "M490,1048 Q610,1022 700,1042 Q800,1068 860,1105 Q935,1140 965,1195 Q985,1255 940,1300 Q900,1325 855,1300 Q790,1258 745,1230 Q700,1205 668,1210 Q640,1230 600,1225 Q560,1215 545,1200 Q500,1195 455,1235 Q400,1272 340,1292 Q265,1305 228,1268 Q205,1230 235,1170 Q290,1105 380,1068 Q440,1050 490,1048 Z",
    },
    {
      idx: 5, key: "ago", img: "images/face-parts/master-front.jpg", vw: 1212, vh: 2000, r: 1.6506,
      crop: { x: 0, y: 42.5, w: 100 },
      path: "M232,1372 Q300,1420 420,1455 Q540,1487 640,1480 Q760,1465 858,1362 Q900,1340 950,1395 Q975,1440 950,1510 Q900,1610 790,1680 Q680,1745 560,1738 Q440,1725 330,1640 Q240,1560 212,1462 Q205,1400 232,1372 Z",
    },
    {
      idx: 4, key: "kuchishita", img: "images/face-parts/master-front.jpg", vw: 1212, vh: 2000, r: 1.6506,
      crop: { x: 4, y: 42.4, w: 92 },
      path: "M330,1332 Q420,1372 520,1392 Q620,1400 720,1385 Q800,1362 858,1302 Q892,1288 900,1330 Q905,1372 858,1412 Q760,1470 640,1492 Q520,1508 420,1470 Q330,1435 285,1372 Q268,1330 292,1315 Q315,1310 330,1332 Z",
    },
    {
      idx: 7, key: "agoshita", img: "images/face-parts/master-neck.jpg", vw: 1493, vh: 2000, r: 1.3400,
      crop: { x: 0, y: 25.4, w: 100 },
      path: "M180,1105 Q450,1030 720,1015 Q1000,1020 1160,1090 Q1330,1170 1425,1250 Q1445,1500 1440,1930 Q1100,1950 730,1950 Q380,1950 40,1940 Q20,1600 25,1255 Q80,1160 180,1105 Z",
    },
    {
      idx: 1, key: "hoho", img: "images/face-parts/master-side.jpg", vw: 1545, vh: 2000, r: 1.2944,
      crop: { x: 0, y: 5, w: 100 },
      path: "M240,462 Q450,420 700,428 Q900,440 1055,520 Q1180,600 1225,700 Q1250,800 1235,935 Q1215,1090 1150,1195 Q1050,1235 850,1272 Q600,1310 350,1322 Q120,1332 30,1330 Q10,1240 8,1000 Q5,800 25,650 Q55,545 130,505 Q185,478 240,462 Z",
    },
    {
      idx: 6, key: "momiage", img: "images/face-parts/master-side.jpg", vw: 1545, vh: 2000, r: 1.2944,
      crop: { x: 10.6, y: 40.6, w: 70 },
      path: "M370,1325 Q650,1310 900,1305 Q1000,1305 1040,1330 Q1045,1400 1000,1520 Q940,1640 830,1750 Q720,1855 590,1900 Q480,1915 410,1875 Q375,1790 368,1650 Q362,1490 370,1325 Z",
    },
    {
      idx: 2, key: "hana", img: "images/face-parts/master-front.jpg", vw: 1212, vh: 2000, r: 1.6506,
      crop: { x: 2.5, y: 13.5, w: 95 },
      path: "M492,733 L668,725 Q700,760 735,830 Q770,900 793,928 Q800,965 720,972 Q640,992 552,985 Q460,985 405,975 Q392,955 397,930 Q420,880 452,795 Q470,748 492,733 Z",
    },
    {
      idx: 0, key: "odeko", img: "images/face-parts/master-front.jpg", vw: 1212, vh: 2000, r: 1.6506,
      crop: { x: 0, y: 0, w: 100 },
      path: "M300,60 Q600,28 880,32 Q985,40 980,115 Q972,185 850,195 Q560,245 320,250 Q170,245 168,160 Q170,80 300,60 Z",
    },
  ];

  /* ---- 効果 / 痛み(5段階) / 施術時間(言語別・編集可) ---- */
  var DETAILS = {
    ja: {
      hanashita:  { effects: ["鼻下全体をムラなく照射", "気になる青ヒゲ・青みを解消", "毎朝の髭剃り時間を短縮"], pain: 5, time: "約1分" },
      ago:        { effects: ["最も濃くなりやすいあごを重点照射", "ポツポツとした剃り残しを解消", "カミソリ負け・肌荒れを軽減"], pain: 5, time: "約1分" },
      kuchishita: { effects: ["口下〜口角のヒゲを照射", "口周りの清潔感を演出"], pain: 4, time: "約1分" },
      agoshita:   { effects: ["あご下から首へのラインを照射", "マスクを外しても清潔な印象に"], pain: 3, time: "約1分" },
      hoho:       { effects: ["頬の産毛・青みを除去", "肌のトーンが明るく見える"], pain: 3, time: "約1分" },
      momiage:    { effects: ["もみあげの形を整え輪郭をシャープに", "髪型との境目をすっきり"], pain: 4, time: "約1分" },
      hana:       { effects: ["見落としがちな鼻先・鼻筋の毛を処理", "毛穴の目立ちを軽減"], pain: 1, time: "約1分" },
      odeko:      { effects: ["眉間・生え際の産毛を整える", "眉のフレームを引き締める"], pain: 1, time: "約1分" },
      _labels: { pain: "痛み", time: "施術時間", per: "/ 1部位", book: "この部位を予約する", price: "料金" },
    },
    en: {
      hanashita:  { effects: ["Even coverage across the whole upper lip", "Clears stubborn blue-shadow beard", "Cuts down daily shaving time"], pain: 5, time: "approx. 1 min" },
      ago:        { effects: ["Focused on the chin, where hair grows thickest", "Removes patchy shaving leftovers", "Reduces razor burn and irritation"], pain: 5, time: "approx. 1 min" },
      kuchishita: { effects: ["Treats the lower lip and mouth corners", "A cleaner look around the mouth"], pain: 4, time: "approx. 1 min" },
      agoshita:   { effects: ["Treats the under-chin and neck", "Stays clean even with the mask off"], pain: 3, time: "approx. 1 min" },
      hoho:       { effects: ["Removes fine hair and shadow on the cheeks", "Brightens overall skin tone"], pain: 3, time: "approx. 1 min" },
      momiage:    { effects: ["Sharpens the outline of the sideburns", "Cleans up the hairline border"], pain: 4, time: "approx. 1 min" },
      hana:       { effects: ["Handles easily-missed hair on the nose", "Reduces the look of pores"], pain: 1, time: "approx. 1 min" },
      odeko:      { effects: ["Tidies the brow and hairline fuzz", "Frames the eyebrows"], pain: 1, time: "approx. 1 min" },
      _labels: { pain: "Pain", time: "Duration", per: "/ area", book: "Book this area", price: "Price" },
    },
    zh: {
      hanashita:  { effects: ["均勻照射整個鼻下", "改善惱人的青鬍渣", "縮短每天刮鬍時間"], pain: 5, time: "約1分鐘" },
      ago:        { effects: ["重點照射最容易變濃的下巴", "解決零星的刮鬍殘留", "減少刮鬍刀造成的肌膚粗糙"], pain: 5, time: "約1分鐘" },
      kuchishita: { effects: ["照射下唇至嘴角的鬍鬚", "打造嘴部周圍的清潔感"], pain: 4, time: "約1分鐘" },
      agoshita:   { effects: ["照射下巴至頸部的線條", "拿下口罩也保持清爽印象"], pain: 3, time: "約1分鐘" },
      hoho:       { effects: ["去除臉頰的細毛與青色感", "膚色看起來更明亮"], pain: 3, time: "約1分鐘" },
      momiage:    { effects: ["修整鬢角形狀讓輪廓更俐落", "與髮型的交界更乾淨"], pain: 4, time: "約1分鐘" },
      hana:       { effects: ["處理容易忽略的鼻尖、鼻樑毛髮", "減少毛孔的明顯感"], pain: 1, time: "約1分鐘" },
      odeko:      { effects: ["修整眉間與髮際的細毛", "讓眉型輪廓更立體"], pain: 1, time: "約1分鐘" },
      _labels: { pain: "疼痛", time: "施術時間", per: "/ 每個部位", book: "預約此部位", price: "費用" },
    },
  };

  /* ---- コンポーネントCSS(自己注入・サイトのカラー変数があれば利用) ---- */
  var CSS = "" +
    ".fzv{--fz-accent:" + ACCENT + ";display:grid;grid-template-columns:1.35fr 1fr;gap:clamp(20px,3vw,44px);align-items:stretch;margin:8px 0 20px}" +
    "@media(max-width:860px){.fzv{grid-template-columns:1fr;gap:22px}}" +
    ".fzv-main{display:flex;flex-direction:column;gap:18px;perspective:1300px}" +

    /* ビューア */
    ".fzv-frame{position:relative;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s cubic-bezier(.22,.61,.36,1)}" +
    ".fzv-viewport{position:relative;width:100%;max-width:480px;margin:0 auto;aspect-ratio:1/1;border-radius:22px;overflow:hidden;background:linear-gradient(160deg,#0E1B2E,#070B12);border:1px solid var(--border,rgba(255,255,255,.1));box-shadow:0 30px 70px rgba(3,6,12,.6),0 0 0 1px rgba(0,217,255,.05),inset 0 0 60px rgba(0,217,255,.04)}" +
    ".fzv-slide{position:absolute;inset:0;opacity:0;transform:scale(1.04);transition:opacity .55s ease,transform .7s cubic-bezier(.22,.61,.36,1);will-change:opacity,transform}" +
    ".fzv-slide.is-active{opacity:1;transform:scale(1)}" +
    ".fzv-canvas{position:absolute}" +
    ".fzv-canvas img{display:block;width:100%;height:100%;object-fit:fill;filter:saturate(.92) contrast(1.03) brightness(.98)}" +
    ".fzv-canvas svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}" +
    ".fzv-zone{fill:var(--fz-accent);fill-opacity:.34;stroke:var(--fz-accent);stroke-width:2px;vector-effect:non-scaling-stroke;filter:drop-shadow(0 0 10px rgba(0,217,255,.7))}" +
    ".fzv-slide.is-active .fzv-zone{animation:fzvPulse 2.6s ease-in-out infinite}" +
    "@keyframes fzvPulse{0%,100%{fill-opacity:.3;filter:drop-shadow(0 0 10px rgba(0,217,255,.6))}50%{fill-opacity:.46;filter:drop-shadow(0 0 22px rgba(0,217,255,1))}}" +
    ".fzv-inner-glow{fill:none;stroke:var(--fz-accent);stroke-width:26;stroke-opacity:.5;vector-effect:non-scaling-stroke}" +

    /* HUD装飾(医療機器風) */
    ".fzv-hud{position:absolute;inset:0;pointer-events:none;z-index:3}" +
    ".fzv-scan{position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 3px,rgba(0,217,255,.03) 3px 4px)}" +
    ".fzv-sweep{position:absolute;left:0;right:0;height:38%;top:-40%;background:linear-gradient(180deg,transparent,rgba(0,217,255,.10),transparent);animation:fzvSweep 4.5s ease-in-out infinite}" +
    "@keyframes fzvSweep{0%{top:-40%}60%,100%{top:110%}}" +
    ".fzv-corner{position:absolute;width:26px;height:26px;border:1.5px solid rgba(0,217,255,.55)}" +
    ".fzv-corner.tl{top:14px;left:14px;border-right:0;border-bottom:0}" +
    ".fzv-corner.tr{top:14px;right:14px;border-left:0;border-bottom:0}" +
    ".fzv-corner.bl{bottom:14px;left:14px;border-right:0;border-top:0}" +
    ".fzv-corner.br{bottom:14px;right:14px;border-left:0;border-top:0}" +
    ".fzv-tag{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;align-items:baseline;gap:10px;padding:34px 20px 18px;background:linear-gradient(0deg,rgba(7,11,18,.9),transparent);pointer-events:none}" +
    ".fzv-tag-num{font-family:'Space Grotesk','Marcellus',sans-serif;font-size:12px;letter-spacing:.22em;color:var(--fz-accent)}" +
    ".fzv-tag-name{font-family:var(--font-display,serif);font-size:19px;font-weight:600;color:#fff;letter-spacing:.05em}" +

    /* ゾーン選択チップ */
    ".fzv-rail{display:flex;flex-wrap:wrap;gap:9px}" +
    "@media(max-width:860px){.fzv-rail{flex-wrap:nowrap;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch;scrollbar-width:none}.fzv-rail::-webkit-scrollbar{display:none}}" +
    ".fzv-chip{flex:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;letter-spacing:.03em;color:var(--sub,#C7D2E0);background:var(--surface,rgba(255,255,255,.05));border:1px solid var(--border,rgba(255,255,255,.1));border-radius:999px;padding:9px 17px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:color .3s,border-color .3s,background .3s,box-shadow .3s,transform .3s}" +
    ".fzv-chip:hover{color:#fff;border-color:rgba(0,217,255,.5);transform:translateY(-2px)}" +
    ".fzv-chip.is-active{color:#fff;border-color:rgba(0,217,255,.75);background:linear-gradient(135deg,rgba(0,217,255,.22),rgba(122,92,255,.2));box-shadow:0 0 22px rgba(0,217,255,.3)}" +

    /* 右パネル */
    ".fzv-panel{background:var(--surface,rgba(255,255,255,.05));backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border,rgba(255,255,255,.1));border-radius:22px;padding:34px 32px;display:flex;flex-direction:column;overflow:hidden}" +
    ".fzv-pinner{display:flex;flex-direction:column;height:100%}" +
    ".fzv-pinner.is-switching{opacity:0;transform:translateY(10px)}" +
    ".fzv-pinner{transition:opacity .4s ease,transform .4s cubic-bezier(.22,.61,.36,1)}" +
    ".fzv-phead{display:flex;align-items:center;gap:12px;margin-bottom:6px}" +
    ".fzv-pnum{font-family:'Space Grotesk','Marcellus',sans-serif;font-size:12px;letter-spacing:.2em;color:var(--fz-accent)}" +
    ".fzv-pname{font-family:var(--font-display,serif);font-size:23px;font-weight:600;color:#fff;letter-spacing:.06em;margin:0}" +
    ".fzv-pprice{font-family:'Space Grotesk','Marcellus',sans-serif;font-size:34px;color:#fff;margin:2px 0 22px;line-height:1}" +
    ".fzv-pprice .cur{font-size:19px;margin-right:2px;color:var(--fz-accent)}" +
    ".fzv-pprice small{font-size:12px;color:var(--sub,#C7D2E0);opacity:.7;margin-left:6px;font-family:var(--font-body,sans-serif)}" +
    ".fzv-effects{list-style:none;margin:0 0 24px;padding:0;display:grid;gap:11px}" +
    ".fzv-effects li{position:relative;padding-left:26px;font-size:13.5px;color:var(--sub,#C7D2E0);line-height:1.6}" +
    ".fzv-effects li::before{content:'';position:absolute;left:0;top:7px;width:14px;height:8px;border-left:2px solid var(--fz-accent);border-bottom:2px solid var(--fz-accent);transform:rotate(-45deg);opacity:.9}" +
    ".fzv-metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:auto;padding-top:22px;border-top:1px solid var(--border,rgba(255,255,255,.1))}" +
    ".fzv-metric{background:rgba(255,255,255,.03);border:1px solid var(--border,rgba(255,255,255,.08));border-radius:14px;padding:14px 16px}" +
    ".fzv-metric .k{display:block;font-size:11px;letter-spacing:.1em;color:var(--sub,#C7D2E0);opacity:.7;margin-bottom:6px}" +
    ".fzv-metric .v{font-family:'Space Grotesk',sans-serif;font-size:16px;color:#fff}" +
    ".fzv-stars{letter-spacing:2px;font-size:14px}" +
    ".fzv-stars .on{color:var(--fz-accent)}" +
    ".fzv-stars .off{color:rgba(255,255,255,.22)}" +
    ".fzv-book{margin-top:18px;width:100%}" +

    /* 入場アニメ(モーション許可時のみ JS が付与) */
    ".fzv.fz-anim .fzv-frame{opacity:0;transform:scale(.96);filter:blur(10px);transition:opacity .8s ease,transform .8s cubic-bezier(.22,.61,.36,1),filter .8s ease}" +
    ".fzv.fz-anim.fz-in .fzv-frame{opacity:1;transform:none;filter:blur(0)}" +
    ".fzv.fz-anim .fzv-chip{opacity:0;transform:translateY(12px)}" +
    ".fzv.fz-anim.fz-in .fzv-chip{opacity:1;transform:none;transition:opacity .5s ease,transform .5s cubic-bezier(.22,.61,.36,1)}" +
    ".fzv.fz-anim .fzv-panel{opacity:0;transform:translateY(16px);transition:opacity .8s ease .15s,transform .8s cubic-bezier(.22,.61,.36,1) .15s}" +
    ".fzv.fz-anim.fz-in .fzv-panel{opacity:1;transform:none}" +

    "@media(prefers-reduced-motion:reduce){.fzv-frame{transition:none!important;transform:none!important}.fzv-slide{transition:none}.fzv-slide.is-active .fzv-zone{animation:none}.fzv-sweep{display:none}.fzv-pinner{transition:none}.fzv.fz-anim .fzv-frame,.fzv.fz-anim .fzv-chip,.fzv.fz-anim .fzv-panel{opacity:1;transform:none;filter:none}}";

  function init() {
    var root = document.getElementById("face-zones");
    if (!root) return;

    var D = window.SITE_DATA || (typeof SITE_DATA !== "undefined" ? SITE_DATA : null);
    var faceItems = D && D.parts && D.parts.face ? D.parts.face.items : [];
    var priceOf = function (size) {
      return D && D.partPrice && D.partPrice[size] ? D.partPrice[size].toLocaleString("ja-JP") : "";
    };
    var sizeOf = function (idx) { return (faceItems[idx] && faceItems[idx].size) || "S"; };
    var nameOf = function (idx, key) { return (faceItems[idx] && faceItems[idx].name) || key; };

    /* 言語判定 + 詳細辞書(SITE_DATA.faceZoneDetails があれば最優先で上書き) */
    var langAttr = (document.documentElement.getAttribute("lang") || "ja").toLowerCase();
    var lang = langAttr.indexOf("en") === 0 ? "en" : (langAttr.indexOf("zh") === 0 ? "zh" : "ja");
    var dict = DETAILS[lang] || DETAILS.ja;
    var L = dict._labels;
    var override = (D && D.faceZoneDetails) || null; /* 主に日本語オーナー編集用 */

    var detailFor = function (z) {
      if (override && override[nameOf(z.idx, z.key)]) return override[nameOf(z.idx, z.key)];
      return dict[z.key] || { effects: [], pain: 3, time: "" };
    };

    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var CARD_ASPECT = 1; /* 正方形の表示窓 */

    /* ---- スライド(写真+ゾーン)を全ゾーン分プリレンダー ---- */
    var slidesHtml = ZONES.map(function (z) {
      var widthPct = 10000 / z.crop.w;
      var leftPct = z.crop.x * 100 / z.crop.w;
      var topPct = z.crop.y * (100 / z.crop.w) * z.r * CARD_ASPECT;
      var heightPct = widthPct * z.r * CARD_ASPECT;
      var uid = "fzv-" + z.key;
      return '' +
        '<div class="fzv-slide" data-key="' + z.key + '">' +
          '<div class="fzv-canvas" style="width:' + widthPct + '%;height:' + heightPct + '%;left:-' + leftPct + '%;top:-' + topPct + '%">' +
            '<img src="' + z.img + '" alt="' + esc(nameOf(z.idx, z.key)) + ' の照射範囲" decoding="async">' +
            '<svg viewBox="0 0 ' + z.vw + " " + z.vh + '" preserveAspectRatio="none" aria-hidden="true">' +
              '<defs><clipPath id="' + uid + '-clip"><path d="' + z.path + '"/></clipPath></defs>' +
              '<path class="fzv-inner-glow" d="' + z.path + '" clip-path="url(#' + uid + '-clip)" style="filter:blur(10px)"/>' +
              '<path class="fzv-zone" d="' + z.path + '"/>' +
            '</svg>' +
          '</div>' +
        '</div>';
    }).join("");

    /* ---- チップ ---- */
    var chipsHtml = ZONES.map(function (z, i) {
      return '<button class="fzv-chip" type="button" role="tab" data-key="' + z.key + '" ' +
        'aria-selected="false">' + esc(nameOf(z.idx, z.key)) + '</button>';
    }).join("");

    root.innerHTML = '' +
      '<div class="fzv">' +
        '<div class="fzv-main">' +
          '<div class="fzv-frame">' +
            '<div class="fzv-viewport">' +
              slidesHtml +
              '<div class="fzv-hud">' +
                '<div class="fzv-sweep"></div><div class="fzv-scan"></div>' +
                '<span class="fzv-corner tl"></span><span class="fzv-corner tr"></span>' +
                '<span class="fzv-corner bl"></span><span class="fzv-corner br"></span>' +
              '</div>' +
              '<div class="fzv-tag"><span class="fzv-tag-num"></span><span class="fzv-tag-name"></span></div>' +
            '</div>' +
          '</div>' +
          '<div class="fzv-rail" role="tablist" aria-label="' + esc(L.price) + '">' + chipsHtml + '</div>' +
        '</div>' +
        '<aside class="fzv-panel"><div class="fzv-pinner"></div></aside>' +
      '</div>';

    var fzv = root.querySelector(".fzv");
    var frame = root.querySelector(".fzv-frame");
    var slides = root.querySelectorAll(".fzv-slide");
    var chips = root.querySelectorAll(".fzv-chip");
    var tagNum = root.querySelector(".fzv-tag-num");
    var tagName = root.querySelector(".fzv-tag-name");
    var pinner = root.querySelector(".fzv-pinner");
    var bookUrl = (D && D.info && D.info.squareUrl) || "#";

    var stars = function (n) {
      var s = "";
      for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= n ? "on" : "off") + '">★</span>';
      return '<span class="fzv-stars">' + s + '</span>';
    };

    var panelHtml = function (z, num) {
      var d = detailFor(z);
      var size = sizeOf(z.idx);
      var effects = (d.effects || []).map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("");
      return '' +
        '<div class="fzv-phead">' +
          '<span class="fzv-pnum">' + num + '</span>' +
          '<span class="size-badge size-' + esc(size) + '">' + esc(size) + '</span>' +
          '<h4 class="fzv-pname">' + esc(nameOf(z.idx, z.key)) + '</h4>' +
        '</div>' +
        '<div class="fzv-pprice"><span class="cur">&yen;</span>' + priceOf(size) + '<small>' + esc(L.per) + '</small></div>' +
        '<ul class="fzv-effects">' + effects + '</ul>' +
        '<div class="fzv-metrics">' +
          '<div class="fzv-metric"><span class="k">' + esc(L.pain) + '</span><span class="v">' + stars(d.pain || 0) + '</span></div>' +
          '<div class="fzv-metric"><span class="k">' + esc(L.time) + '</span><span class="v">' + esc(d.time || "") + '</span></div>' +
        '</div>' +
        '<a class="btn btn-primary fzv-book" href="' + esc(bookUrl) + '" target="_blank" rel="noopener">' + esc(L.book) + '</a>';
    };

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var current = null;

    var select = function (key, animate) {
      var i = -1;
      ZONES.forEach(function (z, idx) { if (z.key === key) i = idx; });
      if (i < 0 || key === current) return;
      current = key;
      var z = ZONES[i];
      var num = ("0" + (i + 1)).slice(-2);

      slides.forEach(function (s) { s.classList.toggle("is-active", s.dataset.key === key); });
      chips.forEach(function (c) {
        var on = c.dataset.key === key;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-selected", on ? "true" : "false");
      });
      tagNum.textContent = num;
      tagName.textContent = nameOf(z.idx, z.key);

      if (animate && !reduce) {
        pinner.classList.add("is-switching");
        setTimeout(function () {
          pinner.innerHTML = panelHtml(z, num);
          requestAnimationFrame(function () { pinner.classList.remove("is-switching"); });
        }, 180);
      } else {
        pinner.innerHTML = panelHtml(z, num);
      }
    };

    /* クリック/タップで選択 */
    chips.forEach(function (c) {
      c.addEventListener("click", function () { select(c.dataset.key, true); });
    });

    /* ---- 3Dチルト(PC: マウス方向 / モバイル: ドラッグで傾ける) ---- */
    var fine = window.matchMedia("(pointer: fine)").matches;
    if (!reduce) {
      var raf = null;
      var setTilt = function (px, py, max) {
        frame.style.setProperty("--ry", (px * max).toFixed(2) + "deg");
        frame.style.setProperty("--rx", (-py * max).toFixed(2) + "deg");
      };
      if (fine) {
        frame.addEventListener("pointermove", function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            var r = frame.getBoundingClientRect();
            setTilt((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5, 9);
            raf = null;
          });
        });
        frame.addEventListener("pointerleave", function () { setTilt(0, 0, 0); });
      } else {
        /* モバイル: 指のドラッグで左右±15°/上下±8°傾ける(タッチUX向上) */
        var dragging = false, sx = 0, sy = 0;
        frame.addEventListener("touchstart", function (e) {
          dragging = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
        }, { passive: true });
        frame.addEventListener("touchmove", function (e) {
          if (!dragging) return;
          var r = frame.getBoundingClientRect();
          var dx = (e.touches[0].clientX - sx) / r.width;
          var dy = (e.touches[0].clientY - sy) / r.height;
          frame.style.setProperty("--ry", Math.max(-15, Math.min(15, dx * 30)).toFixed(1) + "deg");
          frame.style.setProperty("--rx", Math.max(-8, Math.min(8, -dy * 16)).toFixed(1) + "deg");
        }, { passive: true });
        var release = function () { dragging = false; frame.style.setProperty("--ry", "0deg"); frame.style.setProperty("--rx", "0deg"); };
        frame.addEventListener("touchend", release);
        frame.addEventListener("touchcancel", release);
      }
    }

    /* ---- 初期表示 + 入場アニメ ---- */
    select(ZONES[0].key, false);
    if (!reduce) {
      fzv.classList.add("fz-anim");
      /* チップは順番に点灯(0.2s後から stagger) */
      chips.forEach(function (c, i) { c.style.transitionDelay = (0.2 + i * 0.06) + "s"; });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { fzv.classList.add("fz-in"); });
      });
      /* 入場後は個別 transition-delay をリセット(ホバーが遅延しないように) */
      setTimeout(function () { chips.forEach(function (c) { c.style.transitionDelay = ""; }); }, 1400);
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
