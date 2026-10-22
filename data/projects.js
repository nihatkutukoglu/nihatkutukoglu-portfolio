/* Tüm proje içerikleri tek kaynakta. Yeni proje eklemek için diziye bir nesne ekleyin.
   group:      "data" (Data · AI · Research) | "web" (Software · Client Work)
   featured:   true → Selected Work vitrini (dizideki sıra korunur)
   slug:       varsa + study → /projects/<slug> case study sayfası üretilir (node scripts/build.mjs)
   categories: filtre anahtarları → "ds" | "ml" | "analytics" | "research" | "software" | "web"
   status:     "production" (canlı) | "experiment" | "client"
   study:      problem, dataset, approach, pipeline[], findings[], result, limitations[] — boş alan gösterilmez */
window.PROJECTS = [
  {
    id: "agartha",
    slug: "agartha-intelligence-suite",
    group: "data",
    featured: true,
    title: "Agartha Intelligence Suite",
    category: "Data Science · NLP · Machine Learning · Decision Intelligence",
    summary:
      "Pazar istihbaratı, havacılık güvenliği ve havalimanı analitiğini tek bir Streamlit karar destek platformunda birleştiren modüler veri ürünü.",
    metrics: ["3 analitik modül", "73 şirket · 162 ürün", "Docker + health check"],
    tech: ["Python", "Sentence Transformers", "Scikit-learn", "Streamlit", "Plotly", "Docker"],
    image: "assets/images/proj-agartha.webp",
    imageWidth: 1000,
    imageHeight: 700,
    imageAlt: "Agartha Intelligence Suite — PCA pazar haritası grafiği",
    github: "https://github.com/nihatkutukoglu/agartha-intelligence-suite",
    categories: ["ds", "ml", "analytics", "software"],
    study: {
      problem:
        "Rakip analizi, havacılık güvenlik raporları ve havalimanı performansı birbirinden kopuk kaynaklarda duruyor; karar vericinin üçünü aynı arayüzde karşılaştırma imkânı yok.",
      dataset:
        "Açık kaynak şirket/ürün verileri (73 şirket, 162 ürün, 165 kaynak), ASRS havacılık güvenlik raporları ve Türkiye geneli DHMİ yolcu–kargo–uçuş istatistikleri.",
      approach:
        "Modül 1'de Sentence Transformers tabanlı semantic similarity, K-Means, PCA/UMAP ve feature gap analizi; Modül 2'de NLP tabanlı olay analizi ve metin sınıflandırma; Modül 3'te KPI analizi, K=3 segmentasyon ve peer group karşılaştırması.",
      pipeline: [
        "Şirket/ürün · ASRS · DHMİ verisi",
        "Semantic embedding (Sentence Transformers)",
        "K-Means · PCA/UMAP · feature gap",
        "NLP olay analizi & metin sınıflandırma",
        "KPI analizi · K=3 segmentasyon",
        "Streamlit platformu + Docker"
      ],
      result:
        "Tek giriş noktası ve kalıcı modül navigasyonu olan Streamlit platformu: canlı veri/model hazırlık durumu, portföy KPI'ları, etkileşimli Plotly görselleri, CSV dışa aktarma, yerel ML çıkarımı, health check ve Docker dağıtımı."
    }
  },
  {
    id: "goc",
    slug: "turkiye-ic-goc-atlasi",
    group: "data",
    featured: true,
    title: "Türkiye İç Göç Atlası",
    category: "Data Science · Machine Learning · Network Analysis",
    summary:
      "2008–2025 TÜİK verileriyle Türkiye'nin iç göç dinamiklerini analiz eden, model persistence ve dashboard'a kadar giden uçtan uca veri ürünü.",
    metrics: ["116.640 akış", "81 il", "18 yıl", "4 göç profili"],
    tech: ["Python", "Pandas", "Scikit-learn", "NetworkX", "Plotly", "Streamlit"],
    image: "assets/images/proj-goc.webp",
    imageWidth: 1000,
    imageHeight: 744,
    imageAlt: "Türkiye İç Göç Atlası — 2025 net göç grafiği",
    github: "https://github.com/nihatkutukoglu/turkiye-ic-goc-atlasi",
    categories: ["ds", "ml", "analytics"],
    study: {
      problem:
        "Tek yıllık net göç sıralaması; hareket hacmini, oynaklığı, uzun dönem eğilimini ve kaynak–hedef bağlantılarını gizliyor. Aynı hareketi iki kez saymadan akış semantiğini doğrulamak gerekiyor.",
      dataset:
        "TÜİK iller arası göç (2008–2025, yıl × kaynak il × hedef il, 116.640 yönlü akış), 2025 il göç özeti, yaş–cinsiyet ve eğitim–göç nedeni tabloları. Ham dosyalar reproducibility için depoda korunuyor.",
      approach:
        "Veri doğrulama, keşifçi analiz, NetworkX ile yönlü koridor/ağ analizi, uzun dönem feature engineering (hareketlilik hızı, net göç, volatilite, trend), K-Means ve HDBSCAN ile kümeleme; Silhouette, Davies–Bouldin ve Calinski–Harabasz ile küme seçimi ve stabilite kontrolü.",
      pipeline: [
        "TÜİK ham verisi (2008–2025)",
        "Veri doğrulama",
        "Keşifçi analiz (EDA)",
        "Yönlü ağ analizi (NetworkX)",
        "Feature engineering",
        "K-Means · HDBSCAN",
        "Silhouette · Davies–Bouldin · Calinski–Harabasz",
        "Scikit-learn Pipeline + Streamlit"
      ],
      findings: [
        "2023 zirvesi: 3.450.953 kişi.",
        "2025 toplamı: 2.475.019 kişi (%7,7 düşüş).",
        "En büyük koridor: İstanbul → Kocaeli (23.723 kişi)."
      ],
      result:
        "Preprocessing + K-Means adımlarını tek Scikit-learn Pipeline'ında saklayan production modeli ve interaktif Streamlit dashboard."
    }
  },
  {
    id: "safranbolu",
    slug: "safranbolu-turizm-analitigi",
    group: "data",
    featured: true,
    title: "Safranbolu Turizm Analitiği",
    category: "Data Analytics · Geospatial · Decision Support",
    summary:
      "Karabük ve Safranbolu turizmini zaman, mekân ve bölgesel profil ekseninde inceleyen yönetici seviyesinde karar destek sistemi.",
    metrics: ["500×500 m grid", "5 dashboard sayfası", "KTB + OpenStreetMap"],
    tech: ["Python", "Streamlit", "GeoPandas", "OSMnx", "K-Means", "Plotly"],
    art: "map",
    github: "https://github.com/nihatkutukoglu/safranbolu-turizm-analitigi",
    categories: ["ds", "ml", "analytics"],
    study: {
      problem:
        "Turizm kararları çoğunlukla toplam konaklama sayısına bakılarak veriliyor; mevsimsellik, mekânsal altyapı dağılımı ve bölge profilleri birlikte değerlendirilmiyor.",
      dataset:
        "T.C. Kültür ve Turizm Bakanlığı 2025 il/ilçe konaklama kapasiteleri ve aylık bültenleri; OpenStreetMap üzerinden çekilen güncel turizm noktaları (POI).",
      approach:
        "Mevsimsellik ve trend analizi, 500×500 metre grid tabanlı mekânsal yoğunluk analizi, konaklama çevre analizi, K-Means ile bölgesel profilleme ve turistik çekim–destekleyici hizmet quadrant analizi.",
      pipeline: [
        "KTB bültenleri + OpenStreetMap POI",
        "Mevsimsellik & trend analizi",
        "500×500 m grid yoğunluk analizi",
        "Konaklama çevre analizi",
        "K-Means bölgesel profilleme",
        "Çekim–hizmet quadrant analizi",
        "5 sayfalık Streamlit paneli"
      ],
      result:
        "Beş sayfalık Streamlit paneli: yönetici özeti KPI'ları, detaylı grafikler, etkileşimli haritalar, profil heatmap'leri ve kullanılan yöntemlerin sınırlılıklarını açıklayan metodoloji sayfası.",
      limitations: [
        "Sistem kesin yatırım kararı vermek için değil, kararları veriyle desteklemek için kurgulandı."
      ]
    }
  },
  {
    id: "gaziantep",
    slug: "gaziantep-kentsel-sorunlar",
    group: "data",
    featured: true,
    title: "Gaziantep Kentsel Sorunlar Veri Bilimi",
    category: "Urban Analytics · Machine Learning",
    summary:
      "Gaziantep Büyükşehir Belediyesi çağrı merkezine gelen ~38.000 vatandaş talebini yönetici seviyesinde stratejiye çeviren analiz ve dashboard.",
    metrics: ["~38.000 şikâyet", "2 mahalle profili", "Pareto 80/20"],
    tech: ["Python", "Pandas", "Scikit-learn", "SMOTE", "Streamlit", "Seaborn"],
    art: "pareto",
    github: "https://github.com/nihatkutukoglu/gaziantep-veri-bilimi-projesi",
    categories: ["ds", "ml", "analytics"],
    study: {
      problem:
        "Çağrı merkezi kayıtları kurum içinde birikiyor ancak hangi mahallede hangi hizmetin önceliklendirileceği veriyle gösterilmiyor.",
      dataset:
        "GİKOM çağrı merkezine 2019 yılında gelen yaklaşık 38.000 vatandaş şikâyet ve talep kaydı (konu, ilçe/mahalle, demografi).",
      approach:
        "EDA ve Pareto analizi, K-Means ile mahalle kümeleme, Random Forest + SMOTE ile aciliyet sınıflandırma denemesi, LazyPredict ile model karşılaştırması.",
      pipeline: [
        "GİKOM kayıtları (~38.000)",
        "Keşifçi analiz (EDA)",
        "Pareto analizi",
        "K-Means mahalle kümeleme",
        "Random Forest + SMOTE",
        "LazyPredict karşılaştırması",
        "Streamlit dashboard"
      ],
      findings: [
        "İlk 20 mahallenin şikâyetlerin ~%80'ini oluşturduğu doğrulandı.",
        "Şehir 'ulaşım krizindeki bölgeler' ve 'altyapı/çevre sorunlu bölgeler' olarak iki profile ayrıldı."
      ],
      limitations: [
        "Aciliyet sınıflandırmasının yüzeysel kategorik veriyle çalışmadığı açıkça raporlandı; çözüm olarak şikâyet metni üzerinde NLP katmanı önerildi."
      ]
    }
  },
  {
    id: "presidents",
    slug: "european-presidents-dataset-v4",
    group: "data",
    featured: true,
    title: "European Presidents Dataset V4",
    category: "Research · Dataset Engineering · Data Quality",
    summary:
      "1926–2026 Avrupa cumhurbaşkanlarına dair seçim, biyografi, eğitim, meslek ve parti/ideoloji katmanlarını birleştiren, kaynak denetimli veri seti.",
    metrics: ["328 görev dönemi", "314 lider", "Overall quality 80,6/100"],
    tech: ["Python", "Pandas", "Wikidata", "ParlGov / CHES", "EDA"],
    art: "table",
    github: "https://github.com/nihatkutukoglu/european-presidents-dataset-v4",
    categories: ["research", "ds"],
    study: {
      problem:
        "Avrupa cumhurbaşkanlarına dair veri dağınık; seçim sonuçları, lider özgeçmişi ve parti/ideoloji bilgileri karşılaştırılabilir tek bir tabloda bulunmuyor.",
      dataset:
        "328 görev dönemi satırı, 314 benzersiz lider (1926–2026). Kaynaklar: PLAD/Cursus Honorum, Wikidata, ParlGov ve CHES; seçim katmanı önceki sürümden doğrulanarak korundu.",
      approach:
        "Sürüm bazlı zenginleştirme (V3 alanları overwrite edilmeden), toplu Wikidata sorguları, gözden geçirilmiş QID eşlemesi, ACADEMIC_MATCH / CURATED_REVIEWED / CONFLICTING gibi açık güven seviyeleri ve provenance kolonları.",
      pipeline: [
        "PLAD · Wikidata · ParlGov · CHES",
        "Toplu Wikidata sorguları",
        "QID eşleme incelemesi",
        "Sürüm bazlı zenginleştirme (V3 korunarak)",
        "Güven seviyeleri & provenance",
        "Coverage ve kalite raporu"
      ],
      findings: [
        "Coverage — gender ve education_level: %29,6 → %100.",
        "Coverage — birth_year: %27,4 → %99,7.",
        "Coverage — main_university: %0 → %61,6.",
        "Kalite skorları raporda açıkça yayımlandı."
      ],
      limitations: [
        "Sayısal ideoloji skoru yalnızca kaynak destekli satırlarda tutuldu; otoriter/tek-parti bağlamlarda sol–sağ skoru zorlanmadı."
      ]
    }
  },

  /* ---------- Labs & Experiments ---------- */
  {
    id: "credit-card",
    group: "data",
    status: "experiment",
    title: "Credit Card Approval ML",
    category: "Machine Learning · Classification",
    summary: "Kredi kartı başvurularının onay tahmini üzerine sınıflandırma çalışması.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/nihatkutukoglu/Credit-Card-Approval-ML",
    categories: ["ml"]
  },
  {
    id: "online-shoppers",
    group: "data",
    status: "experiment",
    title: "Online Shoppers Intention",
    category: "Machine Learning · Behavioral Analytics",
    summary: "Oturum verisinden satın alma niyetinin tahmin edilmesi üzerine sınıflandırma çalışması.",
    tech: ["Python", "Scikit-learn", "EDA"],
    github: "https://github.com/nihatkutukoglu/online-shoppers-intention",
    categories: ["ml", "analytics"]
  },
  {
    id: "kurye",
    group: "data",
    status: "experiment",
    title: "Kurye Data",
    category: "Data Analysis · Operations",
    summary: "Kurye teslimat verisi üzerinde keşifçi analiz ve operasyonel metrik çıkarımı.",
    tech: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/nihatkutukoglu/kurye-data",
    categories: ["ds", "analytics"]
  },
  {
    id: "country-clustering",
    group: "data",
    status: "experiment",
    title: "Country Data Clustering",
    category: "Machine Learning · Clustering",
    summary: "Ülke göstergeleri üzerinden gözetimsiz öğrenme ile segmentasyon.",
    tech: ["Python", "K-Means", "PCA"],
    github: "https://github.com/nihatkutukoglu/country-data-clustering",
    categories: ["ml"]
  },
  {
    id: "bank",
    group: "data",
    status: "experiment",
    title: "Banka Müşteri Davranışı Sınıflandırma",
    category: "Machine Learning · Streamlit",
    summary:
      "Vadeli mevduat açma olasılığını tahmin eden Random Forest modeli ve Streamlit üzerinde what-if simülasyon arayüzü.",
    tech: ["Python", "Random Forest", "Streamlit"],
    github: "https://github.com/nihatkutukoglu/bank-siniflandirma-sunum-ekip",
    categories: ["ml"]
  },
  {
    id: "kmeans-customer",
    group: "data",
    status: "experiment",
    title: "Müşteri Segmentasyonu (RFM + K-Means)",
    category: "Data Analytics · Clustering",
    summary: "E-ticaret davranış verisi üzerinde RFM analizi ve K-Means ile müşteri segmentasyonu.",
    tech: ["Python", "Pandas", "Scikit-learn", "Seaborn"],
    github: "https://github.com/nihatkutukoglu/kmeans-customer",
    categories: ["ds", "ml", "analytics"]
  },
  {
    id: "regresyon",
    group: "data",
    status: "experiment",
    title: "Python Regresyon Projeleri",
    category: "Machine Learning · Regression",
    summary: "Farklı veri setlerinde uçtan uca regresyon pipeline'larının uygulandığı çalışma deposu.",
    tech: ["Python", "Scikit-learn", "Pipeline"],
    github: "https://github.com/nihatkutukoglu/python-regresyon-projeleri",
    categories: ["ml"]
  },
  {
    id: "orman",
    group: "data",
    status: "experiment",
    title: "Cezayir Orman Yangınları — Regresyon",
    category: "Machine Learning · Regression",
    summary: "Cezayir orman yangınları veri seti üzerinde makine öğrenmesi ve regresyon analizi.",
    tech: ["Python", "Scikit-learn", "EDA"],
    github: "https://github.com/nihatkutukoglu/cezayir-orman-yanginlari",
    categories: ["ml"]
  },
  {
    id: "askeri",
    group: "data",
    status: "experiment",
    title: "Küresel Askeri Güç Analizi",
    category: "Data Analysis · Visualization",
    summary: "133 ülkenin askeri gücünü, ekonomik korelasyonlarını ve varlık dağılımını inceleyen analiz.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    github: "https://github.com/nihatkutukoglu/kuresel-askeri-analiz-veri-gorsellestirme",
    categories: ["ds", "analytics"]
  },
  {
    id: "sql-sirketler",
    group: "data",
    status: "experiment",
    title: "Eski Şirketler SQL Veritabanı",
    category: "SQL · Database Design",
    summary: "Dünyanın en eski şirketlerine ait şema, veri ve örnek sorgulardan oluşan veritabanı projesi.",
    tech: ["SQL", "Şema Tasarımı", "JOIN / Aggregation"],
    github: "https://github.com/nihatkutukoglu/eski-sirketler-sql-veritabani",
    categories: ["ds"]
  },
  {
    id: "yangin-db",
    group: "data",
    status: "experiment",
    title: "Temmuz 2025 Yangın Veritabanı",
    category: "SQL · Data Modeling",
    summary:
      "Türkiye'de Temmuz 2025 yangın olaylarını konum, neden ve zaman ekseninde saklayan SQL veritabanı projesi.",
    tech: ["SQL", "Veri Modelleme"],
    github: "https://github.com/nihatkutukoglu/temmuz2025-yangin-veritabani-projesi",
    categories: ["ds"]
  },

  /* ---------- Software · Client Work ---------- */
  {
    id: "tekmenu",
    group: "web",
    status: "production",
    title: "TekMenü QR",
    category: "Web · SaaS",
    summary: "İşletmeler için dijital QR menü uygulaması.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/tekmenu-qr",
    demo: "https://tekmenu-qr.vercel.app",
    categories: ["software", "web"]
  },
  {
    id: "teknova",
    group: "web",
    status: "production",
    title: "TekNova",
    category: "Web · Dijital Çözümler",
    summary: "KOBİ ve esnafa yönelik web ve dijital tanıtım çözümleri markasının kurumsal sitesi.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/TekNova",
    demo: "https://teknova-roan.vercel.app",
    categories: ["software", "web"]
  },
  {
    id: "ozol",
    group: "web",
    status: "client",
    title: "Özol İş Makineleri",
    category: "Web · Kurumsal Site",
    summary: "İş makineleri firması için kurumsal tanıtım sitesi.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/ozol-is-makineleri",
    demo: "https://ozol-is-makineleri.vercel.app",
    categories: ["software", "web"]
  },
  {
    id: "esnafpusula",
    group: "web",
    status: "production",
    title: "Esnaf Pusula AI",
    category: "Web · Applied AI",
    summary: "Yerel işletmeler için yapay zekâ destekli dijital görünürlük ve rehber uygulaması.",
    tech: ["JavaScript", "Web"],
    github: "https://github.com/nihatkutukoglu/esnafpusulaai",
    demo: "https://esnafpusulaai.vercel.app",
    categories: ["software", "web", "ml"]
  },
  {
    id: "executive",
    group: "web",
    status: "production",
    title: "Executive Strategic Platform",
    category: "Web · Dashboard",
    summary: "Yönetici seviyesinde strateji ve gösterge takibi için geliştirilen web paneli prototipi.",
    tech: ["JavaScript", "Dashboard"],
    github: "https://github.com/nihatkutukoglu/executive-strategic-platform",
    demo: "https://executive-strategic-platform.vercel.app",
    categories: ["software", "web", "analytics"]
  },
  {
    id: "bizimbandirma",
    group: "web",
    status: "production",
    title: "Bizim Bandırma",
    category: "Web · Yerel Platform",
    summary: "Bandırma için yerel dijital rehber ve içerik platformu.",
    tech: ["Web", "İçerik Yönetimi"],
    demo: "https://bizimbandirma.com.tr",
    categories: ["web"]
  }
];
