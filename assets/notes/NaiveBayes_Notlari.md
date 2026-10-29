# Naive Bayes Sınıflandırıcısı: Teori ve Uygulama

## 1. Naive Bayes Nedir?

Naive Bayes, **Bayes Teoremi**'ne dayanan, olasılık temelli ve makine öğrenmesinde yaygın olarak kullanılan bir sınıflandırma algoritmasıdır. "Naive" (Saf/Basit) olarak adlandırılmasının nedeni, algoritmanın **tüm özelliklerin (feature) birbirinden bağımsız olduğunu** varsaymasıdır. Gerçek hayatta bu her zaman doğru olmasa da, algoritma şaşırtıcı derecede iyi sonuçlar verir ve hesaplama açısından oldukça hızlıdır.

### Bayes Teoremi

Matematiksel temeli şu formüle dayanır:

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

Burada:

- **$P(A|B)$ (Posterior Probability)**: B olayı gerçekleştiğinde A olayının olma olasılığı (Hesaplamak istediğimiz değer).
- **$P(B|A)$ (Likelihood)**: A sınıfı verildiğinde B özelliğinin görülme olasılığı.
- **$P(A)$ (Prior Probability)**: A sınıfının genel görülme olasılığı.
- **$P(B)$ (Evidence)**: B özelliğinin genel görülme olasılığı.

---

## 2. Naive Bayes Çeşitleri

Veri setinizin yapısına göre kullanılan 3 temel Naive Bayes varyasyonu vardır:

### A. Gaussian Naive Bayes : Maaş veya yaş verileri

- **Kullanım Alanı:** Özellikler sürekli değerler (continuous values) alıyorsa kullanılır.
- **Varsayım:** Özelliklerin normal (Gaussian) dağılıma sahip olduğu varsayılır.
- **Örnek:** **İris çiçeği sınıflandırma (çanak yaprağı uzunluğu, genişliği gibi ondalıklı sayılar), maaş veya yaş verileri.**

### B. Multinomial Naive Bayes : Kesikli veri ve metin madenciliği

- **Kullanım Alanı:** Kesikli veriler ve özellikle **metin madenciliği** (NLP) için uygundur.
- **Varsayım:** Özellikler belirli olayların oluşum sayılarını temsil eder (frekans tabanlı).
- **Örnek:** Spam filtresi (bir kelimenin e-postada kaç kez geçtiği), haber sınıflandırma.

### C. Bernoulli Naive Bayes : boolean değerler evt hyr var yok

- **Kullanım Alanı:** Özellikler ikili (binary - 0 veya 1) değerler alıyorsa kullanılır.
- **Varsayım:** Özellik var mı yok mu? (Boolean özellikler).
- **Örnek:** Bir kelimenin metinde geçip geçmediğine göre sınıflandırma (frekans değil, varlık/yokluk).

---

## 3. Ne Zaman ve Nerede Kullanılır?

### Avantajları

1. **Hız:** Eğitim ve tahmin süresi **çok hızlıdır**. Gerçek zamanlı uygulamalar için idealdir.
2. **Az Veri:** Başarılı bir genelleme için çok büyük veri setlerine ihtiyaç duymayabilir (özellikle diğer karmaşık modellere kıyasla).
3. **Yüksek Boyut:** Metin verileri gibi binlerce özelliğin olduğu durumlarda (High Dimensionality) çok iyi çalışır.

### Dezavantajları

1. **Bağımsızlık Varsayımı:** Gerçek hayatta özellikler genellikle birbirilye ilişkilidir (örneğin "yapay" kelimesi sıklıkla "zeka" kelimesiyle beraber geçer). Naive Bayes bu ilişkiyi göz ardı eder. Buna rağmen pratikte performansı yüksektir.

### Yaygın Kullanım Senaryoları : semptomlar , spam filtreleme , döküman sınıflandırma

