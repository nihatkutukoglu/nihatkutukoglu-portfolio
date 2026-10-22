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

    /* Henüz yayınlanmamış yazılar: kartlar "taslak" etiketiyle ilgili case study'ye bağlanır */
    notes: [
      {
        title: "K-Means ne zaman kullanılmalı?",
        tag: "Clustering",
        blurb: "Göç profilleri ve bölgesel turizm segmentasyonunda K-Means'in işe yaradığı ve yetersiz kaldığı noktalar.",
        project: "goc"
      },
      {
        title: "HDBSCAN vs K-Means",
        tag: "Clustering",
        blurb: "Yoğunluk tabanlı ve merkez tabanlı kümelemeyi Silhouette, Davies–Bouldin ve Calinski–Harabasz ile karşılaştırmak.",
        project: "goc"
      },
      {
        title: "EDA Workflow",
        tag: "Analysis",
        blurb: "Kamu verisinde doğrulama, keşifçi analiz ve Pareto ile önceliklendirme için izlediğim adımlar.",
        project: "gaziantep"
      },
      {
        title: "Network Analysis",
        tag: "Graphs",
        blurb: "İller arası göç akışlarını NetworkX ile yönlü ağ olarak modellemek ve koridorları okumak.",
        project: "goc"
      },
      {
        title: "Model Evaluation",
        tag: "ML",
        blurb: "Bir modelin neden çalışmadığını raporlamak: SMOTE, model karşılaştırması ve açıkça yazılan sınırlılıklar.",
        project: "gaziantep"
      },
      {
        title: "Data Product Development",
        tag: "Product",
        blurb: "Analizden Streamlit ve Docker ile çalışan, health check'li bir karar destek ürününe geçiş.",
        project: "agartha"
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
