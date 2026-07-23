/* ============================================================
   Iry -アイリー- メインスクリプト
   site-data.js の内容をページに反映します。(このファイルは編集不要です)
   ============================================================ */
(function () {
  const D = window.SITE_DATA || (typeof SITE_DATA !== "undefined" ? SITE_DATA : null);
  if (!D) return;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- お知らせバー ---------- */
  if (D.notice && $("notice-bar")) {
    $("notice-text").textContent = D.notice;
    $("notice-bar").hidden = false;
  }

  /* ---------- 予約(Square)・LINE・電話・Instagramリンク ---------- */
  ["header-book", "hero-book", "menu-book", "cta-book", "mobile-book"].forEach((id) => {
    const el = $(id);
    if (el) el.href = D.info.squareUrl;
  });
  if ($("cta-line")) $("cta-line").href = D.info.lineUrl;
  if ($("cta-tel")) $("cta-tel").href = "tel:" + D.info.tel.replace(/-/g, "");
  if ($("instagram-link")) $("instagram-link").href = D.info.instagramUrl;

  /* ---------- 証拠動画(小さなクリップをページ各所に散りばめる) ----------
     ヒーロー動画と同じ「HTMLのautoplay属性まかせ」の方式。IntersectionObserver
     による遅延読み込みは環境によって発火しないことがあるため使わず、
     ブラウザ標準のautoplay+preload="metadata"にすべて任せている。 */
  const renderChip = (p) => `
    <figure class="video-chip">
      <video autoplay muted loop playsinline preload="metadata" src="${esc(p.file)}"></video>
      <figcaption>
        <span class="vc-title">${esc(p.title)}</span>
        <span class="vc-text">${esc(p.text)}</span>
      </figcaption>
    </figure>`;
  const wireChip = (video) => {
    video.addEventListener("loadeddata", () => video.classList.add("is-loaded"), { once: true });
    // 画面外に出たら一時停止(通信量・バッテリー配慮。失敗しても表示には影響しない)
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { const pr = video.play(); if (pr) pr.catch(() => {}); }
      else video.pause();
    });
    io.observe(video);
  };

  if (D.proofVideos && D.proofVideos.length >= 3) {
    const duoSlot = $("chip-reasons-duo");
    if (duoSlot) {
      duoSlot.innerHTML = renderChip(D.proofVideos[0]) + renderChip(D.proofVideos[1]);
      duoSlot.querySelectorAll("video").forEach(wireChip);
    }
    const gallerySlot = $("chip-gallery");
    if (gallerySlot) {
      gallerySlot.innerHTML = renderChip(D.proofVideos[2]);
      gallerySlot.querySelectorAll("video").forEach(wireChip);
    }
  }

  /* ---------- 料金(パーツ制) ---------- */
  const partsRoot = $("parts-tables");
  if (partsRoot && D.parts && D.partPrice) {
    const priceOf = (size) => D.partPrice[size].toLocaleString("ja-JP");
    const renderGroup = (group) => `
      <div class="parts-group">
        <h3>${esc(group.label)}</h3>
        ${group.items.map((it) => `
          <div class="menu-row" data-part="${esc(it.name)}">
            <span class="name">${esc(it.name)}</span>
            <span class="dots" aria-hidden="true"></span>
            <span class="size-badge size-${esc(it.size)}">${esc(it.size)}</span>
            <span class="price">${priceOf(it.size)}</span>
          </div>`).join("")}
      </div>`;
    partsRoot.innerHTML = renderGroup(D.parts.face) + renderGroup(D.parts.body);

    // 人体図のドットに色(S/L/X)を同期し、表の行と連動させる
    const allParts = D.parts.face.items.concat(D.parts.body.items);
    allParts.forEach((it) => {
      document.querySelectorAll(`.part-dot[data-part="${CSS.escape(it.name)}"]`)
        .forEach((dot) => dot.classList.add("size-" + it.size));
    });
    partsRoot.querySelectorAll(".menu-row[data-part]").forEach((row) => {
      const name = row.dataset.part;
      const dots = document.querySelectorAll(`.part-dot[data-part="${CSS.escape(name)}"]`);
      const on = () => dots.forEach((d) => d.classList.add("is-hit"));
      const off = () => dots.forEach((d) => d.classList.remove("is-hit"));
      row.addEventListener("mouseenter", on);
      row.addEventListener("mouseleave", off);
      row.addEventListener("touchstart", () => {
        document.querySelectorAll(".part-dot.is-hit").forEach((d) => d.classList.remove("is-hit"));
        on();
      }, { passive: true });
    });
  }

  const comboRoot = $("combo-cards");
  if (comboRoot && D.comboExamples) {
    comboRoot.innerHTML = D.comboExamples.map((c) => `
      <div class="combo-card${c.isSet ? " is-set" : ""} reveal">
        ${c.isSet ? '<span class="combo-badge">SET</span>' : ""}
        <h4>${esc(c.title)}</h4>
        <p class="combo-calc">${esc(c.calc)}</p>
        <p class="combo-total">${c.campaign ? '<span class="old-price"><span class="yen">&yen;</span>' + esc(c.total) + '</span><span class="yen">&yen;</span>' + esc(c.campaign) : '<span class="yen">&yen;</span>' + esc(c.total)}<small>円</small></p>
      </div>`).join("");
  }

  if ($("menu-note")) $("menu-note").textContent = D.pricingNote || "";

  /* ---------- お客様の声 ---------- */
  const voiceRoot = $("voice-cards");
  if (voiceRoot) {
    voiceRoot.innerHTML = D.voices.map((v) => `
      <article class="voice-card reveal">
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.text)}</p>
        <p class="meta">${esc(v.meta)}</p>
      </article>`).join("");
  }

  /* ---------- ビフォーアフター(写真が未設定でもプレースホルダー表示) ----------
     トップページ(#gallery-grid)は下記の選抜9枚をこの順番で表示。
     全21枚の一覧は before-after.html(#ba-grid)に表示。
     ★メイン掲載の枚数・順番を変えたい場合は、この HOME_BA_ORDER の
       ファイル名(IMG_xxxx)を並べ替える/増減するだけでOK。 */
  const HOME_BA_ORDER = [
    "IMG_2199", "IMG_2205", "IMG_2197", "IMG_2202", "IMG_2200",
    "IMG_2207", "IMG_2198", "IMG_2201", "IMG_2206",
  ];
  const galleryItemHTML = (g) => `
      <div class="gallery-item reveal">
        <a href="${esc(g.file)}" target="_blank" rel="noopener">
          <figure>
            <img class="ph" src="${esc(g.file)}" alt="${esc(g.caption)}" loading="lazy">
            <figcaption>${esc(g.caption)}</figcaption>
          </figure>
        </a>
      </div>`;
  const attachPhFallback = (root) => {
    root.querySelectorAll("img.ph").forEach((img) => {
      img.addEventListener("error", () => {
        const div = document.createElement("div");
        div.className = "ph";
        div.textContent = "PHOTO";
        img.replaceWith(div);
      });
    });
  };
  const baKey = (g) => (String(g.file).match(/IMG_\d+/) || [""])[0];

  // (1) トップページ: 選抜9枚を指定順で
  const galleryRoot = $("gallery-grid");
  if (galleryRoot) {
    const map = {};
    D.gallery.forEach((g) => { map[baKey(g)] = g; });
    let items = HOME_BA_ORDER.map((k) => map[k]).filter(Boolean);
    if (!items.length) items = D.gallery.slice(0, 9);
    galleryRoot.innerHTML = items.map(galleryItemHTML).join("");
    attachPhFallback(galleryRoot);

    // 「すべて見る」リンク(言語別)を各言語の一覧ページへ
    const lang = document.documentElement.lang || "ja";
    const isEn = lang.startsWith("en");
    const isZh = lang.startsWith("zh");
    const moreLabel = isEn
      ? "View all before / after →"
      : isZh
      ? "查看全部前後對比 →"
      : "すべてのビフォーアフターを見る →";
    const morePage = isEn
      ? "before-after-en.html"
      : isZh
      ? "before-after-zh.html"
      : "before-after.html";
    const more = document.createElement("a");
    more.className = "btn btn-ghost gallery-more";
    more.href = morePage;
    more.textContent = moreLabel;
    galleryRoot.insertAdjacentElement("afterend", more);
  }

  // (2) 一覧ページ(before-after.html): 全枚数
  const baRoot = $("ba-grid");
  if (baRoot) {
    baRoot.innerHTML = D.gallery.map(galleryItemHTML).join("");
    attachPhFallback(baRoot);
  }

  /* ---------- 初回限定クーポン(campaign.html の横スクロールカルーセル) ---------- */
  const campaignRoot = $("campaign-track");
  if (campaignRoot && D.campaignCoupons) {
    campaignRoot.innerHTML = D.campaignCoupons.map((c, i) => `
      <a class="coupon-card reveal" href="${esc(c.url)}" target="_blank" rel="noopener" style="transition-delay:${(i % 4) * 0.08}s">
        <span class="coupon-badge">${esc(c.badge)}</span>
        <img src="${esc(c.image)}" alt="${esc(c.title)}の初回クーポン" loading="lazy">
        <span class="coupon-info">
          <span class="coupon-title">${esc(c.title)}</span>
          <span class="coupon-price"><span class="yen">&yen;</span>${esc(c.price)}<small>(初回)</small></span>
        </span>
      </a>`).join("");
  }

  /* ---------- スタッフ ---------- */
  const staffRoot = $("staff-list");
  if (staffRoot) {
    staffRoot.innerHTML = D.staff.map((s) => `
      <article class="staff-card reveal">
        <img class="ph" src="${esc(s.photo)}" alt="${esc(s.name)}" loading="lazy">
        <div>
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.message)}</p>
        </div>
      </article>`).join("");
    staffRoot.querySelectorAll("img.ph").forEach((img) => {
      img.addEventListener("error", () => {
        const div = document.createElement("div");
        div.className = "ph";
        div.textContent = "STAFF";
        img.replaceWith(div);
      });
    });
  }

  /* ---------- ブログ(トップは最新3件) ---------- */
  const blogRoot = $("blog-list");
  if (blogRoot) {
    const isTop = !document.body.classList.contains("blog-page-body");
    const posts = isTop ? D.blog.slice(0, 3) : D.blog;
    blogRoot.innerHTML = posts.map((p, i) => `
      <a class="blog-item reveal" href="blog.html#post-${D.blog.indexOf(p)}">
        <time datetime="${esc(p.date)}">${esc(p.date).replace(/-/g, ".")}</time>
        <span class="cat">${esc(p.category)}</span>
        <h3>${esc(p.title)}</h3>
        <span class="arrow" aria-hidden="true">&rarr;</span>
      </a>`).join("");
  }

  /* ---------- ブログ記事(blog.html) ---------- */
  const articleRoot = $("article-list");
  if (articleRoot) {
    articleRoot.innerHTML = D.blog.map((p, i) => `
      <article class="article" id="post-${i}">
        <header>
          <time datetime="${esc(p.date)}">${esc(p.date).replace(/-/g, ".")}</time>
          <span class="cat">${esc(p.category)}</span>
          <h2>${esc(p.title)}</h2>
        </header>
        <div class="body">${p.body}</div>
      </article>`).join("");
  }

  /* ---------- Instagram埋め込み ---------- */
  const igRoot = $("instagram-grid");
  if (igRoot) {
    const posts = (D.instagramPosts || []).filter(Boolean);
    if (posts.length === 0) {
      igRoot.innerHTML = `<p class="instagram-empty">最新の投稿はInstagramでご覧ください。<br>(投稿の埋め込みは site-data.js の instagramPosts にURLを追加すると表示されます)</p>`;
    } else {
      igRoot.innerHTML = posts.map((url) => `
        <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}" data-instgrm-version="14" style="max-width:400px;width:100%;"></blockquote>`).join("");
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(s);
    }
  }

  /* ---------- FAQ ---------- */
  const faqRoot = $("faq-list");
  if (faqRoot) {
    faqRoot.innerHTML = D.faq.map((f) => `
      <details class="faq-item">
        <summary>${esc(f.q)}</summary>
        <p class="faq-answer">${esc(f.a)}</p>
      </details>`).join("");

    // FAQ構造化データ(FAQPage)を自動生成 → AI検索/リッチリザルト対策。
    // 画面のFAQと常に同じ内容になるようsite-data.jsから生成している。
    try {
      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: D.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      };
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(faqLd);
      document.head.appendChild(s);
    } catch (e) {}
  }

  /* ---------- 店舗情報 ---------- */
  const info = {
    "info-name": D.info.salonName,
    "info-address": D.info.address,
    "info-access": D.info.access,
    "info-hours": D.info.hours,
    "info-holiday": D.info.holiday,
    "footer-address": D.info.address,
  };
  Object.keys(info).forEach((id) => { if ($(id)) $(id).textContent = info[id]; });
  if ($("info-tel")) {
    $("info-tel").textContent = D.info.tel;
    $("info-tel").href = "tel:" + D.info.tel.replace(/-/g, "");
  }
  if ($("cta-hours-note")) $("cta-hours-note").textContent = "お電話受付:" + D.info.hours + " / " + D.info.holiday;
  if ($("copy-year")) $("copy-year").textContent = new Date().getFullYear();

  /* ---------- モバイルナビ ---------- */
  const toggle = $("nav-toggle");
  const nav = $("global-nav");
  if (toggle && nav) {
    const setNav = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    };
    toggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setNav(false))
    );
    // Escキーでも閉じる
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setNav(false);
    });
  }

  /* ---------- スクロールリビール ---------- */
  const sections = document.querySelectorAll(".section-title, .concept-title, .concept-body, .reason-card, .flow-steps li, .menu-group, .access-info, .access-map, .reveal");
  sections.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  sections.forEach((el) => io.observe(el));

  /* ---------- スクロール進捗バー & ヘッダー自動格納 ---------- */
  const progressFill = $("scroll-progress-fill");
  const header = $("site-header");
  let lastY = window.scrollY;
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (progressFill) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressFill.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      if (header) {
        const navOpen = nav && nav.classList.contains("is-open");
        if (!navOpen) {
          // 下スクロールで隠し、上スクロールですぐ出す
          if (y > lastY && y > 300) header.classList.add("is-hidden");
          else header.classList.remove("is-hidden");
        }
      }
      lastY = y;
      scrollTicking = false;
    });
  }, { passive: true });

  /* ---------- 3Dチルト(選ばれる理由カード) ---------- */
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (fine && !reduce) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
        card.style.boxShadow = "0 24px 48px rgba(0,0,0,0.35)";
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });
  }
})();
