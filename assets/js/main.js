const S = Object.assign({ name: "Ardiansah", welcome: "", musicSubtitle: "", songs: [], role: "", headline: "", intro: "", photo: "", email: "", links: {}, about: [], education: [], leadership: [], projects: [], gallery: [] }, window.SITE || {});
const $ = (s, r = document) => r.querySelector(s) || document.createElement("div"), // missing element -> harmless dummy, so removing HTML blocks never breaks the script
 esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
set("#name", S.name); set("#welcome", S.welcome); set("#role", S.role); set("#headline", S.headline); set("#intro", S.intro);
// no intro text in content.js -> hide the empty text block and centre the photo gallery
if (![S.welcome, S.role, S.headline, S.intro, S.links.linkedin, S.links.github].some(Boolean)) { $("#hero-text").hidden = true; $("#home").classList.add("solo"); }
set("#footname", S.name); set("#year", new Date().getFullYear());
if (S.email && !/^TODO/i.test(S.email)) $("#mail").innerHTML = `· <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`;
$("#social").innerHTML = [["LinkedIn", S.links.linkedin], ["GitHub", S.links.github]].filter(x => x[1]).map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join("");
$("#about-text").innerHTML = S.about.map(p => `<p>${esc(p)}</p>`).join("");
$("#education-list").innerHTML = S.education.map(x => `<div class="row"><b>${esc(x.title)}</b><span>${esc(x.org)}${x.date ? " · " + esc(x.date) : ""}</span>${x.text ? `<p>${esc(x.text)}</p>` : ""}</div>`).join("");
// ---- Leadership: timeline cards (roles grouped by organisation, same names/order as LinkedIn) ----
const IC = {
  cal: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>`
};
const roleHTML = (r, h) => {
  const sk = r.skills || (r.skill ? [r.skill] : []);
  return `<${h}>${esc(r.title)}</${h}>${r.org ? `<div class="org">${esc(r.org)}</div>` : ""}<div class="lm">${r.type ? `<span class="tag">${esc(r.type)}</span>` : ""}${r.date ? `<span class="ic">${IC.cal}${esc(r.date)}${r.duration ? " · " + esc(r.duration) : ""}</span>` : ""}${r.location ? `<span class="ic">${IC.pin}${esc(r.location)}</span>` : ""}</div>${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}${sk.length ? `<div class="skills">${sk.map(s => `<span class="pill">${esc(s)}</span>`).join("")}</div>` : ""}`;
};
$("#leadership-list").innerHTML = S.leadership.map((x, i) => {
  const roles = x.roles || [x];
  const body = roles.length > 1
    ? `<div class="lh"><h3>${esc(x.org)}</h3>${x.span ? `<span class="tag alt">${esc(x.span)}</span>` : ""}</div><div class="roles">${roles.map(r => `<div class="role">${roleHTML(r, "h4")}</div>`).join("")}</div>`
    : roleHTML({ ...roles[0], org: x.org || roles[0].org }, "h3");
  const hex = c => /^#[0-9a-f]{3,8}$/i.test(c || "") ? c : "", bc = hex(x.color), bcd = hex(x.colorDark) || bc;
  return `<article class="lead rv" style="${bc ? `--bc:${bc};--bcd:${bcd};` : ""}--d:${i * 70}ms"><div class="lb">${body}</div></article>`;
}).join("");
// ---- Projects: same timeline cards as Leadership (no icons) ----
$("#project-list").innerHTML = S.projects.map((p, i) => {
  const sub = [p.type, (p.tech || []).join(", ")].filter(Boolean).join(" · ");
  return `<article class="lead rv" style="--d:${i * 70}ms"><div class="lb"><h3>${esc(p.title)}</h3>${sub ? `<div class="lm">${esc(sub)}</div>` : ""}${p.text ? `<div class="note">${esc(p.text)}</div>` : ""}${p.link ? `<a class="plink" href="${esc(p.link)}" target="_blank" rel="noopener">Repository →</a>` : ""}</div></article>`;
}).join("");
// ---- Fade-up when cards scroll into view ----
(() => {
  const els = [...document.querySelectorAll(".rv")];
  const calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || calm) { els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  els.forEach(el => io.observe(el));
})();
// ---- Music list (vinyl icon + title + artist) ----
const VINYL = `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="1.5" y="1.5" width="61" height="61" rx="9" fill="#e6bd85" stroke="#c28f55" stroke-width="1.5"/><path d="M6 8h34M9 15h22M5 53h28M10 59h30M46 22h12M47 31h11M48 44h10" fill="none" stroke="#c28f55" stroke-opacity=".55" stroke-width=".9" stroke-linecap="round"/><g class="disc"><circle cx="28" cy="34" r="24" fill="#1c1f26"/><circle cx="28" cy="34" r="21" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width=".8"/><circle cx="28" cy="34" r="17" fill="none" stroke="#fff" stroke-opacity=".11" stroke-width=".8"/><circle cx="28" cy="34" r="13" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width=".8"/><circle cx="28" cy="34" r="8.5" fill="#f6a623"/><circle cx="28" cy="28.6" r="1.2" fill="#fff" fill-opacity=".85"/><circle cx="28" cy="34" r="1.8" fill="#e9edf2"/></g><path d="M11.5 24.5A19 19 0 0 1 21.5 16.1" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round"/><g class="arm"><line x1="55" y1="10" x2="50" y2="41" stroke="#d5d9de" stroke-width="2" stroke-linecap="round"/><path d="M47.3 40 53.7 41.2 52.6 47.4 46.2 46.2Z" fill="#2a2d33"/><circle cx="49.4" cy="47.6" r="1.3" fill="#d64040"/></g><circle cx="55" cy="10" r="4.6" fill="#2a2d33"/><circle cx="55" cy="10" r="1.7" fill="#8b9199"/><circle cx="54.5" cy="56.5" r="2.7" fill="#2a2d33"/></svg>`;
set("#music-sub", S.musicSubtitle);
const tm = d => { const x = new Date(d).getTime(); return isNaN(x) ? Infinity : x; };
const SONGS = S.songs.slice().sort((a, b) => (tm(a.date) > tm(b.date)) - (tm(a.date) < tm(b.date))); // oldest first; songs without a date go last
$("#song-list").innerHTML = SONGS.map(s => `<div class="song"><div class="vinyl">${VINYL}</div><div class="meta"><b>${esc(s.title)}</b><small>by ${esc(s.artist)}</small></div></div>`).join("");
if (!S.songs.length) $("#music").style.display = "none";
// ---- Movies list (poster + title + release date, oldest first) ----
set("#movie-sub", S.movieSubtitle || "");
const MOVIES = (S.movies || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
const fmtDate = d => { const t = new Date(d); return isNaN(t) ? "" : t.toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" }); };
$("#movie-list").innerHTML = MOVIES.map(m => `<div class="movie"><div class="poster"><img src="${esc(m.poster)}" alt="Poster of ${esc(m.title)}" loading="lazy" draggable="false"></div><div class="meta"><b>${esc(m.title)}</b>${fmtDate(m.date) ? `<small>Released ${fmtDate(m.date)}</small>` : ""}</div></div>`).join("");
if (!MOVIES.length) $("#movies").style.display = "none";
// ---- Instagram-style gallery ----
const G = S.gallery, track = $("#track"), dots = $("#dots"); let cur = 0;
if (!G.length) $("#gallery").style.display = "none";
track.innerHTML = G.map(g => `<figure><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy" draggable="false"></figure>`).join("");
track.querySelectorAll("img").forEach(i => i.onerror = () => i.remove());
dots.innerHTML = G.map((_, i) => `<i data-i="${i}"></i>`).join("");
const go = i => track.scrollTo({ left: Math.max(0, Math.min(G.length - 1, i)) * track.clientWidth, behavior: "smooth" });
function show(i) {
  cur = i;
  if (!G[i]) return;

  $("#cap").textContent = "";
  $("#count").textContent = `${i + 1}/${G.length}`;

  dots.querySelectorAll("i").forEach((d, k) => {
    d.classList.toggle("on", k === i);
  });
}
track.addEventListener("scroll", () => { const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, { passive: true });
$(".prev").onclick = () => go(cur - 1); $(".next").onclick = () => go(cur + 1); dots.onclick = e => e.target.dataset.i && go(+e.target.dataset.i);
$("#gallery").tabIndex = 0; $("#gallery").addEventListener("keydown", e => { if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
let sx = 0, sl = 0, drag = false;
track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; drag = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add("drag"); });
addEventListener("pointermove", e => { if (drag) track.scrollLeft = sl - (e.clientX - sx); });
addEventListener("pointerup", () => { if (!drag) return; drag = false; track.classList.remove("drag"); go(Math.round(track.scrollLeft / track.clientWidth)); });
show(0);
$("#menu").onclick = () => $("nav").classList.toggle("open"); document.querySelectorAll("nav a").forEach(a => a.onclick = () => $("nav").classList.remove("open"));
// ---- Light / dark mode: button next to the logo, remembers the choice, first visit follows the device setting ----
(() => {
  const root = document.documentElement, btn = $("#theme"), meta = document.querySelector('meta[name="theme-color"]');
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  const saved = () => { try { const t = localStorage.getItem("theme"); return t === "dark" || t === "light" ? t : null; } catch (e) { return null; } };
  const apply = t => {
    root.dataset.theme = t;
    btn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    btn.setAttribute("aria-pressed", String(t === "dark"));
    if (meta) meta.setAttribute("content", t === "dark" ? "#050d1a" : "#2f80ed");
    window.dispatchEvent(new Event("themechange"));
  };
  apply(root.dataset.theme === "dark" || root.dataset.theme === "light" ? root.dataset.theme : (saved() || (mq && mq.matches ? "dark" : "light")));
  btn.onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; try { localStorage.setItem("theme", t); } catch (e) {} apply(t); };
  if (mq && mq.addEventListener) mq.addEventListener("change", e => { if (!saved()) apply(e.matches ? "dark" : "light"); });
})();
// ---- Four-season backdrop for the WHOLE page (fixed layer; the season follows your scroll: spring -> summer -> autumn -> winter) ----
// Light mode = the four American seasons. Dark mode = the four Korean seasons, K-drama style (moon, bokeh, monsoon, first snow).
(() => {
  if (document.getElementById("seasons")) return;
  const root = document.documentElement, rd = Math.random, rnd = (a, b) => a + rd() * (b - a), pick = a => a[(rd() * a.length) | 0];
  const calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const box = document.createElement("div"); box.id = "seasons"; box.setAttribute("aria-hidden", "true");
  box.innerHTML = '<div class="sb s0"></div><div class="sb s1"></div><div class="sb s2"></div><div class="sb s3"></div><canvas></canvas><i class="cine"></i>';
  document.body.prepend(box);
  const cap = document.createElement("div"); cap.id = "season-cap"; cap.setAttribute("aria-hidden", "true"); document.body.append(cap);
  const layers = [...box.querySelectorAll(".sb")], cv = box.querySelector("canvas"), ctx = cv.getContext && cv.getContext("2d");
  const th = () => root.dataset.theme === "dark" ? "dark" : "light";
  const NAMES = {
    light: [["Spring", "Washington, D.C."], ["Summer", "Cape Cod"], ["Autumn", "New England"], ["Winter", "New York"]],
    dark: [["Spring", "Yeouido, Seoul"], ["Summer", "Seoul in the monsoon"], ["Autumn", "Nami Island"], ["Winter", "Seoul, first snow"]]
  };
  // [kind, spawn rate per second at full strength, colours] for each season
  const T = {
    light: [[["petal", 9, ["#ffc2d6", "#ffe0ea", "#ffffff", "#ffadc7"]]], [["mote", 6, ["#ffd25e", "#fff0a0", "#ffffff"]]], [["leaf", 8, ["#d4501c", "#ee8a22", "#bf2f1e", "#e5b020"]]], [["snow", 17, ["#ffffff"]]]],
    dark: [[["petal", 11, ["#ffb5d0", "#ffd5e5", "#ff9bbd"]], ["bokeh", .8, ["#ffb0d4", "#c9a0ff"]]], [["rain", 80, ["#a9cdf2"]], ["fly", 1.6, ["#b8ff8c"]]], [["leaf", 6, ["#ff6a3d", "#e53a2c"]], ["ginkgo", 6, ["#ffd23f", "#ffbd2e"]]], [["snow", 24, ["#ffffff", "#dbe9ff"]], ["bokeh", .9, ["#ffd89a", "#ffb36b", "#9ec5ff"]]]]
  };
  let W = 0, H = 0, pos = 0, cur = -1, parts = [], acc = {}, flash = 0, nextBolt = 6, last = 0, raf = 0;
  const label = () => { const n = NAMES[th()][Math.max(0, cur)]; cap.classList.remove("on"); setTimeout(() => { cap.innerHTML = `<b>${n[0]}</b><span>${n[1]}</span>`; cap.classList.add("on"); }, 250); };
  function scroll() {
    const h = document.documentElement.scrollHeight - innerHeight;
    pos = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) * 3 : 0;
    layers.forEach((l, i) => { l.style.opacity = i ? Math.min(1, Math.max(0, pos - (i - 1))) : 1; });
    const k = Math.min(3, Math.round(pos)); if (k !== cur) { cur = k; label(); }
  }
  function fit() {
    W = innerWidth; H = innerHeight; if (!ctx) return;
    const d = Math.min(devicePixelRatio || 1, 1.5); cv.width = Math.round(W * d); cv.height = Math.round(H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function make(k, c) {
    const p = { k, c, x: rnd(-40, W + 40), y: -24, vx: rnd(8, 35), vy: rnd(35, 75), s: rnd(5, 9), r: rnd(0, 6.3), vr: rnd(-1.6, 1.6), ph: rnd(0, 6.3), sw: rnd(10, 30), t: 0, life: 0 };
    if (k === "leaf" || k === "ginkgo") { p.s = rnd(9, 15); p.vy = rnd(40, 80); p.sw = rnd(25, 55); }
    if (k === "snow") { p.s = rnd(1.4, 3.8); p.vy = 22 + p.s * 14; p.vx = rnd(-10, 10); p.sw = rnd(8, 22); }
    if (k === "rain") { p.x = rnd(0, W + 260); p.vy = rnd(720, 1000); p.vx = -170; p.s = rnd(14, 26); p.sw = 0; }
    if (k === "mote") { p.y = H + 10; p.vy = -rnd(12, 30); p.vx = rnd(-8, 8); p.s = rnd(1.5, 4); p.life = rnd(7, 12); }
    if (k === "fly") { p.y = rnd(H * .4, H); p.vy = rnd(-14, 14); p.vx = rnd(-14, 14); p.s = rnd(1.5, 2.6); p.life = rnd(6, 10); }
    if (k === "bokeh") { p.y = rnd(H * .1, H); p.x = rnd(0, W); p.vy = rnd(-6, 6); p.vx = rnd(-6, 6); p.s = rnd(20, 62); p.life = rnd(7, 12); }
    return p;
  }
  function step(dt) {
    const mode = th(), sc = W < 700 ? .6 : 1;
    for (let i = 0; i < 4; i++) {
      const w = Math.max(0, 1 - Math.abs(pos - i)); if (w < .03) continue;
      T[mode][i].forEach(([k, rate, cols]) => { const key = i + k; acc[key] = (acc[key] || 0) + rate * w * sc * dt; while (acc[key] >= 1 && parts.length < 230) { acc[key]--; parts.push(make(k, pick(cols))); } });
    }
    if (mode === "dark" && pos > .6 && pos < 1.5) { nextBolt -= dt; if (nextBolt <= 0) { flash = .3; nextBolt = rnd(6, 12); } }
    flash *= Math.pow(.02, dt);
    parts = parts.filter(p => {
      p.t += dt; p.r += p.vr * dt;
      p.x += (p.vx + Math.sin(p.t * 1.3 + p.ph) * p.sw) * dt; p.y += p.vy * dt;
      return p.life ? p.t < p.life : (p.y < H + 30 && p.x > -80 && p.x < W + 80);
    });
  }
  function paint(p, light) {
    const a = p.life ? Math.sin(Math.PI * p.t / p.life) : 1, fl = .5 + .5 * Math.abs(Math.cos(p.t * (p.k === "petal" ? 2 : 1.6) + p.ph));
    ctx.save(); ctx.translate(p.x, p.y); ctx.fillStyle = p.c;
    if (p.k === "petal") { ctx.rotate(p.r); ctx.scale(1, .45 + .55 * fl); ctx.globalAlpha = .9; ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, 6.283); ctx.fill(); }
    else if (p.k === "leaf") { ctx.rotate(p.r); ctx.scale(1, fl); ctx.globalAlpha = .92; ctx.beginPath(); for (let i = 0; i < 10; i++) { const g = i * Math.PI / 5 - Math.PI / 2, r = p.s * (i % 2 ? .45 : 1); ctx[i ? "lineTo" : "moveTo"](Math.cos(g) * r, Math.sin(g) * r); } ctx.closePath(); ctx.fill(); }
    else if (p.k === "ginkgo") { ctx.rotate(p.r); ctx.scale(1, fl); ctx.globalAlpha = .92; ctx.beginPath(); ctx.moveTo(0, p.s * .5); ctx.arc(0, p.s * .5, p.s * 1.1, -2.4, -.74); ctx.closePath(); ctx.fill(); }
    else if (p.k === "snow") { ctx.shadowColor = light ? "rgba(90,140,210,.6)" : "rgba(255,255,255,.8)"; ctx.shadowBlur = 5; ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(0, 0, p.s, 0, 6.283); ctx.fill(); }
    else if (p.k === "rain") { ctx.strokeStyle = p.c; ctx.globalAlpha = .32; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p.vx * p.s / p.vy, p.s); ctx.stroke(); }
    else if (p.k === "bokeh") { ctx.globalAlpha = a * .2; ctx.beginPath(); ctx.arc(0, 0, p.s, 0, 6.283); ctx.fill(); ctx.globalAlpha = a * .32; ctx.strokeStyle = p.c; ctx.lineWidth = 1.2; ctx.stroke(); }
    else { const tw = .6 + .4 * Math.sin(p.t * 4 + p.ph); ctx.globalAlpha = a * .18 * tw; ctx.beginPath(); ctx.arc(0, 0, p.s * 3.4, 0, 6.283); ctx.fill(); ctx.globalAlpha = a * .95 * tw; ctx.beginPath(); ctx.arc(0, 0, p.s, 0, 6.283); ctx.fill(); }
    ctx.restore();
  }
  function frame(t) {
    raf = 0; const dt = Math.min(.05, (t - (last || t)) / 1000); last = t;
    step(dt); ctx.clearRect(0, 0, W, H); const light = th() === "light";
    parts.forEach(p => paint(p, light));
    if (flash > .01) { ctx.fillStyle = `rgba(205,222,255,${flash})`; ctx.fillRect(0, 0, W, H); }
    play();
  }
  function play() { if (!raf && ctx && !document.hidden && !calm) raf = requestAnimationFrame(frame); }
  fit(); scroll(); play();
  addEventListener("scroll", scroll, { passive: true });
  addEventListener("resize", () => { fit(); scroll(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; last = 0; } else play(); });
  addEventListener("themechange", () => { parts = []; acc = {}; label(); });
  if (window.ResizeObserver) new ResizeObserver(scroll).observe(document.body);
})();

