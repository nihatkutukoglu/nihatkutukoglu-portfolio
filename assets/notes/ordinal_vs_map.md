# Encoding ve Ön İşleme Rehberi: Map vs One-Hot Encoding

Bu dosya, özellikle `insurance.csv` projesi üzerinden kategorik verilerin sayısal hale dönüştürülmesi (Encoding) konusundaki kritik kararları ve `pd.get_dummies` mantığını açıklar.

---

## 🧐 Soru: Hangi Encoding Yöntemini Seçmeliyim?

Veri setimizde 3 tane kategorik (yazısal) sütun vardı: `sex`, `smoker` ve `region`. Hepsine aynı muameleyi yapmamalıyız. Neden?

### 1- `smoker` ve `sex` (Neden .map?)

Bu sütunlar **Binary (İkili)** yapıdadır. Yani sadece iki seçenek vardır:

- `smoker`: Yes / No
- `sex`: Female / Male

Bu durumda **.map()** fonksiyonu en temiz ve en performanslı yöntemdir.

```python
# Manuel olarak 0 ve 1 atıyoruz
df["sex"] = df["sex"].map({"female": 0, "male": 1})
df["smoker"] = df["smoker"].map({"no": 0, "yes": 1})
```

**Neden `get_dummies` kullanmadık?**
Çünkü iki seçenek için `sex_female` ve `sex_male` diye iki ayrı sütun açmak gereksiz kalabalıktır. Tek sütunda 0/1 tutmak yeterlidir.

---

### 2- `region` (Neden get_dummies?)

Bu sütunda 4 farklı bölge var:

- `southwest`, `southeast`, `northwest`, `northeast`

Eğer bunlara `.map` ile `0, 1, 2, 3` değerlerini verirsek **BÜYÜK BİR HATA** yapmış oluruz.

- **Hata:** Makine şöyle düşünür: "Bölge 3 (northeast), Bölge 1'den (southeast) daha BÜYÜKTÜR."
- **Gerçek:** Bölgeler arasında büyüklük küçüklük ilişkisi yoktur! Sadece farklıdırlar.

Bu yüzden, her bölgeyi ayrı bir sütun (özellik) gibi düşünmemiz gerekir. Buna **One-Hot Encoding** denir.

```python
# drop_first=True: İlk sütunu (referans olarak) siler.
# dtype=int: True/False yerine 0/1 yazar.
df = pd.get_dummies(df, columns=["region"], drop_first=True, dtype=int)
```

**Sonuçta Oluşan Sütunlar:**

- `region_northwest` (0 veya 1)
- `region_southeast` (0 veya 1)
- `region_southwest` (0 veya 1)
- _(northeast nerede? Hepsi 0 ise o kişi northeast'tedir.)_

---

## 🕵️‍♂️ Neden `drop_first=True` Kullanıyoruz?

Elinizde 3 farklı bölge var: İstanbul, Ankara, İzmir.

Eğer bir kişi İstanbul'da değilse (`0`), Ankara'da da değilse (`0`), **mecburen** İzmir'dedir. Yani 3. sütuna gerek yoktur.
Bu 3. bilgiyi fazladan vermek, modelin kafasını karıştırır (**Dummy Variable Trap**). Bu yüzden ilk sütunu çöpe atıp modeli sadeleştiriyoruz.

---

## ⚡ True/False Sorunu ve `dtype=int`

Python'un yeni sürümlerinde `get_dummies` varsayılan olarak `True/False` (bool) döndürür. Ancak makine öğrenmesi modelleri sayı (1/0) ister.

- **Hatalı Kod:** `pd.get_dummies(df)` -> Çıktı: `True, False, True...`
- **Doğru Kod:** `pd.get_dummies(df, dtype=int)` -> Çıktı: `1, 0, 1...`

Bu parametreyi eklemeyi unutursanız modeliniz hata verebilir.

---

## ⏱️ Kritik Soru: Ne Zaman Yapılmalı? (Train/Test Split Öncesi mi Sonrası mı?)

**Cevap: ÖNCE!**

`pd.get_dummies` işlemini `train_test_split` yapmadan, **tüm veriye aynı anda** uygulamalısınız.

### Neden?

1.  **Sütun Eşleşmesi:** Train setinde "northeast" bölgesi olup Test setinde hiç olmayabilir. Eğer split'ten sonra yaparsan; Train setinde `region_northeast` sütunu oluşur ama Test setinde oluşmaz.
2.  **Model Hatası:** Model eğitim sırasında `region_northeast` sütununu öğrenir. Test yaparken bu sütunu bulamazsa "Shape Mismatch" (Boyut Uyuşmazlığı) hatası verip çöker.
3.  **Tutarlılık:** Metadata'nın (Sütun yapısının) her iki tarafta da %100 aynı olması garantilenir.

---

### 📝 Özet Reçete

1.  **İkili (Binary) Değişkenler:** `.map({A:0, B:1})` kullan.
2.  **Sıralı Olmayan Çoklu Değişkenler (Nominal):** `pd.get_dummies()` kullan.
3.  **Sıralı Değişkenler (Ordinal - Örn: Kötü, Orta, İyi):** `.map({Kötü:0, Orta:1, İyi:2})` kullan.
4.  **Ayar:** `drop_first=True` ve `dtype=int` parametrelerini unutma.
5.  **Zamanlama:** Bu işlemlerin hepsini veriyi bölmeden **ÖNCE** yap.
