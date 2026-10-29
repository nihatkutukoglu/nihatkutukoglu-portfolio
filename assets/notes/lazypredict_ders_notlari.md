# Lazy Predict: Kapsamlı Rehber ve Ders Notları

Bu döküman, **Lazy Predict** kütüphanesinin ne olduğu, nasıl çalıştığı, hangi durumlarda kullanılması gerektiği ve avantaj/dezavantajlarını detaylı bir şekilde ele almaktadır. Ayrıca pratik kod örnekleri ile kullanımı pekiştirilmiştir.

---

## 1. Lazy Predict Nedir?

**Lazy Predict**, makine öğrenmesi projelerinde modelleme sürecini hızlandırmak için geliştirilmiş, düşük kodlu (low-code) bir Python kütüphanesidir. Scikit-learn kütüphanesi üzerine inşa edilmiştir ve tek bir komutla onlarca farklı makine öğrenmesi algoritmasını eğitip, performanslarını karşılaştırmanıza olanak tanır.

Temel amacı, veri bilimcinin veya geliştiricinin "Hangi model bu veri seti için daha iyi çalışır?" sorusuna hızlı bir cevap bulmasını sağlamaktır.

### Temel Özellikleri:

- **Otomatik Model Eğitimi:** Sınıflandırma ve Regresyon için 30'dan fazla algoritmayı otomatik çalıştırır.
- **Performans Raporlama:** Accuracy, RMSE, R2, F1-Score gibi metrikleri ve eğitim sürelerini (Time Taken) tablo halinde sunar.
- **Kolay Entegrasyon:** Pandas DataFrame ve Numpy array yapıları ile doğrudan çalışır.

---

## 2. Kurulum

Lazy Predict'i kullanmaya başlamadan önce Python ortamınıza yüklemeniz gerekir:

```bash
pip install lazypredict
```

_Not: Bazı durumlarda `scikit-learn` ve `pandas` bağımlılıklarının güncel olması önerilir._

---

## 3. Ne Zaman Kullanılmalı?

Lazy Predict her senaryo için uygun değildir, ancak aşağıdaki durumlarda hayat kurtarıcıdır:

1.  **Prototipleme Aşaması (Prototyping):**
    - Projenin başında, veri setinizin makine öğrenmesine ne kadar uygun olduğunu hızlıca görmek istediğinizde.
2.  **Temel Başarım (Baseline) Belirleme:**
    - Karmaşık modellere (Deep Learning vs.) geçmeden önce, basit makine öğrenmesi modellerinin ne kadar başarım gösterdiğini (benchmark) ölçmek için.
3.  **Model Seçimi:**
    - Hangi algoritma ailesinin (Ağaç tabanlılar mı, Lineer modeller mi, Destek Vektör Makineleri mi?) verinizle daha iyi uyum sağladığını anlamak için.
4.  **Hackathon ve Yarışmalar:**
    - Zamanın kısıtlı olduğu durumlarda hızlıca fikir sahibi olmak ve yol haritası çizmek için.

---

## 4. Avantajlar ve Dezavantajlar

### Avantajları (+)

- **Hız:** Dakikalar içinde onlarca modeli deneyebilirsiniz.
- **Kapsam:** Çok nadir kullanılan veya aklınıza gelmeyebilecek algoritmaları bile test eder.
- **Kullanım Kolaylığı:** Sadece birkaç satır kod ile çalışır. Karmaşık parametre ayarlarına gerek duymaz.
- **Karşılaştırılabilirlik:** Tüm sonuçları tek bir tablo üzerinde sıralı olarak sunar.

### Dezavantajları (-)

- **Üretim (Production) İçin Uygun Değil:** Lazy Predict modelleri genellikle varsayılan hiperparametrelerle eğitilir. Üretim ortamında optimize edilmiş (fine-tuned) modellere ihtiyaç vardır.
- **Esneklik Eksikliği:** Model parametrelerine müdahale etmek zordur.
- **Veri Ön İşleme:** Lazy Predict bazı temel ön işlemeleri (eksik veri doldurma, kategorik dönüşüm) otomatik yapmaya çalışsa da, karmaşık verilerde manuel ön işleme (preprocessing) şarttır.
- **Kaynak Tüketimi:** Büyük veri setlerinde tüm modelleri aynı anda eğitmek yüksek RAM ve işlemci gücü gerektirebilir.

---

## 5. Uygulama ve Kod Örnekleri

Lazy Predict `LazyClassifier` ve `LazyRegressor` olmak üzere iki ana modüle sahiptir.

