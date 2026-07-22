/* ============================================================
   Iry -アイリー- 経営ダッシュボード 入力データ
   ============================================================
   ここの数字を書き換えるだけで、ダッシュボードの表示が変わります。
   数字は「Googleアナリティクス」「Meta広告マネージャ」「Googleビジネス
   プロフィール」「Instagram」「Search Console」を見て、週1回など
   決まったタイミングで手入力してください。

   ※ 下の数字はすべて「サンプル(見本)」です。実際の数字に置き換えてください。
   ============================================================ */
const DASHBOARD_DATA = {

  /* 最終更新日(手入力した日付を書いてください) */
  updated: "2026-07-16",
  periodLabel: "2026年7月 集計",

  /* ---------- 主要KPI(画面上部の大きな数字) ----------
     value=今月の数値 / delta=先月比(%)。deltaはプラスは緑、マイナスは赤で表示。 */
  kpi: [
    { label: "月間サイト訪問", value: 1240, unit: "人", delta: 18 },
    { label: "予約完了", value: 32, unit: "件", delta: 25 },
    { label: "Instagramフォロワー", value: 860, unit: "人", delta: 6 },
    { label: "Google口コミ", value: 14, unit: "件", delta: 8 },
  ],

  /* ---------- 集客ファネル(広告→予約完了までの人数の流れ) ----------
     上から順に人数が減っていくのが自然です。
     各段の value(人数)を入れると、次の段への「引き上げ率(%)」が自動計算されます。
     ・Instagram広告 表示/クリック → Meta広告マネージャで確認
     ・HP各ページ閲覧/予約クリック → Googleアナリティクス で確認
     ・予約完了 → Square予約管理 で確認 */
  funnel: [
    { label: "Instagram広告 表示", value: 45000, source: "Meta広告マネージャ" },
    { label: "広告クリック(HP流入)", value: 1080, source: "Meta広告マネージャ" },
    { label: "料金ページ 閲覧", value: 560, source: "Googleアナリティクス" },
    { label: "予約ボタン クリック", value: 96, source: "Googleアナリティクス" },
    { label: "予約完了", value: 32, source: "Square予約管理" },
  ],

  /* ---------- ページ別パフォーマンス ----------
     views=閲覧数 / avgTime=平均滞在時間 / exitRate=離脱率(%)。
     離脱率が高いページ = 作り込みが弱い(改善候補)として自動で「要改善」表示。 */
  pages: [
    { name: "トップページ", views: 1240, avgTime: "1:52", exitRate: 34 },
    { name: "料金(パーツ制)", views: 560, avgTime: "2:41", exitRate: 28 },
    { name: "選ばれる理由", views: 430, avgTime: "1:10", exitRate: 41 },
    { name: "お客様の声", views: 380, avgTime: "0:48", exitRate: 62 },
    { name: "ビフォーアフター", views: 350, avgTime: "1:38", exitRate: 30 },
    { name: "ブログ", views: 210, avgTime: "2:05", exitRate: 55 },
    { name: "アクセス", views: 180, avgTime: "0:39", exitRate: 71 },
  ],

  /* ---------- 流入検索キーワード(Search Consoleを見て手入力) ----------
     「お客様がどんな言葉で検索して来たか」= 何を求めているかの手がかり。
     medical/beautyタグ: そのキーワードが医療脱毛志向か美容脱毛志向かを示す
     (自動判定はできないため、オーナーの判断で "medical"/"beauty"/"" を入れてください)。 */
  keywords: [
    { term: "熊本 メンズ脱毛", clicks: 62, impressions: 1450, intent: "beauty" },
    { term: "熊本 ヒゲ脱毛 おすすめ", clicks: 41, impressions: 980, intent: "beauty" },
    { term: "熊本 医療脱毛 男", clicks: 28, impressions: 760, intent: "medical" },
    { term: "下通 脱毛 メンズ", clicks: 19, impressions: 320, intent: "beauty" },
    { term: "VIO 脱毛 熊本 男性", clicks: 12, impressions: 240, intent: "" },
  ],

  /* ---------- 見込み客インサイト(カウンセリングで聞いた「本音」の記録) ----------
     ※「他社と比較したか」「医療か美容で迷っているか」等は解析ツールでは取得
        できません。来店・問い合わせ時にヒアリングした内容をここに蓄積すると、
        お客様が本当に求めているものが客観的に見えてきます。 */
  insights: [
    { date: "2026-07-14", note: "医療脱毛(ゴリラ)と比較して来店。痛みと料金で迷っている。" },
    { date: "2026-07-12", note: "Instagramの症例動画を見て予約。青ヒゲの改善が第一希望。" },
    { date: "2026-07-09", note: "他店の都度払いが無く高額契約を迫られ不信感→パーツ制に魅力。" },
  ],

  /* ---------- Looker Studio(自動更新レポート)埋め込み ----------
     GoogleのLooker Studioで作ったレポートの「埋め込みURL」を貼ると、
     このダッシュボード内に自動更新されるグラフが表示されます。
     空("")のままなら設定案内が表示されます。 */
  lookerStudioUrl: "",

  /* 各管理画面へのリンク(正確な数字はこちらで確認) */
  links: {
    ga4: "https://analytics.google.com/",
    meta: "https://business.facebook.com/",
    square: "https://squareup.com/dashboard/",
    gbp: "https://business.google.com/",
    searchConsole: "https://search.google.com/search-console",
  },
};
