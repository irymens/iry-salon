/* ============================================================
   Iry — 繁體中文內容資料檔
   ============================================================
   此檔案用於網站的繁體中文版本(index-zh.html)。
   內容為 js/site-data.js（日文版）的翻譯快照，
   當日文內容更新時，此檔案不會自動同步更新。
   若您在 js/site-data.js 中修改了價格、營業時間或項目，
   請同步修改此檔案，以維持中文頁面資訊正確。
   部落格文章與Google評論本文，刻意保留日文原文
   （原因請見 更新ガイド.md）。
   ============================================================ */

const SITE_DATA = {

  info: {
    salonName: "Iry",
    address: "日本熊本縣熊本市中央區下通1-1-11 Kovacs大樓4F(〒860-0807)",
    tel: "096-247-9488",
    lineUrl: "https://lin.ee/Wo5OaPz",
    squareUrl: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services",
    instagramUrl: "https://www.instagram.com/iry_mens_datsumou/?hl=ja",
    hours: "平日 11:00-21:00 / 週末及假日 10:00-20:00",
    holiday: "星期三",
    access: "從「通町筋」電車站步行3分鐘",
  },

  proofVideos: [
    {
      file: "media/hero/IMG_3698_compressed.mp4",
      title: "褪去，素肌重現",
      text: "照射一段時間後，鬍鬚會自然脫落。",
    },
    {
      file: "media/hero/IMG_3594_compressed.mp4",
      title: "證據就在凝膠裡",
      text: "施術後凝膠中殘留的脫落鬍鬚。",
    },
    {
      file: "media/hero/IMG_3960_compressed.mp4",
      title: "不只是鬍鬚",
      text: "雙腿、手臂、全身，都能以同樣的部位計價方式開始。",
    },
  ],

  partPrice: { S: 2000, L: 4000, X: 6000 },

  parts: {
    face: {
      label: "臉部 8個部位",
      items: [
        { name: "額頭・眉間", size: "S" },
        { name: "雙頰", size: "S" },
        { name: "鼻子", size: "S" },
        { name: "鼻下(人中)", size: "S" },
        { name: "嘴下", size: "S" },
        { name: "下巴", size: "S" },
        { name: "鬢角", size: "S" },
        { name: "下巴下方・下顎", size: "S" },
      ],
    },
    body: {
      label: "身體 21個部位",
      items: [
        { name: "乳暈周圍", size: "S" },
        { name: "整個胸口(含乳暈周圍)", size: "L" },
        { name: "雙腋下", size: "S" },
        { name: "雙上臂", size: "L" },
        { name: "雙前臂", size: "L" },
        { name: "整個腹部(含肚臍周圍)", size: "L" },
        { name: "肚臍周圍", size: "S" },
        { name: "V線", size: "X" },
        { name: "I線", size: "X" },
        { name: "O線", size: "X" },
        { name: "後頸", size: "S" },
        { name: "雙肩", size: "S" },
        { name: "上背部(含雙肩)", size: "L" },
        { name: "下背部", size: "L" },
        { name: "腰部", size: "L" },
        { name: "臀部", size: "L" },
        { name: "雙膝上", size: "L" },
        { name: "雙膝", size: "S" },
        { name: "雙膝下", size: "L" },
        { name: "雙手手背及手指", size: "S" },
        { name: "雙腳腳背及腳趾", size: "S" },
      ],
    },
  },

  comboExamples: [
    {
      title: "鬍鬚3部位組合(鼻下+雙頰+下巴)",
      calc: "S×3個部位",
      total: "6,000",
    },
    {
      title: "腿部4部位組合(雙膝上+雙膝+雙膝下+雙腳腳背)",
      calc: "L×2個部位 + S×2個部位",
      total: "12,000",
    },
  ],
  pricingNote: "※ 價格皆含稅。諮詢及貼膚測試皆免費，可使用各大信用卡。療程方案提供中途解約及退款服務，詳情請參閱特定商業交易法相關標示頁面(日文)。",

  voices: [
    {
      meta: "Google評論 ★★★★★｜30歲・公務員・熊本市(評論原文為日文)",
      title: "沒有醫美雷射的疼痛感，效果卻同樣出色",
      text: "以前は医療脱毛に通っていましたが、一回の効果はあっても細かい部分まで出来ていなかったりして毛が残っていたので、再度脱毛を考えていたところ同僚の紹介でお店を選ばせていただき通い始めました!医療脱毛ほどの痛みが無いのに効果は抜群で、細かいところまで丁寧に施術して下さるので最高です。すぐにツルツルになります!!いつも丁寧な対応ありがとうございます。",
    },
    {
      meta: "Google評論 ★★★★★｜27歲・補習班經營者・熊本市(評論原文為日文)",
      title: "即使是敏感肌也完全不會痛",
      text: "髭剃りの手間が面倒で脱毛を検討しました。しかし敏感肌で刺激に弱かったため、お店選びに苦戦していたところ、こちらのお店に出会いました。敏感肌の私でも痛みを感じることなく、あっという間に脱毛が完了していて、毎回来るのが楽しみになっています。清潔感のある先生として、子どもたちに学びを届けていこうと思います。",
    },
    {
      meta: "Google評論 ★★★★★｜28歲・攝影師・熊本市(評論原文為日文)",
      title: "連之後長出來的毛也會自己掉落",
      text: "ブライダルカメラマンをしていると、脱毛をされてお肌ツルツルの新郎さんが少なくありません。それを見て脱毛への興味が湧き、知り合いに紹介してもらったこのお店に行ってみることにしました。施術後はヒゲがなくなり、後日生えてきた毛もポロポロと抜ける事に感動を覚えました!ヒゲ脱毛が終わったら全身のムダ毛もお願いしたいと思ってます!",
    },
  ],

  gallery: [
    { file: "images/before-after/IMG_2197.JPG", caption: "鬍鬚脫毛 前後對比 01(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2198.JPG", caption: "鬍鬚脫毛 前後對比 02(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2199.JPG", caption: "鬍鬚脫毛 前後對比 03(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2200.JPG", caption: "鬍鬚脫毛 前後對比 04(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2201.JPG", caption: "鬍鬚脫毛 前後對比 05(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2202.JPG", caption: "鬍鬚脫毛 前後對比 06(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2203.JPG", caption: "鬍鬚脫毛 前後對比 07(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2204.JPG", caption: "鬍鬚脫毛 前後對比 08(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2205.JPG", caption: "鬍鬚脫毛 前後對比 09(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2206.JPG", caption: "鬍鬚脫毛 前後對比 10(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2207.JPG", caption: "鬍鬚脫毛 前後對比 11(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2208.JPG", caption: "鬍鬚脫毛 前後對比 12(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2209.JPG", caption: "鬍鬚脫毛 前後對比 13(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2210.JPG", caption: "鬍鬚脫毛 前後對比 14(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2211.JPG", caption: "鬍鬚脫毛 前後對比 15(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2212.JPG", caption: "鬍鬚脫毛 前後對比 16(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2213.JPG", caption: "鬍鬚脫毛 前後對比 17(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2214.JPG", caption: "鬍鬚脫毛 前後對比 18(上:施術前 / 下:施術後)" },
    { file: "images/before-after/IMG_2215.JPG", caption: "鬍鬚脫毛 前後對比 19(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2216.JPG", caption: "鬍鬚脫毛 前後對比 20(左:施術前 / 右:施術後)" },
    { file: "images/before-after/IMG_2217.JPG", caption: "鬍鬚脫毛 前後對比 21(左:施術前 / 右:施術後)" },
  ],

  staff: [
    {
      name: "負責人・脫毛技術師",
      photo: "images/staff/owner.jpg",
      message: "身為理學療法士(物理治療師)11年，我持續與肌肉、神經、皮膚及身體本身相處。正因為有這樣的經驗，我十分重視「這樣的肌膚狀態，今天可以照射到什麼程度」的判斷。脫毛對我而言不只是照光的作業，而是託付給我的一份肌膚責任。我會考量毛髮週期、膚質與生活型態，為每一位客人提出真正適合的療程規劃。",
    },
  ],

  blog: [],

  instagramPosts: [],

  faq: [
    {
      q: "會痛嗎？",
      a: "大多數人形容像是被橡皮筋輕彈的感覺。鬍鬚或私密部位(VIO)等毛髮較濃密的部位較容易有感，我們會仔細調整出力。初次施術前可免費體驗貼膚測試。",
    },
    {
      q: "大概幾次會看到效果？",
      a: "因人而異，但多數人在3～4次後就能感受到自我處理變輕鬆，鬍鬚大約需要8～12次。我們會在諮詢時依您的毛質提供具體的次數建議。",
    },
    {
      q: "一定要簽療程方案嗎？",
      a: "不需要，您也可以採用單次付費的部位計價方式。但若您計劃多次、多部位施術，方案或套組會讓每次的費用更划算。我們會在諮詢時提供兩種價格讓您比較選擇。",
    },
    {
      q: "可以使用哪些付款方式？",
      a: "現金、各大信用卡、QR code行動支付皆可使用。卡片資料透過符合PCI DSS國際標準的系統安全處理，本店不會保存您的卡號。",
    },
    {
      q: "可以取消或變更預約嗎？",
      a: "本店採完全預約制，一經預約即為您保留該時段。若於前一天營業時間內告知，變更或取消皆為免費。當天取消、當天變更、遲到15分鐘以上或無故未到，療程方案客人將消耗一次施術額度，單次付費客人則需支付所訂的取消費用(當天若仍有空檔，仍有機會協助調整時間)。詳情請見「取消政策」頁面(日文)。",
    },
    {
      q: "未成年可以施術嗎？",
      a: "有監護人同意書即可施術。同意書可於店內或LINE索取。",
    },
  ],

  notice: "首次鬍鬚脫毛 學生100日圓・社會人士500日圓｜每月限定名額",
};