### 5.1. Sınıflandırma (Classification) Örneği

Meme kanseri veri seti üzerinde sınıflandırma modellerini karşılaştıralım.

```python
import pandas as pd
from lazypredict.Supervised import LazyClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# 1. Veri Setini Yükle
data = load_breast_cancer()
X = data.data
y = data.target

# 2. Eğitim ve Test Olarak Ayır
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. LazyClassifier Oluştur
# verbose=0: Çıktı kalabalığını önler
# ignore_warnings=True: Uyarıları gizler
# custom_metric: İsterseniz özel bir metrik fonksiyonu verebilirsiniz
clf = LazyClassifier(verbose=0, ignore_warnings=True, custom_metric=None)

# 4. Modelleri Eğit ve Karşılaştır
models, predictions = clf.fit(X_train, X_test, y_train, y_test)

# 5. Sonuçları Yazdır
print(models)
```

**Çıktı Örneği (Tablo):**

| Model              | Accuracy | Balanced Accuracy | ROC AUC | F1 Score | Time Taken |
| :----------------- | :------- | :---------------- | :------ | :------- | :--------- |
| LogisticRegression | 0.98     | 0.97              | 0.97    | 0.98     | 0.02       |
| XGBClassifier      | 0.97     | 0.96              | 0.96    | 0.97     | 0.15       |
| ...                | ...      | ...               | ...     | ...      | ...        |

---

### 5.2. Regresyon (Regression) Örneği

Boston konut fiyatları (veya benzeri bir veri seti) üzerinde tahmin modellerini karşılaştıralım.

```python
import pandas as pd
from lazypredict.Supervised import LazyRegressor
from sklearn import datasets
from sklearn.model_selection import train_test_split

# 1. Veri Setini Yükle (Örnek: Kalifornia Konut Verisi)
data = datasets.fetch_california_housing()
X = pd.DataFrame(data.data, columns=data.feature_names)
y = data.target

# Daha hızlı sonuç görmek için veri setini küçültelim (Opsiyonel)
X = X.iloc[:1000]
y = y[:1000]

# 2. Eğitim ve Test Olarak Ayır
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. LazyRegressor Oluştur
reg = LazyRegressor(verbose=0, ignore_warnings=False, custom_metric=None)

# 4. Modelleri Eğit
models, predictions = reg.fit(X_train, X_test, y_train, y_test)

# 5. Sonuçları Görüntüle
print(models)
```

**Çıktı Örneği (Tablo):**

| Model                 | Adjusted R-Squared | R-Squared | RMSE | Time Taken |
| :-------------------- | :----------------- | :-------- | :--- | :--------- |
| ExtraTreesRegressor   | 0.82               | 0.84      | 0.45 | 0.12       |
| RandomForestRegressor | 0.81               | 0.83      | 0.48 | 0.35       |
| LinearRegression      | 0.60               | 0.62      | 0.75 | 0.01       |
| ...                   | ...                | ...       | ...  | ...        |

---

## 6. Önemli İpuçları

- **Veri Sızıntısı (Data Leakage):** Lazy Predict kullanırken `train_test_split` işlemini mutlaka Lazy Predict'ten **önce** yapın. Scaler gibi işlemleri Lazy Predict bazen kendi içinde halledebilir ancak veri setini ayırmak sizin sorumluluğunuzdadır.
- **Kategorik Veriler:** Veriniz string (metin) formatında kategorik değişkenler içeriyorsa, Lazy Predict genellikle bunları işlemeye çalışır ancak en sağlıklısı `Encoding` işlemlerini (One-Hot, Label Encoding) önceden yapıp sayısal hale getirmektir.
- **Büyük Veri:** Eğer veri setiniz çok büyükse (örneğin 100.000+ satır), Lazy Predict tüm modelleri eğitirken çok yavaşlayabilir. Bu durumda verinin mantıklı bir alt kümesiyle (sample) çalışmak iyi bir stratejidir.

## 7. Sonuç

Lazy Predict, veri bilimi iş akışında **"Keşif"** aşaması için mükemmel bir araçtır. Nihai modelinizi belirlemez, ancak size doğru yönü gösteren bir pusula görevi görür. Hızlı analizler ve fikir edinmek için çantanızda bulunması gereken güçlü bir kütüphanedir.

---

## 8. Lazy Predict Uygulama Reçetesi (Adım Adım)

Projenize Lazy Predict'i dahil etmek için aşağıdaki reçeteyi adım adım uygulayabilirsiniz:

### Adım 1: Veri Hazırlığı ve Bağlamın Anlaşılması

