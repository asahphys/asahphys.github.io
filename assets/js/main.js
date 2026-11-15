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
const mk = x => x.mark || String(x.org || x.title || "").replace(/\(.*?\)/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const roleHTML = (r, h) => {
  const sk = r.skills || (r.skill ? [r.skill] : []);
  return `<${h}>${esc(r.title)}</${h}>${r.org ? `<div class="org">${esc(r.org)}</div>` : ""}<div class="lm">${r.type ? `<span class="tag">${esc(r.type)}</span>` : ""}${r.date ? `<span class="ic">${IC.cal}${esc(r.date)}${r.duration ? " · " + esc(r.duration) : ""}</span>` : ""}${r.location ? `<span class="ic">${IC.pin}${esc(r.location)}</span>` : ""}</div>${r.note ? `<div class="note">${esc(r.note)}</div>` : ""}${sk.length ? `<div class="skills">${sk.map(s => `<span class="pill">${esc(s)}</span>`).join("")}</div>` : ""}`;
};
$("#leadership-list").innerHTML = S.leadership.map((x, i) => {
  const roles = x.roles || [x];
  const body = roles.length > 1
    ? `<div class="lh"><h3>${esc(x.org)}</h3>${x.span ? `<span class="tag alt">${esc(x.span)}</span>` : ""}</div><div class="roles">${roles.map(r => `<div class="role">${roleHTML(r, "h4")}</div>`).join("")}</div>`
    : roleHTML({ ...roles[0], org: x.org || roles[0].org }, "h3");
  return `<article class="lead rv" style="--d:${i * 70}ms"><div class="mark" aria-hidden="true">${esc(mk(x))}</div><div class="lb">${body}</div></article>`;
}).join("");
// ---- Projects: numbered cards (optional fields: type, tech, text, link) ----
$("#project-list").innerHTML = S.projects.map((p, i) => { const sub = [p.type, (p.tech || []).join(", ")].filter(Boolean).join(" · "); return `<article class="proj rv" style="--d:${i * 60}ms"><span class="pn" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.title)}</h3>${sub ? `<div class="psub">${esc(sub)}</div>` : ""}${p.text ? `<div class="ptx">${esc(p.text)}</div>` : ""}${p.link ? `<a class="plink" href="${esc(p.link)}" target="_blank" rel="noopener">Repository →</a>` : ""}</article>`; }).join("");
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
// ---- Hero background: animated neural network (drifting nodes, links, travelling signals) ----
(() => {
  const home = document.getElementById("home"); if (!home) return;
  const cv = document.createElement("canvas"); cv.id = "neural"; cv.setAttribute("aria-hidden", "true"); home.prepend(cv);
  const ctx = cv.getContext && cv.getContext("2d"); if (!ctx) return;
  const calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const SKY = [47, 128, 237], LEAF = [63, 182, 139], SUN = [246, 166, 35], NODE_COLS = [SKY, SKY, SKY, LEAF];
  let W = 0, H = 0, nodes = [], pulses = [], mouse = null, raf = 0, last = 0, spawnIn = 0, inView = true;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const newNode = () => ({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-.2, .2), vy: rnd(-.2, .2), r: rnd(1.4, 3), c: NODE_COLS[(Math.random() * NODE_COLS.length) | 0] });
  const reach = () => Math.max(95, Math.min(150, W * .13));
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  function fit() {
    const nw = home.offsetWidth, nh = home.offsetHeight; if (!nw || !nh) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (W) nodes.forEach(n => { n.x *= nw / W; n.y *= nh / H; });
    W = nw; H = nh; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const want = Math.max(26, Math.min(85, Math.round(W * H / 15000)));
    while (nodes.length < want) nodes.push(newNode());
    if (nodes.length > want) nodes.length = want;
    pulses = pulses.filter(p => p.a < nodes.length && p.b < nodes.length);
  }
  function neighbour(i, skip) {
    const L2 = reach() ** 2, a = nodes[i], pool = [];
    nodes.forEach((b, j) => { if (j !== i && j !== skip && (a.x - b.x) ** 2 + (a.y - b.y) ** 2 < L2) pool.push(j); });
    return pool.length ? pool[(Math.random() * pool.length) | 0] : -1;
  }
  function step(dt) {
    if (!nodes.length) return;
    nodes.forEach(n => {
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
      if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
    });
    spawnIn -= dt * 16.67;
    if (spawnIn <= 0 && pulses.length < 14) {
      spawnIn = rnd(450, 1100);
      const i = (Math.random() * nodes.length) | 0, j = neighbour(i, -1);
      if (j >= 0) pulses.push({ a: i, b: j, t: 0, v: rnd(.012, .022), hops: 0, c: Math.random() < .5 ? SUN : LEAF });
    }
    pulses = pulses.filter(p => {
      p.t += p.v * dt; if (p.t < 1) return true;
      if (p.hops < 4 && Math.random() < .7) { const k = neighbour(p.b, p.a); if (k >= 0) { p.a = p.b; p.b = k; p.t = 0; p.hops++; return true; } }
      return false;
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    const L = reach(), L2 = L * L; ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d2 < L2) { ctx.strokeStyle = rgba(SKY, (1 - Math.sqrt(d2) / L) * .3); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    if (mouse) nodes.forEach(n => {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d < L * 1.4) { ctx.strokeStyle = rgba(SUN, (1 - d / (L * 1.4)) * .5); ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke(); }
    });
    nodes.forEach(n => {
      if (n.r > 2.4) { ctx.fillStyle = rgba(n.c, .1); ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.6, 0, 6.2832); ctx.fill(); }
      ctx.fillStyle = rgba(n.c, .55); ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.2832); ctx.fill();
    });
    pulses.forEach(p => {
      const a = nodes[p.a], b = nodes[p.b], x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      ctx.fillStyle = rgba(p.c, .16); ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.2832); ctx.fill();
      ctx.fillStyle = rgba(p.c, .95); ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.2832); ctx.fill();
    });
  }
  function frame(t) { raf = 0; if (!W) fit(); const dt = Math.min(48, t - (last || t)) / 16.67; last = t; step(dt); draw(); play(); }
  function play() { if (!raf && inView && !document.hidden && !calm) raf = requestAnimationFrame(frame); }
  function pause() { if (raf) cancelAnimationFrame(raf); raf = 0; last = 0; }
  fit(); draw();
  const refit = () => { fit(); if (calm) draw(); };
  if (window.ResizeObserver) new ResizeObserver(refit).observe(home); else addEventListener("resize", refit);
  if (window.IntersectionObserver) new IntersectionObserver(es => { inView = es[0].isIntersecting; inView ? play() : pause(); }).observe(home);
  document.addEventListener("visibilitychange", () => document.hidden ? pause() : play());
  home.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; }, { passive: true });
  home.addEventListener("pointerleave", () => { mouse = null; });
  play();
})();
