# 🧮 REGÜLARİZASYON: RİDGE, LASSO, ELASTİCNET VE CROSS-VALİDATİON

> **"Bir model ne kadar karmaşıksa, o kadar çok kontrol edilmeli."**

---

## 🗺️ KONULARA GENEL BAKIŞ

### 🏔️ Ridge Regression (L2 Regülarizasyon)

|               |                                                                                  |
| ------------- | -------------------------------------------------------------------------------- |
| **Problem**   | Model çok karmaşık → katsayılar devasa büyüyor → her gürültüyü ezberliyor        |
| **Çözüm**     | Katsayıların **karesine** ceza uygula → hepsini küçük tut                        |
| **Sonuç**     | Katsayılar sıfıra **yaklaşır** ama **hiçbiri tam 0 olmaz**                       |
| **Ne zaman?** | Tüm özellikler muhtemelen anlamlıdır, sadece overfitting'i engellemek istiyorsun |
| **Analoji**   | Şirket bütçesini kısıyorsun ama hiçbir departmanı tamamen kapatmıyorsun          |
| **sklearn**   | `Ridge(alpha=1.0)` · `RidgeCV(cv=5)`                                             |

---

### ✂️ Lasso Regression (L1 Regülarizasyon)

|               |                                                                              |
| ------------- | ---------------------------------------------------------------------------- |
| **Problem**   | 50 özelliğin var ama sadece 10'u gerçekten anlamlı — hangisi?                |
| **Çözüm**     | Katsayıların **mutlak değerine** ceza uygula → gereksizleri tam 0 yap        |
| **Sonuç**     | Bazı katsayılar **kesinlikle 0.000** olur → o özellik modelden çıkar         |
| **Ne zaman?** | Özellik sayısı fazla, sadece en önemlileri bulmak istiyorsun                 |
| **Analoji**   | Bazı departmanları **tamamen kapatıyorsun**, kalanlar çalışmaya devam ediyor |
| **sklearn**   | `Lasso(alpha=0.1)` · `LassoCV(cv=5)`                                         |

---

### 🔀 ElasticNet Regression (L1 + L2)

|               |                                                                               |
| ------------- | ----------------------------------------------------------------------------- |
| **Problem**   | Lasso korele özellikleri görünce rastgele birini silip diğerini bırakır       |
| **Çözüm**     | Ridge + Lasso'yu aynı anda uygula, `l1_ratio` ile dengeyi sen ayarla          |
| **Sonuç**     | Hem özellik siler hem de kalan katsayıları küçük tutar                        |
| **Ne zaman?** | Özellikler birbiriyle ilişkiliyse (korele) veya emin değilsen                 |
| **Analoji**   | Bazı departmanları kapat **(Lasso)**, kalanların bütçesini de kıs **(Ridge)** |
| **sklearn**   | `ElasticNet(alpha=0.1, l1_ratio=0.5)` · `ElasticNetCV(cv=5)`                  |

---

### 🔄 Cross-Validation (Çapraz Doğrulama)

|               |                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| **Problem**   | Tek bir train/test bölünmesi şansa bağlıdır — iyi bir test seti denk gelince model iyi görünür |
| **Çözüm**     | Veriyi K parçaya böl, her seferinde farklı parçayı test et → K farklı skor al → ortala         |
| **Sonuç**     | Şansa bağlı olmayan, **güvenilir** bir model performans tahmini                                |
| **Ne zaman?** | Her zaman! Özellikle hangi modelin daha iyi olduğuna karar verirken                            |
| **Analoji**   | Bir öğrenciyi tek sınavla değil, 5 farklı sınavla değerlendirmek                               |
| **sklearn**   | `cross_val_score(model, X, y, cv=5)` · `KFold` · `StratifiedKFold`                             |

---

### 📐 Üç Formülün Karşılaştırması