- Veri setini yükle (`pd.read_csv`, `pd.read_excel` vb.).
- Problemin türünü belirle: **Sınıflandırma** mı, **Regresyon** mu?
- Hedef bağımlı değişkeni (`y`) ve bağımsız değişkenleri (`X`) ayır.

### Adım 2: Temel Veri Temizliği (ÖNEMLİ!)

Lazy Predict "lazy" (tembel) olsa da, veriyi tamamen ham haliyle vermek hata almanıza neden olabilir.

- **Eksik Veriler:** `NaN` veya boş değerleri doldurun (imputation) veya satırları silin.
- **Tip Dönüşümü:** Sayısal olması gereken sütunların (örn. fiyat, yaş) "object" veya "string" türünde olmadığından emin olun.

### Adım 3: Eğitim ve Test Ayrımı

Veri sızıntısını önlemek için en kritik adımdır. Lazy Predict'i tüm veriye değil, sadece eğitim verisine uygulamayın; ayrımı önceden yapın.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

### Adım 4: Lazy Predict Nesnesini Başlatma

Problem türüne uygun sınıfı çağırın. Performansı düşüren gereksiz uyarıları kapatmak için `ignore_warnings=True` kullanın.

```python
# Sınıflandırma için
clf = LazyClassifier(verbose=0, ignore_warnings=True, custom_metric=None)

# Regresyon için
reg = LazyRegressor(verbose=0, ignore_warnings=True, custom_metric=None)
```

### Adım 5: Modelleri Koşturma ve Sıralama

Eğitim sürecini başlatın. Bu adım veri boyutuna göre birkaç saniye ile birkaç dakika sürebilir.

```python
models, predictions = clf.fit(X_train, X_test, y_train, y_test)
print(models)
```

### Adım 6: Şampiyonları Belirleme ve Odaklanma

Çıkan tabloya bakarak ilk 3-5 modeli seçin.

- **Sınıflandırma için:** Accuracy, F1-Score ve ROC-AUC değerlerine bakın.
- **Regresyon için:** R-Squared (R2) ve RMSE değerlerine bakın (R2 1'e yakın, RMSE 0'a yakın olmalı).

### Adım 7: Derinlemesine Analiz (Fine-Tuning)

Lazy Predict'in işi burada biter. Seçtiğiniz en iyi algoritmaları (örneğin XGBoost veya Random Forest çıktıysa) artık Scikit-Learn veya kendi kütüphaneleriyle manuel olarak kurup, hiperparametre optimizasyonu (GridSearchCV, RandomizedSearchCV) yapmalısınız.

---

## 9. Kritik Tavsiyeler ve Best Practices

1.  **Hata Aldığınızda Pes Etmeyin:**
    - Lazy Predict bazen belirli algoritmalarda (örn. StackedGeneralization) hata verebilir. Bu tüm sürecin durması anlamına gelmez, o modeli atlayıp diğerlerine devam eder veya hata verse bile sonuç tablosunu basabilir.

2.  **Veriyi Çok Küçültmeyin (Underfitting Riski):**
    - Hız kazanmak için veriyi çok kırparsanız (çok az satır), modellerin hiçbiri öğrenemez. En azından istatistiksel olarak anlamlı bir veri boyutu (örn. sınıf başına 50-100 örnek) bırakın.

3.  **Kategorik Değişken Tuzağı:**
    - Lazy Predict bazen çok fazla kategorisi olan (kardinalitesi yüksek) sütunlarda takılabilir veya RAM şişirebilir. Şehir, İsim, ID gibi sütunları eğitimden önce düşürmeyi unutmayın.

4.  **Zaman Kısıtı Varsa:**
    - Eğer veri setiniz devasa ise ve sonuçları hemen görmek istiyorsanız, veri setinin %10'luk rastgele bir örneklemi (`df.sample(frac=0.1)`) ile Lazy Predict çalıştırarak genel eğilimi görebilirsiniz.

5.  **Sonuçlar Kesin Değildir:**
    - Lazy Predict'te `Random Forest` en iyi çıktı diye, optimize edilmiş bir `SVM`'in onu geçemeyeceği anlamına gelmez. Bu sadece varsayılan ayarlardaki bir başlangıç sıralamasıdır.

6.  **Custom Metric (Özel Metrik) Kullanımı:**
    - İş probleminiz "Accuracy" değil de "Log Loss" veya "Recall" optimize etmeyi gerektiriyorsa, `custom_metric` parametresine kendi fonksiyonunuzu tanımlayarak modelleri buna göre sıralatabilirsiniz.
