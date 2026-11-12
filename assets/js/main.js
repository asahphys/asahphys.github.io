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
$("#leadership-list").innerHTML = S.leadership.map(x => `<span class="chip" title="${esc(x.text)}">${esc(x.title)}<small>${esc(x.org)}</small></span>`).join("");
$("#project-list").innerHTML = S.projects.map(p => { const sub = [p.type, (p.tech || []).join(", ")].filter(Boolean).join(" · "); return `<div class="row"><b>${esc(p.title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}${p.text ? `<p>${esc(p.text)}</p>` : ""}${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Repository →</a>` : ""}</div>`; }).join("");
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
