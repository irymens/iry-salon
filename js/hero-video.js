/* ============================================================
   ヒーロー動画: 照射のようすを実写でループ再生
   動画を差し替える場合は media/hero にファイルを入れて、
   下の HERO_VIDEO のファイル名を書き換えてください。
   ============================================================ */
(function () {
  const HERO_VIDEO = "media/hero/IMG_3600_compressed.mp4";

  const v = document.querySelector(".hero-video");
  if (!v) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  v.src = HERO_VIDEO;
  v.loop = true;

  // 動画は最初のフレームが描けるまでブラウザ標準で黒く表示されるため、
  // 実際にフレームが用意できてから(loadeddata)フェード表示する
  v.addEventListener("loadeddata", () => v.classList.add("is-visible"), { once: true });

  if (!reduceMotion) {
    const p = v.play();
    if (p) p.catch(() => {});
  } else {
    // 省モーション時は再生せず、先頭コマだけを静止画として表示
    v.addEventListener("loadedmetadata", () => { v.currentTime = 0.03; }, { once: true });
  }

  // 画面外に出たら一時停止(通信量・バッテリー配慮)
  const io = new IntersectionObserver(([entry]) => {
    if (reduceMotion) return;
    if (entry.isIntersecting) { const p = v.play(); if (p) p.catch(() => {}); }
    else v.pause();
  });
  io.observe(v);
})();
