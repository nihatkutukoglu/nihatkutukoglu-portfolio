# Multicollinearity (Çoklu Bağlantı) ve Yüksek Korelasyon Rehberi

Makine öğrenmesinde sıkça duyduğumuz **"Yüksek korelasyonlu değişkenleri silmeli miyiz?"** sorusunun cevabı her zaman "Evet" değildir. Bu durum, kullandığınız algoritmaya ve projenizin amacına göre değişir.

---

## 1. Multicollinearity (Çoklu Bağlantı) Nedir?

Bir veri setindeki iki veya daha fazla bağımsız değişkenin (feature) birbirleriyle çok güçlü bir ilişki (korelasyon) içinde olması durumudur.
Örnek:

- Bir evin **metrekare** bilgisi ile **oda sayısı** genellikle yüksek korelasyonludur. Oda sayısı arttıkça metrekare de artar. Modelin ikisini de bilmesine gerek var mı? Genelde hayır.

---

## 2. Her Zaman Silmeli miyiz?

Cevap: **HAYIR**, kullandığınız modele göre değişir.

### A) Silinmesi Gereken Durumlar (Hassas Modeller)

Aşağıdaki modeller multicollinearity'den olumsuz etkilenir:

1.  **Lineer Regresyon & Lojistik Regresyon:**
    - Bu modeller değişkenlerin katsayılarına (katsayı ağırlıklarına) bakar. İki değişken aynı bilgiyi taşıyorsa, model hangi katsayıya ağırlık vereceğini şaşırır. Standart sapmalar artar, p-değerleri güvenilmez olur.
    - _Sonuç:_ Modelin yorumlanabilirliği (interpretability) bozulur.

2.  **Naive Bayes:**
    - Naive Bayes, tüm özelliklerin **bağımsız** olduğunu varsayar (adı buradan gelir: Naive/Saf).
    - Eğer iki değişken (örn. `petal width` ve `petal length`) %96 korelasyonluysa, model aynı bilgiyi **iki kere** saymış olur (Double Counting). Bu, o bilginin modele etkisini yapay olarak şişirir ve olasılık hesaplarını bozar.
    - _Tavsiye:_ Naive Bayes kullanırken yüksek korelasyonlu sütunlardan birini **mutlaka silin.**

3.  **KNN (K-Nearest Neighbors):**
    - Mesafe hesabı yaptığı için, aynı bilgiyi taşıyan iki sütun mesafeyi gereksiz yere domine edebilir.

### B) Silinmese de Olur Diyebileceğimiz Durumlar (Dayanıklı Modeller)

1.  **Ağaç Tabanlı Modeller (Decision Trees, Random Forest, XGBoost, LightGBM):**
    - Bu modeller yapıları gereği multicollinearity'den etkilenmezler.
    - Ağaç bir düğümde bölme işlemi yaparken (split), bilgi kazancını (information gain) en çok artıran özelliği seçer. Eğer iki özellik aynıysa, rastgele birini seçer ve diğerini görmezden gelir. Bu durum tahmin gücünü (accuracy) düşürmez.
    - _Not:_ Sadece "Feature Importance" (Özellik Önem Düzeyi) grafiğine bakacaksanız yanıltıcı olabilir çünkü önemi iki değişken arasında paylaştırır.

---

## 3. Ne Zaman Endişelenmeliyim?

| Amaç                             | Eylem                                                                                                                                           |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tahmin Başarısı (Prediction)** | Eğer amacınız sadece sonucu (y) en iyi tahmin etmekse ve ağaç tabanlı model (XGBoost vb.) kullanıyorsanız, yüksek korelasyonu **dert etmeyin.** |
| **Yorumlama (Inference)**        | Eğer amacınız "Satışları en çok hangi değişken etkiliyor?" gibi bir sebep-sonuç ilişkisi kurmaksa, **mutlaka silin.**                           |
| **Hız (Performance)**            | Çok fazla sütun (örn. 1000+) eğitim süresini uzatır. Gereksiz kopyaları silmek eğitimi **hızlandırır.**                                         |

---

## 4. Tespit ve Çözüm Yöntemleri

1.  **Korelasyon Matrisi (Heatmap):** 0.90 veya 0.95 üzeri ilişki varsa birini silin.
2.  **VIF (Variance Inflation Factor):** İstatistiki olarak daha kesin bir yöntemdir. VIF değeri 10'un (bazı kaynaklarda 5'in) üzerindeyse o değişken sorunludur.

### Özet Reçete

- **Naive Bayes, Lineer/Lojistik Regresyon kullanıyorsan:** -> **SİL.**
- **Random Forest, XGBoost kullanıyorsan:** -> **SİLMENE GEREK YOK** (ancak silsen de hız kazanırsın).

---

## 5. Hazır Python Fonksiyonu

Aşağıdaki fonksiyonu projelerinize kopyalayarak, belirlediğiniz eşik değerin (threshold) üzerindeki yüksek korelasyonlu sütunları otomatik olarak temizleyebilirsiniz.

```python
import numpy as np
import pandas as pd

def remove_highly_correlated_features(df, threshold=0.90):
    """
    Korelasyonu verien eşik değerin üzerinde olan sütunları bulur ve siler.
    Target sütunu hariç tutulur.
    """
    # 1. Korelasyon Matrisini Hesapla (Mutlak değer olarak)
    # Sadece sayısal sütunları seçtiğinizden emin olun veya select_dtypes kullanın
    # corr_matrix = df.select_dtypes(include=[np.number]).corr().abs()
    corr_matrix = df.corr().abs()

    # 2. Matrisin Üst Üçgenini Al (Tekrarları önlemek için)
    upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))

    # 3. Silinecek Sütunları Belirle (Threshold'u aşanlar)
    # Target sütununun silinmesini engellemek için kontrol ekliyoruz
    to_drop = [column for column in upper.columns if any(upper[column] > threshold) and column != 'target']

    # 4. İşlem ve Bilgilendirme
    if to_drop:
        print(f"\n[BİLGİ] Yüksek korelasyon ({threshold} üzeri) sebebiyle silinen sütunlar: {to_drop}")
        df_dropped = df.drop(columns=to_drop)
        return df_dropped
    else:
        print(f"\n[BİLGİ] {threshold} üzeri korelasyona sahip sütun bulunamadı.")
        return df

# Kullanım Örneği:
# df_clean = remove_highly_correlated_features(df, threshold=0.90)
```
