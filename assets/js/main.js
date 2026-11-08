const S = Object.assign({ name: "Ardiansah", role: "", headline: "", intro: "", photo: "", email: "", links: {}, about: [], education: [], leadership: [], projects: [], gallery: [] }, window.SITE || {});
const $ = (s, r = document) => r.querySelector(s) || document.createElement("div"), // missing element -> harmless dummy, so removing HTML blocks never breaks the script
 esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
set("#name", S.name); set("#role", S.role); set("#headline", S.headline); set("#intro", S.intro);
set("#footname", S.name); set("#year", new Date().getFullYear());
if (S.email && !/^TODO/i.test(S.email)) $("#mail").innerHTML = `· <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`;
$("#portrait").innerHTML = S.photo ? `<img src="${esc(S.photo)}" alt="Portrait of ${esc(S.name)}">` : "";
const mono = () => { $("#portrait").innerHTML = `<span class="mono">${esc(S.name[0] || "A")}</span>`; };
if (S.photo) $("#portrait img").onerror = mono; else mono();
$("#social").innerHTML = [["LinkedIn", S.links.linkedin], ["GitHub", S.links.github]].filter(x => x[1]).map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join("");
$("#about-text").innerHTML = S.about.map(p => `<p>${esc(p)}</p>`).join("");
$("#education-list").innerHTML = S.education.map(x => `<div class="row"><b>${esc(x.title)}</b><span>${esc(x.org)}${x.date ? " · " + esc(x.date) : ""}</span>${x.text ? `<p>${esc(x.text)}</p>` : ""}</div>`).join("");
$("#leadership-list").innerHTML = S.leadership.map(x => `<span class="chip" title="${esc(x.text)}">${esc(x.title)}<small>${esc(x.org)}</small></span>`).join("");
$("#project-list").innerHTML = S.projects.map(p => { const sub = [p.type, (p.tech || []).join(", ")].filter(Boolean).join(" · "); return `<div class="row"><b>${esc(p.title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}${p.text ? `<p>${esc(p.text)}</p>` : ""}${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Repository →</a>` : ""}</div>`; }).join("");
// ---- Instagram-style gallery ----
const G = S.gallery, track = $("#track"), dots = $("#dots"); let cur = 0;
if (!G.length) $("#gallery").style.display = "none";
track.innerHTML = G.map(g => `<figure><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy" draggable="false"><em>Add photo<br><small>${esc(String(g.src).split("/").pop())}</small></em></figure>`).join("");
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