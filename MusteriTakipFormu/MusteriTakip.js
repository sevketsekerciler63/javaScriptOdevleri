
function ekle() {
  var ad = document.getElementById("ad").value;
  var tel = document.getElementById("tel").value;
  var no = document.getElementById("no").value;
  var adres = document.getElementById("adres").value;

  if (!ad || !tel || !no || !adres) { alert("Boş alan bırakma kral!"); return; }

  var tablo = document.getElementById("liste");
  var satir = document.createElement("tr");

  satir.innerHTML = 
    "<td>" + ad + "</td>" +
    "<td>" + tel + "</td>" +
    "<td>" + no + "</td>" +
    "<td>" + adres + "</td>" +
    "<td>" +
      "<button onclick='duzenle(this)'>Düzenle</button> " +
      "<button onclick='sil(this)'>Sil</button>" +
    "</td>";

  tablo.appendChild(satir);
  temizle();
}

function duzenle(buton) {
  var satir = buton.parentNode.parentNode;
  var hucreler = satir.getElementsByTagName("td");

  var yeniAd = prompt("Yeni Ad Soyad:", hucreler[0].innerText);
  var yeniTel = prompt("Yeni Telefon:", hucreler[1].innerText);
  var yeniNo = prompt("Yeni Müşteri No:", hucreler[2].innerText);
  var yeniAdres = prompt("Yeni Adres:", hucreler[3].innerText);

  if (yeniAd && yeniTel && yeniNo && yeniAdres) {
    hucreler[0].innerText = yeniAd;
    hucreler[1].innerText = yeniTel;
    hucreler[2].innerText = yeniNo;
    hucreler[3].innerText = yeniAdres;
  }
}

function sil(buton) {
  var satir = buton.parentNode.parentNode;
  satir.parentNode.removeChild(satir);
}

function temizle() {
  document.getElementById("ad").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("no").value = "";
  document.getElementById("adres").value = "";
}