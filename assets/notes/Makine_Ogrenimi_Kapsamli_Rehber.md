# 📘 MAKİNE ÖĞRENMESİ: SIFIRDAN UZMANLIĞA KAPSAMLI REHBER VE KOD KÜTÜPHANESİ

> **"Bir şeyi basitçe anlatamıyorsanız, onu yeterince iyi anlamamışsınız demektir." - Albert Einstein**

Bu rehber, sadece kod parçalarını birleştiren bir dosya değildir. Makine Öğrenmesi (Machine Learning) dünyasına adım atanlar için, her kavramın **teorik mantığını**, **matematiksel sezgisini**, **gerçek hayat karşılığını** ve **uygulama detaylarını** içeren canlı bir kitaptır.

---

## 📑 İÇİNDEKİLER

1.  [**GİRİŞ: MAKİNE ÖĞRENMESİNİN TEMELLERİ**](#bölüm-0-giriş)
    - Makine Öğrenmesi Nedir? Geleneksel Yazılımdan Farkı Nedir?
    - Öğrenme Türleri: Gözetimli (Supervised) vs Gözetimsiz (Unsupervised)
    - Altın Kurallar: Overfitting (Aşırı Ezber), Underfitting (Öğrenememe) ve Bias-Variance Dengesi
    - Veri Ön İşleme Sanatı: Scaling, Encoding, Splitting Neden Yapılır?

2.  [**BÖLÜM 1: REGRESYON MODELLERİ (SAYISAL TAHMİN)**](#bölüm-1-regresyon)
    - 1.1. Lineer Regresyon: Dünyayı Düz Çizgilerle Anlamak
    - 1.2. Çoklu Regresyon: Birden Fazla Etkeni Yönetmek
    - 1.3. Polinom Regresyon: Eğrisel İlişkiler ve Gerçek Hayat
    - 1.4. Regülarizasyon (Ridge, Lasso, ElasticNet): Modeli Cezalandırarak Eğitmek
    - **Proje 1:** Sigorta Maliyet Tahmini (Uçtan Uca Proje)

3.  [**BÖLÜM 2: SINIFLANDIRMA VE LOJİSTİK REGRESYON**](#bölüm-2-siniflandirma)
    - Lojistik Regresyonun Mantığı: Sigmoid Fonksiyonu ve Olasılık
    - Karmaşıklık Matrisi (Confusion Matrix) Okuma Sanatı
    - **Proje 2:** Banka Müşteri Analizi ve Pokemon Efsanevi Tespiti

4.  [**BÖLÜM 3: K-EN YAKIN KOMŞU (KNN)**](#bölüm-3-knn)
    - Mesafelerin Gücü: Euclidean vs Manhattan
    - Doğru "K" Değerini Bulmak

5.  [**BÖLÜM 4: DESTEK VEKTÖR MAKİNELERİ (SVM)**](#bölüm-4-svm)
    - En Geniş Caddeyi (Margin) Bulma Teorisi
    - Kernel Trick: Veriyi Üst Boyutlara Taşıma

6.  [**BÖLÜM 5: NAIVE BAYES**](#bölüm-5-naive-bayes)
    - Olasılık ve Bayes Teoremi

7.  [**BÖLÜM 6: KARAR AĞAÇLARI (DECISION TREES)**](#bölüm-6-karar-agaclari)
    - Entropy ve Bilgi Kazancı (Information Gain)

---

<a name="bölüm-0-giriş"></a>

# 🧠 GİRİŞ: MAKİNE ÖĞRENMESİNİN TEMELLERİ

Kodlara geçmeden önce, ne yaptığımızı anlamalıyız.

### 1. Makine Öğrenmesi Nedir?

Geleneksel yazılımda (örneğin bir hesap makinesi yaparken), bilgisayara kuralları biz veririz: `if x > 5: yap`.
Makine öğrenmesinde ise bilgisayara **veriyi (cevapları)** veririz, bilgisayar **kuralları kendi keşfeder**.

### 2. Öğrenme Türleri

- **Gözetimli Öğrenme (Supervised Learning):** "Öğretmenli Öğrenme" gibidir. Modele hem soruları (Girdiler/X) hem de cevap anahtarını (Çıktılar/y) veririz. Model aradaki ilişkiyi çözer.
  - _Örnek:_ Evin özelliklerini (X) ve fiyatını (y) verip, yeni bir evin fiyatını tahmin etmesini istemek.
- **Gözetimsiz Öğrenme (Unsupervised Learning):** Cevap anahtarı yoktur. Veriyi veririz ve "Buradaki gizli grupları bul" deriz.
  - _Örnek:_ Müşteri alışveriş verilerini verip "Benzer müşterileri grupla (Segmentasyon)" demek.

### 3. Kritik Kavramlar (Sözlük)

- **Feature (Özellik/X):** Tahmin yapmak için kullandığımız veriler (Yaş, Boy, Metrekare vb.).
- **Target (Hedef/y):** Tahmin etmeye çalıştığımız şey (Fiyat, Hasta mı?, Spam mi?).
- **Train/Test Split:** Veriyi her zaman ikiye böleriz. %70-80'i ile modeli eğitiriz (Ders çalışma), %20-30'u saklarız ve modeli test ederiz (Sınav). Asla sınav sorularını (Test verisini) öğrenciye (Modele) önceden göstermeyiz!
- **Overfitting (Aşırı Öğrenme/Ezberleme):** Modelin eğitim verisini çok iyi ezberlemesi ama yeni veri görünce çuvallamasıdır. (Sınav sorularını ezberleyen öğrenci).
- **Underfitting (Eksik Öğrenme):** Modelin ne eğitim setini ne de test setini öğrenememesi durumudur. (Ders çalışmayan öğrenci).

---

<a name="bölüm-1-regresyon"></a>

# 📈 BÖLÜM 1: REGRESYON MODELLERİ (Sayısal Tahmin)

Regresyon, "Ne kadar?", "Kaç para?", "Kaç derece?" gibi soruların cevabını arar. Çıktımız (y) her zaman sayısal bir değerdir.

## 1.1. Lineer Regresyon (Linear Regression)

**Mantık:** Veri noktalarının arasından geçen **en mükemmel düz çizgiyi** çizmektir.
**Formül:** `y = mx + b` (Liseden hatırladığımız doğru denklemi)

- `y`: Tahmin (Örn: Sınav Notu)
- `x`: Girdi (Örn: Çalışma Saati)
- `m` (Katsayı/Coefficient): Eğim. Çalışma saati notu ne kadar artırıyor?

- `b` (Sabit/Intercept): Başlangıç noktası. Hiç çalışmazsa kaç alır?

### 📝 LİNEER REGRESYON REÇETESİ (ADIM ADIM)

1.  **Kütüphaneleri Yükle:** `pandas`, `sklearn.linear_model`, `sklearn.model_selection`.
2.  **Veriyi Hazırla (X ve y):**
    - `X` (Girdi): DataFrame olmalı `[[ ]]`. (Örn: `df[["Study Hours"]]`)
    - `y` (Hedef): Tek sütun (Series) olmalı. (Örn: `df["Exam Score"]`)
3.  **Eğitim-Test Ayrımı:** `train_test_split(X, y)` ile veriyi böl (Genelde %80 Eğitim, %20 Test).
4.  **Ölçeklendirme (Opsiyonel ama Önerilir):** `StandardScaler`.
    - **Kural:** `X_train` -> `fit_transform`, `X_test` -> `transform`.
5.  **Modeli Kur:** `model = LinearRegression()`
6.  **Eğit (Pişir):** `model.fit(X_train, y_train)`
7.  **Tahmin Et (Servis):** `model.predict(X_test)`
8.  **Değerlendir:** `r2_score` ve `mean_squared_error` ile başarını ölç.

### 💻 Uygulama: Çalışma Saati ve Sınav Notu Analizi

Bu kodda, çalışma saati arttıkça sınav notunun nasıl değiştiğini modelliyoruz.

```python
# ---------------------------------------------------------------------------------------
# ADIM 1: Kütüphanelerin Yüklenmesi
# ---------------------------------------------------------------------------------------
# Pandas: Veriyi Excel tablosu gibi okumak ve yönetmek için (Veri Biliminin Excel'i).
# Numpy: Matematiksel işlemler ve diziler için.
# Matplotlib/Seaborn: Veriyi grafiklere dökmek için.
# Sklearn (Scikit-learn): Makine öğrenmesi modellerini barındıran ana kütüphane.
# ---------------------------------------------------------------------------------------
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Scikit-learn'den gerekli araçları çağırıyoruz
from sklearn.model_selection import train_test_split # Veriyi bölmek için
from sklearn.preprocessing import StandardScaler     # Veriyi ölçeklemek için
from sklearn.linear_model import LinearRegression    # Modeli kurmak için
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error # Başarıyı ölçmek için

# ---------------------------------------------------------------------------------------
# ADIM 2: Verinin Yüklenmesi
# ---------------------------------------------------------------------------------------
# Dinamik dosya yolu bulma: Kodun çalıştığı klasörü otomatik bulur, hata almayı engeller.
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, "LineervePolinomRegresyon", "1-studyhours (1).csv")

# csv dosyasını oku ve 'df' (dataframe) adlı değişkene ata.
try:
    df = pd.read_csv(file_path)
    print("Veri başarıyla yüklendi!")
except FileNotFoundError:
    print(f"Hata: Dosya bulunamadı -> {file_path}")
    # Demo veri oluşturalım (Dosya yoksa kod çalışmaya devam etsin diye)
    data = {'Study Hours': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            'Exam Score': [20, 30, 40, 50, 60, 70, 80, 85, 90, 95]}
    df = pd.DataFrame(data)

# Veriyi Gözle: Dağılım grafiği (Scatter Plot) çizelim
# x eksenine saati, y eksenine notu koyuyoruz.
plt.figure(figsize=(10, 6))
plt.scatter(df["Study Hours"], df["Exam Score"], color='blue', label='Öğrenci Verisi')
plt.title("Çalışma Saati vs Sınav Notu (İlişki Analizi)")
plt.xlabel("Çalışma Saati")
plt.ylabel("Sınav Notu")
plt.legend()
plt.show() # Grafiğe bak: Noktalar yukarı doğru bir şerit halinde mi? (Evetse Lineer Regresyon uygun)

# ---------------------------------------------------------------------------------------
# ADIM 3: Veri Hazırlığı (Preprocessing)
# ---------------------------------------------------------------------------------------

# X (Bağımsız Değişken): Girdilerimiz.
# DİKKAT: Sklearn X'i her zaman 2 boyutlu tablo (DataFrame) olarak ister. O yüzden çift parantez [[ ]] kullanırız.
X = df[["Study Hours"]]

# y (Bağımlı Değişken): Hedefimiz.
# Bu tek bir sütundur (Series), tek parantez yeterlidir.
y = df["Exam Score"]

# TRAIN - TEST SPLIT (Eğitim - Test Ayrımı)
# test_size=0.2: Verinin %20'sini test (sınav) için kenara ayır. %80'i ile ders çalış (eğit).
# random_state=15: Rastgeleliği sabitle. Her çalıştırdığımızda aynı ayrımı yapsın ki sonuçlar değişmesin.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=15)

# SCALING (ÖLÇEKLENDİRME)
# Neden? Bazı özellikler 0-1 arasında, bazıları 0-1000 arasında olabilir.
# Büyük sayılar modeli domine etmesin diye hepsini benzer aralığa (Standart Sapma) çekeriz.
scaler = StandardScaler()

# ALTIN KURAL:
# fit_transform() -> SADECE X_train'e yapılır. (Model veriyi tanır ve dönüştürür).
# transform()     -> SADECE X_test'e yapılır. (Model test verisinden kopya çekmemeli, sadece öğrendiğini uygulamalı).
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ---------------------------------------------------------------------------------------
# ADIM 4: Model Kurulumu ve Eğitim
# ---------------------------------------------------------------------------------------
# Modeli bir "öğrenci" gibi düşünün.
regression = LinearRegression()

# .fit() komutu "Otur ders çalış" komutudur. Verilen soruları (X) ve cevapları (y) analiz eder.
regression.fit(X_train_scaled, y_train)

print("\n--- Modelin Öğrendikleri ---")
print(f"Eğim (Coefficient): {regression.coef_[0]:.2f}")
# Yorum: "Bir birim (standartlaştırılmış) çalışma artışı, notu ne kadar artırıyor?"
print(f"Başlangıç Noktası (Intercept): {regression.intercept_:.2f}")
# Yorum: "Tüm değerler ortalama olduğunda beklenen not kaç?"

# ---------------------------------------------------------------------------------------
# ADIM 5: Tahmin ve Test (Prediction & Evaluation)
# ---------------------------------------------------------------------------------------
# Artık model eğitimini bitirdi. Onu sınav yapma zamanı.
# .predict() komutu ile test sorularını (X_test) veriyoruz, cevapları tahmin etmesini istiyoruz.
y_pred = regression.predict(X_test_scaled)

# Sonuçları Değerlendirme Metrikleri
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)

print("\n--- Model Karnesi ---")
print(f"R2 Score (Başarı Puanı): %{r2*100:.2f}")
# R2 Nedir?: 0 ile 1 arasındadır. 1'e ne kadar yakınsa, model veriyi o kadar iyi açıklamıştır.
# %90 üzeri mükemmeldir. %50 altı kötüdür.

print(f"MAE (Ortalama Hata): {mae:.2f}")
# MAE Nedir?: Modelin tahminleri gerçek değerden ortalama kaç puan şaşıyor? (Örn: 4 puan aşağı veya yukarı)

print(f"RMSE (Karesel Hata): {rmse:.2f}")
# RMSE Nedir?: Büyük hataları daha sert cezalandıran hata ölçütü.

# ---------------------------------------------------------------------------------------
# ADIM 6: Görselleştirme (Gerçek vs Model Doğrusu)
# ---------------------------------------------------------------------------------------
plt.figure(figsize=(10, 6))
# Gerçek veriler (Mavi noktalar)
plt.scatter(X_train_scaled, y_train, color='blue', label='Gerçek Veriler')
# Modelin tahmini (Kırmızı çizgi)
plt.plot(X_train_scaled, regression.predict(X_train_scaled), color='red', linewidth=3, label='Makine Öğrenimi Modeli')
plt.title("Model Başarısı: Gerçek Veriler ve Regresyon Doğrusu")
plt.xlabel("Çalışma Saati (Standartlaştırılmış)")
plt.ylabel("Sınav Notu")
plt.legend()
plt.show()

# ÖZEL TAHMİN YAPALIM
# Yeni bir öğrenci 10 saat çalışırsa kaç alır?
new_hours = [[10]] # Çift parantez dataframe formatı için
# Dikkat: Modeli scale edilmiş veriyle eğittik, yeni veriyi de scale etmeliyiz!
new_hours_scaled = scaler.transform(pd.DataFrame(new_hours, columns=["Study Hours"]))
prediction = regression.predict(new_hours_scaled)
print(f"\n10 Saat çalışan öğrenci için tahmin edilen not: {prediction[0]:.2f}")
```

---

## 1.2. Çoklu Doğrusal Regresyon (Multiple Linear Regression)

**Mantık:** Hayatta bir sonucu etkileyen genelde tek bir sebep yoktur. Sınav notunu sadece çalışma saati belirlemez; uyku süresi, derse katılım, sosyal medya kullanımı da belirler.
**Formül:** `y = m1*x1 + m2*x2 + m3*x3 + ... + b`

Bu bölümde, birden fazla değişkenin (X1, X2, X3...) hedef üzerindeki etkisini ölçeceğiz.

### 📝 ÇOKLU REGRESYON REÇETESİ

1.  **Veriyi Hazırla:** `X` artık tek sütun değil. `df[["Study", "Sleep", "Social"]]`.
2.  **EDA (Keşifçi Analiz):** `df.corr()` ile hangi değişkenlerin hedefle ilişkili olduğuna bak. Gereksizleri at.
3.  **Dummy Variable:** Eğer "Cinsiyet" gibi yazı içeren sütunlar varsa sayıya çevir (`pd.get_dummies`).
4.  **Split & Scale:** Böl ve Ölçekle.
5.  **Model Eğitimi:** `LinearRegression` (Mantık aynı).
6.  **Katsayı Yorumlama:** `model.coef_` ile hangi özelliğin ne kadar etkili olduğunu gör.

### 💻 Uygulama: Sınav Notu İçin Çoklu Analiz

**Dosya:** `LineervePolinomRegresyon/multiple_lineer_regression.py`

```python
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error
import os

# 1. VERİ YÜKLEME
# -----------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
# Hata almamak için dosya yolunu kontrol ediyoruz
file_path = os.path.join(current_dir, "LineervePolinomRegresyon", "2-multiplegradesdataset.csv")

try:
    df = pd.read_csv(file_path)
except:
    # Demo veri
    df = pd.DataFrame({
        'Study Hours': np.random.randint(1, 10, 100),
        'Sleep Hours': np.random.randint(4, 10, 100),
        'Social Media Hours': np.random.randint(0, 5, 100),
        'Attendance Rate': np.random.randint(50, 100, 100),
        'Exam Score': np.random.randint(40, 100, 100)
    })

# 2. İLİŞKİLERİ GÖRME (EDA)
# -----------------------------------------------
# Hangi özellik notla pozitif (dost), hangisi negatif (düşman) ilişkili?
print(df.corr()["Exam Score"].sort_values(ascending=False))
# Beklenti: Study Hours ve Attendance Rate pozitif çıkmalı, Social Media negatif çıkmalı.

# 3. VERİ HAZIRLIĞI
# -----------------------------------------------
# Girdiler (Birden fazla sütun seçiyoruz)
X = df[["Study Hours", "Sleep Hours", "Social Media Hours", "Attendance Rate"]]
y = df["Exam Score"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. MODEL EĞİTİMİ
# -----------------------------------------------
multi_model = LinearRegression()
multi_model.fit(X_train_scaled, y_train)

# Katsayıları İnceleme (En önemli kısım burası!)
feature_names = ["Study", "Sleep", "Social Media", "Attendance"]
coefficients = multi_model.coef_

print("\n--- Hangi Faktör Ne Kadar Etkili? ---")
for name, score in zip(feature_names, coefficients):
    print(f"{name}: {score:.2f}")

# YORUM: Eğer 'Social Media' katsayısı -5 ise, bu şu demek:
# "Sosyal medyada geçirdiğin her 1 birim artış, notunu 5 puan düşürüyor."
# Eğer 'Study' katsayısı +10 ise: "Her 1 birim çalışma, notu 10 puan artırıyor."

# 5. TAHMİN
# -----------------------------------------------
y_pred = multi_model.predict(X_test_scaled)
print(f"\nModel Başarısı (R2): %{r2_score(y_test, y_pred)*100:.2f}")

# Gerçek vs Tahmin Grafiği
plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2) # İdeal çizgi
plt.xlabel("Gerçek Notlar")
plt.ylabel("Tahmin Edilen Notlar")
plt.title("Gerçek vs Tahmin (Çizgi üzerindeki noktalar tam isabettir)")
plt.show()
```

---

## 1.3. Polinom Regresyon (Polynomial Regression)

**Mantık:** Lineer regresyon her şeyi "düz çizgi" sanır. Ama hayat her zaman düz değildir.

- Örneğin: Bir ilaç dozu azken etki etmez, orta dozda iyileştirir, çok yüksek dozda zehirler. Bu ilişki düz çizgi değil, bir eğridir (Parabol).

- Veriyi "bükebilmek" için `x` değerinin karesini (`x^2`), küpünü (`x^3`) alıp modele ekleriz.

### 📝 POLİNOM REGRESYON REÇETESİ

1.  **Hazırlık:** Standart `X` ve `y` ayrımını yap.
2.  **Polinom Dönüşümü (KRİTİK):**
    - `poly = PolynomialFeatures(degree=2)` (Genelde 2 veya 3 yeterlidir).
    - `X_poly = poly.fit_transform(X)` -> Artık elimizde `X` ve `X^2` var.
3.  **Model Kur:** `LinearRegression()` (Hala lineer model kullanıyoruz ama verimiz büküldü!).
4.  **Eğit:** `model.fit(X_poly, y)`
5.  **Tahmin:** Yeni veri gelince ÖNCE `poly.transform(yeni_veri)` yap, SONRA `model.predict()`.

### 💻 Uygulama: Müşteri Memnuniyeti ve Prim İlişkisi

**Dosya:** `LineervePolinomRegresyon/polinomregresyon.py`

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import os

# Veri Yükleme
current_dir = os.path.dirname(os.path.abspath(__file__))
# Hata önleyici kontrol
try:
    df = pd.read_csv(os.path.join(current_dir, "LineervePolinomRegresyon", "3-customersatisfaction.csv"))
except:
    # Demo veri: Karesel bir ilişki yaratalım (y = x^2 gibi)
    x_demo = np.linspace(1, 10, 100).reshape(-1, 1)
    y_demo = x_demo**2 + np.random.normal(0, 5, (100, 1))
    df = pd.DataFrame(np.hstack([x_demo, y_demo]), columns=["Customer Satisfaction", "Incentive"])

X = df[["Customer Satisfaction"]]
y = df[["Incentive"]]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# --- DENEY 1: LİNEER MODEL (DÜZ ÇİZGİ) ---
lin_model = LinearRegression()
lin_model.fit(X_train_scaled, y_train)
lin_pred = lin_model.predict(X_test_scaled)
print(f"Lineer Model Başarısı (R2): {r2_score(y_test, lin_pred):.2f}")
# Sonuç düşük çıkacaktır çünkü veri kavisli, model düz.

# --- DENEY 2: POLİNOM MODEL (KAVİSLİ) ---
# PolynomialFeatures: Verinin karesini alıp yeni özellik olarak ekler.
# degree=2: x'in karesine kadar git (x, x^2).
poly = PolynomialFeatures(degree=2, include_bias=False)

X_train_poly = poly.fit_transform(X_train_scaled) # X ve X^2 oluşturuldu
X_test_poly = poly.transform(X_test_scaled)

poly_model = LinearRegression()
poly_model.fit(X_train_poly, y_train) # Artık x^2 bilgisini de kullanarak öğreniyor
poly_pred = poly_model.predict(X_test_poly)

print(f"Polinom Model (Degree=2) Başarısı (R2): {r2_score(y_test, poly_pred):.2f}")
# Sonuç çok daha yüksek çıkacaktır!

# GÖRSEL KARŞILAŞTIRMA
plt.scatter(X, y, color='gray', label='Gerçek Veri')
# Lineer Model (Kırmızı Düz Çizgi)
plt.plot(X, lin_model.predict(scaler.transform(X)), color='red', label='Lineer Model (Yetersiz)')
# Polinom Model (Mavi Eğri)
# Eğriyi düzgün çizmek için X'i sıralamamız lazım
X_range = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)
X_range_scaled = scaler.transform(X_range)
X_range_poly = poly.transform(X_range_scaled)
plt.plot(X_range, poly_model.predict(X_range_poly), color='blue', label='Polinom Model (Başarılı)')
plt.legend()
plt.title("Lineer vs Polinom Regresyon Mücadelesi")
plt.show()
```

### 📏 Regresyon Karnesi: Hangi Hataya Bakmalı?

| Metrik                   | Açıklama                                                     | Ne Zaman Kullanılır?                               |
| :----------------------- | :----------------------------------------------------------- | :------------------------------------------------- |
| **MAE (Ortalama Hata)**  | Hataların direkt ortalamasıdır. (Örn: 5 TL hata).            | Hataların direkt yorumlanabilir olması gerekirse.  |
| **MSE (Kare Hata)**      | Hataların karesi. Büyük hataları çok büyütür.                | Büyük hataları cezalandırmak istiyorsan kritiktir. |
| **RMSE (Kök Kare Hata)** | MSE'nin karekökü. Hem cezalandırıcı hem de birimi anlaşılır. | En yaygın regresyon metriğidir (Kaggle).           |
| **R2 Score**             | Modelin başarısı (0 ile 1 arası).                            | Modelin genel başarısını (notunu) görmek için.     |

---

## 1.4. Regülarizasyon (Ridge, Lasso, ElasticNet)

**Problem:** Bazen model dersi o kadar çok çalışır ki, ders kitabındaki virgül hatalarını bile ezberler (**Overfitting**). Modelin aşırı özgüvenli olmasını engellemek için ona "ceza" veririz.

### 🎭 Overfitting (Ezber) vs Underfitting (Yetersiz)

| Durum                             | Belirti                                                | Neden Olur?                                       | Çözüm                                            |
| :-------------------------------- | :----------------------------------------------------- | :------------------------------------------------ | :----------------------------------------------- |
| **Underfitting (Yüksek Bias)**    | Eğitim skoru düşük, Test skoru düşük.                  | Model çok basit (Örn: Eğriye düz çizgi çekmek).   | Modeli karmaşıklaştır (Polinom derece arttır).   |
| **Overfitting (Yüksek Variance)** | Eğitim skoru ÇOK YÜKSEK (%99), Test skoru DÜŞÜK (%60). | Model veriyi ezberlemiş. Gürültüyü bile öğrenmiş. | Veriyi arttır, Regülarizasyon yap (Lasso/Ridge). |
| **Optimum (Denge)**               | Eğitim skoru Yüksek, Test skoru Yüksek.                | Model genellemeyi öğrenmiş.                       | Tebrikler! 🎉                                    |

- **Ridge (L2):** "Katsayıları (ağırlıkları) sıfıra yaklaştır ama tamamen silme." (Tüm özellikler kalsın ama etkisi azalsın).
- **Lasso (L1):** "Gereksiz özelliklerin katsayısını direkt 0 yap ve sil." (Özellik seçimi yapar).
- **ElasticNet:** İkisinin karışımıdır.

Bu konu ileri seviyedir ve özellikle çok fazla çöp sütun (feature) olan verilerde hayat kurtarır.

### 💻 Uygulama: Regülarizasyon ile Model İyileştirme

Bu örnekte, **aşırı karmaşıklaştırılmış (Overfitting)** bir modele Ridge ve Lasso uygulayarak nasıl "uslandırdığımızı" göreceğiz. 20 satırlık veriye 10. dereceden polinom uydurmaya çalışarak modeli bilerek ezberlemeye zorlayacağız, sonra regülarizasyon ile düzelteceğiz.

**Dosya:** `LineervePolinomRegresyon/ridge-lasso-elasticnet.py`

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.metrics import r2_score

# 1. VERİ OLUŞTURMA (Sentetik/Uydurma Veri)
# ---------------------------------------------------------
# Az veri (20 satır), Çok Gürültü ve Karışık İlişki
np.random.seed(42)
X = 2 * np.random.rand(20, 1)
y = 0.5 * X**2 + X + 2 + np.random.randn(20, 1) # Gerçek ilişki: y = 0.5x^2 + x + 2 (ve biraz gürültü)

# Overfitting Yaratmak İçin: Polinom Derecesini Abartalım (Degree=10!)
# 20 veri noktasına 10. derece polinom uydurmaya çalışırsak model ezberler (Overfit).
# Model gereksiz yere x^3, x^4 ... x^10 gibi özelliklere anlam yüklemeye çalışacak.
# (Gereksiz karmaşıklık)
poly = PolynomialFeatures(degree=10, include_bias=False)
X_poly = poly.fit_transform(X)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X_poly, y, test_size=0.3, random_state=42)

# StandardScaler (Regülarizasyon için ŞART!)
# Çünkü Ridge/Lasso katsayı büyüklüklerine ceza keser. Sayılar büyükse ceza adaletsiz olur.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. MODELLERİN YARIŞI
# ---------------------------------------------------------

print("\n--- Model Karşılaştırması ---")

# A) Linear Regression (Regülarizasyon Yok)
lin_reg = LinearRegression()
lin_reg.fit(X_train_scaled, y_train)
train_score = lin_reg.score(X_train_scaled, y_train)
test_score = lin_reg.score(X_test_scaled, y_test)
print(f"Linear Reg. -> Train: %{train_score*100:.2f} | Test: %{test_score*100:.2f}")
print("   -> Yorum: Train çok yüksek, Test düşükse -> Overfitting (Ezber) var demektir.")

# B) Ridge (L2 - Katsayıları Baskılar)
# alpha: Ceza katsayısı. Ne kadar büyükse o kadar çok ceza (baskı).
ridge_reg = Ridge(alpha=1.0)
ridge_reg.fit(X_train_scaled, y_train)
print(f"Ridge Reg.  -> Train: %{ridge_reg.score(X_train_scaled, y_train)*100:.2f} | Test: %{ridge_reg.score(X_test_scaled, y_test)*100:.2f}")

# C) Lasso (L1 - Gereksizleri Sıfırlar)
# alpha=0.1: Biraz esneklik tanıyalım.
lasso_reg = Lasso(alpha=0.1)
lasso_reg.fit(X_train_scaled, y_train)
print(f"Lasso Reg.  -> Train: %{lasso_reg.score(X_train_scaled, y_train)*100:.2f} | Test: %{lasso_reg.score(X_test_scaled, y_test)*100:.2f}")

# Lasso kaç özelliği iptal etmiş?
# Sıfırlanan katsayıları sayıyoruz.
# Katsayı 0 olduysa, o özellik modelden "atılmış" demektir.
sifir_sayisi = np.sum(lasso_reg.coef_ == 0)
print(f"   -> Lasso {X_train_scaled.shape[1]} özellikten {sifir_sayisi} tanesini tamamen sildi (0 yaptı).")

# D) ElasticNet (Karışık)
# l1_ratio=0.5: %50 Lasso, %50 Ridge karışımı.
elastic_reg = ElasticNet(alpha=0.1, l1_ratio=0.5)
elastic_reg.fit(X_train_scaled, y_train)
print(f"ElasticNet  -> Train: %{elastic_reg.score(X_train_scaled, y_train)*100:.2f} | Test: %{elastic_reg.score(X_test_scaled, y_test)*100:.2f}")

# 3. Görselleştirme (Katsayıların Durumu)
# Hangi model katsayıları nasıl değiştirmiş?
plt.figure(figsize=(10, 5))
plt.plot(lin_reg.coef_.flatten(), label='Linear (Kontrolsüz - Uçuşta)', marker='o', alpha=0.5)
plt.plot(ridge_reg.coef_.flatten(), label='Ridge (Baskı Altında - Küçültülmüş)', marker='s')
plt.plot(lasso_reg.coef_.flatten(), label='Lasso (Seçici - Sıfırlanmış)', marker='x', linewidth=2)
plt.axhline(0, color='black', linestyle='--')
plt.legend()
plt.title("Regülarizasyon Modellerinin Katsayılara Etkisi")
plt.xlabel("Özellik Derecesi (x, x^2, x^3 ... x^10)")
plt.ylabel("Katsayı Büyüklüğü (Ağırlık)")
plt.show()
```

---

<a name="bölüm-2-siniflandirma"></a>

# 🎯 BÖLÜM 2: SINIFLANDIRMA VE LOJİSTİK REGRESYON

Regresyon "Kaç?" sorusunu sorardı. Sınıflandırma ise **"Hangi Grup?"** sorusunu sorar.
Çıktımız (y) sayısal değil, kategoriktir (Evet/Hayır, Kedi/Köpek, A/B/C).

## 2.1. Lojistik Regresyon (Logistic Regression)

**İsim Karmaşası:** Adında "Regresyon" geçer ama aslında bir **Sınıflandırma** algoritmasıdır. Neden? Çünkü temelde bir olasılık (sayı) üretir, sonra o sayıya göre sınıf seçer.

### 🧠 Nasıl Çalışır? (Sigmoid Fonksiyonu)

Lineer regresyon sonsuza giden bir doğru çizer (`y = mx + b`). Ancak olasılık 0 ile 1 arasında olmalıdır.
Lojistik regresyon, bu doğruyu bükerek **"S"** şekline (Sigmoid eğrisi) getirir.

- Sonuç > 0.5 ise -> **Sınıf 1 (Evet)**
- Sonuç < 0.5 ise -> **Sınıf 0 (Hayır)**

- 0.5: Karar Sınırı (Decision Boundary).

### 📝 LOJİSTİK REGRESYON REÇETESİ

1.  **Dengesiz Veri Kontrolü:** `df["hedef"].value_counts()` ile bak. Eğer biri %95, diğeri %5 ise -> `class_weight='balanced'` kullan.
2.  **Split:** Veriyi böl.
3.  **Scale (ÇOK ÖNEMLİ):** Lojistik Regresyon sayıların büyüklüğüne duyarlıdır. `StandardScaler` kullan.
4.  **Model:** `LogisticRegression()`.
5.  **Değerlendirme:** Sadece "Accuracy" yetmez! `confusion_matrix` ve `classification_report` ile F1-Score'a bak.

### 📊 Model Performansını Okumak: Karmaşıklık Matrisi (Confusion Matrix)

Sınıflandırmada sadece "Doğruluk" (Accuracy) yetmez. Hatanın türü hayati önem taşır.

| Gerçek \ Tahmin         | **Tahmin: NEGATİF (0)**                                                                          | **Tahmin: POZİTİF (1)**                                                                         |
| :---------------------- | :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| **Gerçek: NEGATİF (0)** | **TN (True Negative)** <br> ✅ _Doğru Bildik_ <br> (Hasta değil dedik, değilmiş)                 | **FP (False Positive)** <br> 🚨 _Tip 1 Hata (Yanlış Alarm)_ <br> (Hasta dedik, turp gibi çıktı) |
| **Gerçek: POZİTİF (1)** | **FN (False Negative)** <br> 💀 _Tip 2 Hata (Kaçan Fırsat)_ <br> (Hasta değil dedik, adam öldü!) | **TP (True Positive)** <br> ✅ _Doğru Bildik_ <br> (Hasta dedik, hasta çıktı)                   |

#### 📐 Hangi Metriği Ne Zaman Kullanmalı?

| Metrik                    |        Formül        | Ne Zaman Kullanılır?                                                                    |
| :------------------------ | :------------------: | :-------------------------------------------------------------------------------------- |
| **Accuracy (Doğruluk)**   | `(TP+TN) / Tüm Veri` | Sınıflar dengeliyse (50-50).                                                            |
| **Precision (Keskinlik)** |   `TP / (TP + FP)`   | **Yanlış Alarm (FP)** maliyetliyse. (Örn: Spam filtresi - Önemli maili spam sanmamalı). |
| **Recall (Duyarlılık)**   |   `TP / (TP + FN)`   | **Gözden Kaçırma (FN)** maliyetliyse. (Örn: Kanser teşhisi - Hastayı kaçırmamalıyız!).  |
| **F1-Score**              | `2 * (P*R) / (P+R)`  | Dengesiz verilerde veya hem Precision hem Recall önemliyse.                             |

---

### 💻 Proje 1: Banka Müşteri Analizi (Vadeli Hesap Açacak mı?)

**Dosya:** `SınıflandırmayaGirisLojistikRegresyon/lojistik-regresyon.py`

Müşterinin yaşı, mesleği, eğitim durumu gibi bilgilerine bakarak vadeli hesap açıp açmayacağını (1 veya 0) tahmin ediyoruz.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. VERİ YÜKLEME VE ANALİZ
# -----------------------------------------------
current_dir = os.path.dirname(os.path.abspath(__file__))
# 6-bank_customers.csv dosyasını bulmaya çalış, yoksa demo oluştur.
try:
    df = pd.read_csv(os.path.join(current_dir, "SınıflandırmayaGirisLojistikRegresyon", "6-bank_customers.csv"))
    print("Müşteri verisi yüklendi.")
except:
    # Demo veri
    print("Demo veri kullanılıyor.")
    df = pd.DataFrame({
        'age': np.random.randint(18, 90, 200),
        'balance': np.random.randint(-1000, 50000, 200),
        'duration': np.random.randint(0, 1000, 200), # Saniye cinsinden görüşme süresi
        'campaign': np.random.randint(1, 10, 200),   # Kampanya sayısı
        'subscribed': np.random.randint(0, 2, 200)   # Hedef: 0 veya 1
    })

# Hedef Dağılımına Bak (Dengesiz Veri Kontrolü)
print(df["subscribed"].value_counts())
# Eğer %95 Hayır, %5 Evet ise model sürekli "Hayır" diyerek %95 başarı alabilir. Bu yalancı bir başarıdır!

# 2. VERİ HAZIRLIĞI
# -----------------------------------------------
X = df.drop("subscribed", axis=1) # Girdiler
y = df["subscribed"]              # Çıktı

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=15)

# SCALING: Lojistik regresyon mesafeye duyarlıdır, mutlaka ölçekleyin!
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 3. MODEL EĞİTİMİ
# -----------------------------------------------
# LogisticRegression() varsayılan olarak 0.5 eşiğini kullanır.
model = LogisticRegression()
model.fit(X_train, y_train)

# 4. DEĞERLENDİRME (KRİTİK BÖLÜM)
# -----------------------------------------------
# Model tahmin yaparken aslında olasılık üretir.
# predict() fonksiyonu bu olasılık %50'den büyükse 1, küçükse 0 döndürür.
y_pred = model.predict(X_test)

print(f"Doğruluk (Accuracy): %{accuracy_score(y_test, y_pred)*100:.2f}")

print("\nKarmaşıklık Matrisi (Confusion Matrix):")
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel("Tahmin")
plt.ylabel("Gerçek")
plt.title("Model Nerede Yanılıyor?")
plt.show()

print("\nDetaylı Rapor:")
print(classification_report(y_test, y_pred))
# Burada Precision ve Recall değerlerine odaklanın.
# Hangi sınıfı tahmin etmekte zorlanıyor? (Genelde azınlık sınıfı - 1)
```

### 💻 Proje 2: Çok Sınıflı Sınıflandırma (Siber Saldırı Tespiti)

### 💻 Proje 2: Çok Sınıflı Sınıflandırma (Siber Saldırı Tespiti)

**Dosya:** `SınıflandırmayaGirisLojistikRegresyon/logisticregresiyon_Multiclass.py`

Lojistik Regresyon doğası gereği **İkili (Binary)** sınıflandırıcıdır (0 veya 1). Ancak gerçek hayatta, örneğin siber saldırı türlerinde (Normal, DoS, Probe, U2R) gibi birçok sınıf olabilir. Bunu çözmek için stratejiler geliştirilmiştir.

#### Çözüm Stratejileri:

1.  **One-vs-Rest (OvR - Biri Diğerlerine Karşı):** "Ben Tek Siz Hepiniz". Her sınıf için bir model eğitilir (Örn: DoS mu? Değil mi?). En yüksek olasılığı veren kazanır. En yaygın ve hızlı yöntemdir.
2.  **One-vs-One (OvO - Bire Bir):** "Lig Usulü". Her sınıf diğeriyle tek tek maç yapar. (DoS vs Normal, DoS vs Probe...). En çok maçı kazanan sınıf seçilir. Hassastır ama yavaştır.
3.  **Multinomial (Softmax):** Tek seferde tüm sınıflar için olasılık dağılımı hesaplar.

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsOneClassifier, OneVsRestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

# 1. VERİ HAZIRLIĞI (Basitleştirilmiş)
# ---------------------------------------------------------
# 3 Farklı sınıfımız olsun: 0 (Normal), 1 (DoS Saldırısı), 2 (Probe Saldırısı)
# df = pd.read_csv("7-cyber_attack_data.csv")
# X = df.drop("attack_type", axis=1)
# y = df["attack_type"]

# Demo maksatlı rastgele veri:
import numpy as np
X = np.random.randn(100, 5) # 5 özellik
y = np.random.randint(0, 3, 100) # 0, 1, 2 sınıfları

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# YÖNTEM 1: NATIVE (Doğal) MULTINOMIAL
# ---------------------------------------------------------
# Lojistik Regresyon'a "bu çok sınıflı bir problem" diyoruz.
# solver='lbfgs' bu işi matematiksel olarak çözebilen motordur.
model_multi = LogisticRegression(multi_class='multinomial', solver='lbfgs')
model_multi.fit(X_train, y_train)
print(f"Multinomial Başarısı: {model_multi.score(X_test, y_test):.2f}")

# YÖNTEM 2: One-Vs-Rest (OvR) -> En Yaygın
# ---------------------------------------------------------
# Arka planda 3 tane model eğitir:
# 1. Model: 0 mı, değil mi?
# 2. Model: 1 mi, değil mi?
# 3. Model: 2 mi, değil mi?
ovr_model = OneVsRestClassifier(LogisticRegression())
ovr_model.fit(X_train, y_train)
print(f"One-Vs-Rest Başarısı: {ovr_model.score(X_test, y_test):.2f}")

# YÖNTEM 3: One-Vs-One (OvO) -> Hassas
# ---------------------------------------------------------
# Arka planda (3*2)/2 = 3 tane "maç" (model) yapar:
# 1. Model: 0 vs 1
# 2. Model: 0 vs 2
# 3. Model: 1 vs 2
ovo_model = OneVsOneClassifier(LogisticRegression())
ovo_model.fit(X_train, y_train)
print(f"One-Vs-One Başarısı: {ovo_model.score(X_test, y_test):.2f}")

# Hangi sınıfları karıştırdık?
y_pred = ovr_model.predict(X_test)
print("\nKarmaşıklık Matrisi (Hata Nerede?):")
print(confusion_matrix(y_test, y_pred))
```

---

### 💻 Proje 3: İleri Seviye ve Dengesiz Veri (Fraud Detection)

### 💻 Proje 3: İleri Seviye ve Dengesiz Veri (Fraud Detection)

**Dosya:** `SınıflandırmayaGirisLojistikRegresyon/logisticregressionAdvanced.py`

Gerçek hayatta "Dolandırıcılık (Fraud)", "Kanser Teşhisi" veya "Fabrika Hatası" gibi olaylar nadir görülür (%1 veya daha az).
Eğer verinizde %99 "Normal", %1 "Fraud" varsa, modeliniz **"Herkes Normaldir"** diyerek %99 Doğruluk (Accuracy) yakalayabilir. Ama bu model **çöptür** çünkü tek bir dolandırıcıyı bile yakalayamaz.

#### Nasıl Çözeriz?

1.  **Metric Seçimi:** Asla `accuracy` kullanma! `F1-Score`, `Precision`, `Recall` veya `AUC` kullan.
2.  **Stratified Split:** Veriyi bölerken test setine hiç fraud düşmemesini engellemek için `stratify=y` kullan.
3.  **Class Weight:** Modele "Azınlık sınıfında hata yaparsan seni 100 kat daha fazla cezalandırırım" de (`class_weight='balanced'`).
4.  **Threshold (Eşik) Ayarı:** Standart %50 (0.5) yerine, %20 (0.2) şüpheyi bile "Fraud" kabul et.

```python
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, f1_score, roc_auc_score
from sklearn.preprocessing import StandardScaler

# 1. VERİ HAZIRLIĞI & STRATIFIED SPLIT
# ---------------------------------------------------------
# df = pd.read_csv("8-fraud_detection.csv")
# X = df.drop("is_fraud", axis=1)
# y = df["is_fraud"]

# Demo Dengesiz Veri: 1000 satır, sadece 20 tanesi (1) Fraud.
import numpy as np
X = np.random.randn(1000, 10)
y = np.array([0] * 980 + [1] * 20) # %98 Normal, %2 Fraud

# KRİTİK ADIM: stratify=y
# Bu parametre, Train ve Test setlerindeki Fraud oranının EŞİT olmasını sağlar.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. MODEL VE CLASS WEIGHT
# ---------------------------------------------------------
# 'balanced': Formülü otomatik hesaplar -> (Toplam / 2 * Sınıf Sayısı)
# Az olan sınıfa (Fraud) devasa bir ağırlık (ceza puanı) verir.
model = LogisticRegression(class_weight='balanced', solver='liblinear')

# 3. İNCE AYAR (HYPERPARAMETER TUNING)
# ---------------------------------------------------------
# Sadece ağırlık yetmez, ceza (C) ve yöntem (penalty) de denenmeli.
params = {
    'C': [0.01, 0.1, 1, 10],
    'penalty': ['l1', 'l2'], # L1 gereksiz özellikleri siler
    'class_weight': ['balanced', {0:1, 1:10}, {0:1, 1:100}] # Farklı ağırlıklar dene
}

# DİKKAT: scoring='f1'. Çünkü accuracy yalan söyler!
grid = GridSearchCV(model, params, cv=5, scoring='f1', n_jobs=-1)
print("En iyi model aranıyor...")
grid.fit(X_train_scaled, y_train)

print(f"En İyi F1 Skoru: {grid.best_score_:.2f}")
print(f"En İyi Ayarlar: {grid.best_params_}")

# 4. DEĞERLENDİRME VE EŞİK (THRESHOLD) AYARI
# ---------------------------------------------------------
best_model = grid.best_estimator_
y_pred_proba = best_model.predict_proba(X_test_scaled)[:, 1] # Olasılıkları al (örn: %35 fraud ihtimali)

# AUC Skoru (Modelin genel ayırma yeteneği)
print(f"AUC Skoru: {roc_auc_score(y_test, y_pred_proba):.2f}")

# EŞİK DEĞİŞTİRME:
# Varsayılan olarak > 0.5 ise 1 deriz.
# Ama banka diyor ki: "Risk alma! %30 şüphe bile olsa alarm ver."
y_pred_new_threshold = (y_pred_proba > 0.3).astype(int)

print("\n--- Varsayılan (0.5) vs Yeni Eşik (0.3) ---")
print("Rapor (0.3 Eşikli):")
print(classification_report(y_test, y_pred_new_threshold))

# Yorum: Eşiği düşürmek Recall'u (Yakalama) artırır ama False Alarm'ı da artırır.
# Bu bir ticari karardır.
```

---

<a name="bölüm-3-knn"></a>

# 📍 BÖLÜM 3: K-EN YAKIN KOMŞU ALGORİTMASI (KNN)

**Atasözü:** "Bana arkadaşını söyle, sana kim olduğunu söyleyeyim."

KNN (K-Nearest Neighbors), şimdiye kadarki en basit ama etkili algoritmalardan biridir. Bir matematiksel model **kurmaz** (eğitim sırasında bir şey öğrenmez, tembeldir). Sadece tüm veriyi hafızasında tutar ve yeni biri geldiğinde "Sen kime benziyorsun?" diye sorar.

## 3.1. Nasıl Çalışır?

Yeni bir veri noktası geldiğinde:

1.  Ona en yakın **K** adet komşuyu bulur. (Mesafe hesaplar).
2.  **Sınıflandırma (Classification):** Komşuların çoğu hangi takımdaysa onu seçer. (5 komşunun 3'ü B sınıfındaysa, ben de B'yim).
3.  **Regresyon (Regression):** Komşuların ortalamasını alır. (Ev fiyatı tahmininde, en yakın 3 evin ortalaması).

### Mesafeyi Nasıl Ölçeriz?

- **Euclidean (Öklid):** Kuş uçuşu mesafe (Hipotenüs). En yaygınıdır.
- **Manhattan:** Şehir blokları gibi, sadece dik gidilebilir (Taksi mesafesi).

### "K" Sayısının Önemi (Hayati Nokta)

- **K = 1:** En yakındaki tek bir komşuya inanır. Çok hassastır, gürültüden etkilenir (**Overfitting**).
- **K = 100:** Çok geniş bir kalabalığın ortalamasını alır. Detaylar kaybolur (**Underfitting**).
- **En iyi K:** Genelde tek sayı seçilir (oy eşitliği olmasın diye) ve `karekök(N)` formülüyle başlanabilir.

### 💻 Proje 1: Ev Enerji Tüketimi Tahmini (KNN Regresyon)

**Dosya:** `KNN Algoritması/ev-enerji-data.py`

Metrekare ve kişi sayısına göre enerji faturası tahmini.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsRegressor # Regresyon!
from sklearn.metrics import mean_squared_error

# Veri Yükleme (Demo)
# Normalde: df = pd.read_csv("12-house_energy_regression.csv")
X_train = np.random.rand(100, 2) * 100 # m2 ve kişi sayısı
y_train = X_train[:, 0] * 2 + X_train[:, 1] * 50 + np.random.normal(0, 10, 100) # Fatura
X_test = np.random.rand(20, 2) * 100
y_test = X_test[:, 0] * 2 + X_test[:, 1] * 50 + np.random.normal(0, 10, 20)

# KRİTİK ADIM: SCALING
# KNN mesafeye baktığı için, sayıları büyük olan özellik (Metrekare: 120), küçük olanı (Kişi Sayısı: 4) ezer geçer.
# Bu yüzden HEPSİNİ aynı ölçeğe getirmeliyiz.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model Eğitimi (Aslında sadece veriyi kaydediyor)
knn = KNeighborsRegressor(n_neighbors=5) # En yakın 5 komşuya bak
knn.fit(X_train_scaled, y_train)

# Tahmin
print(f"R2 Score: {knn.score(X_test_scaled, y_test):.2f}")
```

### 💻 Proje 2: Sağlık Riski Analizi (KNN Sınıflandırma ve Elbow Metodu)

**Dosya:** `KNN Algoritması/saglikrisk.py`

KNN algoritmasında en büyük soru şudur: **"K kaç olmalı?"**

- K çok küçükse (1): Model gürültüye takılır (Overfitting).
- K çok büyükse (50): Model fazla geneller, grupları ayıramaz (Underfitting).

Bunu bulmak için **"Elbow Method" (Dirsek Metodu)** kullanırız. K değerini 1'den 40'a kadar deneriz ve hatanın nerede kırıldığına (dirsek yaptığına) bakarız.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

# 1. VERİ HAZIRLIĞI (Sentetik)
# ---------------------------------------------------------
# İki grup insan olsun: Sağlıklı (0) ve Riskli (1)
# Yaş ve Kolesterol değerlerine göre sınıflandıralım.
np.random.seed(42)
clust1 = np.random.normal(25, 5, (100, 2)) # Genç ve düşük kolesterol
clust2 = np.random.normal(55, 10, (100, 2)) # Yaşlı ve yüksek kolesterol
X = np.concatenate([clust1, clust2])
y = np.concatenate([np.zeros(100), np.ones(100)]) # 0 ve 1 etiketleri

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# StandardScaler (KNN için ŞARTTIR)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. ELBOW METHOD (En İyi K'yı Bulma)
# ---------------------------------------------------------
hata_oranlari = []

for k in range(1, 40):
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train_scaled, y_train)
    pred_i = knn.predict(X_test_scaled)
    # Hata oranı = Yanlış tahminlerin ortalaması
    hata_oranlari.append(np.mean(pred_i != y_test))

# 3. GRAFİK (Dirsek Nerede?)
plt.figure(figsize=(10, 6))
plt.plot(range(1, 40), hata_oranlari, color='blue', linestyle='dashed', marker='o', markerfacecolor='red', markersize=10)
plt.title('Hata Oranı vs K Değeri')
plt.xlabel('K Değeri')
plt.ylabel('Hata Oranı')
print("Grafiğe bakarak hatanın en düşük olduğu K değerini seçin (Genelde 3, 5 veya 7).")
plt.show()

# 4. FİNAL MODEL (Örn: K=5 için)
final_knn = KNeighborsClassifier(n_neighbors=5)
final_knn.fit(X_train_scaled, y_train)
print(f"Final Model Başarısı: %{accuracy_score(y_test, final_knn.predict(X_test_scaled))*100:.2f}")
```

---

<a name="bölüm-4-svm"></a>

# ⚔️ BÖLÜM 4: DESTEK VEKTÖR MAKİNELERİ (SVM)

SVM (Support Vector Machine), veri bilimi dünyasının "Şövalyesi"dir.
Amacı: İki sınıfı birbirinden ayıran çizgiyi çizmek değil, **en geniş güvenlik şeridini (Margin)** çizmektir.

## 4.1. Mantığı Nedir?

İki ülkeyi ayıran bir sınır çizeceksiniz. Sınırı nereye çekersiniz?

- Sınıra en yakın evlere (Destek Vektörleri - Support Vectors) bakarsınız.
- Bu evlerden mümkün olduğunca uzak, tam ortadan geçen, en güvenli hattı çizersiniz.
- Bu güvenli bölgeye "Margin" denir. Margin ne kadar genişse, model o kadar sağlamdır.

## 4.2. Veri Doğrusal Ayrılmıyorsa? (Kernel Trick)

Diyelim ki kırmızılar ortada, maviler etrafta (Halka şeklinde). Düz bir çizgiyle ayıramazsınız.

**Kernel Trick:** Masadaki kağıdı (2D) elinize alıp bükerseniz (3D), ortadaki noktalar yukarı kalkar ve aralarından düz bir kağıt geçirebilirsiniz. SVM bunu matematiksel olarak yapar! (`kernel='rbf'`)

### 📝 SVM REÇETESİ

1.  **Scaling ŞART:** SVM mesafe hesabına dayanır. `StandardScaler` yapmazsanız yanlış sonuç verir.
2.  **Kernel Seçimi:**
    - Doğrusal veri -> `linear`
    - Kavisli veri -> `poly`
    - Karışık/Genel -> `rbf` (Varsayılan ve genelde en iyisi)
3.  **Hata Toleransı (C):** `C=1` ile başla. Overfitting olursa küçült.

### 💻 Proje 1: Spam E-Posta Yakalama (SVM Sınıflandırma)

**Dosya:** `support-vector-machine/svmClassifier.py`

SVM, verileri ayırmak için "Hyperplane" adı verilen en ideal sınırı çizer. Bu örnekte, kelime sıklıklarına göre bir e-postanın **Spam (1)** mi yoksa **Normal (0)** mi olduğunu bulacağız.

```python
import pandas as pd
import numpy as np
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification

# 1. VERİ HAZIRLIĞI (Sentetik Veri)
# ---------------------------------------------------------
# make_classification: Deney yapmak için uydurma veri üretir.
# n_features=20: Her e-postada 20 farklı kelime/özellik var gibi düşünün.
X, y = make_classification(n_samples=1000, n_features=20, n_classes=2, random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# StandardScaler (SVM için KRİTİKTİR)
# SVM "mesafe" hesabı yaptığı için, ölçeklenmemiş veri hatalı sonuç verir.
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. MODEL KURULUMU VE EĞİTİM
# ---------------------------------------------------------
# kernel='rbf': (Radial Basis Function). Veri doğrusal değilse (iç içe geçmişse) bu kernel harikadır.
# C=1.0: Hata Toleransı.
#   - C Büyükse (100): "Asla hata yapma!" (Margin daralır, Overfitting riski).
#   - C Küçükse (0.1): "Biraz hata olabilir, yolu geniş tut." (Daha genel model).
# gamma='scale': Her bir veri noktasının etki alanı.
svm_model = SVC(kernel='rbf', C=1.0, gamma='scale')

print("Model eğitiliyor...")
svm_model.fit(X_train_scaled, y_train)

# 3. TAHMİN VE DEĞERLENDİRME
# ---------------------------------------------------------
y_pred = svm_model.predict(X_test_scaled)
print(f"Spam Tespit Başarısı (Accuracy): %{accuracy_score(y_test, y_pred)*100:.2f}")

print("\n--- Detaylı Rapor ---")
print(classification_report(y_test, y_pred))
```

### 💻 Proje 2: Elmas Fiyat Tahmini (SVR - Regresyon Modu)

**Dosya:** `support-vector-machine/diamond.py`

SVM sadece sınıflandırma değil, regresyon da yapar (Support Vector Regression = SVR). Mantık aynıdır: Veri noktalarını içine alan en dar tüneli (tüpü) çizmeye çalışır.

```python
from sklearn.svm import SVR
# kernel='poly': Polinom (kavisli) ilişki kur.
svr = SVR(kernel='poly', degree=2, C=100)
# svr.fit(X_train_scaled, y_train)
```

**Not:** SVM büyük verilerde YAVAŞTIR. Milyonlarca satır varsa kullanırken dikkatli olun.

---

<a name="bölüm-5-naive-bayes"></a>

# 🎲 BÖLÜM 5: NAIVE BAYES

**Atasözü:** "Ördek gibi yürüyorsa ve ördek gibi vaklıyorsa, o bir ördektir."

Olasılık temellidir (Bayes Teoremi).
**Neden "Naive" (Saf)?**: Çünkü verideki tüm özelliklerin birbirinden bağımsız olduğunu varsayar.

- Örn: "Hava bulutlu" ve "Yağmur yağıyor" olaylarını birbirinden bağımsız sanır. Halbuki ilişkilidir.
- Bu "saf" varsayıma rağmen, özellikle **Metin Sınıflandırma** (Spam filtresi, Duygu analizi) konusunda inanılmaz hızlı ve başarılıdır.

## 5.1. Matematiksel Temel (Bayes Teoremi)

`P(A|B) = P(B|A) * P(A) / P(B)`

- `P(Kanser|Pozitif Test)`: Test pozitif çıktığında kişinin gerçekten kanser olma olasılığı.

## 5.2. Türleri

- **GaussianNB:** Veriler sayısal ve normal dağılıyorsa (Boy, Kilo).
- **MultinomialNB:** Veriler adet ise (Kelime sayısı).

- **BernoulliNB:** Veriler var/yok ise (0/1).

### 📝 NAIVE BAYES REÇETESİ

1.  **Soru:** Verin ne tür?
    - Sayısal (Boy, Kilo) -> `GaussianNB` kullan.
    - Sayaç (Kelime sayısı) -> `MultinomialNB` kullan.
    - Evet/Hayır (Var/Yok) -> `BernoulliNB` kullan.
2.  **Hız:** Bu model çok hızlıdır, devasa verilerde ilk bunu dene.

### 💻 Proje: İris Çiçeği Türü Bulma

**Dosya:** `NaiveBayes/irish.py` (Dosya adı 'irish' yazılmış, doğrusu 'iris'tir).

```python
from sklearn.naive_bayes import GaussianNB
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Veri
iris = load_iris()
X, y = iris.data, iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Model
# Verilerimiz (Yaprak uzunluğu cm cinsinden) sürekli sayısal olduğu için Gaussian kullanıyoruz.
nb = GaussianNB()
nb.fit(X_train, y_train)

print(f"Başarı Skoru: {accuracy_score(y_test, nb.predict(X_test)):.2f}")
```

---

<a name="bölüm-6-karar-agaclari"></a>

# 🌳 BÖLÜM 6: KARAR AĞAÇLARI (DECISION TREES)

**Mantık:** "20 Soru Oyunu".
Hedefe ulaşmak için sürekli Evet/Hayır soruları sorar. Veriyi sürekli parçalara böler.

- Soru 1: Hava yağmurlu mu? -> Evet.
- Soru 2: Rüzgar var mı? -> Hayır.
- **KARAR:** Şemsiye al.

## 6.1. Nasıl Böler? (Entropy ve Gini)

Ağaç, hangi soruyu önce soracağına nasıl karar verir? En çok "Bilgi" veren soruyu seçer.

- **Entropy:** Düzensizliktir. (Bir odada 5 kedi 5 köpek varsa entropy yüksektir. 10 kedi varsa entropy 0'dır).
- **Amaç:** Her soruda entropy'yi azaltmak, saflığı artırmaktır.

## 6.2. Tehlike: Overfitting

Karar ağaçları ezberlemeye çok meyillidir. Her bir veri noktası için özel bir kural uydurabilir.
**Çözüm:** Budama (Pruning) veya Derinlik Sınırı (max_depth).

- `max_depth=3`: Sadece 3 soru sorabilirsin! (Böylece model genellemeyi öğrenir).

### 📝 KARAR AĞACI REÇETESİ

1.  **Scaling GEREKMEZ:** Ağaçlar "Şu sayıdan büyük mü?" diye bakar, sayının 5 veya 5000 olması fark etmez.
2.  **Encoding ŞART:** Yazı veremezsiniz (Kadın/Erkek). Sayı olmalı (0/1). `LabelEncoder` kullan.
3.  **Sınır Koy:** `max_depth=3` veya `5` ile başla. Yoksa ağaç veriyi ezberler (Overfit).
4.  **Çiz:** `plot_tree` ile ağacı görselleştir, ne yaptığını anla.

### 💻 Proje: İris Çiçeği Karar Ağacı (Görselleştirme)

**Dosya:** `KararAgaclari/iris_tree.py`

Karar ağaçlarının en güzel yanı "ne düşündüğünü" görebilmektir. Bu örnekte, Iris veri setini kullanarak çiçeğin türünü tahmin eden bir ağaç dikeceğiz ve bu ağacı ekrana çizeceğiz.

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. VERİ HAZIRLIĞI
# ---------------------------------------------------------
iris = load_iris()
X = iris.data
y = iris.target
feature_names = iris.feature_names # ['sepal length', 'sepal width', ...]
class_names = iris.target_names    # ['setosa', 'versicolor', 'virginica']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. MODEL VE SINIRLAMA (PRUNING)
# ---------------------------------------------------------
# max_depth=3: Ağacın derinliğini 3 ile sınırla.
# Neden? Sınırlamazsak her yaprakta tek bir çiçek kalana kadar böler (Overfitting).
# 3 kat derine inmek, genelleme yapmak için idealdir.
tree_model = DecisionTreeClassifier(criterion='gini', max_depth=3, random_state=42)
tree_model.fit(X_train, y_train)

# 3. BAŞARI ÖLÇÜMÜ
# ---------------------------------------------------------
y_pred = tree_model.predict(X_test)
print(f"Test Başarısı: %{accuracy_score(y_test, y_pred)*100:.2f}")

# 4. AĞACI ÇİZME (GÖRSELLEŞTİRME)
# ---------------------------------------------------------
plt.figure(figsize=(12, 8))
# filled=True: Her sınıfı farklı renkle göster
# rounded=True: Kutuların köşelerini yuvarla
plot_tree(tree_model,
          filled=True,
          feature_names=feature_names,
          class_names=class_names,
          rounded=True)
plt.title("Karar Ağacının Mantığı")
plt.show()

# ÇIKTI YORUMU:
# En üstteki kutu (Kök), en çok bilgi veren sorudur (Örn: "Petal width <= 0.8 mi?").
# Gini: O kutudaki safsızlık (kargaşa) oranıdır. 0 olursa tertemiz (saf) demektir.
```

---

---

<a name="bölüm-7-ensemble"></a>

# 🌲 BÖLÜM 7: TOPLULUK ÖĞRENMESİ (ENSEMBLE LEARNING) VE RANDOM FOREST

**Atasözü:** "Bir elin nesi var, iki elin sesi var." veya "Akıl akıldan üstündür."

Bugüne kadar tek bir model (Tek bir öğrenci) kullandık. Ensemble yöntemleri ise **bir sınıf dolusu öğrenciyi** aynı sınava sokar ve ortak karara (oy çokluğuna veya ortalamaya) bakar.

- Bir Karar Ağacı hata yapabilir.
- Ama 100 Karar Ağacı bir araya gelirse (Orman olursa), birbirlerinin hatasını kapatırlar. Buna **Random Forest (Rastgele Orman)** denir.

## 7.1. Bagging (Bootstrap Aggregating) Mantığı

Rastgele Orman, "Bagging" adı verilen zekice bir yöntem kullanır:

1.  Veri setinden rastgele parçalar alarak 100 farklı alt veri seti oluşturur.
2.  Her alt veri setine ayrı bir ağaç diker.
3.  **Sınıflandırma:** 100 ağaçtan 80'i "Hasta", 20'si "Sağlıklı" dediyse sonuç "Hasta"dır (Oy çokluğu).
4.  **Regresyon:** 100 ağacın tahminlerinin ortalamasını alır.

### 💻 Proje: Yetişkin Gelir Tahmini (Sentetik Veri ile)

**Dosya:** `Ensemble/random_forest_income.py`

Bu örnekte, Random Forest (Rastgele Orman) algoritmasının tek bir karar ağacına göre ne kadar güçlü olduğunu göreceğiz.
Ayrıca kategorik verileri (Meslek, Eğitim) nasıl işleyeceğimizi (Encoding) göstereceğiz.

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

# 1. VERİ HAZIRLIĞI (Sentetik)
# ---------------------------------------------------------
# Senaryo: Yaş, Eğitim Yılı ve Haftalık Çalışma Saatine göre Gelir > 50K mı?
np.random.seed(42)
n_samples = 1000
age = np.random.randint(18, 70, n_samples)
education_years = np.random.randint(5, 20, n_samples)
hours_per_week = np.random.normal(40, 10, n_samples)

# Hedef: Gelir (Karmaşık bir kural uyduralım)
# Kural: Eğitim > 16 VE Yaş > 30 ise Yüksek Gelir (%80 ihtimalle)
income_prob = (education_years > 16).astype(int) * 0.4 + (age > 30).astype(int) * 0.4
y = (income_prob + np.random.normal(0, 0.1, n_samples) > 0.5).astype(int)

# DataFrame oluştur
df = pd.DataFrame({'Age': age, 'Edu': education_years, 'Hours': hours_per_week})

X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.3, random_state=42)

# 2. TEK AĞAÇ vs ORMAN
# ---------------------------------------------------------
# Tek Karar Ağacı
tree = DecisionTreeClassifier(random_state=42)
tree.fit(X_train, y_train)
print(f"Tek Karar Ağacı Başarısı: %{accuracy_score(y_test, tree.predict(X_test))*100:.2f}")

# Random Forest (100 Ağaç)
# n_estimators=100: 100 tane ağaç dik.
# n_jobs=-1: Bilgisayarın tüm işlemcilerini kullan (Hızlandır).
rf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)
print(f"Random Forest Başarısı:   %{accuracy_score(y_test, rf.predict(X_test))*100:.2f}")

# 3. ÖZELLİK ÖNEMİ (Feature Importance)
# ---------------------------------------------------------
# Hangi özellik geliri en çok etkiliyor?
importances = pd.Series(rf.feature_importances_, index=df.columns)
print("\n--- Özelliklerin Önemi ---")
print(importances.sort_values(ascending=False))
```

## 7.3. Proje: Spor Salonu Kalabalıklığı (DateTime Özellikleri)

**Senaryo:** Hangi saatte, hangi günde spor salonu ne kadar dolu?
**Zorluk:** Elimizde sadece "Tarih/Saat" (2023-10-25 18:30:00) var. Makine bunu tarih olarak anlamaz.
**Çözüm:** Tarihi parçalara ayırmak (Feature Engineering).

```python
# Örnek Tarih İşleme
# df['date'] = pd.to_datetime(df['date'])
# df['hour'] = df['date'].dt.hour        # Saati çek (18)
# df['day_of_week'] = df['date'].dt.dayofweek # Haftanın günü (Pazartesi=0)
# df['month'] = df['date'].dt.month      # Ayı çek (10)
# Artık model "Akşam 18:00" ve "Hafta sonu" kavramlarını öğrenebilir!

# Model Karşılaştırma:
# Random Forest vs Linear Regression
# Zaman serisi verilerinde Random Forest, döngüleri (Hafta sonu kalabalığı) daha iyi yakalar.
```

### 📝 RANDOM FOREST REÇETESİ

1.  **Hazırlık:** Eksik veri olmamalı. Kategorik veriler sayıya çevrilmeli (Encoding).
2.  **Model Ayarları (Hyperparameters):**
    - `n_estimators`: Ağaç sayısı. 100 ile başla, 500'e kadar dene. Ne kadar çok, o kadar iyi (ama yavaşlar).
    - `max_depth`: Ağaç derinliği. Genelde Random Forest'ta sınırlamaya (pruning) çok gerek yoktur ama model çok şişerse 10-20 verilebilir.
3.  **Özellik Önemi (Feature Importance):** Model eğitildikten sonra `model.feature_importances_` komutuyla hangi özelliğin (Yaş mı, Eğitim mi?) daha kritik olduğunu çizdirip bakabilirsin. Bu, iş sunumlarında hayat kurtarır!

---

<a name="bölüm-8-boosting"></a>

# 🚀 BÖLÜM 8: BOOSTING ALGORİTMALARI (ADABOOST & GRADIENT BOOSTING)

**Atasözü:** "Hatasız kul olmaz, hatadan ders çıkarmayan model olmaz."

Random Forest'ta ağaçlar birbirinden bağımsızdı (Paralel öğrenme).
Boosting'de ise ağaçlar **sırayla** öğrenir (Seri öğrenme).

### 🥊 Karşılaştırma: Bagging vs Boosting

| Özellik               | Random Forest (Bagging)              | Boosting (XGBoost, AdaBoost)                    |
| :-------------------- | :----------------------------------- | :---------------------------------------------- |
| **Öğrenme Tarzı**     | **Paralel** (Tüm ağaçlar aynı anda). | **Seri** (Bir önceki ağacın hatasını düzeltir). |
| **Amaç**              | Variance'ı (değişkenliği) düşürmek.  | Bias'ı (önyargıyı/hatayı) düşürmek.             |
| **Hız**               | Hızlıdır (Paralel işlem).            | Yavaştır (Sırayla gider) ama daha güçlüdür.     |
| **Overfitting Riski** | Düşüktür.                            | Yüksektir (Dikkatli ayarlanmalı).               |

**Atasözü:** "Hatasız kul olmaz, hatadan ders çıkarmayan model olmaz."

Random Forest'ta ağaçlar birbirinden bağımsızdı (Paralel öğrenme).
Boosting'de ise ağaçlar **sırayla** öğrenir (Seri öğrenme).

1.  Birinci öğrenci (Model A) testi çözer.
2.  İkinci öğrenci (Model B), **sadece Model A'nın yanlış yaptığı sorulara** odaklanır.
3.  Üçüncü öğrenci (Model C), A ve B'nin çözemediklerine odaklanır.
    Sonuçta bu "uzmanlaşmış" öğrencilerin toplamı mükemmel bir zeka oluşturur.

## 8.1. AdaBoost (Adaptive Boosting)

### 💻 Proje: Hastalık Teşhisi (AdaBoost)

Zayıf öğrenicileri (kısa karar ağaçlarını) birleştirerek güçlü bir model oluşturur. Her adımda "yanlış yapılan" veriye odaklanır.

```python
import numpy as np
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_hastie_10_2

# 1. VERİ HAZIRLIĞI
# make_hastie_10_2: Sınıflandırma için zor bir yapay veri seti (12.000 veri).
X, y = make_hastie_10_2(n_samples=2000, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. MODEL
# base_estimator: Zayıf öğrenici ne olsun? (Genelde derinliği 1 olan ağaç - Stump).
# n_estimators: Kaç tane zayıf öğrenici olsun?
ada = AdaBoostClassifier(
    estimator=DecisionTreeClassifier(max_depth=1), # Sadece 1 soru sorabilen ağaç
    n_estimators=100,
    learning_rate=1.0,
    random_state=42
)

ada.fit(X_train, y_train)

print(f"AdaBoost Başarısı: %{accuracy_score(y_test, ada.predict(X_test))*100:.2f}")
```

## 8.2. Gradient Boosting (GBM)

AdaBoost ağırlıklarla oynar, Gradient Boosting ise **Hatayı (Residual)** tahmin etmeye çalışır.

- Hedef: 100. Tahmin: 80. Hata: 20.
- İkinci model bu "20"yi tahmin etmeye çalışır.
- **Metafor:** Golfçü topa vurur, deliğe yaklaşır ama girmez. İkinci vuruşu deliğe değil, topun kaldığı yerden deliğe olan mesafeye göre yapar. Adım adım hatayı sıfıra indirir.

### 💻 Proje: Gradient Boosting Regresyon (Beton Dayanımı)

AdaBoost sınıflandırma yapar, bu örnekte Gradient Boosting ile **Regresyon (Sayısal Tahmin)** yapacağız.

```python
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split

# 1. VERİ (Beton verisi simülasyonu)
X, y = make_regression(n_samples=1000, n_features=10, noise=0.5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. MODEL
# learning_rate: Adım büyüklüğü. Küçük olması (0.01) iyidir ama çok ağaç (n_estimators) gerekir.
gb_model = GradientBoostingRegressor(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)

gb_model.fit(X_train, y_train)
y_pred = gb_model.predict(X_test)

print(f"R2 Score (Başarı): %{r2_score(y_test, y_pred)*100:.2f}")
print(f"RMSE (Hata): {mean_squared_error(y_test, y_pred, squared=False):.2f}")
```

### 📝 BOOSTING REÇETESİ

1.  **Hız/Öğrenme Oranı (`learning_rate`):** En kritik ayardır.
    - Düşük (0.01): Yavaş yavaş, emin adımlarla öğrenir (Daha çok ağaç gerekir, sonuç genelde daha iyidir).
    - Yüksek (0.1): Hızlı öğrenir ama detayı kaçırabilir (Overfitting riski).
2.  **Veri Temizliği ŞART:** Boosting gürültüye (hatalı veriye) çok duyarlıdır. Outlier (Aykırı değer) temizliği yapılmalı.
3.  **Sıralama:** Önce Random Forest dene. Yetmezse XGBoost, LightGBM veya CatBoost (Gradient Boosting'in modern versiyonları) dene.

---

# 🏁 FİNAL: MAKİNE ÖĞRENMESİ YOLCULUĞU

Bu rehberde, basit bir doğrudan (Lineer Regresyon) başlayıp, çoklu akıl sistemlerine (Ensemble, Boosting) kadar geldik.

**Hangi Modeli Ne Zaman Kullanayım?**

1.  **Veriyi Anlamak için:** Karar Ağacı (Görseli var, insan okuyabilir).
2.  **Basit ve Hızlı Başlangıç:** Lojistik Regresyon / Naive Bayes.

3.  **Karmaşık İlişkiler ve Sağlamlık:** Random Forest (Varsayılan ayarlarla bile harikadır).
4.  **Yüksek Başarı ve Yarışmalar:** Gradient Boosting (XGBoost/LightGBM). İnce ayar ister ama en iyi sonucu verir.

---

<a name="bölüm-9-xgboost"></a>

# 🚀 BÖLÜM 9: XGBOOST (EXTREME GRADIENT BOOSTING)

**Tanım:** "Kaggle Yarışmalarının Kralı."

Gradient Boosting'i hatırlıyorsunuz (Golfçü örneği). XGBoost, bu golfçünün **steroid almış** halidir.

1.  **Hız:** Çok daha hızlı çalışır (Paralel işlem yapar).
2.  **Akıl:** "Budama" işlemini çok akıllıca yapar, gereksiz dalları keser.
3.  **Kayıp Veri:** Eksik verileri (NaN) kendisi yönetebilir.

## 9.1. Proje: XGBoost ile Sınıflandırma (Kaggle Kralı)

XGBoost kütüphanesi harici kurulum gerektirir (`pip install xgboost`).

```python
import xgboost as xgb
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. VERİ (Wine Dataset - Şarap Kalite Analizi)
# 3 farklı şarap üreticisi (sınıf) var.
data = load_wine()
X, y = data.data, data.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. XGBOOST MODELİ
# use_label_encoder=False: Uyarı almamak için.
# eval_metric='mlogloss': Çoklu sınıflandırma hatasını ölç.
model = xgb.XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    use_label_encoder=False,
    eval_metric='mlogloss'
)

model.fit(X_train, y_train)

print(f"XGBoost Başarısı: %{accuracy_score(y_test, model.predict(X_test))*100:.2f}")
```

## 9.2. Proje 2: Ev Fiyatları ve Outlier (Aykırı Değer) Temizliği

**Kritik Konu: Outlier Nedir?**
Bir mahallede evler 3-5 Milyon TL iken, arada bir tane 100 Milyon TL'lik "Saray" varsa, bu veriye **Outlier** denir. Bu veri modelin kafasını karıştırır, ortalamayı bozar. Temizlenmelidir.

### 🧹 Outlier Temizliği Reçetesi (Z-Score & IQR)

```python
# Yöntem 1: Z-Score (Standart Sapma)
# Ortalamadan 3 standart sapma uzaktakileri at.
# from scipy import stats
# z_scores = stats.zscore(df['price'])
# df_clean = df[(z_scores < 3)]

# Yöntem 2: IQR (Interquartile Range) - En Yaygını
# Q1 = df['price'].quantile(0.25)
# Q3 = df['price'].quantile(0.75)
# IQR = Q3 - Q1
# Alt_Sinir = Q1 - 1.5 * IQR
# Ust_Sinir = Q3 + 1.5 * IQR
# df_clean = df[(df['price'] > Alt_Sinir) & (df['price'] < Ust_Sinir)]
```

### 📝 XGBOOST REÇETESİ

1.  **Overfitting'e Dikkat:** XGBoost çok güçlüdür, veriyi ezberleyebilir.
    - Çözüm: `early_stopping_rounds`. "Eğer 10 tur boyunca gelişme yoksa eğitimi durdur" deyin.
2.  **Veri Tipi:** Sadece sayısal veri kabul eder. Tüm kategorik verileri (Encoding) dönüştürün.
3.  **Hiperparametreler:**
    - `max_depth`: Genelde 3-6 arası (Çok derin yapma).
    - `learning_rate`: 0.01 ile 0.3 arası.

---

<a name="bölüm-10-lightgbm"></a>

# ⚡ BÖLÜM 10: LIGHTGBM (Light Gradient Boosting Machine)

**Farkı Nedir?**

- **XGBoost:** Ağacı katman katman büyütür (Level-wise). Dengelidir.
- **LightGBM:** Ağacı yaprak tabanlı büyütür (Leaf-wise). En çok hata veren yaprağa odaklanır, orayı derinleştirir.
- **Sonuç:** Çok daha HIZLI ve daha az bellek (RAM) harcar. Büyük verilerde (Milyonlarca satır) tercih edilir.

## 10.1. Proje: LightGBM (Hız Canavarı)

Büyük veri setlerinde XGBoost'tan daha hızlıdır. `pip install lightgbm` gerektirir.

```python
import lightgbm as lgb
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. BÜYÜK VERİ SİMÜLASYONU (100.000 Satır)
X, y = make_classification(n_samples=100000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. LIGHTGBM MODELİ
# LightGBM özel veri yapısı (Dataset) kullanırsa daha hızlıdır ama doğrudan da verilebilir.
model = lgb.LGBMClassifier(
    learning_rate=0.05,
    n_estimators=200,   # Ağaç sayısı
    num_leaves=31       # Yaprak sayısı (Derinlik kontrolü yerine bu kullanılır)
)

print("LightGBM Eğitiliyor (Hızına dikkat)...")
model.fit(X_train, y_train)

print(f"LightGBM Başarısı: %{accuracy_score(y_test, model.predict(X_test))*100:.2f}")
```

### 📝 LIGHTGBM REÇETESİ

1.  **Kategorik Veri:** LightGBM, kategorik veriyi (One-Hot yapmadan) doğrudan işleyebilir! Sadece sütun tipini `category` olarak ayarlayın.
2.  **Küçük Veride Kullanma:** 10.000 satırdan az veride Overfitting yapabilir. Büyük veriler için kullanın.
3.  **Hız:** Eğer model eğitiminiz saatler sürüyorsa, LightGBM'e geçin, dakikalar sürsün.

---

<a name="bölüm-11-transformation"></a>

# 🔄 BÖLÜM 11: VERİ DÖNÜŞÜMLERİ (BOX-COX VE YEO-JOHNSON)

Modeller (Özellikle Lineer Regresyon, KNN), verinin **Normal Dağılımını** (Çan Eğrisi) sever.
Ancak gerçek hayat verisi genelde çarpıktır (Skewed).

- **Sola Çarpık:** İnsanların çoğu düşük maaş alır, az sayıda kişi ultra zengin olur. Grafik sola yığılır.

Bu veriyi "ütüler gibi" düzeltip çan eğrisine benzetmemiz gerekir.

## 11.1. Dönüşüm Teknikleri

1.  **Log Dönüşümü (`np.log`):** Basit ve etkilidir ama "0" veya negatif sayılarda çalışmaz.
2.  **Box-Cox:** Çok güçlüdür. Sadece **Pozitif (>0)** sayılarda çalışır.
3.  **Yeo-Johnson:** Negatif sayılarla da çalışabilen modern yöntemdir.

## 11.2. Proje: Veri Dönüşümü ve Normalleştirme

Verilerimiz her zaman düzgün dağılmaz ("Çan Eğrisi"). Çarpık verileri düzeltmek (Transformasyon) modelin performansını artırır.

```python
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import PowerTransformer

# 1. ÇARPIK VERİ OLUŞTURMA (Log-Normal Dağılım)
# Gelir verisi gibi: Çoğu kişi az kazanır, az kişi çok kazanır (Sola yığılı).
np.random.seed(42)
X = np.random.lognormal(mean=2, sigma=0.5, size=(1000, 1))

# 2. DÖNÜŞÜM (Yeo-Johnson)
# Yeo-Johnson hem pozitif hem negatif sayılarda çalışır (Box-Cox sadece pozitiftir).
pt = PowerTransformer(method='yeo-johnson')
X_transformed = pt.fit_transform(X)

# 3. GÖRSEL KARŞILAŞTIRMA
fig, ax = plt.subplots(1, 2, figsize=(12, 5))

sns.histplot(X, kde=True, ax=ax[0], color='red')
ax[0].set_title("Orijinal Veri (Çarpık)")

sns.histplot(X_transformed, kde=True, ax=ax[1], color='green')
ax[1].set_title("Dönüştürülmüş Veri (Normal Dağılım)")

plt.show()
```

### 📝 TRANSFORMASYON REÇETESİ

1.  **Sıra:** Outlier temizliği -> Transformasyon -> Scaling. (Önce çöpü at, sonra şekil ver, sonra ölçekle).
2.  **Sadece Girdiler (X):** Hedef değişkene (y) transformasyon yapmak zorunda değilsiniz ama yaparsanız geri dönüştürmeyi (`inverse_transform`) unutmayın.
3.  **Kontrol:** `df.skew()` komutu ile çarpıklığa bakın. 0'a yakınsa dokunmayın.

---

<a name="bölüm-12-final"></a>

# 🎓 BÜYÜK FİNAL: SIÇRAMA TAHTASI

Tebrikler! Artık sadece kod yazan biri değil, verinin dilinden anlayan bir **Veri Bilimcisisiniz**.

### 🏆 Neler Başardınız?

1.  **Temeller:** Regresyon, Sınıflandırma, Overfitting, Bias-Variance.
2.  **Algoritmalar:** KNN, SVM, Naive Bayes, Karar Ağaçları.
3.  **İleri Seviye:** Random Forest, AdaBoost, Gradient Boosting.
4.  **Modern Silahlar:** XGBoost, LightGBM.
5.  **Sanat:** Feature Engineering, Outlier Temizliği, Veri Transformasyonu.

### 🗺️ Veri Bilimci Pusulası: Hangi Algoritmayı Seçmeliyim?

| Durum                    | Veri Miktarı | Önerilen Algoritma                    | Neden?                                             |
| :----------------------- | :----------- | :------------------------------------ | :------------------------------------------------- |
| **Başlangıç / Keşif**    | Az (<10k)    | **Decision Tree**                     | Veriyi anlamak ve görselleştirmek için.            |
| **Basit Sınıflandırma**  | Orta (<100k) | **Logistic Regression / Naive Bayes** | Hızlı, basit ve olasılık verir.                    |
| **Yüksek Performans**    | Çok (>100k)  | **XGBoost / LightGBM**                | Kaggle standartıdır. En iyi sonucu verir.          |
| **Karmaşık & Gürültülü** | Orta-Çok     | **Random Forest**                     | Ayar yapmadan bile iyi çalışır. Overfit olmaz.     |
| **Görüntü / Ses**        | Çok Fazla    | **Neural Networks (Derin Öğrenme)**   | (Bu rehberin kapsamı dışındadır ama bilmelisiniz). |

### 🚀 Bundan Sonraki Meydan Okuma (Ödevler)

Kendinizi test etmek için şu projeleri yapın:

1.  **Titanic (Kaggle):** %80 üzeri doğruluk skoruna ulaşmaya çalışın. (İpucu: 'Cabin' sütununu ve ünvanları iyi kullanın).
2.  **House Prices (Kaggle):** XGBoost ve LightGBM'i karıştırarak (Ensemble) kullanın.
3.  **Kendi Veriniz:** İş yerinizdeki veya ilgi alanınızdaki bir Excel dosyasını alıp makineye öğretin.

Unutmayın: **"Veri, toprağın altındaki petrol gibidir. Makine öğrenmesi ise rafineridir."**

Yolunuz açık, modeliniz `Overfit` olmasın! Başarılar! 🚀