- **Spam Filtreleme:** E-postaların "Spam" veya "Normal" olarak ayrılması.
- **Duygu Analizi (Sentiment Analysis):** Sosyal medya yorumlarının "Olumlu", "Olumsuz" veya "Nötr" olarak etiketlenmesi.
- **Doküman Sınıflandırma:** Haber metinlerinin "Spor", "Siyaset", "Teknoloji" olarak kategorize edilmesi.
- **Tıbbi Tanı:** Semptomlara dayalı hastalık tahmini (olasılık değerleri verdiği için tercih edilir).

---

## 4. Python ile Uygulama Örnekleri

Aşağıda hem **GaussianNB** (sürekli veriler için) hem de **MultinomialNB** (metin verileri için) kullanım örnekleri verilmiştir.

### Örnek 1: Gaussian Naive Bayes (İris Veri Seti ile)

Sürekli sayısal veriler içeren klasik iris veri seti üzerinde sınıflandırma yapalım.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.datasets import load_iris

# 1. Veri Setini Yükle
iris = load_iris()
X = iris.data
y = iris.target

# Veriyi DataFrame'e çevirip görelim (Opsiyonel)
df = pd.DataFrame(X, columns=iris.feature_names)
df['target'] = y
print("Veri Setinden İlk 5 Satır:")
print(df.head())

# 2. Eğitim ve Test Olarak Bölme
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Kurulumu ve Eğitimi (Gaussian Naive Bayes)
# Veriler sürekli ve normal dağılıma yakın olduğu için GaussianNB tercih edilir.
model = GaussianNB()
model.fit(X_train, y_train)

# 4. Tahmin Yapma
y_pred = model.predict(X_test)

# 5. Model Değerlendirme
print("\n--- Model Performansı ---")
print(f"Doğruluk (Accuracy) Skoru: {accuracy_score(y_test, y_pred):.2f}")

print("\nKarmaşıklık Matrisi (Confusion Matrix):")
cm = confusion_matrix(y_test, y_pred)
print(cm)

