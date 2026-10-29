# 🔤 ENCODING REHBERİ: KATEGORİK VERİYİ SAYIYA ÇEVİRME

> **Makine öğrenmesi modelleri sadece SAYI anlar.**
> "erkek", "kadın", "İstanbul" gibi metinlerle çalışamaz.
> → Bu yüzden kategorik veriyi sayıya çevirmemiz gerekir. Buna **encoding** denir.

---

## 📌 TEMEL SORU: "female=1, male=0 verdim — model bunu BÜYÜKLÜK olarak algılar mı?"

### Cevap: 2 kategori varsa → HAYIR, sorun yok.

```python
df["cinsiyet"] = df["cinsiyet"].map({"male": 0, "female": 1})
```

Bu durumda sütunda sadece **0 ve 1** var. Model bunu şöyle görür:

```
cinsiyet = 0  →  katsayı etkisiz (0 × β = 0)
cinsiyet = 1  →  katsayı aktif   (1 × β = β)
```

Yani model **"1 büyüktür, 0 küçüktür"** diye düşünmüyor.
Şöyle düşünüyor: **"Bu kişi female mi (1), değil mi (0)?"** — Bir açma-kapama düğmesi gibi.

> 💡 İster `male=0, female=1` yap, ister `male=1, female=0` yap — modelin performansı **aynı** kalır.
> Sadece katsayının işareti (+ veya -) değişir, sonuç değişmez.

---

### Peki 3+ kategori olunca?

```python
# TEHLİKELİ! ⚠️
df["sehir"] = df["sehir"].map({"Ankara": 0, "Bandırma": 1, "İstanbul": 2})
```

Şimdi model bunu görüyor:

```
Ankara = 0,  Bandırma = 1,  İstanbul = 2
```

Model düşünür: **"İstanbul (2) Ankara'dan (0) iki kat daha büyük!"**

Ama şehirler arasında büyüklük ilişkisi **yok**. Bu **sahte sıralama** modeli yanıltır.

**Çözüm:** 3+ sırasız kategori için → `get_dummies()` kullan (One-Hot Encoding)

---

## 🗂️ TÜM ENCODING YÖNTEMLERİ

---

## 1️⃣ `.map()` — Manuel Sözlük

**Sen** her değerin karşılığını elle yazıyorsun.

```python
df["cinsiyet"] = df["cinsiyet"].map({"erkek": 1, "kadın": 0})
df["sigara"]   = df["sigara"].map({"evet": 1, "hayır": 0})
df["beden"]    = df["beden"].map({"S": 0, "M": 1, "L": 2, "XL": 3})
```

```
Önce:     erkek   kadın   erkek   kadın
Sonra:      1       0       1       0
```

### Avantajlar ve Dezavantajlar

| ✅ Avantaj                                         | ❌ Dezavantaj                              |
| -------------------------------------------------- | ------------------------------------------ |
| Tam kontrol — hangi sayıyı vereceğini sen seçersin | Çok kategori varsa tek tek yazmak zahmetli |
| Sıralama gerekiyorsa doğru sırayı sen verirsin     | Veride yeni kategori gelirse NaN olur      |
| Basit ve okunabilir                                | Sadece tek sütuna uygulanır                |

### Ne Zaman Kullanılır?

- ✅ 2 kategori: erkek/kadın, evet/hayır, var/yok
- ✅ Doğal sıralama var: küçük(0) < orta(1) < büyük(2)
- ❌ 10+ sırasız kategori (şehir, marka) → get_dummies kullan

### Train/Test Split: **ÖNCE** yap

```python
# 1. Önce encoding
df["cinsiyet"] = df["cinsiyet"].map({"erkek": 1, "kadın": 0})

# 2. Sonra split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

**Neden önce?** Çünkü `.map()` veriden bir şey öğrenmiyor, sabit bir sözlük uyguluyor.
Önce de sonra da yapsan aynı sonuç çıkar. Ama önce yapmak daha düzenli.

---

## 2️⃣ `LabelEncoder` — Otomatik Numaralama

Sen sözlük yazmıyorsun. Sklearn **alfabetik sıraya göre** otomatik numara veriyor.

```python
from sklearn.preprocessing import LabelEncoder

