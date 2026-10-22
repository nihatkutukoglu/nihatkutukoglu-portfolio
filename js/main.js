(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s).toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PROJECTS = window.PROJECTS || [];
  const SITE = window.SITE || {};
  const caseUrl = (p) => (p.slug && p.study ? `/projects/${p.slug}` : "");

  const ICON = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  /* Görseli olmayan projeler için soyut, dekoratif çizimler */
  const ART = {
    map: `<svg viewBox="0 0 480 300" aria-hidden="true"><g stroke="currentColor" stroke-opacity=".14">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} 0v300"/>`).join("")}${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${i * 60}h480"/>`).join("")}</g><g fill="currentColor"><rect x="120" y="60" width="60" height="60" opacity=".35"/><rect x="180" y="60" width="60" height="60" opacity=".6"/><rect x="180" y="120" width="60" height="60" opacity=".85"/><rect x="240" y="120" width="60" height="60" opacity=".5"/><rect x="120" y="120" width="60" height="60" opacity=".22"/><rect x="240" y="180" width="60" height="60" opacity=".25"/><rect x="300" y="60" width="60" height="60" opacity=".15"/></g><g fill="currentColor"><circle cx="208" cy="148" r="5"/><circle cx="226" cy="132" r="3.5"/><circle cx="196" cy="86" r="3.5"/><circle cx="268" cy="150" r="4"/><circle cx="148" cy="92" r="3"/><circle cx="330" cy="88" r="3"/><circle cx="262" cy="214" r="3"/><circle cx="86" cy="210" r="3" opacity=".6"/><circle cx="404" cy="170" r="3" opacity=".6"/></g></svg>`,
    pareto: `<svg viewBox="0 0 480 300" aria-hidden="true"><g stroke="currentColor" stroke-opacity=".12"><path d="M40 40h420M40 110h420M40 180h420M40 250h420"/></g><g fill="currentColor">${[170, 128, 100, 80, 64, 52, 42, 34, 28, 22, 18, 14]
      .map((h, i) => `<rect x="${48 + i * 34}" y="${250 - h}" width="24" height="${h}" rx="3" opacity="${i < 5 ? 0.85 : 0.3}"/>`)
      .join("")}</g><path d="M60 214 L94 178 L128 150 L162 128 L196 110 L230 96 L264 84 L298 74 L332 66 L366 59 L400 54 L434 50" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M40 78h420" stroke="currentColor" stroke-dasharray="5 6" stroke-opacity=".6"/><text x="456" y="70" fill="currentColor" font-size="13" text-anchor="end" font-family="monospace" opacity=".8">80%</text></svg>`,
    table: `<svg viewBox="0 0 480 300" aria-hidden="true"><rect x="30" y="34" width="420" height="232" rx="10" fill="none" stroke="currentColor" stroke-opacity=".25"/><path d="M30 74h420" stroke="currentColor" stroke-opacity=".25"/><g fill="currentColor" opacity=".55"><rect x="50" y="50" width="70" height="8" rx="4"/><rect x="160" y="50" width="56" height="8" rx="4"/><rect x="256" y="50" width="64" height="8" rx="4"/><rect x="360" y="50" width="50" height="8" rx="4"/></g>${[0, 1, 2, 3, 4]
      .map((r) => {
        const y = 96 + r * 34;
        const w = [92, 70, 84, 60, 78][r];
        const op = [0.9, 0.9, 0.45, 0.9, 0.2][r];
        return `<g fill="currentColor"><rect x="50" y="${y}" width="${w}" height="8" rx="4" opacity=".35"/><rect x="160" y="${y}" width="40" height="8" rx="4" opacity=".25"/><rect x="256" y="${y}" width="${w - 20}" height="8" rx="4" opacity=".25"/><rect x="356" y="${y - 5}" width="70" height="18" rx="9" opacity="${op * 0.35}"/><circle cx="370" cy="${y + 4}" r="4" opacity="${op}"/></g><path d="M30 ${y + 21}h420" stroke="currentColor" stroke-opacity=".1"/>`;
      })
      .join("")}</svg>`
  };

  /* ---------- Tema ---------- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const paintTheme = () => {
    const dark = root.dataset.theme !== "light";
    if (themeBtn) {
      themeBtn.innerHTML = dark ? ICON.sun : ICON.moon;
      themeBtn.setAttribute("aria-label", dark ? "Açık temaya geç" : "Koyu temaya geç");
    }
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = dark ? "#070b14" : "#f7f8fb";
  };
  const toggleTheme = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (e) {}
    paintTheme();
  };
  paintTheme();
  themeBtn?.addEventListener("click", toggleTheme);

  /* ---------- Mobil menü ---------- */
  const navToggle = $("#navToggle");
  const navMobile = $("#navMobile");
  const setMenu = (open) => {
    if (!navMobile) return;
    navMobile.dataset.open = String(open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  };
  navToggle?.addEventListener("click", () => setMenu(navMobile.dataset.open !== "true"));
  navMobile?.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMobile?.dataset.open === "true") {
      setMenu(false);
      navToggle.focus();
    }
  });
  matchMedia("(min-width: 961px)").addEventListener("change", (e) => e.matches && setMenu(false));

  /* ---------- Header + aktif bölüm ---------- */
  const header = $(".site-header");
  const spies = [];
  const spy = (sections, onChange) => {
    if (!sections.length) return;
    let current;
    spies.push(() => {
      let next = null;
      for (const s of sections) if (s.getBoundingClientRect().top <= 140) next = s;
      if (next !== current) onChange((current = next));
    });
  };

  // ana sayfa: bölümün data-nav değeri menüdeki bağlantıyı işaretler
  const navLinks = $$(".site-header a[data-nav]");
  spy($$("main section[data-nav]"), (s) =>
    navLinks.forEach((a) => a.setAttribute("aria-current", String(!!s && a.dataset.nav === s.dataset.nav)))
  );
  // case study: içindekiler
  const tocLinks = $$(".toc a");
  spy(
    tocLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean),
    (s) => tocLinks.forEach((a) => a.setAttribute("aria-current", String(!!s && a.getAttribute("href") === "#" + s.id)))
  );

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle("is-stuck", scrollY > 8);
      spies.forEach((f) => f());
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Metrikler ---------- */
  const metricsEl = $("#metrics");
  const fmt = (n) => Math.round(n).toLocaleString("tr-TR");
  if (metricsEl && SITE.metrics) {
    metricsEl.innerHTML = SITE.metrics
      .map(
        (m) =>
          `<div><dt>${esc(m.label)}</dt><dd data-value="${m.value}" data-suffix="${esc(m.suffix || "")}">${fmt(m.value)}${esc(m.suffix || "")}</dd></div>`
      )
      .join("");
    if (!reduceMotion && "IntersectionObserver" in window) {
      const countUp = (el) => {
        const to = +el.dataset.value;
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = fmt(to * (1 - Math.pow(1 - k, 3))) + el.dataset.suffix;
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          $$("dd", metricsEl).forEach(countUp);
          io.disconnect();
        },
        { threshold: 0.4 }
      );
      io.observe(metricsEl);
    }
  }

  /* ---------- Ortak parçalar ---------- */
  const tags = (list, cls = "tags") => (list?.length ? `<ul class="${cls}">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "");
  const frame = (p) => {
    const inner = p.image
      ? `<div class="frame__shot"><img src="/${p.image}" alt="${esc(p.imageAlt || p.title)}" width="${p.imageWidth || 1000}" height="${p.imageHeight || 700}" loading="lazy" decoding="async"></div>`
      : `<div class="frame__art">${ART[p.art] || ART.table}</div>`;
    return `<div class="frame"><div class="frame__bar" aria-hidden="true"><i></i><i></i><i></i></div>${inner}</div>`;
  };

  /* ---------- Selected work ---------- */
  const featuredEl = $("#featuredList");
  if (featuredEl) {
    featuredEl.innerHTML = PROJECTS.filter((p) => p.featured)
      .map((p, i) => {
        const url = caseUrl(p);
        const title = url ? `<a href="${url}">${esc(p.title)}</a>` : esc(p.title);
        const media = url
          ? `<a class="work__media" href="${url}" tabindex="-1" aria-hidden="true">${frame(p)}</a>`
          : `<div class="work__media">${frame(p)}</div>`;
        return `
        <article class="work__item panel" data-reveal>
          ${media}
          <div class="work__body">
            <p class="work__index"><span>${String(i + 1).padStart(2, "0")}</span><span class="work__cat">${esc(p.category)}</span></p>
            <h3>${title}</h3>
            <p class="work__desc">${esc(p.summary)}</p>
            ${tags(p.metrics, "kpis")}
            ${tags(p.tech)}
            <div class="work__actions">
              ${url ? `<a class="btn btn--primary btn--sm" href="${url}">Case Study ${ICON.arrow}</a>` : ""}
              ${p.github ? `<a class="btn btn--ghost btn--sm" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
              ${p.demo ? `<a class="btn btn--ghost btn--sm" href="${p.demo}" target="_blank" rel="noopener">Live Demo ${ICON.out}</a>` : ""}
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Project explorer ---------- */
  const explorerEl = $("#explorer");
  if (explorerEl) {
    const CATS = [
      ["all", "All"],
      ["ds", "Data Science"],
      ["ml", "AI / ML"],
      ["analytics", "Analytics"],
      ["research", "Research"],
      ["software", "Software"],
      ["web", "Web"]
    ];
    const STATUS = [
      ["featured", "Featured"],
      ["production", "Production"],
      ["experiment", "Experiment"],
      ["client", "Client Work"]
    ];
    const GROUPS = [
      ["data", "Data · AI · Research"],
      ["web", "Software · Client Work"]
    ];
    const BADGE = {
      featured: '<span lang="en" class="badge badge--featured">Featured</span>',
      production: '<span lang="en" class="badge badge--live"><span class="dot" aria-hidden="true"></span>Production</span>',
      experiment: '<span lang="en" class="badge">Experiment</span>',
      client: '<span lang="en" class="badge">Client Work</span>'
    };
    const statusOf = (p, s) => (s === "featured" ? !!p.featured : p.status === s);
    const state = { cat: "all", status: null, q: "" };

    const card = (p) => {
      const url = caseUrl(p);
      const links = [
        url && `<a href="${url}">Case study ${ICON.arrow}</a>`,
        p.github && `<a href="${p.github}" target="_blank" rel="noopener">GitHub ${ICON.out}</a>`,
        p.demo && `<a href="${p.demo}" target="_blank" rel="noopener">Live ${ICON.out}</a>`
      ].filter(Boolean);
      return `
        <article class="card panel panel--hover" data-id="${p.id}">
          <div class="card__top"><p class="card__cat">${esc(p.category)}</p>${BADGE[p.featured ? "featured" : p.status] || ""}</div>
          <h4>${esc(p.title)}</h4>
          <p class="card__desc">${esc(p.summary)}</p>
          ${tags(p.tech?.slice(0, 5))}
          <div class="card__links">${links.join("")}</div>
        </article>`;
    };

    explorerEl.innerHTML =
      GROUPS.map(
        ([g, label]) => `
        <div class="explorer__group" data-group="${g}">
          <h3>${label} <small></small></h3>
          <div class="cards">${PROJECTS.filter((p) => p.group === g).map(card).join("")}</div>
        </div>`
      ).join("") + '<p class="explorer__empty" hidden>Bu filtreyle eşleşen proje yok.</p>';

    const haystack = new Map(
      PROJECTS.map((p) => [p.id, norm([p.title, p.summary, p.category, ...(p.tech || [])].join(" "))])
    );
    const chip = (key, label, count, pressed) =>
      `<button class="filter" type="button" data-key="${key}" aria-pressed="${pressed}">${label}<span class="count">${count}</span></button>`;
    const catEl = $("#categoryFilters");
    const statusEl = $("#statusFilters");
    catEl.innerHTML =
      '<span class="chips__label" aria-hidden="true">Kategori</span>' +
      CATS.map(([k, l]) =>
        chip(k, l, k === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.categories?.includes(k)).length, k === "all")
      ).join("");
    statusEl.innerHTML =
      '<span class="chips__label" aria-hidden="true">Durum</span>' +
      STATUS.map(([k, l]) => chip(k, l, PROJECTS.filter((p) => statusOf(p, k)).length, false)).join("");

    const statusText = $("#explorerStatus");
    const apply = () => {
      const q = norm(state.q.trim());
      let total = 0;
      $$(".card", explorerEl).forEach((el) => {
        const p = PROJECTS.find((x) => x.id === el.dataset.id);
        const show =
          (state.cat === "all" || p.categories?.includes(state.cat)) &&
          (!state.status || statusOf(p, state.status)) &&
          (!q || haystack.get(p.id).includes(q));
        if (show && el.hidden && !reduceMotion) {
          el.classList.remove("is-entering");
          void el.offsetWidth;
          el.classList.add("is-entering");
        }
        el.hidden = !show;
        total += show;
      });
      $$(".explorer__group", explorerEl).forEach((g) => {
        const n = $$(".card:not([hidden])", g).length;
        g.hidden = !n;
        $("small", g).textContent = `${n} proje`;
      });
      $(".explorer__empty", explorerEl).hidden = total > 0;
      statusText.textContent = `${total} / ${PROJECTS.length} proje gösteriliyor`;
      $$(".filter", catEl).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.key === state.cat)));
      $$(".filter", statusEl).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.key === state.status)));
    };

    catEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (b) (state.cat = b.dataset.key), apply();
    });
    statusEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (b) (state.status = state.status === b.dataset.key ? null : b.dataset.key), apply();
    });
    $("#projectSearch").addEventListener("input", (e) => ((state.q = e.target.value), apply()));
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-filter-link]");
      if (link) Object.assign(state, { cat: "all", status: link.dataset.filterLink, q: "" }), ($("#projectSearch").value = ""), apply();
    });
    apply();
  }

  /* ---------- Notes ---------- */
  const notesEl = $("#notesList");
  if (notesEl && SITE.notes) {
    notesEl.innerHTML = SITE.notes
      .map((n) => {
        const p = PROJECTS.find((x) => x.id === n.project);
        const url = p && caseUrl(p);
        return `
        <article class="note panel panel--hover" data-reveal>
          <div class="note__meta"><span class="badge" lang="en">${esc(n.tag)}</span><span class="badge">Taslak · yakında</span></div>
          <h3>${esc(n.title)}</h3>
          <p>${esc(n.blurb)}</p>
          ${url ? `<a href="${url}">İlgili case study: ${esc(p.title)} →</a>` : ""}
        </article>`;
      })
      .join("");
  }

  /* ---------- Komut paleti ---------- */
  const palette = $("#palette");
  if (palette && SITE.commands) {
    const input = $("#paletteInput");
    const list = $("#paletteList");
    const all = [
      ...SITE.commands.filter((c) => c.group === "Sayfalar"),
      ...PROJECTS.filter(caseUrl).map((p) => ({ group: "Projeler", label: p.title, href: caseUrl(p), hint: "case study" })),
      ...SITE.commands.filter((c) => c.group !== "Sayfalar")
    ];
    let items = [];
    let active = 0;

    const render = () => {
      const q = norm(input.value.trim());
      items = all.filter((c) => !q || norm(c.label + " " + c.group).includes(q));
      active = Math.min(active, Math.max(0, items.length - 1));
      let last = "";
      list.innerHTML = items.length
        ? items
            .map((c, i) => {
              const head = c.group !== last ? `<div class="palette__group" role="presentation">${esc((last = c.group))}</div>` : "";
              return `${head}<div class="palette__item" role="option" id="pal-${i}" data-i="${i}" aria-selected="${i === active}"><span>${esc(c.label)}</span><small>${esc(c.hint || (c.external ? "↗" : c.action ? "eylem" : ""))}</small></div>`;
            })
            .join("")
        : '<p class="palette__empty">Sonuç yok.</p>';
      input.setAttribute("aria-activedescendant", items.length ? `pal-${active}` : "");
    };
    const move = (d) => {
      if (!items.length) return;
      active = (active + d + items.length) % items.length;
      $$(".palette__item", list).forEach((el) => el.setAttribute("aria-selected", String(+el.dataset.i === active)));
      input.setAttribute("aria-activedescendant", `pal-${active}`);
      $(`#pal-${active}`)?.scrollIntoView({ block: "nearest" });
    };
    const run = (c) => {
      if (!c) return;
      palette.close();
      if (c.action === "theme") return toggleTheme();
      if (c.external) return void open(c.href, "_blank", "noopener");
      const hash = c.href.startsWith("/#") && location.pathname === "/" && $(c.href.slice(1));
      if (hash) {
        hash.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", c.href.slice(1));
      } else location.href = c.href;
    };
    const openPalette = () => {
      if (palette.open) return palette.close();
      setMenu(false);
      input.value = "";
      active = 0;
      render();
      palette.showModal();
      input.focus();
    };

    input.addEventListener("input", () => ((active = 0), render()));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") e.preventDefault(), move(1);
      else if (e.key === "ArrowUp") e.preventDefault(), move(-1);
      else if (e.key === "Enter") e.preventDefault(), run(items[active]);
    });
    list.addEventListener("click", (e) => {
      const el = e.target.closest(".palette__item");
      if (el) run(items[+el.dataset.i]);
    });
    list.addEventListener("mousemove", (e) => {
      const el = e.target.closest(".palette__item");
      if (el && +el.dataset.i !== active) move(+el.dataset.i - active);
    });
    palette.addEventListener("click", (e) => e.target === palette && palette.close());
    $$("[data-palette-open]").forEach((b) => b.addEventListener("click", openPalette));
    addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
      }
    });
    // Mac dışında kısayolu Ctrl+K olarak göster
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) $$("[data-palette-open] kbd").forEach((k) => (k.textContent = "Ctrl K"));
  }

  /* ---------- Reveal ---------- */
  const revealEls = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) revealEls.forEach((el) => el.classList.add("is-in"));
  else {
    root.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Yıl ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
