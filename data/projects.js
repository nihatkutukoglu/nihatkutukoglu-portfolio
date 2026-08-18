/* Tüm proje içerikleri tek kaynakta. Yeni proje eklemek için diziye bir nesne ekleyin.
   group: "featured" | "labs" | "web"
   tags:  filtre anahtarları -> "ds" | "ml" | "research" | "web"  */
window.PROJECTS = [
  {
    id: "agartha",
    group: "featured",
    title: "Agartha Intelligence Suite",
    category: "Data Science · NLP · Machine Learning · Decision Intelligence",
    summary:
      "Pazar istihbaratı, havacılık güvenliği ve havalimanı analitiğini tek bir Streamlit karar destek platformunda birleştiren modüler veri ürünü.",
    metrics: ["3 analitik modül", "73 şirket · 162 ürün", "Docker + health check"],
    tech: ["Python", "Sentence Transformers", "Scikit-learn", "Streamlit", "Plotly", "Docker"],
    image: "assets/images/proj-agartha.webp",
    imageAlt: "Agartha Intelligence Suite — PCA pazar haritası grafiği",
    github: "https://github.com/nihatkutukoglu/agartha-intelligence-suite",
    tags: ["ds", "ml"],
    study: {
      problem:
        "Rakip analizi, havacılık güvenlik raporları ve havalimanı performansı birbirinden kopuk kaynaklarda duruyor; karar vericinin üçünü aynı arayüzde karşılaştırma imkânı yok.",
      dataset:
        "Açık kaynak şirket/ürün verileri (73 şirket, 162 ürün, 165 kaynak), ASRS havacılık güvenlik raporları ve Türkiye geneli DHMİ yolcu–kargo–uçuş istatistikleri.",
      approach:
        "Modül 1'de Sentence Transformers tabanlı semantic similarity, K-Means, PCA/UMAP ve feature gap analizi; Modül 2'de NLP tabanlı olay analizi ve metin sınıflandırma; Modül 3'te KPI analizi, K=3 segmentasyon ve peer group karşılaştırması.",
      result:
        "Tek giriş noktası ve kalıcı modül navigasyonu olan Streamlit platformu: canlı veri/model hazırlık durumu, portföy KPI'ları, etkileşimli Plotly görselleri, CSV dışa aktarma, yerel ML çıkarımı, health check ve Docker dağıtımı."
    }
  },
  {
    id: "goc",
    group: "featured",
    title: "Türkiye İç Göç Atlası",
    category: "Data Science · Machine Learning · Network Analysis",
    summary:
      "2008–2025 TÜİK verileriyle Türkiye'nin iç göç dinamiklerini analiz eden, model persistence ve dashboard'a kadar giden uçtan uca veri ürünü.",
    metrics: ["116.640 akış", "81 il", "18 yıl", "4 göç profili"],
    tech: ["Python", "Pandas", "Scikit-learn", "NetworkX", "Plotly", "Streamlit"],
    image: "assets/images/proj-goc.webp",
    imageAlt: "Türkiye İç Göç Atlası — 2025 net göç grafiği",
    github: "https://github.com/nihatkutukoglu/turkiye-ic-goc-atlasi",
    tags: ["ds", "ml"],
    study: {
      problem:
        "Tek yıllık net göç sıralaması; hareket hacmini, oynaklığı, uzun dönem eğilimini ve kaynak–hedef bağlantılarını gizliyor. Aynı hareketi iki kez saymadan akış semantiğini doğrulamak gerekiyor.",
      dataset:
        "TÜİK iller arası göç (2008–2025, yıl × kaynak il × hedef il, 116.640 yönlü akış), 2025 il göç özeti, yaş–cinsiyet ve eğitim–göç nedeni tabloları. Ham dosyalar reproducibility için depoda korunuyor.",
      approach:
        "Veri doğrulama, keşifçi analiz, NetworkX ile yönlü koridor/ağ analizi, uzun dönem feature engineering (hareketlilik hızı, net göç, volatilite, trend), K-Means ve HDBSCAN ile kümeleme; Silhouette, Davies–Bouldin ve Calinski–Harabasz ile küme seçimi ve stabilite kontrolü.",
      result:
        "Preprocessing + K-Means adımlarını tek Scikit-learn Pipeline'ında saklayan production modeli ve interaktif Streamlit dashboard. Bulgulardan: 2023 zirvesi 3.450.953 kişi, 2025 toplamı 2.475.019 kişi (%7,7 düşüş), en büyük koridor İstanbul → Kocaeli (23.723 kişi)."
    }
  },
  {
    id: "safranbolu",
    group: "featured",
    title: "Safranbolu Turizm Analitiği",
    category: "Data Analytics · Geospatial · Decision Support",
    summary:
      "Karabük ve Safranbolu turizmini zaman, mekân ve bölgesel profil ekseninde inceleyen yönetici seviyesinde karar destek sistemi.",
    metrics: ["500×500 m grid", "5 dashboard sayfası", "KTB + OpenStreetMap"],
    tech: ["Python", "Streamlit", "GeoPandas", "OSMnx", "K-Means", "Plotly"],
    art: "map",
    github: "https://github.com/nihatkutukoglu/safranbolu-turizm-analitigi",
    tags: ["ds", "ml"],
    study: {
      problem:
        "Turizm kararları çoğunlukla toplam konaklama sayısına bakılarak veriliyor; mevsimsellik, mekânsal altyapı dağılımı ve bölge profilleri birlikte değerlendirilmiyor.",
      dataset:
        "T.C. Kültür ve Turizm Bakanlığı 2025 il/ilçe konaklama kapasiteleri ve aylık bültenleri; OpenStreetMap üzerinden çekilen güncel turizm noktaları (POI).",
      approach:
        "Mevsimsellik ve trend analizi, 500×500 metre grid tabanlı mekânsal yoğunluk analizi, konaklama çevre analizi, K-Means ile bölgesel profilleme ve turistik çekim–destekleyici hizmet quadrant analizi.",
      result:
        "Beş sayfalık Streamlit paneli: yönetici özeti KPI'ları, detaylı grafikler, etkileşimli haritalar, profil heatmap'leri ve kullanılan yöntemlerin sınırlılıklarını açıklayan metodoloji sayfası. Sistem kesin yatırım kararı vermek için değil, kararları veriyle desteklemek için kurgulandı."
    }
  },
  {
    id: "gaziantep",
    group: "featured",
    title: "Gaziantep Kentsel Sorunlar Veri Bilimi",
    category: "Urban Analytics · Machine Learning",
    summary:
      "Gaziantep Büyükşehir Belediyesi çağrı merkezine gelen ~38.000 vatandaş talebini yönetici seviyesinde stratejiye çeviren analiz ve dashboard.",
    metrics: ["~38.000 şikâyet", "2 mahalle profili", "Pareto 80/20"],
    tech: ["Python", "Pandas", "Scikit-learn", "SMOTE", "Streamlit", "Seaborn"],
    art: "grid",
    github: "https://github.com/nihatkutukoglu/gaziantep-veri-bilimi-projesi",
    tags: ["ds", "ml"],
    study: {
      problem:
        "Çağrı merkezi kayıtları kurum içinde birikiyor ancak hangi mahallede hangi hizmetin önceliklendirileceği veriyle gösterilmiyor.",
      dataset:
        "GİKOM çağrı merkezine 2019 yılında gelen yaklaşık 38.000 vatandaş şikâyet ve talep kaydı (konu, ilçe/mahalle, demografi).",
      approach:
        "EDA ve Pareto analizi, K-Means ile mahalle kümeleme, Random Forest + SMOTE ile aciliyet sınıflandırma denemesi, LazyPredict ile model karşılaştırması.",
      result:
        "İlk 20 mahallenin şikâyetlerin ~%80'ini oluşturduğu doğrulandı; şehir 'ulaşım krizindeki bölgeler' ve 'altyapı/çevre sorunlu bölgeler' olarak iki profile ayrıldı. Aciliyet sınıflandırmasının yüzeysel kategorik veriyle çalışmadığı açıkça raporlandı ve çözüm olarak şikâyet metni üzerinde NLP katmanı önerildi."
    }
  },

  /* ---------- Research / Data Work ---------- */
  {
    id: "presidents",
    group: "labs",
    title: "European Presidents Dataset V4",
    category: "Research · Dataset Engineering · Data Quality",
    summary:
      "1926–2026 Avrupa cumhurbaşkanlarına dair seçim, biyografi, eğitim, meslek ve parti/ideoloji katmanlarını birleştiren, kaynak denetimli veri seti.",
    metrics: ["328 görev dönemi", "314 lider", "Overall quality 80,6/100"],
    tech: ["Python", "Pandas", "Wikidata", "ParlGov / CHES", "EDA"],
    github: "https://github.com/nihatkutukoglu/european-presidents-dataset-v4",
    tags: ["research", "ds"],
    study: {
      problem:
        "Avrupa cumhurbaşkanlarına dair veri dağınık; seçim sonuçları, lider özgeçmişi ve parti/ideoloji bilgileri karşılaştırılabilir tek bir tabloda bulunmuyor.",
      dataset:
        "328 görev dönemi satırı, 314 benzersiz lider (1926–2026). Kaynaklar: PLAD/Cursus Honorum, Wikidata, ParlGov ve CHES; seçim katmanı önceki sürümden doğrulanarak korundu.",
      approach:
        "Sürüm bazlı zenginleştirme (V3 alanları overwrite edilmeden), toplu Wikidata sorguları, gözden geçirilmiş QID eşlemesi, ACADEMIC_MATCH / CURATED_REVIEWED / CONFLICTING gibi açık güven seviyeleri ve provenance kolonları.",
      result:
        "Coverage: gender ve education_level %29,6 → %100, birth_year %27,4 → %99,7, main_university %0 → %61,6. Sayısal ideoloji skoru yalnızca kaynak destekli satırlarda tutuldu; otoriter/tek-parti bağlamlarda sol–sağ skoru zorlanmadı. Kalite skorları raporda açıkça yayımlandı."
    }
  },

  /* ---------- Labs & Experiments ---------- */
  {
    id: "credit-card",
    group: "labs",
    title: "Credit Card Approval ML",
    category: "Machine Learning · Classification",
    summary: "Kredi kartı başvurularının onay tahmini üzerine sınıflandırma çalışması.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    github: "https://github.com/nihatkutukoglu/Credit-Card-Approval-ML",
    tags: ["ml"]
  },
  {
    id: "online-shoppers",
    group: "labs",
    title: "Online Shoppers Intention",
    category: "Machine Learning · Behavioral Analytics",
    summary: "Oturum verisinden satın alma niyetinin tahmin edilmesi üzerine sınıflandırma çalışması.",
    tech: ["Python", "Scikit-learn", "EDA"],
    github: "https://github.com/nihatkutukoglu/online-shoppers-intention",
    tags: ["ml"]
  },
  {
    id: "kurye",
    group: "labs",
    title: "Kurye Data",
    category: "Data Analysis · Operations",
    summary: "Kurye teslimat verisi üzerinde keşifçi analiz ve operasyonel metrik çıkarımı.",
    tech: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/nihatkutukoglu/kurye-data",
    tags: ["ds"]
  },
  {
    id: "country-clustering",
    group: "labs",
    title: "Country Data Clustering",
    category: "Machine Learning · Clustering",
    summary: "Ülke göstergeleri üzerinden gözetimsiz öğrenme ile segmentasyon.",
    tech: ["Python", "K-Means", "PCA"],
    github: "https://github.com/nihatkutukoglu/country-data-clustering",
    tags: ["ml"]
  },
  {
    id: "bank",
    group: "labs",
    title: "Banka Müşteri Davranışı Sınıflandırma",
    category: "Machine Learning · Streamlit",
    summary:
      "Vadeli mevduat açma olasılığını tahmin eden Random Forest modeli ve Streamlit üzerinde what-if simülasyon arayüzü.",
    tech: ["Python", "Random Forest", "Streamlit"],
    github: "https://github.com/nihatkutukoglu/bank-siniflandirma-sunum-ekip",
    tags: ["ml"]
  },
  {
    id: "kmeans-customer",
    group: "labs",
    title: "Müşteri Segmentasyonu (RFM + K-Means)",
    category: "Data Analytics · Clustering",
    summary: "E-ticaret davranış verisi üzerinde RFM analizi ve K-Means ile müşteri segmentasyonu.",
    tech: ["Python", "Pandas", "Scikit-learn", "Seaborn"],
    github: "https://github.com/nihatkutukoglu/kmeans-customer",
    tags: ["ds", "ml"]
  },
  {
    id: "regresyon",
    group: "labs",
    title: "Python Regresyon Projeleri",
    category: "Machine Learning · Regression",
    summary: "Farklı veri setlerinde uçtan uca regresyon pipeline'larının uygulandığı çalışma deposu.",
    tech: ["Python", "Scikit-learn", "Pipeline"],
    github: "https://github.com/nihatkutukoglu/python-regresyon-projeleri",
    tags: ["ml"]
  },
  {
    id: "orman",
    group: "labs",
    title: "Cezayir Orman Yangınları — Regresyon",
    category: "Machine Learning · Regression",
    summary: "Cezayir orman yangınları veri seti üzerinde makine öğrenmesi ve regresyon analizi.",
    tech: ["Python", "Scikit-learn", "EDA"],
    github: "https://github.com/nihatkutukoglu/cezayir-orman-yanginlari",
    tags: ["ml"]
  },
  {
    id: "askeri",
    group: "labs",
    title: "Küresel Askeri Güç Analizi",
    category: "Data Analysis · Visualization",
    summary: "133 ülkenin askeri gücünü, ekonomik korelasyonlarını ve varlık dağılımını inceleyen analiz.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    github: "https://github.com/nihatkutukoglu/kuresel-askeri-analiz-veri-gorsellestirme",
    tags: ["ds"]
  },
  {
    id: "sql-sirketler",
    group: "labs",
    title: "Eski Şirketler SQL Veritabanı",
    category: "SQL · Database Design",
    summary: "Dünyanın en eski şirketlerine ait şema, veri ve örnek sorgulardan oluşan veritabanı projesi.",
    tech: ["SQL", "Şema Tasarımı", "JOIN / Aggregation"],
    github: "https://github.com/nihatkutukoglu/eski-sirketler-sql-veritabani",
    tags: ["ds"]
  },
  {
    id: "yangin-db",
    group: "labs",
    title: "Temmuz 2025 Yangın Veritabanı",
    category: "SQL · Data Modeling",
    summary:
      "Türkiye'de Temmuz 2025 yangın olaylarını konum, neden ve zaman ekseninde saklayan SQL veritabanı projesi.",
    tech: ["SQL", "Veri Modelleme"],
    github: "https://github.com/nihatkutukoglu/temmuz2025-yangin-veritabani-projesi",
    tags: ["ds"]
  },

  /* ---------- Web & Product Development ---------- */
  {
    id: "tekmenu",
    group: "web",
    title: "TekMenü QR",
    category: "Web · SaaS",
    summary: "İşletmeler için dijital QR menü uygulaması.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/tekmenu-qr",
    demo: "https://tekmenu-qr.vercel.app",
    tags: ["web"]
  },
  {
    id: "teknova",
    group: "web",
    title: "TekNova",
    category: "Web · Dijital Çözümler",
    summary: "KOBİ ve esnafa yönelik web ve dijital tanıtım çözümleri markasının kurumsal sitesi.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/TekNova",
    demo: "https://teknova-roan.vercel.app",
    tags: ["web"]
  },
  {
    id: "ozol",
    group: "web",
    title: "Özol İş Makineleri",
    category: "Web · Kurumsal Site",
    summary: "İş makineleri firması için kurumsal tanıtım sitesi.",
    tech: ["TypeScript", "Next.js"],
    github: "https://github.com/nihatkutukoglu/ozol-is-makineleri",
    demo: "https://ozol-is-makineleri.vercel.app",
    tags: ["web"]
  },
  {
    id: "esnafpusula",
    group: "web",
    title: "Esnaf Pusula AI",
    category: "Web · Applied AI",
    summary: "Yerel işletmeler için yapay zekâ destekli dijital görünürlük ve rehber uygulaması.",
    tech: ["JavaScript", "Web"],
    github: "https://github.com/nihatkutukoglu/esnafpusulaai",
    demo: "https://esnafpusulaai.vercel.app",
    tags: ["web"]
  },
  {
    id: "executive",
    group: "web",
    title: "Executive Strategic Platform",
    category: "Web · Dashboard",
    summary: "Yönetici seviyesinde strateji ve gösterge takibi için geliştirilen web paneli prototipi.",
    tech: ["JavaScript", "Dashboard"],
    github: "https://github.com/nihatkutukoglu/executive-strategic-platform",
    demo: "https://executive-strategic-platform.vercel.app",
    tags: ["web"]
  },
  {
    id: "bizimbandirma",
    group: "web",
    title: "Bizim Bandırma",
    category: "Web · Yerel Platform",
    summary: "Bandırma için yerel dijital rehber ve içerik platformu.",
    tech: ["Web", "İçerik Yönetimi"],
    demo: "https://bizimbandirma.com.tr",
    tags: ["web"]
  }
];
