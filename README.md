# Nihat Kütükoğlu — Portfolio V2

Kişisel portföy sitesi. Vanilla HTML/CSS/JS; framework ve tarayıcı runtime bağımlılığı yok. Markdown sayfaları build sırasında `marked` ile üretilir.

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
npm ci
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

## PDF notları ekleme

PDF dosyasını `assets/notes/` klasörüne koyun (ör. `veri-analizi.pdf`).
`data/site.js` içindeki `notes` dizisine bir kayıt ekleyin:

```js
{
  title: "Veri analizi notları",
  tag: "Analiz",
  blurb: "Keşifçi veri analizine dair çalışma notları.",
  file: "/assets/notes/veri-analizi.pdf"
}
```

PDF’yi aç yeni sekmede tarayıcının PDF görüntüleyicisini kullanır; tarayıcı
ayarlarına göre dosya indirilebilir. İndir düğmesi dosyayı cihaza kaydeder.
Paylaş, desteklenen cihazlarda paylaşım menüsünü açar; diğerlerinde doğrudan
PDF bağlantısını kopyalar. Pano erişimi yoksa seçilebilir bağlantı gösterilir.
PDF ve veri değişiklikleri birlikte yayınlanmalıdır. Liste boşken yakında mesajı görünür.

## Eski siteden aktarılan notlar

Eski portföyün `#documents` bölümündeki 13 Markdown dosyası `assets/notes/`
altında özgün içerikleriyle saklanır. `data/site.js` kayıtlarında `slug` bulunan
notlar için build, `notes/<slug>/index.html` okuma sayfalarını ve sitemap kayıtlarını
üretir. Notu oku ve Paylaş bu sayfalara, İndir özgün `.md` dosyasına bağlanır.
Markdown değişikliklerinden sonra `node scripts/build.mjs` çalıştırın.
Kaynak: https://nihat-cv-site.vercel.app/#documents

## Not kategorileri ve kapakları

Konu kartları `data/site.js` içindeki `noteCategories` üzerinden yönetilir.
Her notun `category` alanı ilgili kartın `id` değeriyle eşleşmelidir.
Kapaklar `assets/notes/covers/` altında yerel SVG görselleridir.
İçerik, PDF ve yazılı not sayıları dosya listesinden otomatik hesaplanır.
