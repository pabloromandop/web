(function () {
  var projects = window.PROJECTS || [];
  var site = window.SITE || {};
  var grid = document.querySelector(".grid");
  var filters = document.querySelector(".filters");
  var order = ["Commercial", "Fashion", "Narrative", "Music"];
  var current = "All";

  // Datos de contacto desde projects.js
  document.querySelectorAll("[data-site]").forEach(function (a) {
    var k = a.getAttribute("data-site");
    if (k === "email" && site.email) { a.href = "mailto:" + site.email; a.textContent = site.email; }
    else if (site[k]) { a.href = site[k]; }
  });
  document.querySelectorAll(".year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function caption(p) {
    var t = p.title;
    if (p.artist) t += " — " + p.artist;
    if (p.director) t += " — Dir. " + p.director;
    return t;
  }

  function renderFilters() {
    var cats = ["All"].concat(order.filter(function (c) {
      return projects.some(function (p) { return p.category === c; });
    }));
    filters.innerHTML = cats.map(function (c) {
      return '<button type="button" aria-pressed="' + (c === current) + '" data-cat="' + c + '">' + c + "</button>";
    }).join("");
  }

  function renderGrid() {
    var list = current === "All" ? projects : projects.filter(function (p) { return p.category === current; });
    grid.innerHTML = list.map(function (p) {
      var src = "img/" + p.slug + "/" + p.cover + ".jpg";
      return (
        '<a class="card" href="project.html?p=' + p.slug + '">' +
          '<div class="still">' +
            '<img class="base" src="' + src + '" alt="' + esc(p.title) + '" loading="lazy">' +
            '<img class="lens" src="' + src + '" alt="" aria-hidden="true" loading="lazy">' +
            '<div class="cap"><span>' + esc(caption(p)) + "</span></div>" +
          "</div>" +
        "</a>"
      );
    }).join("");
    focusOnScroll();
  }

  filters.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    current = b.getAttribute("data-cat");
    renderFilters();
    renderGrid();
  });

  // Ordenador: el círculo nítido sigue al cursor
  grid.addEventListener("mousemove", function (e) {
    var still = e.target.closest(".still");
    if (!still) return;
    // Se mide sobre la imagen ya ampliada para que el círculo
    // siga exactamente al cursor también durante el zoom.
    var img = still.querySelector(".lens") || still;
    var r = img.getBoundingClientRect();
    var w = img.offsetWidth || r.width, h = img.offsetHeight || r.height;
    still.style.setProperty("--mx", ((e.clientX - r.left) * w / r.width) + "px");
    still.style.setProperty("--my", ((e.clientY - r.top) * h / r.height) + "px");
  });

  // Móvil: la imagen que cruza el centro de la pantalla queda nítida;
  // las demás se desenfocan según se alejan.
  var touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
  var raf = null;
  function focusOnScroll() {
    if (!touch || raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      var h = window.innerHeight || 800;
      var c = h / 2;
      // Al llegar al final de la página la última imagen no puede subir
      // hasta el centro: el punto de enfoque baja para ir a buscarla.
      var cards = grid.querySelectorAll(".card");
      var last = cards[cards.length - 1];
      if (last) {
        var doc = document.documentElement;
        var remaining = Math.max(0, doc.scrollHeight - h - window.scrollY);
        var lr = last.getBoundingClientRect();
        var lastEnd = lr.top + lr.height / 2 + remaining; // su centro al final del scroll
        var deficit = lastEnd - h / 2;
        if (deficit > 0 && remaining < deficit) c = lastEnd - remaining;
      }
      cards.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var d = Math.max(0, r.top - c, c - r.bottom) / c;
        var t = Math.min(1, d / 0.45);
        el.style.setProperty("--b", (t * 4).toFixed(2) + "px");
        // Título visible solo en la imagen que está en el centro
        el.style.setProperty("--o", Math.max(0, 1 - t * 4).toFixed(2));
      });
    });
  }
  if (touch) {
    window.addEventListener("scroll", focusOnScroll, { passive: true });
    window.addEventListener("resize", focusOnScroll);
  }

  renderFilters();
  renderGrid();
})();