```
                  ┌──────────────────────────────────────────────────────────┐
                  │              KAYIP FONKSİYONLARI                         │
                  ├──────────────────────────────────────────────────────────┤
Linear Regression │  Kayıp = Σ(gerçek - tahmin)²                            │
                  │                                                          │
Ridge   (L2)      │  Kayıp = Σ(hata²)  +  α · Σ(βᵢ²)                      │
                  │                          ↑                               │
                  │                   Kare → büyük katsayıları sert          │
                  │                   cezalandırır, ama tam 0 yapamaz         │
                  │                                                          │
Lasso   (L1)      │  Kayıp = Σ(hata²)  +  α · Σ|βᵢ|                       │
                  │                          ↑                               │
                  │                   Mutlak değer → "elmas köşesi" sayesinde│
                  │                   bazı katsayıları tam 0 yapabilir        │
                  │                                                          │
ElasticNet        │  Kayıp = Σ(hata²)  +  α·ρ·Σ|βᵢ|  +  α·(1-ρ)/2·Σβᵢ²  │
                  │                          ↑ L1             ↑ L2          │
                  │               ρ (l1_ratio): 0 = Ridge, 1 = Lasso        │
                  └──────────────────────────────────────────────────────────┘
```

**α (alpha) ne yapar?**

- `α = 0` → Saf Linear Regression (ceza yok, overfitting riski)
- `α küçük` → Hafif ceza; iyi bir başlangıç noktası
- `α büyük` → Güçlü ceza; model aşırı basitleşir (underfitting riski)
- ✅ **En iyi α'yı elle bulmak yerine `RidgeCV`, `LassoCV`, `ElasticNetCV` kullan!**

---

## 📌 PROBLEM: Linear Regression Bazen Çok Ezberler

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# Veri
df = pd.read_csv("verin.csv")
X = df.drop("hedef", axis=1)
y = df["hedef"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Saf Linear Regression
model = LinearRegression()
model.fit(X_train, y_train)

print(f"Train R2: {model.score(X_train, y_train):.3f}")  # Çok yüksek → ezberlemiş
print(f"Test  R2: {model.score(X_test, y_test):.3f}")    # Düşük → overfitting
```

> **Sorun:** Train'de %99, Test'te %60 çıkıyorsa model veriyi ezberlemiş.
> **Çözüm:** Regülarizasyon uygula → Ridge / Lasso / ElasticNet

---

## 🏔️ 1. RİDGE REGRESYON

**Ne yapar:** Katsayıları küçültür ama **hiçbirini sıfırlamaz**.
**Ne zaman:** Tüm özellikler muhtemelen anlamlı, sadece overfitting var.

> **Sezgi:** Düşün ki bir öğrenci sınavda ezbere cevap yazıyor (overfitting).
> Ridge ona diyor ki: _"Her şeyi hafifçe küçük yaz, ama sıfır yazma."_
> Lasso ise diyor ki: _"Bilmiyorsan hiç yazma (sıfır koy), önemlilere odaklan."_

```python
from sklearn.linear_model import Ridge

# Kullanım — Kitaptaki gibi, sade
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

y_pred = ridge.predict(X_test)

print(f"Train R2: {ridge.score(X_train, y_train):.3f}")
print(f"Test  R2: {ridge.score(X_test, y_test):.3f}")
```

### alpha ne demek?

- `alpha=0` → Saf Linear Regression (ceza yok)
- `alpha=1` → Hafif ceza (iyi başlangıç)
- `alpha=100` → Sert ceza (model çok basitleşir)

### En iyi alpha'yı otomatik bul (önerilen yol)

```python
from sklearn.linear_model import RidgeCV
import numpy as np

ridge = RidgeCV(alphas=np.logspace(-3, 3, 50), cv=5)  # 50 farklı alpha dener
ridge.fit(X_train, y_train)

print(f"En iyi alpha: {ridge.alpha_:.4f}")
print(f"Test R2: {ridge.score(X_test, y_test):.3f}")

y_pred = ridge.predict(X_test)
```

---

## ✂️ 2. LASSO REGRESYON

**Ne yapar:** Gereksiz özelliklerin katsayısını **tam 0 yapar** → o özelliği modelden çıkarır.
**Ne zaman:** Çok sayıda özellik var ve hangilerinin gereksiz olduğunu bilmiyorsun.

> **Neden tam 0 üretebiliyor, Ridge üretemiyor?**
> L1 cezasının (mutlak değer) geometrik şekli bir **elmastır** — keskin köşeleri vardır.
> Optimizasyon bu köşelere çekilince katsayı tam eksen üzerine düşer = **tam 0**.
> Ridge'in şekli ise bir **daire**dir — yumuşak yüzeylidir, köşe yoktur, eksenle kesişmesi gerekmez.

```python
from sklearn.linear_model import Lasso

# Kullanım — sade
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)

