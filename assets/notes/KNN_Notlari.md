# K-Nearest Neighbors (KNN) Algoritması: Kapsamlı Ders Notları ve Projeler

Bu doküman, KNN algoritmasının teorisini, sınıflandırma ve regresyon arasındaki farklarını ve proje örneklerini (kodlarıyla birlikte) içeren kapsamlı bir rehberdir.

---

## 1. KNN Nedir ve Ne Zaman Kullanılır?

**K-Nearest Neighbors (K-En Yakın Komşu)**, veri madenciliği ve makine öğrenmesinde kullanılan, "Bana arkadaşını söyle, sana kim olduğunu söyleyeyim" mantığıyla çalışan basit ama etkili bir algoritmadır.

### Mantığı Nedir?

Yeni bir veri noktası geldiğinde, o noktaya **en yakın olan 'K' adet** komşusuna bakılır.

- **Sınıflandırma** yapıyorsak: Komşuların çoğunluğu hangi sınıftaysa, yeni veri o sınıfa atanır.
- **Regresyon** yapıyorsak: Komşuların değerlerinin **ortalaması** alınır.

### Ne Zaman Kullanılır?

- **Veri Seti Küçük/Orta Boyuttaysa:** Büyük verilerde her tahmin için mesafe hesaplamak çok yavaş olacağından KNN önerilmez.
- **Veri Gürültüsüzse:** KNN gürültülü (hatalı) verilere karşı hassastır.
- **Karar Sınırları Düzensizse:** Doğrusal (Linear) algoritmaların başarısız olduğu, karmaşık desenli verilerde iyi sonuç verir.

---

## 2. KNN Classifier vs. KNN Regressor Farkı

KNN hem sınıflandırma hem de regresyon için kullanılabilir. Temel fark **karar verme** aşamasındadır.

| Özellik                   | KNN Sınıflandırma (Classifier)                                           | KNN Regresyon (Regressor)                                                     |
| :------------------------ | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **Amaç**                  | Bir sınıfı/etiketi tahmin etmek (Örn: Hasta/Sağlıklı).                   | Sayısal bir değeri tahmin etmek (Örn: Ev Fiyatı, Enerji Tüketimi).            |
| **Karar Mekanizması**     | **Oylama (Voting):** En yakın K komşudan en çok hangisi varsa o seçilir. | **Ortalama (Averaging):** En yakın K komşunun değerlerinin ortalaması alınır. |
| **Değerlendirme Metriği** | Accuracy (Doğruluk), Confusion Matrix, F1 Score.                         | **R2 Score**, MAE, MSE (**Accuracy kullanılmaz!**).                           |
| **Formül**                | $Mod(y_1, y_2, ..., y_k)$                                                | $\frac{1}{k} \sum_{i=1}^{k} y_i$                                              |

---

## 3. Proje 1: Sağlık Riski Sınıflandırması (Classification)

Bu projede, hastaların vücut kitle indeksi, tansiyon ve aktivite seviyelerine bakarak **Yüksek Riskli** olup olmadıklarını tahmin ediyoruz.

### Veri Seti Sütunları

- `bmi_score`: Vücut Kitle İndeksi skoru.
- `blood_pressure_variation`: Tansiyon değişim oranı.
- `activity_level_index`: Aktivite seviyesi.
- `high_risk_flag` (**HEDEF**): 1 (Yüksek Riskli) veya 0 (Düşük Riskli).

### Kritik Not: Data Leakage (Veri Sızıntısı)

Veriyi ölçeklendirirken (Scaling) yapılan en büyük hata, tüm veriyi aynı anda scale etmektir.

- **Yanlış:** Tüm veriyi scale et -> Train/Test diye ayır.
- **Doğru:** Train/Test diye ayır -> Scale işlemini Train'e göre yap (fit), Test'i buna göre dönüştür (transform).

### Python Kodu (`saglikrisk.py`)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Dosya yolunu dinamik olarak bul
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, "12-health_risk_classification (1).csv")

df = pd.read_csv(file_path)

# 1. Veri Hazırlığı
X = df.drop("high_risk_flag", axis=1)
y = df["high_risk_flag"]

# 2. Train-Test Split (ÖNCE AYIR)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Scaling (SONRA ÖLÇEKLE)
# Scaler sadece X_train üzerindeki istatistikleri (mean, std) öğrenmeli!
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 4. Model Kurulumu (Classifier)
k = 5
# algorithm='auto': En iyi algoritmayı kendi seçsin
# weights='uniform': Her komşunun oyu eşit olsun
classifier = KNeighborsClassifier(n_neighbors=k, algorithm='auto', weights='uniform')
classifier.fit(X_train_scaled, y_train)

# 5. Tahmin
y_pred = classifier.predict(X_test_scaled)

