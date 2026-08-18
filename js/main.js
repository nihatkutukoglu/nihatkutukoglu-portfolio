(() => {
  "use strict";

  /* ---------- Tema ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const initial = stored || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  const themeBtn = document.getElementById("themeToggle");
  const paintThemeIcon = (t) => {
    themeBtn.innerHTML =
      t === "dark"
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    themeBtn.setAttribute("aria-label", t === "dark" ? "Açık temaya geç" : "Koyu temaya geç");
  };
  paintThemeIcon(initial);
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    paintThemeIcon(next);
  });

  /* ---------- Mobil menü ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  navToggle.addEventListener("click", () => {
    const open = navMobile.dataset.open === "true";
    navMobile.dataset.open = String(!open);
    navToggle.setAttribute("aria-expanded", String(!open));
  });
  navMobile.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMobile.dataset.open = "false";
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Proje kartları ---------- */
  const projects = window.PROJECTS || [];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ART = {
    map: '<svg viewBox="0 0 320 180" role="img" aria-label="Soyut harita görseli" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" opacity=".2" stroke-width="1"><path d="M0 45h320M0 90h320M0 135h320M80 0v180M160 0v180M240 0v180"/></g><g fill="currentColor"><circle cx="96" cy="70" r="7" opacity=".8"/><circle cx="128" cy="104" r="11" opacity=".5"/><circle cx="196" cy="62" r="5" opacity=".65"/><circle cx="228" cy="118" r="8" opacity=".4"/><circle cx="60" cy="126" r="4" opacity=".55"/></g></svg>',
    grid: '<svg viewBox="0 0 320 180" role="img" aria-label="Soyut veri görseli" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><rect x="42" y="112" width="26" height="44" rx="3" opacity=".35"/><rect x="82" y="84" width="26" height="72" rx="3" opacity=".5"/><rect x="122" y="42" width="26" height="114" rx="3" opacity=".8"/><rect x="162" y="96" width="26" height="60" rx="3" opacity=".45"/><rect x="202" y="126" width="26" height="30" rx="3" opacity=".3"/><rect x="242" y="136" width="26" height="20" rx="3" opacity=".25"/></g><path d="M42 108 L95 78 L135 38 L175 92 L215 122 L255 132" fill="none" stroke="currentColor" stroke-width="2" opacity=".6"/></svg>'
  };

  const media = (p) => {
    if (p.image)
      return `<div class="card__media"><img src="${p.image}" alt="${esc(p.imageAlt || p.title)}" loading="lazy" decoding="async" width="1000" height="600"></div>`;
    if (p.art) return `<div class="card__media" style="color:var(--accent)">${ART[p.art]}</div>`;
    return "";
  };

  const linkBtns = (p, small) => {
    const c = small ? "btn btn--ghost btn--sm" : "btn btn--ghost";
    let html = "";
    if (p.github) html += `<a class="${c}" href="${p.github}" target="_blank" rel="noopener">GitHub</a>`;
    if (p.demo) html += `<a class="${c}" href="${p.demo}" target="_blank" rel="noopener">Demo</a>`;
    if (p.study)
      html += `<button class="btn btn--primary${small ? " btn--sm" : ""}" data-study="${p.id}">Case Study</button>`;
    return html;
  };

  const cardHTML = (p, small) => `
    <article class="card${small ? " card--sm" : ""}"${p.tags ? ` data-tags="${p.tags.join(" ")}"` : ""}>
      ${small ? "" : media(p)}
      <div class="card__body">
        <p class="card__cat">${esc(p.category)}</p>
        <h3>${esc(p.title)}</h3>
        <p class="card__desc">${esc(p.summary)}</p>
        ${p.metrics ? `<ul class="metrics">${p.metrics.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}
        ${p.tech ? `<ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        <div class="card__actions">${linkBtns(p, small)}</div>
      </div>
    </article>`;

  const render = (sel, list, small) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = list.map((p) => cardHTML(p, small)).join("");
  };

  render("#featuredGrid", projects.filter((p) => p.group === "featured"), false);
  render("#labsGrid", projects.filter((p) => p.group === "labs"), true);
  render("#webGrid", projects.filter((p) => p.group === "web"), true);

  /* ---------- Filtreler (Labs) ---------- */
  const labsGrid = document.getElementById("labsGrid");
  document.getElementById("labsFilters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    document.querySelectorAll("#labsFilters .filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const f = btn.dataset.filter;
    labsGrid.querySelectorAll(".card").forEach((c) => {
      const show = f === "all" || (c.dataset.tags || "").split(" ").includes(f);
      c.hidden = !show;
    });
  });

  /* ---------- Case study modal ---------- */
  const dlg = document.getElementById("studyDialog");
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-study]");
    if (!trigger) return;
    const p = projects.find((x) => x.id === trigger.dataset.study);
    if (!p || !p.study) return;
    const s = p.study;
    dlg.querySelector("#studyTitle").textContent = p.title;
    dlg.querySelector("#studyCat").textContent = p.category;
    dlg.querySelector("#studyBody").innerHTML = `
      <h4>Problem</h4><p>${esc(s.problem)}</p>
      <h4>Dataset</h4><p>${esc(s.dataset)}</p>
      <h4>Approach</h4><p>${esc(s.approach)}</p>
      <h4>Result</h4><p>${esc(s.result)}</p>
      <h4>Tech Stack</h4><ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="study__actions">
        ${p.github ? `<a class="btn btn--primary" href="${p.github}" target="_blank" rel="noopener">GitHub'da incele</a>` : ""}
        ${p.demo ? `<a class="btn btn--ghost" href="${p.demo}" target="_blank" rel="noopener">Demo</a>` : ""}
      </div>`;
    dlg.showModal();
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg.querySelector("#studyClose").addEventListener("click", () => dlg.close());

  /* ---------- Header + aktif bölüm ---------- */
  const header = document.querySelector(".site-header");
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const onScroll = () => {
    header.classList.toggle("is-stuck", window.scrollY > 8);
    let current = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= 120) current = s;
    links.forEach((a) => a.classList.toggle("is-active", current && a.getAttribute("href") === "#" + current.id));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