y_pred = lasso.predict(X_test)

print(f"Train R2: {lasso.score(X_train, y_train):.3f}")
print(f"Test  R2: {lasso.score(X_test, y_test):.3f}")
print(f"Sıfırlanan özellik: {np.sum(lasso.coef_ == 0)} adet")
print(f"Kalan özellik:      {np.sum(lasso.coef_ != 0)} adet")
```

### En iyi alpha'yı otomatik bul (önerilen yol)

```python
from sklearn.linear_model import LassoCV

lasso = LassoCV(cv=5, n_jobs=-1, max_iter=10000)
lasso.fit(X_train, y_train)

print(f"En iyi alpha: {lasso.alpha_:.4f}")
print(f"Test R2: {lasso.score(X_test, y_test):.3f}")
print(f"Kalan özellik: {np.sum(np.abs(lasso.coef_) > 1e-4)}")

y_pred = lasso.predict(X_test)
```

### Lasso ile özellik seçimi → başka modele ver

```python
from sklearn.linear_model import LassoCV
from sklearn.ensemble import RandomForestRegressor

# Adım 1: Hangi özellikler anlamlı?
lasso = LassoCV(cv=5, n_jobs=-1, max_iter=10000)
lasso.fit(X_train, y_train)

# Adım 2: Sıfır olmayanları seç
secili = np.abs(lasso.coef_) > 1e-4
X_train_sec = X_train[:, secili]
X_test_sec  = X_test[:, secili]

print(f"Seçilen özellik: {secili.sum()} / {len(secili)}")

# Adım 3: Seçilenlerle başka model eğit
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train_sec, y_train)
print(f"RF Test R2: {rf.score(X_test_sec, y_test):.3f}")
```

---

## 🔀 3. ELASTİCNET REGRESYON

**Ne yapar:** Ridge + Lasso karışımı. Hem özellik siler hem de kalanları küçültür.
**Ne zaman:** Özellikler birbiriyle ilişkiliyse (korele) ya da emin değilsen.

> **Korelasyon ne demek?**
> Metrekare arttıkça oda sayısı da artıyorsa → bu iki özellik birbiriyle **korele**.
> **Lasso bu durumda** ikisinden rastgele birini seçip diğerini sıfırlar — bu tehlikelidir.
> **ElasticNet** ise her ikisini de modelde tutar ama küçültür, daha güvenlidir.

> **l1_ratio parametresi:**
>
> - `l1_ratio = 0.0` → Tamamen Ridge gibi davranır
> - `l1_ratio = 1.0` → Tamamen Lasso gibi davranır
> - `l1_ratio = 0.5` → %50 Ridge + %50 Lasso karışımı

```python
from sklearn.linear_model import ElasticNet

# Kullanım — sade
en = ElasticNet(alpha=0.1, l1_ratio=0.5)
# l1_ratio=0 → tamamen Ridge gibi
# l1_ratio=1 → tamamen Lasso gibi
# l1_ratio=0.5 → %50 Ridge + %50 Lasso
en.fit(X_train, y_train)

y_pred = en.predict(X_test)

