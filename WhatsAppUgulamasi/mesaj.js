function mesajGonder(kutuNumarasi) {
  const input = document.getElementById("mesaj" + kutuNumarasi);
  const kendiKutu = document.getElementById("mesajKutulari" + kutuNumarasi);
  const digerKutuNumarasi = kutuNumarasi === 1 ? 2 : 1;
  const digerKutu = document.getElementById("mesajKutulari" + digerKutuNumarasi);

  const mesaj = input.value.trim();
  if (!mesaj) return;

  const d = new Date();
  let saat = d.getHours();
  let dakika = d.getMinutes();
  if (dakika < 10) dakika = "0" + dakika;

  // Kendi kutusuna sağda mesaj
  const mesajKendi = document.createElement("div");
  mesajKendi.classList.add("mesaj", "gonderen");
  mesajKendi.textContent = mesaj;
  const tarihKendi = document.createElement("span");
  tarihKendi.classList.add("tarih");
  tarihKendi.textContent = saat + ":" + dakika;
  mesajKendi.appendChild(tarihKendi);
  kendiKutu.appendChild(mesajKendi);
  kendiKutu.scrollTop = kendiKutu.scrollHeight;

  // Diğer kutuya solda mesaj
  const mesajDiger = document.createElement("div");
  mesajDiger.classList.add("mesaj", "alan");
  mesajDiger.textContent = mesaj;
  const tarihDiger = document.createElement("span");
  tarihDiger.classList.add("tarih");
  tarihDiger.textContent = saat + ":" + dakika;
  mesajDiger.appendChild(tarihDiger);
  digerKutu.appendChild(mesajDiger);
  digerKutu.scrollTop = digerKutu.scrollHeight;

  input.value = "";
}