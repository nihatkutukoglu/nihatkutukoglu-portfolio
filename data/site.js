/* Site geneli içerik: metrikler, notlar ve komut paleti. data/projects.js'ten sonra yüklenir. */
(() => {
  const projects = window.PROJECTS || [];

  window.SITE = {
    links: {
      github: "https://github.com/nihatkutukoglu",
      linkedin: "https://www.linkedin.com/in/nihatkutukoglu",
      email: "mailto:kutukoglunihat1@gmail.com",
      cv: "/nihat-kutukoglu-cv.pdf"
    },

    /* value sayıysa count-up ile animasyonlu gösterilir */
    metrics: [
      { value: 50, suffix: "+", label: "GitHub deposu" },
      { value: projects.filter((p) => p.group === "data").length, label: "veri / ML projesi" },
      { value: 4, label: "uçtan uca veri ürünü" },
      { value: 116640, label: "analiz edilen göç akışı (TÜİK)" }
    ],

    /* PDF dosyalarını assets/notes/ altına ekleyin.
       Örnek: { title: "Not başlığı", tag: "Analiz", blurb: "Kısa açıklama",
                file: "/assets/notes/not-basligi.pdf" } */
    noteCategories: [
  {
    "id": "machine-learning",
    "title": "Makine Öğrenimi",
    "description": "Temel kavramlar ve öğrenme algoritmaları.",
    "cover": "/assets/notes/covers/machine-learning.svg"
  },
  {
    "id": "model-evaluation",
    "title": "Modelleme ve Değerlendirme",
    "description": "Düzenleme, model karşılaştırma ve doğrulama.",
    "cover": "/assets/notes/covers/model-evaluation.svg"
  },
  {
    "id": "data-preparation",
    "title": "Veri Analizi ve Ön İşleme",
    "description": "EDA, encoding ve değişkenler arası ilişkiler.",
    "cover": "/assets/notes/covers/data-preparation.svg"
  },
  {
    "id": "low-code",
    "title": "Low-Code / No-Code",
    "description": "Görsel araçlarla uygulama geliştirme.",
    "cover": "/assets/notes/covers/low-code.svg"
  }
],

    notes: [
      {"title": "Makine Öğrenimi: Kapsamlı Rehber", "tag": "Makine Öğrenimi", "blurb": "Makine öğrenimi kavramlarını uçtan uca ele alan geniş kapsamlı bir rehber.", "file": "/assets/notes/Makine_Ogrenimi_Kapsamli_Rehber.md", "slug": "makine-ogrenimi-kapsamli-rehber", "category": "machine-learning"},
      {"title": "Ridge, Lasso, ElasticNet ve Çapraz Doğrulama", "tag": "Makine Öğrenimi", "blurb": "Düzenleme modelleri (Ridge, ElasticNet) ve Çapraz Doğrulama (Cross Validation) üzerine notlar.", "file": "/assets/notes/Ridge_ElasticNet_CrossValidation.md", "slug": "ridge-elasticnet-crossvalidation", "category": "model-evaluation"},
      {"title": "Lojistik Regresyon Ders Notları", "tag": "Makine Öğrenimi", "blurb": "Lojistik regresyon algoritmasının teorisi ve pratik uygulamaları.", "file": "/assets/notes/Lojistik_Regresyon_Ders_Notlari.md", "slug": "lojistik-regresyon-ders-notlari", "category": "machine-learning"},
      {"title": "KNN Ders Notları", "tag": "Makine Öğrenimi", "blurb": "K-Nearest Neighbors (K-En Yakın Komşu) algoritması üzerine çalışma notları.", "file": "/assets/notes/KNN_Notlari.md", "slug": "knn-notlari", "category": "machine-learning"},
      {"title": "Karar Ağaçları Ders Notları", "tag": "Makine Öğrenimi", "blurb": "Karar ağaçları (Decision Trees) algoritmasının yapısı ve kullanım alanları.", "file": "/assets/notes/Karar_Agaclari_Ders_Notlari.md", "slug": "karar-agaclari-ders-notlari", "category": "machine-learning"},
      {"title": "Naive Bayes: Teori ve Uygulama", "tag": "Makine Öğrenimi", "blurb": "Olasılık tabanlı Naive Bayes algoritması ve sınıflandırma mantığı.", "file": "/assets/notes/NaiveBayes_Notlari.md", "slug": "naivebayes-notlari", "category": "machine-learning"},
      {"title": "SVM Ders Notları", "tag": "Makine Öğrenimi", "blurb": "Destek Vektör Makineleri (Support Vector Machines) çalışma prensipleri.", "file": "/assets/notes/SVM_Ders_Notlari.md", "slug": "svm-ders-notlari", "category": "machine-learning"},
      {"title": "Encoding Rehberi", "tag": "Makine Öğrenimi", "blurb": "Kategorik verilerin sayısal verilere dönüştürülmesine yönelik teknikler (One-Hot, Label vb).", "file": "/assets/notes/Encoding_Rehberi.md", "slug": "encoding-rehberi", "category": "data-preparation"},
      {"title": "LazyPredict Ders Notları", "tag": "Makine Öğrenimi", "blurb": "Kısa sürede birçok modeli karşılaştırmaya yarayan LazyPredict kütüphanesi notları.", "file": "/assets/notes/lazypredict_ders_notlari.md", "slug": "lazypredict-ders-notlari", "category": "model-evaluation"},
      {"title": "Keşifçi Veri Analizi (EDA) Şablonu", "tag": "Makine Öğrenimi", "blurb": "Keşifçi Veri Analizi (EDA) sürecini basitleştirmek ve standartlaştırmak için genel bir şablon.", "file": "/assets/notes/eda_sablonu.md", "slug": "eda-sablonu", "category": "data-preparation"},
      {"title": "Çoklu Doğrusallık ve VIF Notları", "tag": "Makine Öğrenimi", "blurb": "Çoklu doğrusallık problemi (Multicollinearity) ve VIF çözümleri üzerine teknik notlar.", "file": "/assets/notes/multicollinearity_notlari.md", "slug": "multicollinearity-notlari", "category": "data-preparation"},
      {"title": "Map Encoding", "tag": "Makine Öğrenimi", "blurb": "Map fonksiyonu ile verilerin yeniden etiketlenmesi ve dönüştürülmesi.", "file": "/assets/notes/map_encoding.md", "slug": "map-encoding", "category": "data-preparation"},
      {"title": "Ordinal ve Map Karşılaştırması", "tag": "Makine Öğrenimi", "blurb": "Sıralı veri türleri için Ordinal ve Map dönüşümleri arasındaki benzerlik/farklılıklar.", "file": "/assets/notes/ordinal_vs_map.md", "slug": "ordinal-vs-map", "category": "data-preparation"},
      {
        title: "Low-Code / No-Code Görsel Uygulama Notu",
        tag: "Low-Code / No-Code",
        category: "low-code",
        blurb: "Low-Code / No-Code görsel uygulama notu · 2026.",
        file: "/assets/notes/low-code-no-code-gorsel-uygulama-notu-2026.pdf"
      }
    ],

    /* Komut paleti (Ctrl/Cmd + K). Projeler data/projects.js'ten otomatik eklenir. */
    commands: [
      { group: "Sayfalar", label: "Home", href: "/#hero" },
      { group: "Sayfalar", label: "Selected Work", href: "/#projeler" },
      { group: "Sayfalar", label: "Explore Projects", href: "/#kesfet" },
      { group: "Sayfalar", label: "Experience", href: "/#deneyim" },
      { group: "Sayfalar", label: "About", href: "/#hakkimda" },
      { group: "Sayfalar", label: "Notes", href: "/#notlar" },
      { group: "Sayfalar", label: "Contact", href: "/#iletisim" },
      { group: "Bağlantılar", label: "GitHub", href: "https://github.com/nihatkutukoglu", external: true },
      { group: "Bağlantılar", label: "LinkedIn", href: "https://www.linkedin.com/in/nihatkutukoglu", external: true },
      { group: "Bağlantılar", label: "Resume / CV (PDF)", href: "/nihat-kutukoglu-cv.pdf", external: true },
      { group: "Bağlantılar", label: "E-posta gönder", href: "mailto:kutukoglunihat1@gmail.com" },
      { group: "Eylemler", label: "Temayı değiştir", action: "theme" }
    ]
  };
})();