le = LabelEncoder()
df["sehir"] = le.fit_transform(df["sehir"])
```

```
Önce:     Ankara   İstanbul   Bandırma   Ankara
Sonra:      0         2          1         0
           (A)       (İ)        (B)    ← alfabetik sıra
```

### Hangi sayı hangi kategori?

```python
print(le.classes_)
# ['Ankara', 'Bandırma', 'İstanbul']
#     0          1           2
```

### Avantajlar ve Dezavantajlar

| ✅ Avantaj                                | ❌ Dezavantaj                                    |
| ----------------------------------------- | ------------------------------------------------ |
| Tek satır, hızlı                          | Alfabetik sıra → sahte büyüklük ilişkisi yaratır |
| Çok kategorili sütunlarda pratik          | Model "İstanbul(2) > Ankara(0)" sanabilir        |
| Sayı vermek yeter, sıra önemli değilse OK | X sütunlarında kullanmak riskli                  |

### ⚠️ Sahte Sıralama Problemi

```
LabelEncoder verdi:  Ankara=0,  Bandırma=1,  İstanbul=2

Model düşünür:
  İstanbul - Ankara = 2 - 0 = 2
  Bandırma - Ankara = 1 - 0 = 1

  "İstanbul, Ankara'dan 2 kat daha büyük!"  ← YANLIŞ!
```

Şehirler arasında sayısal büyüklük ilişkisi yok. Model bunu bilmiyor.

### Ne Zaman Kullanılır?

- ✅ **Hedef değişken (y)** için güvenli:
  ```python
  le = LabelEncoder()
  y = le.fit_transform(df["sonuc"])  # "başarılı"→0, "başarısız"→1
  ```
- ✅ **Tree-based modeller** (Random Forest, XGBoost) sıralamadan etkilenmez → kullanılabilir
- ❌ **Linear Regression, Logistic Regression, SVM, KNN** → sahte sıralama sorun yaratır

### Train/Test Split: **ÖNCE** yap

```python
le = LabelEncoder()
df["kategori"] = le.fit_transform(df["kategori"])
# Sonra split
```

---

## 3️⃣ `OrdinalEncoder` — Sıralı Kategoriler İçin

LabelEncoder'a benzer ama **sırayı sen belirliyorsun**.

```python
from sklearn.preprocessing import OrdinalEncoder

oe = OrdinalEncoder(categories=[["ilkokul", "lise", "üniversite", "yüksek lisans"]])
df[["egitim"]] = oe.fit_transform(df[["egitim"]])
```

```
Önce:        lise   üniversite   ilkokul   yüksek lisans
Sonra:         1        2          0            3

Sıralama:  ilkokul(0) < lise(1) < üniversite(2) < yüksek lisans(3)
           Bu sıralama GERÇEK — eğitim seviyesi gerçekten artıyor.
```

### LabelEncoder vs OrdinalEncoder Farkı

|              | LabelEncoder         | OrdinalEncoder                |
| ------------ | -------------------- | ----------------------------- |
| Sıra         | Alfabetik (otomatik) | Sen belirlersin               |
| Sütun sayısı | Tek sütun            | Birden fazla sütuna aynı anda |
| Kontrol      | Yok                  | Tam kontrol                   |
| Input        | 1D array (Series)    | 2D array (DataFrame)          |

### Ne Zaman Kullanılır?

- ✅ Doğal sıralama OLAN kategoriler:
  - Eğitim seviyesi: ilkokul < lise < üniversite
  - Beden ölçüsü: S < M < L < XL
  - Müşteri memnuniyeti: kötü < orta < iyi < çok iyi
  - Gelir grubu: düşük < orta < yüksek
- ❌ Sıralama OLMAYAN kategoriler (şehir, renk, marka) → get_dummies kullan

### Train/Test Split: **ÖNCE** yap

```python
oe = OrdinalEncoder(categories=[["S", "M", "L", "XL"]])
df[["beden"]] = oe.fit_transform(df[["beden"]])
# Sonra split
```

---

## 4️⃣ `get_dummies()` — One-Hot Encoding (Pandas)

Her kategoriyi **ayrı bir sütun** yapar. O kategoriye ait satır = 1, değil = 0.

```python
df = pd.get_dummies(df, columns=["sehir"], drop_first=True)
```

```
Önce:                     Sonra:
  sehir                     sehir_Bandırma    sehir_İstanbul
  Ankara                         0                  0         ← her ikisi 0 = Ankara
  İstanbul                       0                  1
  Bandırma                       1                  0
  Ankara                         0                  0
  İstanbul                       0                  1
