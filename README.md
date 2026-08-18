# Nihat Kütükoğlu — Portfolio

Kişisel portföy sitesi. Vanilla HTML/CSS/JS, build adımı ve bağımlılık yok.

**Live:** https://nihatkutukoglu.com.tr

## About

Veri bilimi, makine öğrenmesi, karar destek sistemleri ve yazılım geliştirme projelerini
tek sayfada toplayan statik site.

## Featured Projects

| Proje | Alan | Repo |
|---|---|---|
| Agartha Intelligence Suite | Data Science · NLP · Decision Intelligence | [repo](https://github.com/nihatkutukoglu/agartha-intelligence-suite) |
| Türkiye İç Göç Atlası | Data Science · ML · Network Analysis | [repo](https://github.com/nihatkutukoglu/turkiye-ic-goc-atlasi) |
| Safranbolu Turizm Analitiği | Data Analytics · Geospatial | [repo](https://github.com/nihatkutukoglu/safranbolu-turizm-analitigi) |
| Gaziantep Kentsel Sorunlar | Urban Analytics · ML | [repo](https://github.com/nihatkutukoglu/gaziantep-veri-bilimi-projesi) |
| European Presidents Dataset V4 | Research · Dataset Engineering | [repo](https://github.com/nihatkutukoglu/european-presidents-dataset-v4) |

## Tech Stack

HTML5, CSS (custom properties, grid), vanilla JavaScript, Google Fonts.

## Local Run

```bash
python3 -m http.server 8080
```

Ardından http://localhost:8080

## Structure

```
index.html
css/styles.css
js/main.js            # tema, navigasyon, render, filtre, modal
data/projects.js      # tüm proje içerikleri
assets/images/        # profil, proje ve belge görselleri (webp)
assets/og/            # Open Graph kapak görseli (1200x630)
nihat-kutukoglu-cv.pdf
favicon.svg · robots.txt · sitemap.xml
```

Yeni proje eklemek için `data/projects.js` içindeki diziye bir nesne eklemek yeterlidir
(`group`: `featured` | `labs` | `web`).

## Deployment

Statik hosting; repo kökü doğrudan yayınlanır.
