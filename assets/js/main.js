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
const VINYL = `<svg viewBox="0 0 48 48" aria-hidden="true"><g class="disc"><circle cx="24" cy="24" r="23" fill="#22303f"/><circle cx="24" cy="24" r="19.5" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width=".8"/><circle cx="24" cy="24" r="16" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width=".8"/><circle cx="24" cy="24" r="12.5" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width=".8"/><circle cx="24" cy="24" r="8" fill="#f6a623"/><circle cx="24" cy="19.2" r="1.1" fill="#fff" fill-opacity=".85"/><circle cx="24" cy="24" r="1.8" fill="#fff"/></g><path d="M9.5 17.5A16 16 0 0 1 18 9" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" stroke-linecap="round"/></svg>`;
set("#music-sub", S.musicSubtitle);
$("#song-list").innerHTML = S.songs.map(s => `<div class="song"><div class="vinyl">${VINYL}</div><div class="meta"><b>${esc(s.title)}</b><small>by ${esc(s.artist)}</small></div></div>`).join("");
if (!S.songs.length) $("#music").style.display = "none";
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
