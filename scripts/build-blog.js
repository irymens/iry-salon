#!/usr/bin/env node
/* ============================================================
   ブログ 個別ページ生成スクリプト
   ============================================================
   js/site-data.js の blog: [] を元に、記事1本ごとに独立したHTML
   ページ(blog/{slug}.html)と、一覧ページ(blog.html)、
   sitemap.xml のブログ部分を自動生成します。

   ■ いつ実行するか
   site-data.js の blog: [] を編集した後は、コミット・デプロイの
   「前」に必ずこれを実行してください:

       node scripts/build-blog.js

   実行を忘れると、新しい記事や更新内容がサイトに反映されません
   (blog.html / blog/*.html は「編集不要・自動生成」ファイルです。
   直接編集しないでください。次回このスクリプトを実行すると上書き
   されます)。

   ■ ルール(新しい記事を追加するとき)
   site-data.js の各記事オブジェクトには、title / date / category /
   body に加えて、必ず以下を追加してください:

     slug: "kebab-case-no-spaces"
       - 英数字とハイフンのみ(小文字)。例: "hige-nankai"
       - 記事の内容がひと目でわかる、簡潔な英語スラッグにする
       - サイト内で重複しないこと(重複するとビルドがエラーで停止します)
       - 一度公開したslugは変更しない(URLが変わり、それまでの
         検索評価が失われるため)

     description: "記事の要約(全角100字程度)"  ※省略可
       - 検索結果のスニペットに使われる文章
       - 省略した場合は本文の冒頭から自動生成されるが、検索向けに
         書いた文章の方が精度が高いので、新規記事では書くこと推奨

   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE_DATA = require(path.join(ROOT, "js", "site-data.js"));
const BASE_URL = "https://iry-mens-datsumou.com";
const BRAND = "Iry -アイリー-";
const BRAND_SUFFIX = "｜Iry -アイリー-｜熊本・下通のメンズ脱毛サロン";
const OWNER_IMAGE = BASE_URL + "/images/staff/owner.jpg";

// ---------------------------------------------------------------
// ヘルパー
// ---------------------------------------------------------------
function escHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function stripTags(html) {
  return String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
function autoDescription(body, max) {
  const text = stripTags(body);
  if (text.length <= max) return text;
  return text.slice(0, max).trim() + "…";
}
function fmtDate(d) {
  return String(d).replace(/-/g, ".");
}

// ---------------------------------------------------------------
// 1. バリデーション(不正なデータのまま公開しないための安全弁)
// ---------------------------------------------------------------
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const errors = [];
const seenSlugs = new Map();

SITE_DATA.blog.forEach((p, i) => {
  const label = `記事[${i}] "${p.title || "(タイトルなし)"}" (${p.date || "日付なし"})`;
  if (!p.slug || !SLUG_RE.test(p.slug)) {
    errors.push(`${label}: slug が未設定、または不正な形式です(半角英数字とハイフンのみ)。値: ${JSON.stringify(p.slug)}`);
  } else if (seenSlugs.has(p.slug)) {
    errors.push(`${label}: slug "${p.slug}" が記事[${seenSlugs.get(p.slug)}]と重複しています。`);
  } else {
    seenSlugs.set(p.slug, i);
  }
  if (!p.date || !DATE_RE.test(p.date)) {
    errors.push(`${label}: date の形式が不正です(YYYY-MM-DD)。値: ${JSON.stringify(p.date)}`);
  }
  if (!p.title) errors.push(`${label}: title が未設定です。`);
  if (!p.body) errors.push(`${label}: body が未設定です。`);
});

if (errors.length) {
  console.error("❌ ビルド中止: js/site-data.js の blog 配列に問題があります。\n");
  errors.forEach((e) => console.error(" - " + e));
  console.error("\n修正してから再実行してください。サイトは更新されていません。");
  process.exit(1);
}

// ---------------------------------------------------------------
// 2. 日付降順(新しい順)に並べ替え、前後記事を計算
// ---------------------------------------------------------------
const posts = [...SITE_DATA.blog].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
posts.forEach((p, i) => {
  p._description = p.description || autoDescription(p.body, 100);
  p._newer = i > 0 ? posts[i - 1] : null; // 新しい記事
  p._older = i < posts.length - 1 ? posts[i + 1] : null; // 古い記事
  p._url = `${BASE_URL}/blog/${p.slug}.html`;
});

// ---------------------------------------------------------------
// 3. 共通テンプレート(ヘッダー・フッター・head)
//    base: ルートからの相対パス接頭辞("" or "../")
// ---------------------------------------------------------------
function fontLink() {
  return `<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Marcellus&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">`;
}

function head({ base, title, description, canonical, ogType, jsonLdBlocks }) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<meta name="description" content="${escHtml(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${BRAND}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontLink()}
<link rel="stylesheet" href="${base}css/style.css">
<script src="${base}js/analytics.js"></script>
${(jsonLdBlocks || []).map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`).join("\n")}`;
}

function header(base) {
  return `<header class="site-header">
  <a class="brand" href="${base}index.html">
    <span class="brand-en">Iry</span>
    <span class="brand-ja">アイリー|熊本・下通 メンズ脱毛</span>
  </a>
  <nav class="global-nav" id="global-nav" aria-label="メインメニュー">
    <a href="${base}index.html#reasons">選ばれる理由</a>
    <a href="${base}index.html#menu">料金</a>
    <a href="${base}index.html#flow">施術の流れ</a>
    <a href="${base}index.html#faq">よくある質問</a>
    <a href="${base}index.html#access">アクセス</a>
  </nav>
  <a class="btn btn-primary header-cta" id="header-book" href="#" target="_blank" rel="noopener">予約する</a>
  <button class="nav-toggle" id="nav-toggle" aria-label="メニューを開く" aria-expanded="false">
    <span></span><span></span>
  </button>
</header>`;
}

function footer(base) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <p class="brand-en">Iry</p>
      <p id="footer-address"></p>
      <p class="footer-partner">ロアッソ熊本 提携サロン</p>
    </div>
    <nav class="footer-nav" aria-label="フッターメニュー">
      <a href="${base}index.html#menu">料金メニュー</a>
      <a href="${base}index.html#faq">よくあるご質問</a>
      <a href="${base}legal.html">特定商取引法に基づく表記</a>
      <a href="${base}legal.html#privacy">プライバシーポリシー</a>
    </nav>
  </div>
  <p class="footer-copy">&copy; <span id="copy-year"></span> ${BRAND} All Rights Reserved.</p>
</footer>

<div class="mobile-cta">
  <a class="btn btn-primary" id="mobile-book" href="#" target="_blank" rel="noopener">予約する【最新脱毛メニュー】はこちら</a>
</div>

<script src="${base}js/site-data.js"></script>
<script src="${base}js/main.js"></script>
<script src="${base}js/fx.js"></script>`;
}

function page({ base, headHtml, bodyHtml, bodyClass }) {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
${headHtml}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>

${header(base)}

${bodyHtml}

${footer(base)}
</body>
</html>
`;
}

// ---------------------------------------------------------------
// 4. 個別記事ページ(blog/{slug}.html)
// ---------------------------------------------------------------
function renderPostNav(p) {
  const newer = p._newer
    ? `<a class="post-nav-link post-nav-prev" href="${p._newer.slug}.html"><span>新しい記事</span>${escHtml(p._newer.title)}</a>`
    : `<span></span>`;
  const older = p._older
    ? `<a class="post-nav-link post-nav-next" href="${p._older.slug}.html"><span>古い記事</span>${escHtml(p._older.title)}</a>`
    : `<span></span>`;
  return `<nav class="post-nav" aria-label="前後の記事">\n  ${newer}\n  ${older}\n</nav>`;
}

function buildMedia(p, base) {
  // 記事に写真・動画を1点添える場合のブロック(任意項目)。
  // image: { file, alt }  file はサイトルートからの相対パス(例: "images/before-after/IMG_2201.JPG")
  // video: { file, caption } file も同様にサイトルートからの相対パス
  if (p.image) {
    return `<figure class="post-photo">
      <img src="${base}${p.image.file}" alt="${escHtml(p.image.alt || p.title)}" loading="lazy">
      <figcaption>${escHtml(p.image.alt || "")}</figcaption>
    </figure>`;
  }
  if (p.video) {
    return `<figure class="post-photo">
      <video controls preload="metadata" src="${base}${p.video.file}"></video>
      <figcaption>${escHtml(p.video.caption || "")}</figcaption>
    </figure>`;
  }
  return "";
}

function buildPostPage(p) {
  const base = "../";
  const title = p.title + BRAND_SUFFIX;
  const mediaUrl = p.image ? `${BASE_URL}/${p.image.file}` : null;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p._description,
      datePublished: p.date,
      dateModified: p.date,
      inLanguage: "ja",
      url: p._url,
      mainEntityOfPage: { "@type": "WebPage", "@id": p._url },
      articleSection: p.category,
      ...(mediaUrl ? { image: mediaUrl } : {}),
      author: { "@type": "Organization", name: BRAND, url: BASE_URL },
      publisher: {
        "@type": "Organization",
        name: BRAND,
        logo: { "@type": "ImageObject", url: OWNER_IMAGE },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "ブログ", item: `${BASE_URL}/blog.html` },
        { "@type": "ListItem", position: 3, name: p.title, item: p._url },
      ],
    },
  ];

  const headHtml = head({
    base,
    title,
    description: p._description,
    canonical: p._url,
    ogType: "article",
    jsonLdBlocks: jsonLd,
  }) + (mediaUrl ? `\n<meta property="og:image" content="${mediaUrl}">` : "");

  const bodyHtml = `<main class="article-page article-page--single">
  <nav class="breadcrumb" aria-label="パンくずリスト">
    <a href="${base}index.html">トップ</a><span aria-hidden="true">&rsaquo;</span>
    <a href="${base}blog.html">ブログ</a><span aria-hidden="true">&rsaquo;</span>
    <span aria-current="page">${escHtml(p.title)}</span>
  </nav>
  <article class="article">
    <header>
      <time datetime="${p.date}">${fmtDate(p.date)}</time>
      <span class="cat">${escHtml(p.category)}</span>
      <h1>${escHtml(p.title)}</h1>
    </header>
    ${buildMedia(p, base)}
    <div class="body">${p.body}</div>
  </article>
  ${renderPostNav(p)}
  <div class="section-cta">
    <a class="btn btn-ghost-dark" href="${base}blog.html">記事一覧へ戻る</a>
  </div>
</main>`;

  return page({ base, headHtml, bodyHtml, bodyClass: "blog-page-body" });
}

// ---------------------------------------------------------------
// 5. 一覧ページ(blog.html) — 全記事を静的にカード表示(抜粋+リンク)
// ---------------------------------------------------------------
function buildIndexPage() {
  const base = "";
  const title = "ブログ|Iry -アイリー-|熊本・下通のメンズ脱毛サロン";
  const description = "熊本のメンズ脱毛サロン Iry -アイリー- のブログ。毛周期や自己処理の方法など、脱毛の知識を専門的に解説します。";
  const canonical = `${BASE_URL}/blog.html`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Iryブログ",
      description,
      url: canonical,
      publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: OWNER_IMAGE } },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        datePublished: p.date,
        url: p._url,
      })),
    },
  ];

  const headHtml = head({ base, title, description, canonical, ogType: "website", jsonLdBlocks: jsonLd });

  const cards = posts
    .map(
      (p) => `      <a class="blog-card reveal" href="blog/${p.slug}.html">
        ${p.image ? `<img class="thumb" src="${p.image.file}" alt="${escHtml(p.image.alt || p.title)}" loading="lazy">` : ""}
        <div class="meta">
          <time datetime="${p.date}">${fmtDate(p.date)}</time>
          <span class="cat">${escHtml(p.category)}</span>
        </div>
        <h2>${escHtml(p.title)}</h2>
        <p class="excerpt">${escHtml(p._description)}</p>
        <span class="more">続きを読む &rarr;</span>
      </a>`
    )
    .join("\n");

  const bodyHtml = `<div class="page-hero">
  <div class="container">
    <p class="eyebrow">JOURNAL</p>
    <h1>脱毛の知識ブログ</h1>
  </div>
</div>

<main class="article-page">
  <div class="blog-card-list">
${cards}
  </div>
  <div class="section-cta">
    <a class="btn btn-ghost-dark" href="index.html">トップページへ戻る</a>
  </div>
</main>`;

  return page({ base, headHtml, bodyHtml, bodyClass: "blog-page-body" });
}

// ---------------------------------------------------------------
// 6. 書き出し
// ---------------------------------------------------------------
const blogDir = path.join(ROOT, "blog");
fs.mkdirSync(blogDir, { recursive: true });

// 直前まで存在した記事ページのうち、今回のビルドで対象外になった
// (=slugが変わった/削除された)ファイルを検出して警告する
const existingFiles = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((f) => f.endsWith(".html")) : [];
const currentFiles = new Set(posts.map((p) => `${p.slug}.html`));
const orphaned = existingFiles.filter((f) => !currentFiles.has(f));

posts.forEach((p) => {
  fs.writeFileSync(path.join(blogDir, `${p.slug}.html`), buildPostPage(p), "utf8");
});
fs.writeFileSync(path.join(ROOT, "blog.html"), buildIndexPage(), "utf8");

// ---------------------------------------------------------------
// 7. sitemap.xml のブログ部分を更新(マーカー間のみ書き換え)
// ---------------------------------------------------------------
const sitemapPath = path.join(ROOT, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
const SM_START = "  <!-- BLOG_POSTS_START (このコメントとBLOG_POSTS_ENDの間は build-blog.js が自動生成します。手で編集しないでください) -->";
const SM_END = "  <!-- BLOG_POSTS_END -->";

const postUrls = posts
  .map(
    (p) => `  <url>
    <loc>${p._url}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join("\n");
const blockText = `${SM_START}\n${postUrls}\n${SM_END}`;

if (sitemap.includes(SM_START) && sitemap.includes(SM_END)) {
  const s = sitemap.indexOf(SM_START);
  const e = sitemap.indexOf(SM_END) + SM_END.length;
  sitemap = sitemap.slice(0, s) + blockText + sitemap.slice(e);
} else {
  // 初回: blog.html の <url> ブロックの直後にマーカーごと挿入
  const marker = "<loc>https://iry-mens-datsumou.com/blog.html</loc>";
  const idx = sitemap.indexOf(marker);
  if (idx === -1) {
    console.error("❌ sitemap.xml に blog.html のエントリが見つかりません。手動で確認してください。");
    process.exit(1);
  }
  const closeTag = sitemap.indexOf("</url>", idx) + "</url>".length;
  sitemap = sitemap.slice(0, closeTag) + "\n" + blockText + sitemap.slice(closeTag);
}
fs.writeFileSync(sitemapPath, sitemap, "utf8");

// ---------------------------------------------------------------
// 8. 完了報告
// ---------------------------------------------------------------
console.log(`✅ ${posts.length}件の記事ページを blog/ に生成しました。`);
console.log(`✅ blog.html(一覧ページ)を更新しました。`);
console.log(`✅ sitemap.xml にブログ記事 ${posts.length}件を反映しました。`);
if (orphaned.length) {
  console.log(`\n⚠️  以前生成されたが今回は対象外になったファイルが ${orphaned.length}件あります(slug変更や記事削除の可能性):`);
  orphaned.forEach((f) => console.log("   - blog/" + f));
  console.log("   意図した変更でなければ site-data.js の slug を確認してください。");
  console.log("   意図した変更であれば、このファイルは手動で削除してください(自動削除はしません)。");
}