print(f"Train R2: {en.score(X_train, y_train):.3f}")
print(f"Test  R2: {en.score(X_test, y_test):.3f}")
```

### En iyi alpha + l1_ratio'yu otomatik bul (önerilen yol)

```python
from sklearn.linear_model import ElasticNetCV

en = ElasticNetCV(
    l1_ratio=[0.1, 0.3, 0.5, 0.7, 0.9, 1.0],  # Denenecek l1_ratio'lar
    cv=5,
    n_jobs=-1,
    max_iter=10000
)
en.fit(X_train, y_train)

print(f"En iyi alpha:    {en.alpha_:.4f}")
print(f"En iyi l1_ratio: {en.l1_ratio_:.2f}")
print(f"Test R2: {en.score(X_test, y_test):.3f}")

y_pred = en.predict(X_test)
```

---

## 🔄 4. CROSS-VALİDATİON (ÇAPRAZ DOĞRULAMA)

**Ne yapar:** Modeli tek bir test setine değil, verinin 5 farklı bölümüne test eder.
**Ne zaman:** Her zaman. Tek test seti şansa bağlıdır. CV güvenilir sonuç verir.

> **Neden tek test seti yetmez?**
> Veriyi %80 train / %20 test diye ayırdığında, o %20'nin hangi satırlardan oluştuğu tamamen şansa kalmış.
> Şanslı satırlar gelirse model iyi görünür, zor satırlar gelirse kötü görünür.
> CV ise veriyi 5 farklı biçimde train/test olarak böler ve 5 farklı skor alır.
> Bu 5 skorun ortalaması **şansa bağlı değil** — güvenilir bir ölçümdür.

> **std sapma ne anlatır?**
> `CV R2: 0.85 ± 0.02` → Model her bölümde benzer davranıyor = **tutarlı** ✅
> `CV R2: 0.85 ± 0.18` → Model bazı bölümlerde çok iyi, bazılarında çok kötü = **tutarsız** ⚠️

```
Normal:  [────── Train ──────][─Test─]  → 1 tek skor → güvenilmez
5-Fold:  [Test][──Train──────]          → Skor 1
         [────][Test][───────]          → Skor 2
         [────────][Test][───]          → Skor 3
         [───────────][Test][]          → Skor 4
         [────────────────][T]          → Skor 5
                                → Ortalama → GÜVENİLİR!
```

```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge

ridge = Ridge(alpha=1.0)

skorlar = cross_val_score(
    ridge,
    X_train,
    y_train,
    cv=5,          # 5 parçaya böl
    scoring='r2'
)

print(f"Her fold'un skoru: {skorlar.round(3)}")
print(f"Ortalama R2: {skorlar.mean():.3f}")
print(f"Std Sapma:   {skorlar.std():.3f}")
# Std küçükse → model tutarlı, güvenilir
# Std büyükse → model veriye göre çok değişiyor
```

### Birden fazla metrik almak

```python
from sklearn.model_selection import cross_validate
import numpy as np

sonuclar = cross_validate(
    Ridge(alpha=1.0),
    X_train, y_train,
    cv=5,
    scoring=['r2', 'neg_mean_squared_error'],
    return_train_score=True
)

print(f"Train R2: {sonuclar['train_r2'].mean():.3f}")
print(f"Test  R2: {sonuclar['test_r2'].mean():.3f}")
rmse = np.sqrt(-sonuclar['test_neg_mean_squared_error'])
print(f"Test RMSE: {rmse.mean():.3f}")
```

### GridSearchCV — En iyi parametreyi CV ile ara

```python
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import Ridge
import numpy as np

param_grid = {'alpha': [0.01, 0.1, 1, 10, 100]}

grid = GridSearchCV(
    Ridge(),
    param_grid,
    cv=5,
    scoring='r2'
)
grid.fit(X_train, y_train)

