# Karar Ağaçları (Decision Trees): Kapsamlı Ders Notları

Bu doküman, Makine Öğrenmesi dünyasının en anlaşılır ve yorumlanabilir algoritmalarından biri olan **Karar Ağaçları**'nı (Decision Trees) derinlemesine ele alır. Örnek uygulama olarak **Car Evaluation (Araba Değerlendirme)** veri seti kullanılmıştır.

---

## 1. Karar Ağacı Nedir?

**Karar Ağacı**, veriyi sınıflandırmak için evet/hayır soruları soran, **akış şemasına (flowchart)** benzeyen bir modeldir.

- **İnsan gibi düşünür:** "Maaşı yüksek mi?", "Evli mi?", "Kredisi var mı?" gibi sorularla eleme yapar.
- **Kök Düğüm (Root):** İlk sorunun sorulduğu en tepe nokta.
- **Yaprak (Leaf):** Kararın verildiği en alt noktalar.

---

## 2. Proje Uygulama Adımları (Car Evaluation Örneği)

`car.py` dosyamızda izlediğimiz workflow (iş akışı) şu şekildedir:

### Adım 1: Veriyi Anlama (EDA)

Önce verinin fotoğrafını çektik.

```python
# Veriyi okuma ve sütun isimleri verme
df = pd.read_csv("13-car_evaluation.csv")
new_col_names = ["buying", "maintenance", "doors", "persons", "lug_boot", "safety", "class"]
df.columns = new_col_names

# İnceleme
print(df.info())      # Boş veri var mı? (Bizde yoktu)
print(df.describe())  # İstatistikler
```

### Adım 2: Veri Ön İşleme (Preprocessing)

**Karar Ağaçlarının Altın Kuralı:** Makine sadece sayılardan anlar. "vhigh" (çok yüksek) sözcüğünü makine bilemez.

#### Yöntem: Mapping (Elle Çevirme)

Pandas `.map()` fonksiyonu ile kontrolü elimize aldık.
**Neden LabelEncoder değil de .map kullandık?**
Çünkü verimizde bir **sıralama (hiyerarşi)** vardı.

- `vhigh` (4) > `high` (3) > `med` (2) > `low` (1).
- LabelEncoder (Otomatik çevirici) bunları alfabetik sıraya göre 0, 1, 2 yapabilirdi (`high` harf sırasına göre `med`'den önce gelebilirdi, bu da yanlış olurdu).

```python
# Özel dönüşüm örneği: '5more' ifadesini matematiksel 5 yaptık.
df["doors"] = df["doors"].replace("5more", 5).astype(int)

# String kategorileri sayıya çevirme
df["buying"] = df["buying"].map({"vhigh": 4, "high": 3, "med": 2, "low": 1})
```

### Adım 3: Eğitim ve Test Ayrımı (Split)

Modeli eğitirken kullandığımız soruları sınavda sormamak için veriyi böldük.

```python
# X: Sorular, y: Cevaplar
X = df.drop(["class"], axis=1)
y = df["class"]

# %70 Ders çalışma (Train), %30 Sınav (Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
```

### Adım 4: Model Kurma ve İlk Deneme

İlk denemede modele "Çok derine inme, basit düşün" (`max_depth=3`) dedik.

```python
# criterion="gini": Bölünme yöntemi
# max_depth=3: Sadece 3 soru sorabilirsin (Ezberlemeyi engellemek için)
tree_model = DecisionTreeClassifier(criterion="gini", max_depth=3)
tree_model.fit(X_train, y_train)
```

**Sonuç:** %80 Doğruluk.

- **Yorum:** Model, kötü arabaları bildi ama "İyi" arabaları ayırt edemedi çünkü `max_depth=3` yetersiz kaldı. Model "Underfitting" (yetersiz öğrenme) yaşadı.

### Adım 5: Hiperparametre Optimizasyonu (Grid Search)

Modelin ayarlarıyla (Düğme) tek tek oynamak yerine, bilgisayara "Tüm kombinasyonları dene" dedik.

```python
param = {
    "criterion": ["gini", "entropy"],
    "max_depth": [1, 2, 3, 5, 10, 15, None], # Farklı derinlikler
    "splitter": ["best", "random"]
}

# 5 Katlı çapraz doğrulama ile en iyisini bul
grid = GridSearchCV(DecisionTreeClassifier(), param_grid=param, cv=5)
grid.fit(X_train, y_train)
```

**Kazanan Ayarlar:** `max_depth=15`, `criterion='gini'`
**Yeni Skor:** **%96.5** (Mükemmel Gelişim!)

---

## 3. Karar Ağaçları: Artılar ve Eksiler

### Neden/Ne Zaman Kullanılır?

1.  **Açıklanabilirlik:** "Neden red verdin?" sorusuna ağaç grafiğini gösterip "Buradan dolayı" diyebilirsiniz. (Banka kredileri, Tıp).
2.  **Ön İşleme Azdır:** Veriyi normalize etmenize (0-1 arasına sıkıştırmaya) gerek yoktur (Biz alışkanlık olarak `StandardScaler` kullandık ama Karar Ağacı buna **zorunlu değildir**).
3.  **Hız:** Tahmin yapması çok hızlıdır.

### Dezavantajları

1.  **Overfitting (Ezberleme):** Sınır koymazsanız (`max_depth=None`), veriyi noktası noktasına ezberler. Yeni veri gelince çuvallar.
2.  **Kararsızlık:** Verideki küçücük bir değişiklik ağacı tamamen değiştirebilir. (Bunu çözmek için **Random Forest** kullanılır).

---

## 4. Önemli Parametreler (Sözlük)

- **criterion (Kriter):**
  - `gini`: Gini Impurity. Saflığı ölçer (Cart algoritması). Varsayılandır.
  - `entropy`: Bilgi Kazancı (Information Gain). Logaritmik hesap yapar.
- **max_depth (Maksimum Derinlik):** Ağacın kaç kat aşağı ineceği.
  - Düşük olursa -> Underfitting (Öğrenemez).
  - Çok yüksek olursa -> Overfitting (Ezberler).
- **min_samples_split:** Bir dalın bölünmesi için o dalda en az kaç örnek olmalı? (Örn: 50 derseniz, 30 kişinin kaldığı grubu daha fazla bölmez).

---

## 5. Özet (Reçete)

1.  Veriyi **.map()** ile sayısal hale getir (Mümkünse sırayı gözeterek).
2.  Basit bir ağaç (`max_depth=3`) ile başla ve görselleştir (`plot_tree`).
3.  Sonuç yetersizse **GridSearchCV** ile `max_depth` ve `criterion` ayarlarını optimize et.
4.  Çok kararsız veya ezberleyen bir yapı varsa **Random Forest** algoritmasına geçiş yap.
