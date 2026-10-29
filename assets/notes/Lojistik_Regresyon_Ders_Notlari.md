# 🎓 Lojistik Regresyon ve Sınıflandırma: Sıfırdan Zirveye Ders Notları

Merhaba! Bu rehber, klasöründeki kodları analiz ederek oluşturulmuş, seni sınıflandırma problemlerinde başlangıç seviyesinden alıp ileri seviye tekniklere taşıyacak kapsamlı bir yol haritasıdır.

## 📚 İçindekiler

1. [Giriş: Sınıflandırma Nedir?](#1-giriş-sınıflandırma-nedir)
2. [Bölüm 1: Veri Yükleme ve Keşif (EDA)](#bölüm-1-veri-yükleme-ve-keşif-eda)
3. [Bölüm 2: Kritik Ön İşleme Adımları (Scaling & Split)](#bölüm-2-kritik-ön-işleme-adımları)
4. [Bölüm 3: Temel Model Eğitimi ve Yorumlama](#bölüm-3-temel-model-eğitimi-ve-yorumlama)
5. [Bölüm 4: Model İyileştirme (Grid Search & Tuning)](#bölüm-4-model-iyileştirme-grid-search--tuning)
6. [Bölüm 5: Dengesiz Veriler ve İleri Metrikler (ROC/AUC)](#bölüm-5-dengesiz-veriler-ve-ileri-metrikler)
7. [Bölüm 6: Çoklu Sınıflandırma (Multi-Class)](#bölüm-6-çoklu-sınıflandırma-multi-class)

---

## 1. Giriş: Sınıflandırma Nedir?

Makine öğrenmesinde sınıflandırma, bir verinin hangi kategoriye (sınıfa) ait olduğunu tahmin etme işidir.

- **İkili Sınıflandırma (Binary):** Sadece iki seçenek vardır. (Evet/Hayır, Hasta/Sağlıklı, Fraud/Normal).
- **Çoklu Sınıflandırma (Multi-class):** İkiden fazla seçenek vardır. (Kedi/Köpek/Kuş, Saldırı Tipi A/B/C).

Bu rehberde **Lojistik Regresyon** algoritmasını kullanacağız. Adı "Regresyon" olsa da, aslında matematiksel bir S harfi (Sigmoid fonksiyonu) çizerek olasılık hesabı yapan bir **Sınıflandırma** algoritmasıdır.

---

## Bölüm 1: Veri Yükleme ve Keşif (EDA)

Örnek Veri Seti: `6-bank_customers.csv` (Müşteri banka kampanyasına katılacak mı?)

### 👨‍🏫 Eğitmen Notu:

> "Veriyi görmeden modele sokmak, gözleri kapalı araba kullanmaya benzer. Önce veriyi tanıyalım!"

### 💻 Uygulama Adımları:

```python
import pandas as pd
import os
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Veriyi Yükleme (Dinamik Dosya Yolu ile)
current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, "6-bank_customers.csv")
df = pd.read_csv(file_path)

# 2. Veriye İlk Bakış
print("Veri Seti Boyutu:", df.shape)
print("\n--- İlk 5 Satır ---")
print(df.head())

# 3. Hedef Değişken Analizi (Çok Önemli!)
# Kaç kişi kabul etmiş (1), kaçı etmemiş (0)?
print("\n--- Hedef Değişken Dağılımı ---")
print(df["subscribed"].value_counts())
```

**Neden Bakıyoruz?**

- `df.info()`: Boş veri var mı? (Varsa doldurmalıyız).
- `value_counts()`: Sınıflar dengeli mi? (Dengesizse özel teknikler gerekir, Bölüm 5'te göreceğiz).

---

## Bölüm 2: Kritik Ön İşleme Adımları

Makine öğrenmesinde başarının %80'i model değil, **Ön İşleme (Preprocessing)** kısmıdır.

### 2.1. Train - Test Split (Eğitim ve Test Ayrımı)

Modelin ezberlememesi (overfitting) için veriyi ikiye böleriz:

1.  **Train (%70-80):** Ders çalışma materyali.
2.  **Test (%20-30):** Sınav soruları (Modelin hiç görmediği veri).

### 2.2. Scaling (Ölçeklendirme) - Standard Scaler

### 👨‍🏫 Eğitmen Notu:

> "Bu adımı atlamak, Lojistik Regresyon, SVM ve KNN gibi modellerde **MODERN BİR İNTİHARDIR!** Neden mi?"

**Senaryo:**

- **Yaş:** 18 ile 90 arasında.
- **Bakiye:** 0 ile 100.000 Euro arasında.

Matematiksel olarak 100.000 sayısı 90'dan çok büyüktür. Model, "Parası çok olanın etkisi yaştan 1000 kat fazladır" diye yanlış bir çıkarım yapar.
**Çözüm:** `StandardScaler` ile tüm sütunları "Ortalaması 0, Standart Sapması 1" olacak şekilde dönüştürürüz. Herkes eşit şartlarda yarışır!

### ⚠️ KRİTİK UYARI: VERİ SIZINTISI (DATA LEAKAGE)

Asla tüm veriye aynı anda Scaling yapma!

- `fit_transform` -> **TRAIN** setine yapılır. (Ortalamayı buradan öğren).
- `transform` -> **TEST** setine yapılır. (Test setinin ortalamasını hesaplama! Train'den öğrendiğini kullan).

### 💻 Kod Bloğu:

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# X (Özellikler) ve y (Hedef) ayrımı
X = df.drop("subscribed", axis=1)
y = df["subscribed"]

# 1. Veriyi Bölme (Stratify=y, orantıyı korumak için önemlidir)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=15, stratify=y)

# 2. Scaling (Ölçeklendirme)
scaler = StandardScaler()

# DİKKAT: Train'e fit+transform, Test'e sadece transform!
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

print("Eğitim seti başarıyla ölçeklendi!")
```

---

## Bölüm 3: Temel Model Eğitimi ve Yorumlama

### 💻 Model Kurulumu:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Modeli Başlat ve Eğit
model = LogisticRegression()
model.fit(X_train, y_train)

# Tahmin Yap
y_pred = model.predict(X_test)
```

### 📊 Sonuçları Değerlendirme (Evaluation)

Sadece "Accuracy" (Doğruluk) yetmez! İşte karnemiz:

1.  **Confusion Matrix (Karmaşıklık Matrisi):**
    - **TP (True Positive):** Zili çaldı, kapıyı açtık. (Doğru bildik).
    - **TN (True Negative):** Zil çalmadı, açmadık. (Doğru bildik).
    - **FP (False Positive - Tip 1 Hata):** Zil çalmadı ama biz "çaldı" sanıp açtık. (Yanlış Alarm).
    - **FN (False Negative - Tip 2 Hata):** Zil çaldı ama duymadık. (Kaçırılan Fırsat).

2.  **Rapor:**
    - **Precision (Kesinlik):** "Evet" dediklerimin yüzde kaçı gerçekten evet?
    - **Recall (Duyarlılık):** Gerçekteki "Evet"lerin yüzde kaçını yakalayabildim? (Hayati konularda -kanser teşhisi, hırsızlık- bu daha önemlidir!)

```python
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))
```

---

## Bölüm 4: Model İyileştirme (Grid Search & Tuning)

İlk kurduğumuz model "fabrika ayarlarıyla" çalıştı. Ama her veri seti farklıdır.
Bize en uygun ayarları (Hiperparametreleri) bulmak için **GridSearchCV** kullanırız.

### Nedir Bu Parametreler?

1.  **C (Ceza Şiddeti):**
    - Küçük C (Örn: 0.01) -> Çok disiplinli, genelleme yapmaya çalışır. (Underfitting riski).
    - Büyük C (Örn: 100) -> Çok esnek, veriyi ezberlemeye çalışır. (Overfitting riski).
2.  **Penalty:** Hata yapan katsayıları nasıl cezalandıralım? (L1, L2).

### 💻 Otomatik Arama Kodu:

```python
from sklearn.model_selection import GridSearchCV

# 1. Denenecek Ayarlar Menüsü
params = {
    "C": [0.01, 1, 10, 100],
    "penalty": ["l1", "l2"],
    "solver": ["liblinear"] # Küçük veri setleri için hızlıdır
}

# 2. Grid Search Robotunu Kur
# cv=5: Veriyi 5 parçaya bölüp sağlamasını yapar (Cross Validation).
grid = GridSearchCV(estimator=model, param_grid=params, cv=5, scoring="accuracy", n_jobs=-1)

# 3. Robotu Çalıştır
grid.fit(X_train, y_train)

print("En İyi Ayarlar:", grid.best_params_)
print("En İyi Skor:", grid.best_score_)

# 4. En İyi Modelle Tahmin Yap
y_final = grid.predict(X_test)
```

---

## Bölüm 5: Dengesiz Veriler ve İleri Metrikler (ROC/AUC)

Örnek Veri Seti: `8-fraud_detection.csv` (Kredi Kartı Dolandırıcılığı)

### ⚠️ Sorun: Dengesiz Veri (Imbalanced Data)

Veri setinde 1000 işlem var. Sadece 10 tanesi dolandırıcılık (Fraud=1), 990 tanesi normal (0).
Model hepsine "Normal" derse %99 başarı (Accuracy) alır! Ama **hiçbir dolandırıcıyı yakalayamaz.**
Bu yüzden Accuracy metriği burada **YALANDIR.**

### ✅ Çözüm 1: Class Weight

Modele şunu deriz: "Azınlık sınıfında (1) yapacağın hatayı 10 kat daha ağır cezalandır!"

```python
# class_weight='balanced' ibaresi dengeleri otomatik kurar.
model = LogisticRegression(class_weight='balanced')
```

### ✅ Çözüm 2: ROC Curve ve AUC Skoru

Modelin tahmin yeteneğini tek bir sayıyla özetler (0.5 = Yazı Tura, 1.0 = Mükemmel).
Eğer AUC > 0.80 ise modeliniz harika ayrıştırıyor demektir.

### ✅ Çözüm 3: Eşik Değeri (Threshold) Ayarlama

Standart olarak model %50 (0.5) ihtimalin üzerine "Evet" der.
Ama banka, "Benim için güvenlik çok önemli, %30 şüphe bile olsa alarm ver" diyebilir.

```python
# Olasılıkları al (Her satır için [0 olma ihtimali, 1 olma ihtimali])
y_probs = model.predict_proba(X_test)[:, 1]

# Normalde eşik 0.5'tir. Biz 0.3 yapalım:
new_threshold = 0.3
y_pred_new = (y_probs >= new_threshold).astype(int)

# Sonuç: Recall (Yakalama) artar, ama Precision (Yanlış Alarm) da artabilir. Bu bir ticari karardır!
```

---

## Bölüm 6: Çoklu Sınıflandırma (Multi-Class)

Örnek Veri Seti: `7-cyber_attack_data.csv` (Saldırı Türü: 0, 1 veya 2)

Lojistik Regresyon özünde "İkili" (Evet/Hayır) çalışır. Peki 3 sınıf varsa ne olacak?
İki strateji vardır:

1.  **OvR (One vs Rest):** "Ben tek, siz hepiniz." (Sınıf 0 vs Diğerleri, Sınıf 1 vs Diğerleri...). En yaygın ve hızlı yöntemdir.
2.  **OvO (One vs One):** "Lig Usulü." (Sınıf 0 ile 1 maçı, Sınıf 0 ile 2 maçı...). Daha yavaştır.

### 💻 Kod Bloğu:

```python
from sklearn.multiclass import OneVsRestClassifier

# Çoklu sınıflandırma için kapsayıcı
model_multi = OneVsRestClassifier(LogisticRegression())
model_multi.fit(X_train, y_train)

y_pred_multi = model_multi.predict(X_test)
print("Çoklu Sınıf Başarısı:", accuracy_score(y_test, y_pred_multi))
```

---

## 🏁 Sonuç ve Ödev

Tebrikler! 🎉 Artık veriyi yükleyip, temizleyip, modelleyip, ince ayarını (tuning) yapabilen ve zorlu durumlarla (dengesiz veri) başa çıkabilen bir Veri Bilimci adayı oldunuz.

### 📝 Pekiştirme Ödevi:

Klasördeki `pokemon.csv` dosyasını `pokemonsiniflandırma.py` dosyasından inceleyerek:

- StandardScaler kullanarak,
- Bir Pokemon'un "Efsanevi" (Legendary) olup olmadığını tahmin eden bir model kurun.
- En az %90 accuracy almaya çalışın!

---

## 8. 🚑 ADIM ADIM LOJİSTİK REGRESYON UYGULAMA REÇETESİ (Hangi Durumda Ne Yapmalı?)

Bir sınıflandırma projesi geldiğinde bu sırayı takip et:

### 🏁 ADIM 1: Veri Kontrolü ve Scaling (ZORUNLU)

Sınıflandırma yapıyorsun diye matematikten kaçamazsın.

- ✅ **Kural:** `StandardScaler` kullanmak ZORUNDASIN.
- ❌ **Neden:** Yoksa yaşı 50 olan müşteriyle, maaşı 50.000 olan müşteri arasında 1000 kat önem farkı var sanılır.

### ⚖️ ADIM 2: Dengesizlik Kontrolü (Terazi Bozuk Mu?)

`df['Hedef'].value_counts()` çalıştır.

- 📊 **Durum A (Dengeli):** (50 Evet / 50 Hayır) -> `Accuracy` kullanabilirsin.
- 📉 **Durum B (Dengesiz):** (95 Normal / 5 Dolandırıcı)
  - 👉 **Müdahale:** `class_weight='balanced'` kullan.
  - 👉 **Metrik:** `Accuracy` çöpe at, `F1-Score` veya `Recall` kullan.

### 🧪 ADIM 3: Model İyileştirme (Grid Search Reçetesi)

Modeli kurdun ama sonuçlar seni tatmin etmedi mi?

**SENARYO A: Model çok basit kaldı (Underfitting)**

- _Anlamı:_ Model olayları çok genel alıyor, detayları kaçırıyor.
- 👉 **Çözüm:** `C` değerini ARTIR (C=10, C=100).
  - _Etkisi:_ Modeli "Daha dikkatli ol, hata yapma" diye sıkıştırırsın.

**SENARYO B: Model ezberledi (Overfitting)**

- _Anlamı:_ Eğitim setinde %100 yapıyor ama test setinde çuvallıyor.
- 👉 **Çözüm:** `C` değerini AZALT (C=0.1, C=0.01).
  - _Etkisi:_ Modeli "Rahat ol, genelleme yap" diye gevşetirsin.

### 🚀 ÖZET TABLO (Kopyala Yapıştır)

| Durum                     | İlk Denenecek Ayar             | İkinci Denenecek Ayar    |
| :------------------------ | :----------------------------- | :----------------------- |
| **Standart Veri**         | LogisticRegression()           | C=1.0                    |
| **Dengesiz Veri (Fraud)** | class_weight='balanced'        | C=10, Solver='liblinear' |
| **Çok Değişken Var**      | Penalty='l1' (Gereksizi siler) | C=0.1 (Sadeleştirir)     |
| **Ezberledi (Overfit)**   | Penalty='l2' (Baskılar)        | C=0.01 (Çok gevşetir)    |