```

### `drop_first=True` ne yapıyor ve NEDEN gerekli?

3 şehir varsa normalde 3 sütun oluşur:

```
sehir_Ankara   sehir_Bandırma   sehir_İstanbul
    1               0                0
    0               0                1
    0               1                0
```

Ama düşün: Eğer Bandırma=0 ve İstanbul=0 ise → zaten Ankara! 3. sütun **fazlalık bilgi** (redundant). Buna **multicollinearity** denir ve modeli yanıltır.

`drop_first=True` birini siler (referans kategori yapar):

```
sehir_Bandırma   sehir_İstanbul
     0                0            ← Bu kişi Ankara (referans)
     0                1            ← Bu kişi İstanbul
     1                0            ← Bu kişi Bandırma
```

> **Kural:** `drop_first=True` her zaman kullan. N kategori → N-1 sütun yeterli.

### Avantajlar ve Dezavantajlar

| ✅ Avantaj                       | ❌ Dezavantaj                          |
| -------------------------------- | -------------------------------------- |
| Sahte sıralama sorunu YOK        | Çok kategori varsa sütun sayısı patlar |
| Her model ile güvenle kullanılır | 50 şehir = 49 yeni sütun               |
| En güvenli encoding yöntemi      | Bellek kullanımı artar                 |

### Ne Zaman Kullanılır?

- ✅ Sıralama OLMAYAN 3+ kategori: şehir, bölge, renk, marka, meslek
- ✅ Her tür model ile güvenli (Linear, Logistic, KNN, SVM, Tree...)
- ❌ Çok yüksek kardinalite (100+ farklı değer) → Target Encoding düşün

### Train/Test Split: **ÖNCE** yap ⚠️ ÇOK ÖNEMLİ

```python
# ✅ DOĞRU — Split ÖNCE
df = pd.get_dummies(df, columns=["bolge"], drop_first=True)
X = df.drop("hedef", axis=1)
y = df["hedef"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

```python
# ❌ YANLIŞ — Split SONRA
X_train, X_test = train_test_split(...)
X_train = pd.get_dummies(X_train, columns=["bolge"])  # Train'de 3 bölge var
X_test  = pd.get_dummies(X_test, columns=["bolge"])   # Test'te 2 bölge var!
# SORUN: Sütun sayıları farklı → model çöker!
```

**Neden ÖNCE?**

> Train setinde "Karadeniz" bölgesi var ama test setinde yok.
> Split sonrası yapsan: Train'de `bolge_Karadeniz` sütunu oluşur, Test'te oluşmaz.
> Model 10 sütun bekliyor ama test'te 9 sütun var → **Shape Mismatch hatası!**

---

## 5️⃣ `OneHotEncoder` — One-Hot Encoding (sklearn)

`get_dummies()` ile aynı işi yapar ama **sklearn Pipeline'larına** entegre edilebilir.

```python
from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder(drop="first", sparse_output=False)
encoded = ohe.fit_transform(df[["sehir"]])
```

### get_dummies vs OneHotEncoder

|               | `get_dummies()`          | `OneHotEncoder`                         |
| ------------- | ------------------------ | --------------------------------------- |
| Kütüphane     | Pandas                   | sklearn                                 |
| Kullanım      | Daha kolay, tek satır    | Pipeline'a entegre                      |
| Yeni kategori | Hata vermez (NaN üretir) | Hata verir (handle_unknown ile çözülür) |
| Ne zaman?     | Hızlı proje, notebook    | Production, Pipeline                    |

```python
# Pipeline ile kullanım
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

preprocessor = ColumnTransformer([
    ('cat', OneHotEncoder(drop='first', handle_unknown='ignore'), ['sehir', 'bolge']),
    ('num', StandardScaler(), ['yas', 'maas'])
])

pipe = Pipeline([
    ('prep', preprocessor),
    ('model', Ridge())
])

pipe.fit(X_train, y_train)  # Encoding + Scaling + Model hepsi bir arada
```

> `handle_unknown='ignore'` → Test'te yeni kategori çıkarsa hata vermez, o sütunları 0 yapar.

---

## ⏰ TRAIN/TEST SPLIT ZAMANLAMA TABLOSU

```
Veriden bir şey ÖĞRENİYOR mu?

  HAYIR → Split ÖNCE yap
  EVET  → Split SONRA yap
```

| İşlem            | Veriden Öğreniyor mu?       | Ne Zaman?                | Neden?                  |
| ---------------- | --------------------------- | ------------------------ | ----------------------- |
| `.map()`         | ❌ Hayır (sabit sözlük)     | **ÖNCE**                 | Her zaman aynı sonuç    |
| `LabelEncoder`   | ❌ Hayır (alfabetik sıra)   | **ÖNCE**                 | Sıra veriden bağımsız   |
| `OrdinalEncoder` | ❌ Hayır (sen sıralıyorsun) | **ÖNCE**                 | Sabit eşleme            |
| `get_dummies()`  | ❌ Hayır (sütun oluşturma)  | **ÖNCE** ⚠️              | Sütun uyuşmazlığı riski |
| `OneHotEncoder`  | ❌ Hayır                    | **ÖNCE** (veya Pipeline) | Pipeline'da otomatik    |
| `StandardScaler` | ✅ EVET (mean, std)         | **SONRA** ⚠️             | Data leakage riski      |
| `MinMaxScaler`   | ✅ EVET (min, max)          | **SONRA** ⚠️             | Data leakage riski      |
| `RobustScaler`   | ✅ EVET (median, IQR)       | **SONRA** ⚠️             | Data leakage riski      |

### Data Leakage Nedir?

```python
# ❌ YANLIŞ — Test bilgisi Train'e sızıyor
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)          # Tüm veriyi birden ölçekledi
X_train, X_test = train_test_split(X_scaled) # Test bilgisi mean/std'ye sızmış!

# ✅ DOĞRU — Sadece Train'den öğren
X_train, X_test = train_test_split(X)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # Train'den öğren + uygula
X_test  = scaler.transform(X_test)        # Train'den öğrenileni test'e uygula
```

> **Sezgi:** Sınav öncesi sınav sorularını görmek = Data Leakage.
> Scaler'ı tüm veriye uygularsan, test verisi hakkında bilgi train'e sızar.

---

## 🧭 KARAR AĞACI: HANGİ ENCODİNG?

```
  Kategorik sütun geldi
         │
         ▼
  Kaç farklı değer var?
         │
    ┌────┴────────┐
  2 tane         3+ tane
    │               │
    ▼               ▼
  .map()      Aralarında DOĞAL
  {A:0, B:1}  SIRALAMA var mı?
                 │          │
                Evet       Hayır
                 │          │
                 ▼          │
           .map() veya     │
           OrdinalEncoder  │
                           ▼
                   Kaç farklı değer?
                     │           │
                   < 15        15+
                     │           │
                     ▼           ▼
              get_dummies()   Target Encoding
              (One-Hot)       veya başka yöntem
```

---

## 📊 BÜYÜK KARŞILAŞTIRMA TABLOSU

| Yöntem           | Sütun bir mi çok mu? | Sıralama             | En iyi model tipi       | Örnek                 |
| ---------------- | -------------------- | -------------------- | ----------------------- | --------------------- |
| `.map()`         | Aynı kalır (1)       | Sen kontrol          | Hepsi                   | erkek→1, kadın→0      |
| `LabelEncoder`   | Aynı kalır (1)       | Alfabetik (otomatik) | Tree modeller / hedef y | Ankara→0, İstanbul→2  |
| `OrdinalEncoder` | Aynı kalır (1)       | Sen belirlersin      | Hepsi                   | S→0, M→1, L→2         |
| `get_dummies`    | Artar (N-1)          | Yok                  | Hepsi ✅                | sehir → 3 ayrı sütun  |
| `OneHotEncoder`  | Artar (N-1)          | Yok                  | Hepsi ✅ (Pipeline)     | aynı iş, sklearn yolu |

---

## 🎯 ALTIN KURALLAR

```
1. İki kategori (evet/hayır, erkek/kadın)
   → .map() kullan, 0 ve 1 ver. Büyüklük sorunu YOK.

2. Doğal sıralama olan kategori (S < M < L < XL)
   → .map() veya OrdinalEncoder kullan. Sıralama GERÇEK.

3. Sıralama olmayan 3+ kategori (şehir, renk, marka)
   → get_dummies(drop_first=True) kullan. En GÜVENLİ yol.

4. Hedef değişken (y) kategorikse
   → LabelEncoder kullan.

5. Encoding işlemi → Train/Test split ÖNCE yap.
   Scaling işlemi  → Train/Test split SONRA yap.

6. drop_first=True HER ZAMAN yaz.
   N kategori → N-1 sütun yeter.
```

---

## ⚡ HIZLI ŞABLON — Her Projede Kopyala-Yapıştır

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# ─── VERİYİ YÜKLE ───
df = pd.read_csv("verin.csv")

# ─── 1. ENCODİNG (Split ÖNCE) ───

# 2 kategorili sütunlar → .map()
df["cinsiyet"] = df["cinsiyet"].map({"male": 0, "female": 1})
df["sigara"]   = df["sigara"].map({"yes": 1, "no": 0})

# Sıralı kategoriler → .map()
df["beden"]    = df["beden"].map({"S": 0, "M": 1, "L": 2, "XL": 3})

# Sırasız 3+ kaategoriler → get_dummies
df = pd.get_dummies(df, columns=["sehir", "bolge"], drop_first=True)

# Hedef değişken kategorikse → LabelEncoder
# le = LabelEncoder()
# df["hedef"] = le.fit_transform(df["hedef"])

# ─── 2. X ve y AYIR ───
X = df.drop("hedef", axis=1)
y = df["hedef"]

# ─── 3. TRAIN/TEST SPLIT ───
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ─── 4. SCALİNG (Split SONRA) ───
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)   # Train'den öğren + uygula
X_test  = scaler.transform(X_test)        # Train'in öğrendiğini test'e uygula

