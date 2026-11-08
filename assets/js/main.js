const S = window.SITE, $ = (s, r = document) => r.querySelector(s), esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const L = k => S[k] || [];
$("#name").textContent = S.name; $("#role").textContent = S.role; $("#headline").textContent = S.headline; $("#intro").textContent = S.intro;
$("#footname").textContent = S.name; $("#year").textContent = new Date().getFullYear(); $("#av").textContent = S.name[0]; $("#igsub").textContent = S.name;
if (S.email && !/^TODO/i.test(S.email)) $("#mail").innerHTML = `· <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`;
$("#portrait").innerHTML = `<img src="${S.photo}" alt="Portrait of ${esc(S.name)}">`;
$("#portrait img").onerror = e => e.target.replaceWith(Object.assign(document.createElement("span"), { className: "mono", textContent: S.name[0] }));
$("#social").innerHTML = `<a href="${S.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="${S.links.github}" target="_blank" rel="noopener">GitHub</a>`;
$("#about-text").innerHTML = L("about").map(p => `<p>${esc(p)}</p>`).join("");
$("#education-list").innerHTML = L("education").map(x => `<div class="row"><b>${esc(x.title)}</b><span>${esc(x.org)} · ${esc(x.date)}</span>${x.text && x.text !== "TODO" ? `<p>${esc(x.text)}</p>` : ""}</div>`).join("");
$("#leadership-list").innerHTML = L("leadership").map(x => `<span class="chip" title="${esc(x.text)}">${esc(x.title)}<small>${esc(x.org)}</small></span>`).join("");
$("#project-list").innerHTML = L("projects").map(p => `<div class="row"><b>${esc(p.title)}</b><span>${esc(p.type)} · ${p.tech.map(esc).join(", ")}</span><p>${esc(p.text)}</p>${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">Repository →</a>` : ""}</div>`).join("");
// ---- Instagram-style gallery ----
const G = L("gallery"), track = $("#track"), dots = $("#dots"); let cur = 0;
track.innerHTML = G.map(g => `<figure><img src="${g.src}" alt="${esc(g.caption)}" loading="lazy" draggable="false"><em>Add photo<br><small>${esc(g.src.split("/").pop())}</small></em></figure>`).join("");
track.querySelectorAll("img").forEach(i => i.onerror = () => i.remove());
dots.innerHTML = G.map((_, i) => `<i data-i="${i}"></i>`).join("");
const go = i => track.scrollTo({ left: Math.max(0, Math.min(G.length - 1, i)) * track.clientWidth, behavior: "smooth" });
function show(i) { cur = i; const g = G[i]; if (!g) return; $("#cap").innerHTML = `<b>${esc(g.cat)}</b> ${esc(g.caption)}<small>${esc(g.date)}</small>`; $("#count").textContent = `${i + 1}/${G.length}`; dots.querySelectorAll("i").forEach((d, k) => d.classList.toggle("on", k === i)); }
track.addEventListener("scroll", () => { const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== cur) show(i); }, { passive: true });
$(".prev").onclick = () => go(cur - 1); $(".next").onclick = () => go(cur + 1); dots.onclick = e => e.target.dataset.i && go(+e.target.dataset.i);
$("#gallery").tabIndex = 0; $("#gallery").addEventListener("keydown", e => { if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
let sx = 0, sl = 0, drag = false; // mouse drag-to-swipe (touch uses native swipe)
track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; drag = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add("drag"); });
addEventListener("pointermove", e => { if (drag) track.scrollLeft = sl - (e.clientX - sx); });
addEventListener("pointerup", () => { if (!drag) return; drag = false; track.classList.remove("drag"); go(Math.round(track.scrollLeft / track.clientWidth)); });
show(0);
$("#menu").onclick = () => $("nav").classList.toggle("open"); document.querySelectorAll("nav a").forEach(a => a.onclick = () => $("nav").classList.remove("open"));
