# 🎓 Support Vector Machine (SVM): Sıfırdan Zirveye Uzmanlık Rehberi

Bu notlar, `diamond.py` (Regresyon) ve `svmClassifier.py` (Sınıflandırma) projelerimizden elde edilen deneyimlerle, konuyu hiç bilmeyen birine **"Neyi, Neden Yapıyoruz?"** mantığıyla anlatmak için hazırlanmıştır.

---

## 🚀 BÖLÜM 1: SVM Nedir? (Mantığı Anlamak)

Makine öğrenmesinde amacımız genelde verileri ikiye ayırmaktır.

> **Analoji: En Geniş Caddeyi Çizmek**
> Bir kağıtta kırmızı ve mavi noktalar olduğunu hayal edin. Bunları ayırmak için araya bir çizgi çekeceğiz.
>
> - Rastgele bir çizgi çekersek, çizgiye çok yakın noktalar "riskli" olur.
> - **SVM'in Farkı:** Sadece ayırmakla kalmaz, iki gruba da **EN UZAK** olacak, ortadan geçen **en geniş güvenlik şeridini (Margin)** bulur.
> - Bu şeridin sınırlarına değen o "kritik" noktalara **Support Vectors (Destek Vektörleri)** denir. Tüm sistem bu kritik noktaların omuzlarında durur.

- **SVC (Classification):** Sınıf ayırır (Hasta/Sağlıklı, Spam/Normal).
- **SVR (Regression):** Sayı tahmin eder (Elmas Fiyatı, Ev Kirası).

---

## 🛠️ BÖLÜM 2: Veri Ön İşleme (Data Preprocessing) - KRİTİK ADIMLAR

SVM, verinin kalitesine ve yapısına **en duyarlı** algoritmalardan biridir. Aşağıdaki adımları atlamak performansı yerle bir eder.

### 1. Encoding (Yazıyı Sayıya Çevirme Stratejileri)

Makine yazıları anlamaz (Kırmızı, İyi, Kötü). Bunları sayıya çevirmeliyiz ama **NASIL?**

| Yöntem               | Ne Yapar?                                 | Ne Zaman Kullanılır?                              | Örnek                                              |
| :------------------- | :---------------------------------------- | :------------------------------------------------ | :------------------------------------------------- |
| **Label Encoding**   | Kelimelere rastgele sayı verir (0, 1, 2). | Sadece **Hedef Değişken (y)** için.               | Kedi=0, Köpek=1                                    |
| **One-Hot Encoding** | Her kelimeye yeni sütun açar (1/0).       | Sıralamanın önemsiz olduğu **Nominal** verilerde. | Renkler: Kırmızı, Mavi (Kırmızı > Mavi diyemeyiz). |
| **Manuel Mapping**   | Bizim belirlediğimiz puanları verir.      | Sıralamanın önemli olduğu **Ordinal** verilerde.  | Kalite: Kötü=1, Orta=2, İyi=3.                     |

**💻 Kod Örneği (`diamond.py` projemizden):**
Burada `OneHot` kullansaydık model "Ideal" elmasın "Fair" elmastan daha değerli olduğunu anlayamazdı. Bu yüzden elle puan verdik.

```python
# Kalite sıralaması var (Ordinal), bu yüzden MAP kullanıyoruz.
cut_map = {"Fair": 1, "Good": 2, "Very Good": 3, "Premium": 4, "Ideal": 5}
df["cut_encoded"] = df["cut"].map(cut_map)

# İşimiz bitince eski sözel sütunu siliyoruz
df = df.drop(["cut"], axis=1)
```

### 2. Aykırı Değer Temizliği (Outlier Removal)

Neden siliyoruz? Çünkü SVM "sınırdaki" noktalara göre çizgi çeker. Eğer sınırda alakasız, çok uçuk bir hata (outlier) varsa, tüm çizgi o hataya göre yamulur.

