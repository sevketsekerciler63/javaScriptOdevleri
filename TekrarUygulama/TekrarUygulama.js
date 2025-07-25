let satislar = [{ ad: "Klavye", adet: 2, fiyat: 150.0 },{ ad: "Fare", adet: 1, fiyat: 80.0 },{ ad: "Monitör", adet: 1, fiyat: 1200.0 }
];

function toplamSatisHesapla(urunler) {
  let toplam = 0;
  for (let i = 0; i < urunler.length; i++) {
    toplam += urunler[i].adet * urunler[i].fiyat;
  }
  console.log(toplam);
}

toplamSatisHesapla(satislar);





let siparis = [{ ad: "USB Bellek", adet: 3, fiyat: 50.0 },{ ad: "SSD Disk", adet: 1, fiyat: 600.0 }, { ad: "Laptop Çantası", adet: 2, fiyat: 150.0 }];

function faturaUret(urunler) {
  let genelToplam = 0;
  for (let i = 0; i < urunler.length; i++) {
    let urunToplam = urunler[i].adet * urunler[i].fiyat;
    genelToplam += urunToplam;
    console.log(urunler[i].ad + " x " + urunler[i].adet + " = " + urunToplam + " TL");
  }
  console.log("Genel Toplam: " + genelToplam + " TL");
}

faturaUret(siparis);






let sifreler = ["abc12345","123456","güzelSifre99","bad pass","OnlyLetters","valid1234"];

function gecerliSifreler(liste) {
  for (let i = 0; i < liste.length; i++) {
    let sifre = liste[i];
    let uzunluk = sifre.length >= 8 && sifre.length <= 20;
    let alfaNum = /^[a-zA-Z0-9]+$/.test(sifre);
    if (uzunluk && alfaNum) {
      console.log(sifre + " → Geçerli");
    } else {
      console.log(sifre + " → Geçersiz");
    }
  }
}

gecerliSifreler(sifreler);
