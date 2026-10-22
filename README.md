# Nihat Kütükoğlu — Portfolio V2

Kişisel portföy sitesi. Vanilla HTML/CSS/JS; framework ve runtime bağımlılığı yok.

**Live:** https://www.nihatkutukoglu.com.tr

## Özellikler

- Selected Work: öne çıkan 5 proje için alternating editorial layout
- Explore Projects: kategori + durum filtreleri ve arama (Data · AI · Research / Software · Client Work grupları)
- Statik case study sayfaları: `/projects/<slug>` (benzersiz title, description, canonical, OG, JSON-LD)
- Komut paleti: `Ctrl/⌘ + K`
- Koyu / açık tema, `prefers-reduced-motion` desteği

## Local Run

```bash
python3 -m http.server 8080
```

Ardından http://localhost:8080

## İçerik güncelleme

Tüm proje içerikleri `data/projects.js` içinde; metrikler, notlar ve komut paleti `data/site.js` içinde.
Proje ekledikten veya case study içeriğini değiştirdikten sonra sayfaları yeniden üretin:

```bash
node scripts/build.mjs
```

Script `projects/<slug>/index.html` sayfalarını ve `sitemap.xml`'i üretir. Header ve footer
`index.html` içindeki `<!-- @header -->` / `<!-- @footer -->` bloklarından kopyalanır.
Üretilen dosyalar repoya commit edilir; hosting tarafında build adımı gerekmez.

CSS/JS değiştiğinde `index.html` ve `scripts/build.mjs` içindeki `?v=` değerini artırın (önbellek kırma).

## Structure

```
index.html
css/styles.css
js/main.js              # tema, navigasyon, metrikler, render, filtre, komut paleti
data/projects.js        # tüm proje içerikleri (tek kaynak)
data/site.js            # metrikler, notlar, komut paleti
scripts/build.mjs       # case study sayfaları + sitemap üretimi
projects/<slug>/        # üretilmiş case study sayfaları
assets/images/          # profil, proje ve belge görselleri (webp)
assets/og/              # Open Graph kapak görseli (1200x630)
nihat-kutukoglu-cv.pdf
favicon.svg · robots.txt · sitemap.xml · vercel.json
```

## Deployment

Statik hosting (Vercel); repo kökü doğrudan yayınlanır. `vercel.json` URL'leri sondaki `/` olmadan sunar.
