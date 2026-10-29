# Standart Keşifçi Veri Analizi (EDA) Şablonu

Bu dosya, veri bilimi projelerinizin başlangıcında veriyi hızlıca tanımak (EDA - Exploratory Data Analysis) için kullanabileceğiniz hazır kod bloklarını içerir. Kodları doğrudan projenize kopyalayıp çalıştırabilirsiniz.

```python
# ========================================================================================================
# KEŞİFÇİ VERİ ANALİZİ (EDA - EXPLORATORY DATA ANALYSIS)
# ========================================================================================================
# Bu bölümde veriyi anlamaya çalışıyoruz. Satır sayısı kaç? Sütunlar ne? Eksik veri var mı?
# Modeli kurmadan önce veriyi tanımak çok önemlidir.

# 1. Veriye İlk Bakış (Head)
# df.head(): Tablonun ilk 5 satırını gösterir. Verinin neye benzediğini hızlıca görmek içindir.
print("\n##################### İlk 5 Satır (Head) #####################")
print("Bu kod (df.head()), verisetinin en başındaki 5 satırı ekrana basar.")
print(df.head())
print("-----------------------------------------------------------\n")

# 2. Sütun İsimleri (Columns)
# df.columns: Tablodaki başlıkları (özellik isimlerini) listeler.
print("##################### Sütun İsimleri (Columns) #####################")
print("Bu kod (df.columns), verisetindeki tüm sütunların (değişkenlerin) isimlerini listeler.")
print(df.columns)
print("-----------------------------------------------------------\n")

# 3. Boyut Bilgisi (Shape)
# df.shape: Verinin boyutunu (satır sayısı, sütun sayısı) söyler. Örn: (1000, 11) -> 1000 satır, 11 sütun.
print("##################### Boyut Bilgisi (Shape) #####################")
print("Bu kod (df.shape), verisetinin kaç satır ve kaç sütundan oluştuğunu (satır, sütun) şeklinde gösterir.")
print(df.shape)
print("-----------------------------------------------------------\n")

# 4. Genel Bilgiler (Info)
# df.info(): Sütunların veri tiplerini (int, float, object), boş değer olup olmadığını ve bellek kullanımını gösterir.
# Özet bir röntgen gibidir.
print("##################### Genel Bilgiler (Info) #####################")
print("Bu kod (df.info()), her sütunun veri tipini (sayı mı yazı mı) ve dolu/boş durumunu özetler.")
print(df.info())
print("-----------------------------------------------------------\n")

# 5. Eksik Değerler (Null Values)
# df.isnull().sum(): Her sütunda kaç tane boş hücre (NaN) olduğunu sayar.
# Makine öğrenmesi modelleri genelde boş değer sevmez, bunları doldurmak veya silmek gerekir.
print("##################### Eksik Değerler (Null Values) #####################")
print("Bu kod (df.isnull().sum()), sütunlarda kaç tane eksik/boş veri olduğunu sayar.")
print(df.isnull().sum())
print("-----------------------------------------------------------\n")

# 6. İstatistiksel Özet (Describe)
# df.describe(): Sadece sayısal sütunlar için ortalama, standart sapma, minimum, maksimum, çeyreklikler gibi istatistikleri verir.
# Verideki anormallikleri veya dağılımı anlamak için kritiktir.
print("##################### İstatistiksel Özet (Describe) #####################")
print("Bu kod (df.describe()), sayısal verilerin ortalamasını, minimumunu, maksimumunu hesaplar.")
print(df.describe())
print("-----------------------------------------------------------\n")

# 7. Tekrar Eden Veriler (Duplicates)
# df.duplicated().sum(): Tamamen aynı olan satırları bulur ve sayısını verir.
# Aynı veri iki kere yazıldıysa modelin dengesini bozabilir.
print("##################### Tekrar Eden Veriler (Duplicated) #####################")
print("Bu kod, verisetinde birbirinin aynısı olan (kopya) satır sayısını gösterir.")
print(f"Toplam Tekrar Eden Satır Sayısı: {df.duplicated().sum()}")
print("-----------------------------------------------------------\n")

# 8. Eşsiz Değer Sayısı (Nunique)
# df.nunique(): Her sütunda kaç farklı değer olduğunu gösterir.
# Örneğin "cinsiyet" sütununda 2 (kadın, erkek) gibi. Kategorik değişkenleri anlamak için iyidir.
print("##################### Eşsiz Değer Sayısı (Nunique) #####################")
print("Bu kod, her sütunda kaç farklı çeşit değer olduğunu sayar.")
print(df.nunique())
print("-----------------------------------------------------------\n")

# 9. Kategorik ve Sayısal Sütunları Ayırma
# Modeller genelde sayı ister. Yazı (object) tipindeki sütunları tespit edip sayıya çevirmemiz gerekebilir.
print("##################### Sütun Tipleri Ayrımı #####################")
# Kategorik (Yazı/String) sütunları bulma
cat_cols = df.select_dtypes(include=["object"]).columns
print("Kategorik (Yazımsal) Sütunlar:", cat_cols)

# Sayısal (Number) sütunları bulma
num_cols = df.select_dtypes(include=["number"]).columns
print("Sayısal Sütunlar:", num_cols)
print("-----------------------------------------------------------\n")

# 10. Korelasyon Matrisi (Correlation)
# df.corr(): Değişkenler arasındaki ilişkiyi -1 ile +1 arasında gösterir.
# +1'e yakınsa: Biri artarken diğeri de artıyor (Doğru orantı).
# -1'e yakınsa: Biri artarken diğeri azalıyor (Ters orantı).
# 0'a yakınsa: Alakasızlar.
print("##################### Korelasyon Matrisi #####################")
print("Değişkenlerin birbirini ne kadar etkilediğini gösteren tablo.")
try:
    print(df[num_cols].corr())
except Exception as e:
    print(f"Korelasyon hesaplanamadı: {e}")
print("-----------------------------------------------------------\n")

# VERİ GÖRSELLEŞTİRME (OPSİYONEL)
# sns.heatmap(df.corr(), annot=True)
# plt.show()
```