**Nasıl Tespit Ettik?**
Scatterplot (Nokta Grafik) çizdik. Baktık ki `depth` (derinlik) genelde 55-70 arasında toplanmış ama tek tük 40'ta veya 80'de noktalar var. Bunları temizledik.

```python
# Grafiklere bakarak karar verdiğimiz sınırlar
# Depth 45 ile 75 arasında olmayanları at!
df = df[(df["depth"] < 75) & (df["depth"] > 45)]

# Table 40 ile 80 arasında olmayanları at!
df = df[(df["table"] < 80) & (df["table"] > 40)]
```

### 3. Çoklu Bağlantı (Multicollinearity)

Isı haritasında (Heatmap) iki değişken birbirine **%95'ten fazla benziyorsa**, ikisi de aynı şeyi söylüyordur. Modelin kafasını karıştırmamak için birini atarız.

- **Örnek:** Elmasın ağırlığı (`carat`) arttıkça boyutları (`x, y, z`) de artar. Bunlar %99 aynı davranır.
- **Çözüm:** `carat` kalsın, `x, y, z` gitsin.

```python
# Carat zaten boyut bilgisini taşıyor, x-y-z gereksiz kalabalık yapıyor.
X = df.drop(["price", "x", "y", "z"], axis=1)
```

### 4. Feature Scaling (Ölçeklendirme) - OLMAZSA OLMAZ!

⚠️ **Unutursan Model Çöp Olur!**
SVM uzaklık ölçer.

- Maaş: 50.000 TL
- Yaş: 30
  Model burada "Maaş" farkını devasa, "Yaş" farkını önemsiz sanır.
  Hepsini **StandartScaler** ile aynı kaba (-1 ile +1 arasına) sıkıştırırız.

**🚫 DİKKAT: Veri Sızıntısı (Data Leakage)**
Ölçeklendirmeyi **SPLIT İŞLEMİNDEN SONRA** yapmalısınız. Test verisinin ortalamasını modele göstermeyin!

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
# SADECE Train setine fit (öğrenme) yapıyoruz
X_train = scaler.fit_transform(X_train)
# Test setine sadece transform (uygulama) yapıyoruz
X_test = scaler.transform(X_test)
```

---

## ⚙️ BÖLÜM 3: Model ve Hiperparametreler (Ayarlar)

SVM'in ayar düğmeleri çok hassastır.

### Kernel (Çekirdek)

Veriyi nasıl böleceğimize karar verir.

- **`linear`:** Veriyi düz çizgiyle (veya düzlemle) ayırır. (Basit işler için).
- **`rbf` (Radial Basis Function):** Varsayılan ve en güçlüsü. Veriyi eğip büker, yuvarlak sınırlar çizer. (Elmas fiyatları gibi karmaşık işler için).
- **`poly`:** Polinom (eğri) çizer.

### C (Ceza Parametresi)

Modelin hatalara ne kadar kızacağını belirler.

- **Büyük C (Örn: 100):** "Asla hata yapma!" der. Model veriyi ezberlemeye çalışır (Overfit riski), sınırları çok dar çizer.
- **Küçük C (Örn: 0.1):** "Biraz hata yapabilirsin, sorun yok" der. Sınırları daha geniş ve yumuşak çizer.

### Gamma

Bir noktanın etkisinin ne kadar uzağa gideceği.

- **Büyük Gamma:** Sadece çok yakındaki noktaları dikkate alır (Girintili çıkıntılı sınır).
- **Küçük Gamma:** Uzaktaki noktalar bile hesaba katılır (Daha pürüzsüz sınır).

**En İyisini Nasıl Bulduk? (GridSearch)**
Bilgisayara "Sen hepsini dene, bana en iyisini söyle" dedik.

```python
param_grid = {'C': [0.1, 10, 100], 'gamma': ['scale', 'auto'], 'kernel': ['rbf']}
grid = GridSearchCV(SVR(), param_grid, refit=True)
# Sonuç: C=100, kernel='rbf' (Elmas projemizde skoru 0.86'dan 0.96'ya çıkardı!)
```

---

## 📊 BÖLÜM 4: Değerlendirme (Model Ne Kadar Başarılı?)

### 1. Confusion Matrix (Hata Matrisi) - Sınıflandırma İçin

Modelin nerede yanıldığını gösteren tablodur.

```text
                 TAHMİN
               0 (Negatif)      1 (Pozitif)
