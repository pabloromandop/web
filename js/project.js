(function () {
  var projects = window.PROJECTS || [];
  var site = window.SITE || {};
  var main = document.getElementById("project");

  document.querySelectorAll("[data-site]").forEach(function (a) {
    var k = a.getAttribute("data-site");
    if (site[k]) a.href = site[k];
  });
  document.querySelectorAll(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var slug = new URLSearchParams(location.search).get("p");
  var i = projects.findIndex(function (p) { return p.slug === slug; });
  if (i < 0) { location.replace("index.html"); return; }

  var p = projects[i];
  var prev = projects[(i - 1 + projects.length) % projects.length];
  var next = projects[(i + 1) % projects.length];
  var dir = "img/" + p.slug + "/";
  var url = function (q) { return "project.html?p=" + q.slug; };

  document.title = p.title + " — " + (site.name || "Pablo Román Baro");

  var sub = p.subtitle || [p.artist, p.director ? "Directed by " + p.director : ""].filter(Boolean).join(" — ");
  var arrowL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M10 3L5 8l5 5"></path></svg>';
  var arrowR = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M6 3l5 5-5 5"></path></svg>';

  main.innerHTML =
    '<div class="project-head">' +
      '<span class="label">' + esc(p.category) + "</span>" +
      "<h1>" + esc(p.title) + "</h1>" +
      (sub ? '<span class="sub">' + esc(sub) + "</span>" : "") +
    "</div>" +

    '<div class="player">' +
      '<button class="poster" type="button" aria-label="Play ' + esc(p.title) + '">' +
        '<img src="' + dir + p.hero + '.jpg" alt=""' + (p.heroPosition ? ' style="object-position: ' + p.heroPosition + '"' : '') + '>' +
        '<span class="play"><svg width="52" height="52" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="28" cy="28" r="27"></circle><path d="M23 19l14 9-14 9z"></path></svg></span>' +
      "</button>" +
      '<a class="arrow prev" href="' + url(prev) + '" aria-label="Previous project: ' + esc(prev.title) + '">' + arrowL + "</a>" +
      '<a class="arrow next" href="' + url(next) + '" aria-label="Next project: ' + esc(next.title) + '">' + arrowR + "</a>" +
    "</div>" +

    '<dl class="credits">' +
      p.credits.map(function (c) { return "<dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd>"; }).join("") +
    "</dl>" +

    '<section class="stills" aria-label="Stills">' +
      p.stills.map(function (s) {
        return '<div style="aspect-ratio: ' + p.ratio + '"><img src="' + dir + s + '.jpg" alt="' + esc(p.title) + ', still" loading="lazy"></div>';
      }).join("") +
    "</section>" +

    '<nav class="pager" aria-label="Projects">' +
      '<a href="' + url(prev) + '">← Previous project</a>' +
      '<a href="' + url(next) + '">Next project →</a>' +
    "</nav>";

  // Al pulsar, el vídeo de Vimeo se reproduce dentro de la página
  main.querySelector(".poster").addEventListener("click", function () {
    var f = document.createElement("iframe");
    f.src = "https://player.vimeo.com/video/" + p.vimeo + "?autoplay=1&title=0&byline=0&portrait=0&dnt=1";
    f.allow = "autoplay; fullscreen; picture-in-picture";
    f.allowFullscreen = true;
    f.title = p.title;
    this.replaceWith(f);
  });

  // Móvil: deslizar a izquierda / derecha para cambiar de proyecto
  var sx = 0, sy = 0, st = 0, tracking = false;
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (!tracking) return;
    tracking = false;
    var t = e.changedTouches[0];
    var dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5 || Date.now() - st > 800) return;
    var goNext = dx < 0;
    main.classList.add(goNext ? "leave-left" : "leave-right");
    setTimeout(function () { location.href = url(goNext ? next : prev); }, 220);
  }, { passive: true });
  window.addEventListener("pageshow", function () { main.classList.remove("leave-left", "leave-right"); });

  // Flechas del teclado para cambiar de proyecto
  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.key === "ArrowLeft") location.href = url(prev);
    if (e.key === "ArrowRight") location.href = url(next);
  });
})();
