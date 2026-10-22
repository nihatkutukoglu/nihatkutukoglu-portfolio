// data/projects.js → projects/<slug>/index.html (statik case study sayfaları) + sitemap.xml
// Kullanım: repo kökünde `node scripts/build.mjs`. Çıktılar repoya commit edilir; hosting'de build gerekmez.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import vm from "node:vm";

const SITE_URL = "https://www.nihatkutukoglu.com.tr";
const OG_IMAGE = `${SITE_URL}/assets/og/portfolio-cover.jpg`;

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync("data/projects.js", "utf8"), ctx);
const projects = ctx.window.PROJECTS.filter((p) => p.slug && p.study);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const list = (items, cls) => `<ul class="${cls}">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

// header ve footer (+ komut paleti) index.html'den kopyalanır; sayfa içi bağlantılar ana sayfaya yönlenir
const index = readFileSync("index.html", "utf8");
const block = (name) => {
  const m = index.match(new RegExp(`<!-- @${name} -->([\\s\\S]*?)<!-- /@${name} -->`));
  if (!m) throw new Error(`index.html içinde @${name} bloğu bulunamadı`);
  return m[1].trim().replaceAll('href="#', 'href="/#');
};
const header = block("header").replaceAll('data-nav="projects"', 'data-nav="projects" aria-current="true"');
const footer = block("footer");

const page = (p, i) => {
  const s = p.study;
  const url = `${SITE_URL}/projects/${p.slug}`;
  const title = `${p.title} — Case Study | Nihat Kütükoğlu`;
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const sections = [
    ["problem", "Problem", s.problem && `<p>${esc(s.problem)}</p>`],
    ["dataset", "Dataset", s.dataset && `<p>${esc(s.dataset)}</p>`],
    [
      "methodology",
      "Methodology",
      (s.approach || s.pipeline) &&
        `${s.pipeline ? `<ol class="pipeline" aria-label="Analiz akışı">${s.pipeline.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}${s.approach ? `<p>${esc(s.approach)}</p>` : ""}`
    ],
    [
      "findings",
      "Key Findings",
      (s.findings || s.result) && `${s.findings ? list(s.findings, "findings") : ""}${s.result ? `<p>${esc(s.result)}</p>` : ""}`
    ],
    ["stack", "Tech Stack", p.tech && list(p.tech, "tags")],
    ["limitations", "Limitations", s.limitations && list(s.limitations, "findings limits")],
    [
      "links",
      "Kaynak &amp; demo",
      (p.github || p.demo) &&
        `<div class="hero__cta">${p.github ? `<a class="btn btn--primary" href="${p.github}" target="_blank" rel="noopener">GitHub'da incele</a>` : ""}${p.demo ? `<a class="btn btn--ghost" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ""}</div>`
    ]
  ].filter(([, , html]) => html);

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: p.title,
        description: p.summary,
        url,
        inLanguage: "tr",
        keywords: p.tech.join(", "),
        author: { "@type": "Person", name: "Nihat Kütükoğlu", url: `${SITE_URL}/` },
        ...(p.github && { isBasedOn: p.github })
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Projeler", item: `${SITE_URL}/#projeler` },
          { "@type": "ListItem", position: 3, name: p.title, item: url }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="tr" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.summary)}">
<meta name="author" content="Nihat Kütükoğlu">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#070b14">

<meta property="og:type" content="article">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Nihat Kütükoğlu">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(p.summary)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(p.summary)}">
<meta name="twitter:image" content="${OG_IMAGE}">

<script>try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/styles.css?v=3">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
<a class="skip" href="#main">İçeriğe geç</a>

${header}

<main id="main">
<header class="case-hero" id="overview">
  <div class="wrap">
    <nav aria-label="Konum"><ol class="crumbs"><li><a href="/">Ana sayfa</a></li><li><a href="/#projeler">Projeler</a></li><li aria-current="page">${esc(p.title)}</li></ol></nav>
    <span class="eyebrow" lang="en">Case Study · ${esc(p.category)}</span>
    <h1>${esc(p.title)}</h1>
    <p class="case-hero__lead">${esc(p.summary)}</p>
    <div class="hero__cta">
      ${p.github ? `<a class="btn btn--primary" href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
      ${p.demo ? `<a class="btn btn--ghost" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ""}
      <a class="btn btn--ghost" href="/#kesfet">Tüm projeler</a>
    </div>
    ${p.metrics ? `<h2 class="sr-only">Metrics</h2>${list(p.metrics, "case-metrics")}` : ""}
  </div>
</header>

<div class="wrap">
  ${
    p.image
      ? `<figure class="case-shot"><div class="frame"><div class="frame__bar" aria-hidden="true"><i></i><i></i><i></i></div><div class="frame__shot"><img src="/${p.image}" alt="${esc(p.imageAlt || p.title)}" width="${p.imageWidth}" height="${p.imageHeight}" decoding="async"></div></div><figcaption>${esc(p.imageAlt || p.title)}</figcaption></figure>`
      : ""
  }
  <div class="case">
    <nav class="toc" aria-label="İçindekiler">
      <p>İçindekiler</p>
      <a href="#overview">Overview</a>
      ${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("\n      ")}
    </nav>
    <div class="case__body">
      ${sections
        .map(
          ([id, label, html]) => `<section class="case__section" id="${id}" aria-labelledby="${id}-h" data-reveal>
        <span class="eyebrow" lang="en">${label}</span>
        <h2 id="${id}-h">${label}</h2>
        ${html}
      </section>`
        )
        .join("\n      ")}
    </div>
  </div>

  <nav class="case-next" aria-label="Diğer case study'ler">
    <a class="panel panel--hover" href="/projects/${prev.slug}"><small>← Önceki</small><strong>${esc(prev.title)}</strong></a>
    <a class="panel panel--hover" href="/projects/${next.slug}"><small>Sonraki →</small><strong>${esc(next.title)}</strong></a>
  </nav>
</div>
</main>

${footer}

<script src="/data/projects.js?v=3" defer></script>
<script src="/data/site.js?v=3" defer></script>
<script src="/js/main.js?v=3" defer></script>
</body>
</html>
`;
};

if (existsSync("projects")) rmSync("projects", { recursive: true });
projects.forEach((p, i) => {
  mkdirSync(`projects/${p.slug}`, { recursive: true });
  writeFileSync(`projects/${p.slug}/index.html`, page(p, i));
});

const today = new Date().toLocaleDateString("sv"); // yerel tarih, YYYY-MM-DD
const urls = [
  { loc: `${SITE_URL}/`, priority: "1.0" },
  ...projects.map((p) => ({ loc: `${SITE_URL}/projects/${p.slug}`, priority: "0.8" }))
];
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

console.log(`${projects.length} case study sayfası ve sitemap.xml üretildi.`);
