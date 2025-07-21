const personeller = [
  { id: 1, ad: "Ahmet", departman: "IK", uzmanlik: "İnsan Kaynakları Uzmanı", maas: 8000 },
  { id: 2, ad: "Mehmet", departman: "Yazılım", uzmanlik: "Frontend Developer", maas: 12000 },
  { id: 3, ad: "Ayşe", departman: "Yazılım", uzmanlik: "Backend Developer", maas: 12500 },
  { id: 4, ad: "Fatma", departman: "Pazarlama", uzmanlik: "Dijital Pazarlama Uzmanı", maas: 9000 },
  { id: 5, ad: "Ali", departman: "Yazılım", uzmanlik: "Mobil Uygulama Geliştirici", maas: 11000 },
  { id: 6, ad: "Zeynep", departman: "IK", uzmanlik: "İşe Alım Uzmanı", maas: 8500 }
];


function personelGoster() {
  const tumPersoneller = personeller.map(personel => 
    `<p>${personel.id}: ${personel.ad} - ${personel.departman} - $${personel.maas}</p>`
  ).join('');
  document.getElementById("tumPersoneller").innerHTML = tumPersoneller;
}

function toplamMaasHesapla() {
  const tumMaas = personeller.reduce((sayac, personel) => sayac + personel.maas, 0);
  alert(`Toplam Maaşlar: $${tumMaas}`);
}

function IKCalisanlariniGoster() {
  const ikCalisanlari = personeller.filter(p => p.departman === "IK");
  const ikListesi = ikCalisanlari.map(p => 
    `<p>${p.id}: ${p.ad} - ${p.departman} - $${p.maas}</p>`
  ).join('');
  document.getElementById("ikPersoneller").innerHTML = ikListesi;
}

function idYeGorePersonelBul() {
  const id = prompt("Aramak istediğiniz personel ID’sini girin:");
  const bulunan = personeller.find(p => p.id == id);
  if (bulunan) {
    document.getElementById("bulunanPersonel").innerHTML = 
      `<p>${bulunan.id}: ${bulunan.ad} - ${bulunan.departman} - $${bulunan.maas}</p>`;
  } else {
    document.getElementById("bulunanPersonel").innerHTML = 
      `<p>Personel bulunamadı.</p>`;
  }
}
function IKCalisanlariniGoster() {
  
  document.getElementById("tumPersoneller").innerHTML = "";
  document.getElementById("bulunanPersonel").innerHTML = "";

  const ikCalisanlari = personeller.filter(p => p.departman === "IK");
  const ikListesi = ikCalisanlari.map(p => 
    `<p>${p.id}: ${p.ad} - ${p.departman} - $${p.maas}</p>`
  ).join('');
  document.getElementById("ikPersoneller").innerHTML = ikListesi;
}

function yazilimUzmanlariniGetir() {
  const div = document.getElementById("yazilimUzmanlari");
  div.innerHTML = ""; 

  const yazilimcilar = personeller.filter(p => p.departman.toLowerCase() === "yazılım");

  if (yazilimcilar.length === 0) {
    div.innerHTML = "Yazılım geliştirme uzmanı bulunamadı.";
    return;
  }

  yazilimcilar.forEach(p => {
    const pElem = document.createElement("p");
    pElem.textContent = `${p.ad} - Uzmanlık: ${p.uzmanlik || "Belirtilmemiş"}`;
    div.appendChild(pElem);
  });
}
function IKCalisanlariniGoster() {
  document.getElementById("tumPersoneller").innerHTML = "";
  document.getElementById("bulunanPersonel").innerHTML = "";
  document.getElementById("yazilimUzmanlari").innerHTML = "";

  const ikCalisanlari = personeller.filter(p => p.departman.toLowerCase() === "ik");
  const ikListesi = ikCalisanlari.map(p => 
    `<p>${p.id}: ${p.ad} - ${p.departman} - ${p.uzmanlik} - $${p.maas}</p>`
  ).join('');
  document.getElementById("ikPersoneller").innerHTML = ikListesi;
}