print("\nSınıflandırma Raporu:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))

# Görselleştirme (Opsiyonel - Isı Haritası)
plt.figure(figsize=(6, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=iris.target_names, yticklabels=iris.target_names)
plt.title('GaussianNB Confusion Matrix')
plt.ylabel('Gerçek Değerler')
plt.xlabel('Tahmin Edilen Değerler')
plt.show()
```

### Örnek 2: Multinomial Naive Bayes (Metin Sınıflandırma / Spam Tespiti)

Metin verilerini vektörlere dönüştürüp sınıflandırma örneği.

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Örnek Veri Seti (E-postalar)
# Gerçek hayatta bu veriler bir CSV dosyasından okunur.
sentences = [
    "Tebrikler, iphone kazandınız hemen tıklayın",  # Spam
    "Yarın toplantı saat 10'da yapılacak mı?",      # Normal
    "Bedava tatil fırsatı için arayın",             # Spam
    "Proje dosyalarını gönderdim, kontrol eder misin?", # Normal
    "Banka hesabınız bloke oldu, hemen giriş yapın", # Spam
    "Akşam yemeğe çıkıyor muyuz?",                  # Normal
]
labels = [1, 0, 1, 0, 1, 0] # 1: Spam, 0: Normal

# 2. Metni Sayısal Vektörlere Dönüştürme (Bag of Words)
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(sentences) # Kelime frekans matrisi oluşturur

# 3. Eğitim ve Test Bölmesi
X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.25, random_state=42)

# 4. Model Kurulumu (Multinomial Naive Bayes)
# Kelime sayımları (frekansları) ile çalıştığımız için MultinomialNB idealdir.
mnb_model = MultinomialNB()
mnb_model.fit(X_train, y_train)

# 5. Tahmin
y_pred = mnb_model.predict(X_test)
print(f"Test Doğruluğu: {accuracy_score(y_test, y_pred)}")

# Yeni bir cümle ile test edelim
yeni_mesaj = ["Bedava kontör kazanmak için tıklayın"]
yeni_vektor = vectorizer.transform(yeni_mesaj)
tahmin = mnb_model.predict(yeni_vektor)

sonuc = "Spam" if tahmin[0] == 1 else "Normal"
print(f"Mesaj: '{yeni_mesaj[0]}' -> Tahmin: {sonuc}")
```

## Özet: Hangi Modeli Seçmeliyim?

| Model             | Veri Tipi                      | Örnek Durum                                             |
| :---------------- | :----------------------------- | :------------------------------------------------------ |
| **GaussianNB**    | Sürekli (Continuous) Veriler   | İris çiçeği ölçümleri, yaş, boy, kilo verileri.         |
| **MultinomialNB** | Kesikli Sayım (Count) Verileri | Metin sınıflandırma, kelime frekansları (Spam tespiti). |
| **BernoulliNB**   | İkili (Binary) Veriler         | Sadece kelime var mı yok mu? (True/False özellikler).   |

---

## 5. Adım Adım Uygulama Reçetesi: Hangi Durumda Ne Yapmalı?

Bu bölüm, yeni bir proje ile karşılaştığınızda Naive Bayes'i nasıl uygulayacağınıza dair pratik bir rehberdir.

### Adım 1: Veri Tipini Analiz Et

Verinize bakın. Sütunlarınız (Features) en çok neye benziyor?

- **Senaryo A: Ondalıklı/Sürekli Sayılar** (Örn: Boy, Kilo, Sıcaklık, Sensör verisi)
  - **Karar:** `GaussianNB` kullan.
  - **Ön İşleme:**
    - Verilerin dağılımına bak (`sns.histplot`).
    - Naive Bayes normal dağılım (çan eğrisi) varsayar. Eğer veri çok çarpıksa, `Log Transformation` veya sklearn'deki `PowerTransformer` ile veriyi biraz "normale" benzetmek başarıyı artırabilir.
    - _Not:_ Scaling (StandardScaler) Naive Bayes için zorunlu değildir ama diğer algoritmalarla kıyaslayacaksanız yapmanızda sakınca yoktur.

- **Senaryo B: Kelime Sayıları / Metin** (Örn: E-postalar, Tweetler, Yorumlar)
  - **Karar:** `MultinomialNB` kullan.
  - **Ön İşleme:**
    - Metni temizle (noktalama işaretlerini sil, küçük harfe çevir).
    - `CountVectorizer` veya `TfidfVectorizer` kullanarak metni sayısal matrise çevir.
    - Stop words'leri (ve, veya, bir, ile vb.) temizle.

- **Senaryo C: Var/Yok (0/1) Verileri** (Örn: "Kelime geçiyor mu?", "Kullanıcı giriş yaptı mı?")
  - **Karar:** `BernoulliNB` kullan.
  - **Ön İşleme:**
    - Veriniz kategorik ise (örn: Renk=Kırmızı) `One-Hot Encoding` yaparak binary hale getirin.

### Adım 2: Veriyi Bölme (Splitting)

Veriyi her zaman Eğitim ve Test olarak ayırın.

- Bölme işlemi: `train_test_split(X, y, test_size=0.2, stratify=y)`
- **Kritik İpucu:** `stratify=y` parametresini mutlaka kullanın!
  - Eğer verinizde 100 tane "Normal", 10 tane "Kanser" varsa; rastgele böldüğünüzde test setine hiç kanser verisi düşmeyebilir. `stratify=y` her iki sınıftan da orantılı şekilde test setine koyar.

### Adım 3: Model Kurma ve Tuning (İnce Ayar)

Naive Bayes'te ayarlanacak parametre çok azdır, bu yüzden hızlıdır.

- **alpha (Laplace Smoothing):**
  - Sadece `MultinomialNB` ve `BernoulliNB` için önemlidir.
  - **Ne yapar?** Eğitim setinde hiç görülmemiş bir kelime test setinde çıkarsa (örn: "covid"), olasılık formülünde "0" çarpanı gelir ve tüm olasılığı sıfırlar. Alpha değeri buna küçük bir sayı ekleyerek sistemin çökmesini engeller.
  - Varsayılan `alpha=1.0` iyidir.
  - Model "Overfitting" (aşırı öğrenme) yapıyorsa alpha değerini artırın (2.0, 3.0...).
  - Model "Underfitting" (yetersiz öğrenme) yapıyorsa alpha değerini azaltın (0.1, 0.01...).

### Adım 4: Sonuç, Değerlendirme

Başarıyı nasıl ölçmelisiniz?

1. **Sınıf Dağılımına Bakın:** Eğer verinizin %99'u "Sağlam", %1'i "Bozuk" ise Accuracy (Doğruluk) yanıltıcıdır. Her şeye "Sağlam" diyen model %99 doğru çıkar ama işe yaramazdır.
   - Bu durumda **F1-Score**, **Precision** ve **Recall** değerlerine bakın (`classification_report` bunu verir).

### Özet Kontrol Listesi

1. [ ] Veri tipim ne? (Sayısal -> Gaussian, Metin -> Multinomial).
2. [ ] Verim dengeli mi? `stratify` kullandım mı?
3. [ ] Metin verisi ise Vektörleştirme (CountVector) yaptım mı?
4. [ ] `alpha` parametresini değiştirmeme gerek var mı? (Genelde varsayılan yeterlidir).

---

## 6. Pratikten Notlar ve İleri Seviye İpuçları (Live Session Learnings)

Bu bölüm, **İris Veri Seti** üzerinde yapılan canlı kodlama seansından elde edilen kritik deneyimler ve kod parçacıklarıdır.

### A. Çoklu Bağlantı (Multicollinearity) Sorunu ve Çözümü

Naive Bayes algoritması özelliklerin **bağımsız** olduğunu varsayar. Eğer iki özellik (örn. `petal width` ve `petal length`) birbirbiriyle aşırı korelasyonluysa (%90+), model aynı bilgiyi iki kere öğrenir ve olasılıkları yanlış hesaplayabilir.

**Çözüm:** Yüksek korelasyonlu sütunlardan birini tespit edip silmek.

```python
# Korelasyon Matrisini Çizdirme
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', fmt=".2f")
plt.tight_layout() # Etiketlerin kesilmesini önler
plt.show()

# Pratik Fonksiyon: 0.90 üzeri korelasyonu olan sütunları otomatik sil
def remove_highly_correlated_features(df, threshold=0.90):
    corr_matrix = df.corr().abs()
    upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
    to_drop = [column for column in upper.columns if any(upper[column] > threshold) and column != 'target']

    if to_drop:
        print(f"Silinen Yüksek Korelasyonlu Sütunlar: {to_drop}")
        return df.drop(columns=to_drop)
    return df
```

### B. Confusion Matrix'i Profesyonelce Görselleştirme

Sonuçları sadece sayı olarak görmek yerine, hataları bir bakışta anlamak için bu bloğu kullanın.

```python
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Tahminleri al
cm = confusion_matrix(y_test, y_pred)

# Görselleştir
plt.figure(figsize=(8, 6))
# xticklabels ve yticklabels ile 0,1,2 yerine çiçek isimlerini yazdırıyoruz
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=iris.target_names,
            yticklabels=iris.target_names)

plt.xlabel('Tahmin Edilen (Predicted)')
plt.ylabel('Gerçek Değer (Actual)')
plt.title('Confusion Matrix (Hata Matrisi)')
plt.tight_layout()
plt.show()
```

### C. Modelin Sağlamasını Yapma (Cross Validation)

Modelin başarısı "şans eseri" mi yoksa gerçekten iyi mi? Bunu anlamak için veriyi 5 farklı parçaya bölüp 5 kere test eden yöntem: **K-Fold Cross Validation**.

```python
from sklearn.model_selection import cross_val_score

# cv=5 : Veriyi 5'e böl, 5 kere test et
scores = cross_val_score(model, X_train, y_train, cv=5)

print(f"5 Katlı Skorlar: {scores}")
print(f"Ortalama Başarı: {scores.mean():.4f}") # %90 gibi istikrarlı bir sonuç görmelisiniz
print(f"Standart Sapma: {scores.std():.4f}")   # Bu sayı ne kadar küçükse model o kadar güvenilirdir
```
