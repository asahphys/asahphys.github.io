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
// ---- Projects: cards with an animated icon that matches the project (set "icon" in content.js; guessed from the title if missing) ----
const PIC = {
  heart: { c: ["#ef5a6f", "#ff8a9a"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><path class="hb" d="M32 55C13 42 7 31 7 22.5C7 15 12.5 10 19.5 10c4.8 0 9.3 2.5 12.5 7 3.2-4.5 7.7-7 12.5-7C51.5 10 57 15 57 22.5 57 31 51 42 32 55Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path class="ecg" pathLength="100" d="M12 33h10l4-9 6 18 5-13 3 4h12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  train: { c: ["#2f80ed", "#6fb4ff"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><g class="car"><rect x="7" y="14" width="50" height="29" rx="9" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="3"/><path d="M7 34h50" stroke="currentColor" stroke-width="2.5" opacity=".55"/><rect x="13" y="20" width="9" height="9" rx="2.5" fill="currentColor" fill-opacity=".4"/><rect x="27.5" y="20" width="9" height="9" rx="2.5" fill="currentColor" fill-opacity=".4"/><rect x="42" y="20" width="9" height="9" rx="2.5" fill="currentColor" fill-opacity=".4"/><circle cx="18" cy="46" r="3.2" fill="currentColor"/><circle cx="46" cy="46" r="3.2" fill="currentColor"/><circle cx="53" cy="38" r="1.8" fill="#f6a623"/></g><path d="M4 52h56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path class="ties" d="M4 58h56" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 7" opacity=".55"/></svg>` },
  loan: { c: ["#e39b12", "#ffc15a"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 7h20l13 13v31a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M37 7v13h13" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M20 28h16M20 36h12M20 44h8" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".6"/><g class="badge"><circle cx="46" cy="46" r="13" fill="#3fb68b" stroke="var(--dotfill)" stroke-width="3"/></g><path class="chk" pathLength="100" d="M40 46l4.5 4.5L53 41" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  care: { c: ["#2fae82", "#55e0ae"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><path class="plus" d="M25 12h12v14h14v12H37v14H25V38H11V26h14Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><g class="leaf"><path d="M38 26C38 15 47 8 59 8c0 12-7 18-21 18Z" fill="currentColor"/><path d="M42 22L55 11" stroke="var(--dotfill)" stroke-width="1.8" stroke-linecap="round" opacity=".8"/></g></svg>` },
  mining: { c: ["#8a6ff0", "#b3a1ff"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><g class="wheat" fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M22 58V20" fill="none" stroke-linecap="round"/><ellipse cx="22" cy="12" rx="3.4" ry="6.5"/><ellipse cx="15.5" cy="22" rx="3.4" ry="6.5" transform="rotate(-32 15.5 22)"/><ellipse cx="28.5" cy="22" rx="3.4" ry="6.5" transform="rotate(32 28.5 22)"/><ellipse cx="15.5" cy="34" rx="3.4" ry="6.5" transform="rotate(-32 15.5 34)"/><ellipse cx="28.5" cy="34" rx="3.4" ry="6.5" transform="rotate(32 28.5 34)"/></g><g class="lens"><circle cx="40" cy="36" r="11" fill="var(--dotfill)" fill-opacity=".6" stroke="currentColor" stroke-width="3.2"/><path d="M48 44l9 9" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M35 41v-4M40 41v-9M45 41v-6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></g></svg>` },
  spark: { c: ["#2f80ed", "#6fb4ff"], svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="currentColor"><rect class="b1" x="10" y="30" width="10" height="26" rx="3"/><rect class="b2" x="27" y="14" width="10" height="42" rx="3"/><rect class="b3" x="44" y="24" width="10" height="32" rx="3"/></g></svg>` }
};
const guessIcon = t => /transit|train|rail|metro|subway|mta|transport/i.test(t) ? "train" : /heart|cardio/i.test(t) ? "heart" : /loan|credit|eligib|bank|financ/i.test(t) ? "loan" : /health|medic|care/i.test(t) ? "care" : /mining|agri|crop|farm/i.test(t) ? "mining" : "spark";
$("#project-list").innerHTML = S.projects.map((p, i) => {
  const ic = PIC[p.icon] || PIC[guessIcon(p.title || "")];
  const sub = [p.type, (p.tech || []).join(", ")].filter(Boolean).join(" · ");
  return `<article class="proj rv" style="--bc:${ic.c[0]};--bcd:${ic.c[1]};--d:${i * 60}ms"><div class="pic" aria-hidden="true">${ic.svg}</div><h3>${esc(p.title)}</h3>${sub ? `<div class="psub">${esc(sub)}</div>` : ""}${p.text ? `<div class="ptx">${esc(p.text)}</div>` : ""}${p.link ? `<a class="plink" href="${esc(p.link)}" target="_blank" rel="noopener">Repository →</a>` : ""}</article>`;
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
// ---- Night sky for dark mode (stars, aurora, mountains); styled and shown by CSS only when the theme is dark ----
(() => {
  if (document.getElementById("sky")) return;
  const sky = document.createElement("div"); sky.id = "sky"; sky.setAttribute("aria-hidden", "true");
  sky.innerHTML = '<div class="stars"></div><div class="s2"></div><div class="au a1"></div><div class="au a2"></div><div class="au a3"></div><div class="glow"></div><div class="ridge back"></div><div class="ridge far"></div><div class="ridge near"></div>';
  document.body.prepend(sky);
})();
// ---- Hero background: animated neural network (drifting nodes, links, travelling signals); colours follow the theme ----
(() => {
  const home = document.getElementById("home"); if (!home) return;
  const cv = document.createElement("canvas"); cv.id = "neural"; cv.setAttribute("aria-hidden", "true"); home.prepend(cv);
  const ctx = cv.getContext && cv.getContext("2d"); if (!ctx) return;
  const calm = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const SKY = [47, 128, 237], LEAF = [63, 182, 139], SUN = [246, 166, 35];
  const PAL = {
    light: { link: SKY, nodes: [SKY, SKY, SKY, LEAF], pulse: [SUN, LEAF], mouse: SUN, la: .3 },
    dark: { link: [130, 225, 215], nodes: [[130, 200, 255], [130, 200, 255], [110, 240, 200], [175, 150, 255]], pulse: [[120, 255, 190], [200, 170, 255]], mouse: [255, 214, 120], la: .38 }
  };
  const pal = () => PAL[document.documentElement.dataset.theme === "dark" ? "dark" : "light"];
  let W = 0, H = 0, nodes = [], pulses = [], mouse = null, raf = 0, last = 0, spawnIn = 0, inView = true;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const newNode = () => ({ x: rnd(0, W), y: rnd(0, H), vx: rnd(-.2, .2), vy: rnd(-.2, .2), r: rnd(1.4, 3), c: (Math.random() * 4) | 0 });
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
      if (j >= 0) pulses.push({ a: i, b: j, t: 0, v: rnd(.012, .022), hops: 0, c: Math.random() < .5 ? 0 : 1 });
    }
    pulses = pulses.filter(p => {
      p.t += p.v * dt; if (p.t < 1) return true;
      if (p.hops < 4 && Math.random() < .7) { const k = neighbour(p.b, p.a); if (k >= 0) { p.a = p.b; p.b = k; p.t = 0; p.hops++; return true; } }
      return false;
    });
  }
  function draw() {
    const P = pal(); ctx.clearRect(0, 0, W, H);
    const L = reach(), L2 = L * L; ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j], d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d2 < L2) { ctx.strokeStyle = rgba(P.link, (1 - Math.sqrt(d2) / L) * P.la); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    if (mouse) nodes.forEach(n => {
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d < L * 1.4) { ctx.strokeStyle = rgba(P.mouse, (1 - d / (L * 1.4)) * .5); ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(n.x, n.y); ctx.stroke(); }
    });
    nodes.forEach(n => {
      const c = P.nodes[n.c];
      if (n.r > 2.4) { ctx.fillStyle = rgba(c, .1); ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.6, 0, 6.2832); ctx.fill(); }
      ctx.fillStyle = rgba(c, .55); ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.2832); ctx.fill();
    });
    pulses.forEach(p => {
      const a = nodes[p.a], b = nodes[p.b], c = P.pulse[p.c], x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      ctx.fillStyle = rgba(c, .16); ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.2832); ctx.fill();
      ctx.fillStyle = rgba(c, .95); ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.2832); ctx.fill();
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
  window.addEventListener("themechange", () => { if (calm) draw(); });
  home.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; }, { passive: true });
  home.addEventListener("pointerleave", () => { mouse = null; });
  play();
})();