# 6. Değerlendirme (Sınıflandırma Metrikleri)
print("\n##################### KNN Algoritması Sonuçları #####################")
print(f"Doğruluk Oranı (Accuracy): {accuracy_score(y_test, y_pred):.2f}")
print("\nSınıflandırma Raporu:")
print(classification_report(y_test, y_pred))
print("\nKarışıklık Matrisi:")
print(confusion_matrix(y_test, y_pred))
print("-----------------------------------------------------------\n")
```

---

## 4. Proje 2: Ev Enerji Tüketimi Regresyonu (Regression)

Bu projede, dış ortam nemi ve iç ortam sıcaklık değişimine bakarak bir evin **günlük ne kadar enerji (kWh)** tüketeceğini tahmin ediyoruz.

### Veri Seti Sütunları

- `avg_indoor_temp_change`: Ortalama iç mekan sıcaklık değişimi.
- `outdoor_humidity_level`: Dış mekan nem seviyesi.
- `daily_energy_consumption_kwh` (**HEDEF**): Günlük enerji tüketimi (Sayısal).

### Kritik Not: Regresyonda Accuracy Yoktur!

Regresyon problemlerinde "Doğruluk" (Accuracy) diye bir kavram yoktur. Çünkü sayısal bir tahmin (örn: 45.2) tam olarak 45.2 çıkmayabilir. Bunun yerine **Hata Payı** (Error) veya **R2 Score** (Açıklanabilirlik) kullanılır.

### Python Kodu (`ev-enerji-data.py`)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Veri Yükleme
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, "12-house_energy_regression.csv")
df = pd.read_csv(file_path)

# EDA (Kısaltılmış)
# df.head(), df.info() vb. kodlarını burada çalıştırıp veriyi tanıyoruz.

# 1. Veri Hazırlığı
X = df.drop("daily_energy_consumption_kwh", axis=1)
y = df["daily_energy_consumption_kwh"]

# 2. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 4. Model Kurulumu (Regressor - Dikkat!)
# Regresyon olduğu için KNeighborsRegressor kullanıyoruz.
knn = KNeighborsRegressor(n_neighbors=5)
knn.fit(X_train, y_train)

# 5. Tahmin
y_pred = knn.predict(X_test)

# 6. Değerlendirme (Regresyon Metrikleri)
print("\n##################### Model Performansı (Regresyon) #####################")
print("Mean Absolute Error (MAE - Ort. Mutlak Hata):", mean_absolute_error(y_test, y_pred))
# MSE büyük hataları cezalandırır
print("Mean Squared Error (MSE - Ort. Kare Hata):", mean_squared_error(y_test, y_pred))
# RMSE, hatayı orijinal birime (kWh) çevirir
print("Root Mean Squared Error (RMSE):", np.sqrt(mean_squared_error(y_test, y_pred)))
# R2 Score 1'e ne kadar yakınsa o kadar iyidir
print("R2 Score (Başarı Oranı):", r2_score(y_test, y_pred))
print("-----------------------------------------------------------\n")
```

---

## 5. KNN Uygulama Reçetesi (Adım Adım)

Herhangi bir KNN projesinde başarıya ulaşmak için bu reçeteyi uygulayın:

### Adım 1: Veriyi Tanı (EDA)

- Veri tiplerine bak (Sayısal mı, Kategorik mi?).
- Eksik veri var mı kontrol et (`df.isnull().sum()`).
- Hedef değişkenin ne olduğunu belirle (Sınıf mı, Sayı mı?).

### Adım 2: Veriyi Hazırla (Preprocessing)

- **Encoding:** Yazısal verileri (Kadın/Erkek) sayısal hale getir (0/1). KNN sayılarla çalışır.
- **Outlier Temizliği:** Çok uçuk verileri (Aykırı Değerleri) temizle, çünkü KNN mesafeye baktığı için bunlardan çok etkilenir.

### Adım 3: Veriyi Böl (Split)

- Veriyi `train_test_split` ile Eğitim ve Test olarak ayır.

### Adım 4: Ölçekleme Yap (Scaling) [ÇOK ÖNEMLİ]

- KNN için **ZORUNLUDUR**.
- Maaş (50.000) ve Yaş (30) gibi farklı ölçekteki sayıları aynı düzleme getirmelisiniz.
- `StandardScaler` veya `MinMaxScaler` kullanın.
- **Kural:** `scaler.fit` sadece `X_train` üzerinde yapılır!

### Adım 5: Modeli Seç ve Eğit

- Hedef Sınıfsa -> `KNeighborsClassifier`
- Hedef Sayıysa -> `KNeighborsRegressor`
- Uygun `k` değerini seç (Genelde 3, 5, 7 denenir).

### Adım 6: Değerlendir

- **Classifier için:** `accuracy_score`, `confusion_matrix`.
- **Regressor için:** `r2_score`, `mean_absolute_error`.
