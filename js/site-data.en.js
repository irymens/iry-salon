/* ============================================================
   Iry — English content data file
   ============================================================
   This file powers the English version of the site (index-en.html).
   It is a translated SNAPSHOT of js/site-data.js and does NOT update
   automatically when the Japanese file changes. If you edit prices,
   hours, or menu items in js/site-data.js, please make the same
   change here so the English page stays accurate.
   Blog articles and Google reviews are intentionally left in
   Japanese (see 更新ガイド.md for why).
   ============================================================ */

const SITE_DATA = {

  /* ---------- First-visit coupons (campaign-en.html) ----------
     Same images/prices/urls as the Japanese site-data.js, titles translated. */
  campaignCoupons: {
    limited: [
      { image: "images/campaign/hige-u22-100.jpg", title: "Beard Removal (Student)", badge: "5 slots/month", price: "100", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/EWFVMGUFBMOD5Z3PRE2B4B55" },
      { image: "images/campaign/hige-shakaijin-500.jpg", title: "Beard Removal (Working Adult)", badge: "5 slots/month", price: "500", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/NYVMA2VTJJDMWUM5IWIU64CV" },
      { image: "images/campaign/zenshin-7000.jpg", title: "Full-Body Removal", badge: "3 slots/month", price: "7,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/QRRDYVLEG6UAJDZWJFGSTURR" },
      { image: "images/campaign/vio-3000.jpg", title: "VIO Removal", badge: "3 slots/month", price: "3,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/GHCHX7TFPX57V6VNKEVTP7PF" },
      { image: "images/campaign/jouhanshin-6000.jpg", title: "Upper Body (incl. Beard)", badge: "3 slots/month", price: "6,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/T4E4R624WZ6753LR5MSMVTNT" },
      { image: "images/campaign/gehanshin-vio-6000.jpg", title: "Lower Body (incl. VIO)", badge: "3 slots/month", price: "6,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/74GYP2VLHIX5VDEYT6FTTAU4" },
      { image: "images/campaign/hige-ashi-4000.jpg", title: "Beard & Legs", badge: "3 slots/month", price: "4,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/ZXCDLTCWYVQO7WQJC2VGFGC4" },
      { image: "images/campaign/hige-ude-4000.jpg", title: "Beard & Arms", badge: "3 slots/month", price: "4,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/P7NTHNB25O4T3NL2QIEYRWGF" },
      { image: "images/campaign/hige-vio-4000.jpg", title: "Beard & VIO", badge: "3 slots/month", price: "4,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/QRQGC5ZH4XB6TIBCDVLX34WO" },
    ],
    student: [
      { image: "images/campaign/hige-gakuwari-2500.jpg", title: "Beard Removal (Student)", badge: "First Visit", price: "2,500", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/HXKC4KTXDEHVNYUKRHXZC6GH" },
      { image: "images/campaign/zenshin-gakuwari-10000.jpg", title: "Full-Body (Student)", badge: "First Visit", price: "10,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/E5EBV3EXA2LDUBIUM6UTTQUY" },
      { image: "images/campaign/ashi-gakuwari-3500.jpg", title: "Leg Removal (Student)", badge: "First Visit", price: "3,500", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/NJYVZ6WLXVVNLMKWJOHSJXMQ" },
    ],
    shakaijin: [
      { image: "images/campaign/hige-3kagetsu-2980.jpg", title: "Beard Removal (3-Month Guarantee)", badge: "First Visit", price: "2,980", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/PUAHDYMIFC6Q3RYU5Q4S3TNJ" },
      { image: "images/campaign/zenshin-kao-vio-12000.jpg", title: "Full-Body (incl. Face & VIO)", badge: "First Visit", price: "12,000", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/AQ34FVAV5DCKNZMIHM4EFNO5" },
      { image: "images/campaign/ashi-4500.jpg", title: "Leg Removal", badge: "First Visit", price: "4,500", url: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services/A4TJYBCJ7KGXZVTI5H4TN2UR" },
    ],
  },

  info: {
    salonName: "Iry",
    address: "1-1-11 Shimodori, Chuo-ku, Kumamoto City, Kumamoto 860-0807, Japan (Kovacs Bldg. 4F)",
    tel: "096-247-9488",
    lineUrl: "https://lin.ee/Wo5OaPz",
    squareUrl: "https://book.squareup.com/appointments/1g4eq8uvc1qzun/location/LP2GX3BPWAFQ2/services",
    instagramUrl: "https://www.instagram.com/iry_mens_datsumou/?hl=ja",
    hours: "Weekdays 11:00–21:00 / Weekends & Holidays 10:00–20:00",
    holiday: "Wednesdays",
    access: "3-min walk from Tori-cho-suji tram stop",
  },

  proofVideos: [
    {
      file: "media/hero/IMG_3698_compressed.mp4",
      title: "Smooth Skin, Revealed",
      text: "Some time after treatment, hair simply slides out.",
    },
    {
      file: "media/hero/IMG_3594_compressed.mp4",
      title: "The Proof Is in the Gel",
      text: "Hair left behind in the post-treatment gel.",
    },
    {
      file: "media/hero/IMG_3960_compressed.mp4",
      title: "Not Just Beards",
      text: "Legs, arms, full body — all on the same pay-per-area pricing.",
    },
  ],

  partPrice: { S: 2000, L: 4000, X: 6000 },

  parts: {
    face: {
      label: "Face — 8 Areas",
      items: [
        { name: "Forehead & Brow", size: "S" },
        { name: "Cheeks", size: "S" },
        { name: "Nose", size: "S" },
        { name: "Upper Lip", size: "S" },
        { name: "Below Lip", size: "S" },
        { name: "Chin", size: "S" },
        { name: "Sideburns", size: "S" },
        { name: "Under Chin / Jaw", size: "S" },
      ],
    },
    body: {
      label: "Body — 21 Areas",
      items: [
        { name: "Areola", size: "S" },
        { name: "Full Chest (incl. Areola)", size: "L" },
        { name: "Underarms", size: "S" },
        { name: "Upper Arms", size: "L" },
        { name: "Forearms", size: "L" },
        { name: "Full Abdomen (incl. Navel)", size: "L" },
        { name: "Navel Area", size: "S" },
        { name: "V-Line", size: "X" },
        { name: "I-Line", size: "X" },
        { name: "O-Line", size: "X" },
        { name: "Nape", size: "S" },
        { name: "Shoulders", size: "S" },
        { name: "Upper Back (incl. Shoulders)", size: "L" },
        { name: "Lower Back", size: "L" },
        { name: "Waist", size: "L" },
        { name: "Hips", size: "L" },
        { name: "Above Knee", size: "L" },
        { name: "Knees", size: "S" },
        { name: "Below Knee", size: "L" },
        { name: "Hands & Fingers", size: "S" },
        { name: "Feet & Toes", size: "S" },
      ],
    },
  },

  comboExamples: [
    {
      title: "3-Area Beard Set (Upper Lip + Cheeks + Chin)",
      calc: "S × 3 areas",
      total: "6,000",
    },
    {
      title: "4-Area Leg Set (Above Knee + Knees + Below Knee + Feet)",
      calc: "L × 2 areas + S × 2 areas",
      total: "12,000",
    },
  ],
  pricingNote: "All prices include tax. Consultation and patch test are free. Major credit cards accepted. Course plans include mid-term cancellation and refund options — see our Terms of Commerce page (Japanese) for details.",

  voices: [
    {
      meta: "Google Review ★★★★★ | Age 30, Civil Servant, Kumamoto City (original review in Japanese)",
      title: "Results as good as medical clinics — without the pain",
      text: "以前は医療脱毛に通っていましたが、一回の効果はあっても細かい部分まで出来ていなかったりして毛が残っていたので、再度脱毛を考えていたところ同僚の紹介でお店を選ばせていただき通い始めました!医療脱毛ほどの痛みが無いのに効果は抜群で、細かいところまで丁寧に施術して下さるので最高です。すぐにツルツルになります!!いつも丁寧な対応ありがとうございます。",
    },
    {
      meta: "Google Review ★★★★★ | Age 27, Cram School Owner, Kumamoto City (original review in Japanese)",
      title: "No pain, even with sensitive skin",
      text: "髭剃りの手間が面倒で脱毛を検討しました。しかし敏感肌で刺激に弱かったため、お店選びに苦戦していたところ、こちらのお店に出会いました。敏感肌の私でも痛みを感じることなく、あっという間に脱毛が完了していて、毎回来るのが楽しみになっています。清潔感のある先生として、子どもたちに学びを届けていこうと思います。",
    },
    {
      meta: "Google Review ★★★★★ | Age 28, Photographer, Kumamoto City (original review in Japanese)",
      title: "Even regrowth just falls right out",
      text: "ブライダルカメラマンをしていると、脱毛をされてお肌ツルツルの新郎さんが少なくありません。それを見て脱毛への興味が湧き、知り合いに紹介してもらったこのお店に行ってみることにしました。施術後はヒゲがなくなり、後日生えてきた毛もポロポロと抜ける事に感動を覚えました!ヒゲ脱毛が終わったら全身のムダ毛もお願いしたいと思ってます!",
    },
  ],

  gallery: [
    { file: "images/before-after/IMG_2197.JPG", caption: "Beard Removal Before/After 01 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2198.JPG", caption: "Beard Removal Before/After 02 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2199.JPG", caption: "Beard Removal Before/After 03 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2200.JPG", caption: "Beard Removal Before/After 04 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2201.JPG", caption: "Beard Removal Before/After 05 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2202.JPG", caption: "Beard Removal Before/After 06 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2203.JPG", caption: "Beard Removal Before/After 07 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2204.JPG", caption: "Beard Removal Before/After 08 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2205.JPG", caption: "Beard Removal Before/After 09 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2206.JPG", caption: "Beard Removal Before/After 10 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2207.JPG", caption: "Beard Removal Before/After 11 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2208.JPG", caption: "Beard Removal Before/After 12 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2209.JPG", caption: "Beard Removal Before/After 13 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2210.JPG", caption: "Beard Removal Before/After 14 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2211.JPG", caption: "Beard Removal Before/After 15 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2212.JPG", caption: "Beard Removal Before/After 16 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2213.JPG", caption: "Beard Removal Before/After 17 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2214.JPG", caption: "Beard Removal Before/After 18 (Top: Before / Bottom: After)" },
    { file: "images/before-after/IMG_2215.JPG", caption: "Beard Removal Before/After 19 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2216.JPG", caption: "Beard Removal Before/After 20 (Left: Before / Right: After)" },
    { file: "images/before-after/IMG_2217.JPG", caption: "Beard Removal Before/After 21 (Left: Before / Right: After)" },
  ],

  staff: [
    {
      name: "Ryo Yamashita — Owner & Hair Removal Specialist",
      photo: "images/staff/owner.jpg",
      message: "With 11 years of experience as a physical therapist, I've spent my career studying muscles, nerves, skin, and the body as a whole. That experience shapes every decision I make in this chair — judging exactly how far to go with each treatment, for each person's skin, every single time. I don't see hair removal as simply applying light to skin; I see it as a responsibility for the skin entrusted to me. Taking hair cycles, skin type, and lifestyle into account, I'll suggest a plan that genuinely fits you.",
    },
  ],

  blog: [],

  instagramPosts: [],

  faq: [
    {
      q: "How much does it hurt?",
      a: "Most people describe it as a light rubber-band snap. Denser areas like the beard or VIO can feel more intense, so we adjust the intensity carefully. A free patch test is available before your first session.",
    },
    {
      q: "How many sessions until I see results?",
      a: "It varies by person, but most notice easier daily upkeep after 3–4 sessions; beards typically take 8–12 sessions. We'll give you a specific estimate after examining your hair during the consultation.",
    },
    {
      q: "Do I have to sign up for a course?",
      a: "No — pay-per-area, pay-as-you-go visits are available. That said, if you're planning multiple visits or areas, a set or course plan lowers the cost per visit. We'll show you both prices at your consultation so you can compare.",
    },
    {
      q: "What payment methods do you accept?",
      a: "Cash, major credit cards, and QR code payments. Card data is processed securely through a PCI DSS–compliant system — we never store your card number.",
    },
    {
      q: "Can I cancel or reschedule my appointment?",
      a: "We operate by appointment only, and once booked, that time is reserved exclusively for you. Changes or cancellations made by the end of business the day before are free. Same-day cancellations, same-day changes, arriving 15+ minutes late, or no-shows will use one session from your course, or incur a set cancellation fee if you're paying per visit (same-day changes may still be possible if a slot is open). See our Cancellation Policy page (Japanese) for full details.",
    },
    {
      q: "Can minors receive treatment?",
      a: "Yes, with a signed parental consent form, available in-store or via LINE.",
    },
  ],

  notice: "First Beard Session: Students ¥100 / Adults ¥500 — Limited Spots This Month",
};
