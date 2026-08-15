/* TRIDEV CORE HQ — Main JS final + perf
   Language, theme, search, active nav, lazy PDF, PWA
*/
(function () {
  var html = document.documentElement;
  var btns = document.querySelectorAll(".langbar button");
  var placeholders = {
    ne: "खोज्नुहोस्... गीता, शिव, वेद",
    hi: "खोजें... गीता, शिव, वेद",
    sa: "अन्वेषणम्... गीता शिव वेद",
    en: "Search... Gita, Shiva, Veda"
  };

  function setLang(l) {
    html.setAttribute("lang", l);
    btns.forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-set") === l);
    });
    var q = document.getElementById("q");
    if (q && placeholders[l]) q.placeholder = placeholders[l];
    try { localStorage.setItem("tridev-lang", l); } catch (e) {}
  }

  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.getAttribute("data-set"));
    });
  });

  var saved = null;
  try { saved = localStorage.getItem("tridev-lang"); } catch (e) {}
  if (saved && ["ne", "hi", "sa", "en"].indexOf(saved) >= 0) setLang(saved);
  else setLang("ne");

  var themeBtn = document.getElementById("themeBtn");
  function setTheme(t) {
    html.setAttribute("data-theme", t);
    if (themeBtn) themeBtn.textContent = t === "dark" ? "🌙" : "☀️";
    try { localStorage.setItem("tridev-theme", t); } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === "dark" ? "#0a0a0a" : "#f7f0e4";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
  var ts = null;
  try { ts = localStorage.getItem("tridev-theme"); } catch (e) {}
  setTheme(ts === "light" ? "light" : "dark");

  var q = document.getElementById("q");
  var secs = document.querySelectorAll(".sec[data-keys]");
  if (q) {
    q.addEventListener("input", function () {
      var v = (q.value || "").toLowerCase().trim();
      secs.forEach(function (s) {
        var keys = (s.getAttribute("data-keys") || "") + " " + (s.textContent || "");
        s.classList.toggle("hidden", v && keys.toLowerCase().indexOf(v) < 0);
      });
    });
  }

  var navLinks = document.querySelectorAll(".bn a");
  var sections = [];
  navLinks.forEach(function (a) {
    var id = (a.getAttribute("href") || "").replace("#", "");
    var el = id ? document.getElementById(id) : null;
    if (el) sections.push({ id: id, el: el, a: a });
  });
  function updateNav() {
    var y = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= y) current = sections[i];
    }
    navLinks.forEach(function (a) { a.classList.remove("active"); });
    if (current) current.a.classList.add("active");
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // Lazy-load PDF only when near viewport (saves 12MB on first paint)
  var pdfFrame = document.querySelector(".pdf-box iframe[data-src]");
  if (pdfFrame && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          pdfFrame.src = pdfFrame.getAttribute("data-src");
          pdfFrame.removeAttribute("data-src");
          io.disconnect();
        }
      });
    }, { rootMargin: "200px" });
    io.observe(pdfFrame);
  } else if (pdfFrame) {
    pdfFrame.src = pdfFrame.getAttribute("data-src") || pdfFrame.src;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(function () {});
  }
})();