GERÇEK  0 (N)  [TN - Doğru Neg]  [FP - Yanlış Alarm]
        1 (P)  [FN - Gözden Kaçan] [TP - Doğru Poz]
```

- **Accuracy:** Toplam doğru sayısı / Her şey. (Dengesiz veride yanıltır!)
- **Precision (Kesinlik):** "Hasta" dediklerimin yüzde kaçı gerçekten hasta? (Yanlış alarmdan kaçınmak için).
- **Recall (Duyarlılık):** Gerçek hastaların yüzde kaçını yakaladım? (Gözden kaçırmamak için - Kanser testinde bu önemli!).
- **F1 Score:** Precision ve Recall'un ortalaması. En dengeli metriktir.

### 2. Regresyon Metrikleri (`diamond.py`)

- **RMSE (Kök Ortalama Kare Hata):** Tahminlerimiz gerçek fiyattan ortalama kaç dolar şaşıyor? (Düşük olması iyi).
- **R2 Score:** Model veriyi ne kadar iyi açıklıyor? (1'e ne kadar yakınsa o kadar iyi. Biz %96 bulduk!).

---

## 📝 EK: SVM Uygulama Reçetesi (Adım Adım)

Projenizi yaparken bu listeyi yanınıza alın ve tik atarak ilerleyin.

### 1. Hazırlık ve Temizlik

- [ ] Veriyi Yükle (`pd.read_csv`).
- [ ] `df.info()` ve `df.describe()` ile genel duruma bak.
- [ ] **Eksik Veri Var mı?** (`isnull().sum()`). Varsa doldur veya sil.
- [ ] **Aykırı Değer Var mı?** (`scatterplot` veya `boxplot`). Göze batan uçuk noktaları filtrele.

### 2. Encoding (Dönüştürme)

- [ ] **Sıralı Veri (Ordinal):** `map` ile elle puanla (Kötü=1, İyi=2).
- [ ] **Sırasız Veri (Nominal):** `pd.get_dummies` veya `OneHotEncoder`.
- [ ] **Hedef (Target):** `LabelEncoder` (Sadece sınıflandırmada y için).

### 3. İlişki Kontrolü

- [ ] `sns.heatmap` ile korelasyona bak.
- [ ] Birbiriyle %95+ aynı olan sütunlardan (Multicollinearity) birini sil (Örn: `x,y,z` at, `carat` kalsın).

### 4. Bölme ve Ölçeklendirme (ÇOK ÖNEMLİ SIRALAMA)

- [ ] ÖNCE `train_test_split` yap (X_train, X_test).
- [ ] SONRA `StandardScaler` kullan.
  - `scaler.fit_transform(X_train)`
  - `scaler.transform(X_test)`

### 5. Modelleme ve Tuning

- [ ] Temel model kur: `model = SVC()` veya `SVR()`.
- [ ] `GridSearchCV` ile en iyi `C`, `gamma` ve `kernel` ayarlarını bul.
- [ ] En iyi parametrelerle final modelini eğit.

### 6. Final Testi

- [ ] Sınıflandırma ise: `confusion_matrix` ve `classification_report` çıkar.
- [ ] Regresyon ise: `RMSE` ve `R2 Score` hesapla.
- [ ] Sonuçları yorumla ("Model %96 başarıyla elmas fiyatı tahmin ediyor").

---

_Başarılar! Bu notlarla SVM'in efendisi olacaksınız._ 🚀
