/* TRIDEV CORE HQ — Main JavaScript
   Language switcher, theme toggle, search, PWA
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
    try {
      localStorage.setItem("tridev-lang", l);
    } catch (e) {}
  }

  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.getAttribute("data-set"));
    });
  });

  var saved = null;
  try {
    saved = localStorage.getItem("tridev-lang");
  } catch (e) {}
  if (saved && ["ne", "hi", "sa", "en"].indexOf(saved) >= 0) setLang(saved);
  else setLang("ne");

  // Theme
  var themeBtn = document.getElementById("themeBtn");
  function setTheme(t) {
    html.setAttribute("data-theme", t);
    if (themeBtn) themeBtn.textContent = t === "dark" ? "🌙" : "☀️";
    try {
      localStorage.setItem("tridev-theme", t);
    } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === "dark" ? "#0a0a0a" : "#f7f0e4";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
  var ts = null;
  try {
    ts = localStorage.getItem("tridev-theme");
  } catch (e) {}
  setTheme(ts === "light" ? "light" : "dark");

  // Search
  var q = document.getElementById("q");
  var secs = document.querySelectorAll(".sec[data-keys]");
  if (q) {
    q.addEventListener("input", function () {
      var v = (q.value || "").toLowerCase().trim();
      secs.forEach(function (s) {
        var keys =
          (s.getAttribute("data-keys") || "") + " " + (s.textContent || "");
        s.classList.toggle("hidden", v && keys.toLowerCase().indexOf(v) < 0);
      });
    });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(function () {});
  }
})();
