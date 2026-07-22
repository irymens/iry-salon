/* ============================================================
   Iry -アイリー- アクセス解析タグ(GA4 + Meta Pixel)
   ============================================================
   このファイルを全ページの<head>で読み込むだけで、
   Googleアナリティクスとメタ(Facebook/Instagram)広告の計測が動きます。

   ■ IDを変更したいときは下の2行を書き換えてください
   ■ このファイル1つで全ページに反映されます
   ============================================================ */
(function () {
  "use strict";

  var GA4_ID = "G-ZNF5GK9ZN1";          /* ← Googleアナリティクス 測定ID */
  var META_PIXEL_ID = "5970032959777539"; /* ← Meta(Facebook/Instagram) ピクセルID */

  /* ---------- Googleアナリティクス(GA4) ---------- */
  var gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA4_ID);

  /* ---------- Meta(Facebook/Instagram)ピクセル ---------- */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  /* ---------- コンバージョン計測(予約・LINE・電話) ----------
     予約ボタン→Square遷移、LINE相談、電話タップを
     「見込みアクション」としてGA4とMetaの両方に記録します。
     これで「HP流入 → 予約クリック」のファネルが計測できます。 */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";

    if (href.indexOf("squareup.com") >= 0) {
      gtag("event", "reservation_click", { event_category: "conversion", event_label: "square_booking" });
      window.fbq("track", "Lead", { content_name: "Square予約ページ遷移" });
    } else if (href.indexOf("lin.ee") >= 0 || href.indexOf("line.me") >= 0) {
      gtag("event", "line_click", { event_category: "conversion", event_label: "line" });
      window.fbq("track", "Contact", { content_name: "LINE相談" });
    } else if (href.indexOf("tel:") === 0) {
      gtag("event", "tel_click", { event_category: "conversion", event_label: "phone" });
      window.fbq("track", "Contact", { content_name: "電話" });
    } else if (href.indexOf("instagram.com") >= 0) {
      gtag("event", "instagram_click", { event_category: "social", event_label: "instagram" });
    }
  }, true);

  /* ---------- スクロール到達計測(どこまで読まれたか) ----------
     ページの25/50/75/100%到達を記録。離脱ポイントの把握に使えます。 */
  var marks = { 25: false, 50: false, 75: false, 100: false };
  var onScroll = function () {
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    [25, 50, 75, 100].forEach(function (m) {
      if (!marks[m] && scrolled >= m) {
        marks[m] = true;
        gtag("event", "scroll_depth", { event_category: "engagement", event_label: m + "%", value: m });
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
})();