print(f"En iyi alpha: {grid.best_params_['alpha']}")
print(f"CV R2:        {grid.best_score_:.3f}")
print(f"Test R2:      {grid.score(X_test, y_test):.3f}")

y_pred = grid.predict(X_test)
```

---

## 🧭 HANGİSİNİ NE ZAMAN KULLANIRIM?

### 🌳 Karar Ağacı

```
                         │
                         ▼
         ┌───────────────────────────────┐
         │ Özellik (sütun) sayısı nedir? │
         └───────────────────────────────┘
                 │               │
            Az (< 20)        Çok (20+)
                 │               │
                 ▼               ▼
     ┌───────────────────┐   ┌──────────────────────────────┐
     │ Overfitting        │   │ Bu özellikler hepsi anlamlı  │
     │ var mı?            │   │ mı, yoksa çoğu gereksiz mi?  │
     └───────────────────┘   └──────────────────────────────┘
        │           │               │               │
       Evet        Hayır        Bilmiyorum        Hayır, çoğu
        │           │           / Belki             gereksiz
        ▼           ▼               │                │
     Ridge       Linear             ▼                ▼
              Regression        ElasticNet         Lasso
```

### 3 Soru — 3 Cevap

**"Fazla özelliğim var, hangisi gereksiz bilmiyorum?"**
→ **Lasso** — Gereksizleri kendi siler.

**"Özelliklerim birbiriyle ilişkili mi?" (boy-kilo, yaş-deneyim gibi)**
→ **ElasticNet** — Lasso rastgele biri silerdi, ElasticNet ikisini dengeli tutar.

**"Tüm özelliklerim anlamlı, sadece overfitting var?"**
→ **Ridge** — Hiçbirini silmez, hepsin küçültür.

### 🔑 Karar Tablosu

| Durum                                                | Kullan                                        |
| ---------------------------------------------------- | --------------------------------------------- |
| Overfitting var, özellikler muhtemelen hepsi anlamlı | **Ridge**                                     |
| 20+ özellik, çoğu gereksiz olabilir                  | **Lasso**                                     |
| Özellikler birbiriyle ilişkili                       | **ElasticNet**                                |
| Hiçbir fikrim yok                                    | Üçünü de dene, CV R2 en yükseği seç           |
| Hangi alpha doğru bilmiyorum                         | `RidgeCV` / `LassoCV` / `ElasticNetCV` kullan |
| Random Forest / XGBoost kullanıyorum                 | Hiçbirini kullanma, tree modeller gerektirmez |

> 💡 **Altın Kural:** Şüpheledeysen önce **Ridge**. Çok özelliğin varsa **LassoCV**. Kararsızsan **ElasticNetCV**.

---

## ⚡ HIZLI ŞABLON — Her Projede Kullan

```python
import numpy as np
from sklearn.linear_model import RidgeCV, LassoCV, ElasticNetCV
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler

# 1. Hazırlık
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# 2. Ridge
ridge = RidgeCV(alphas=np.logspace(-3, 3, 50), cv=5)
ridge.fit(X_train, y_train)
print(f"Ridge   → R2: {ridge.score(X_test, y_test):.3f} | α={ridge.alpha_:.3f}")

# 3. Lasso
lasso = LassoCV(cv=5, n_jobs=-1, max_iter=10000)
lasso.fit(X_train, y_train)
print(f"Lasso   → R2: {lasso.score(X_test, y_test):.3f} | α={lasso.alpha_:.3f} | Kalan özellik: {(np.abs(lasso.coef_) > 1e-4).sum()}")

# 4. ElasticNet
en = ElasticNetCV(l1_ratio=[0.1, 0.5, 0.9, 1.0], cv=5, n_jobs=-1)
en.fit(X_train, y_train)
print(f"ElasticNet → R2: {en.score(X_test, y_test):.3f} | α={en.alpha_:.3f} | l1={en.l1_ratio_:.2f}")

# 5. En yüksek R2'li modeli seç ✅
```
