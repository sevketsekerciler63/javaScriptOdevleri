console.clear();
console.log("Hello World!");

let isim = "Ahmet";
var yas = 25;
console.log(isim);
console.log(yas);

const pi = 3.14;
console.log(pi);

function girdiYaz(girdi) {
  console.log(girdi);
}

girdiYaz(40);
girdiYaz("Ayhan Akkaya");

const girdiYazES6 = girdi => console.log(girdi);
girdiYazES6(40);
girdiYazES6("Ayhan Akkaya");

console.log(5 + 3);
console.log(10 - 4);
console.log(6 * 7);
console.log(20 / 4);
console.log(2 ** 3);
console.log(10 % 3);

let a = 10;
a += 5;
a -= 2;
a *= 2;
a /= 2;
a **= 2;
a %= 10;
console.log(a);

console.log(5 == "5");
console.log(5 === "5");
console.log(6 != 3);
console.log(10 > 3);
console.log(2 < 4);
console.log(5 >= 5);
console.log(7 <= 8);

console.log(true && false);
console.log(true || false);
console.log(!true);

let not = 70;
if (not >= 85) {
  console.log("Pekiyi");
} else if (not >= 70) {
  console.log("İyi");
} else {
  console.log("Zayıf");
}

let gun = 3;
switch (gun) {
  case 1:
    console.log("Pazartesi");
    break;
  case 2:
    console.log("Salı");
    break;
  case 3:
    console.log("Çarşamba");
    break;
  default:
    console.log("Geçersiz gün");
}

for (let i = 0; i < 5; i++) {
  console.log(i);
}

let j = 0;
while (j < 3) {
  console.log(j);
  j++;
}

let sayilar = [10, 20, 30, 40];
console.log(sayilar[0]);

sayilar.forEach(function(sayi, index) {
  console.log(index + ": " + sayi);
});

let meyveler = ["Elma", "Armut", "Muz"];
for (const [i, deger] of Object.entries(meyveler)) {
  console.log(i, deger);
}

let ogrenciNotlari = new Map();
ogrenciNotlari.set("Şevket", 90);
ogrenciNotlari.set("Muhammed", 85);
console.log(ogrenciNotlari.get("Muahammed"));
