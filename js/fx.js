/* ============================================================
   Iry -アイリー- マイクロインタラクション(このファイルは編集不要です)
   ・ページローダー(Logo Reveal)
   ・ボタン押下リップル
   ・カードのスポットライトホバー
   ・カーソル追従グロー(PCのみ)
   すべて prefers-reduced-motion を尊重し、transform / opacity のみで
   アニメーションします(GPUアクセラレーション)。
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* ---------- ページローダー ---------- */
  var loader = document.getElementById("page-loader");
  if (loader) {
    var hidden = false;
    var hide = function () {
      if (hidden) return;
      hidden = true;
      loader.classList.add("is-done");
      setTimeout(function () { if (loader.parentNode) loader.remove(); }, 800);
    };
    if (reduce) {
      hide();
    } else {
      window.addEventListener("load", function () { setTimeout(hide, 500); });
      setTimeout(hide, 2600); /* 読み込みが遅くても必ず開く */
    }
  }

  /* ---------- ボタン押下リップル ---------- */
  if (!reduce) {
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest ? e.target.closest(".btn") : null;
      if (!btn) return;
      var rect = btn.getBoundingClientRect();
      var d = Math.max(rect.width, rect.height) * 2;
      var s = document.createElement("span");
      s.className = "ripple";
      s.style.width = s.style.height = d + "px";
      s.style.left = (e.clientX - rect.left - d / 2) + "px";
      s.style.top = (e.clientY - rect.top - d / 2) + "px";
      btn.appendChild(s);
      setTimeout(function () { if (s.parentNode) s.remove(); }, 700);
    }, { passive: true });
  }

  /* ---------- スポットライトホバー(ガラスカード) ---------- */
  if (fine && !reduce) {
    var SPOT = ".reason-card, .voice-card, .combo-card, .flow-steps li, .value-set, .staff-card, .trust-strip li";
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest ? e.target.closest(SPOT) : null;
      if (!card) return;
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--sx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--sy", (e.clientY - rect.top) + "px");
    }, { passive: true });
  }

  /* ---------- カーソル追従グロー(PCのみ・慣性つき) ---------- */
  if (fine && !reduce) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    var tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    var x = tx, y = ty, running = false;

    var step = function () {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      glow.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
  }
})();