# ─── 5. MODEL ───
from sklearn.linear_model import RidgeCV
model = RidgeCV(cv=5)
model.fit(X_train, y_train)
print(f"Test R2: {model.score(X_test, y_test):.3f}")
```

---

## ❓ SIK SORULAN SORULAR

### "female=1, male=0 verdim. Model female'ı daha büyük algılar mı?"

> **2 kategoride → Hayır.** 0/1 bir on/off düğmesi gibi çalışır. Hangisine 1 verdiğin fark etmez, sonuç aynı.

### "Neden get_dummies split ÖNCE yapılmalı?"

> Test setinde train'de olmayan kategori olabilir (veya tersi). Ayrı ayrı yapsan sütun sayıları uyuşmaz → model çöker.

### "LabelEncoder ile .map() arasındaki fark ne?"

> `.map()`: Sen sözlük yazarsın, tam kontrol. `LabelEncoder`: Alfabetik otomatik numara verir, kontrol yok.

### "Neden drop_first=True?"

> N sütunun N-1 tanesi bilgiyi zaten taşır. Sonuncusu fazlalıktır ve multicollinearity yaratır.

### "Tree modellerde (Random Forest, XGBoost) encoding gerekli mi?"

> Evet, sklearn'de gerekli (sayı istiyor). Ama tree modeller sahte sıralamadan ETKİLENMEZ. Bu yüzden LabelEncoder bile kullanılabilir.

### "Çok fazla kategori varsa (100+ şehir) ne yapayım?"

> get_dummies 99 sütun oluşturur — çok fazla. Bu durumda:
>
> - **Grupla:** İlk 10 şehri tut, geri kalanını "Diğer" yap
> - **Target Encoding:** Kategorinin hedef değişken ortalamasıyla değiştir (sklearn'de `TargetEncoder`)
> - **Frequency Encoding:** Kategorinin veri setindeki frekansıyla değiştir
