// Sıcaklık: Celsius to Fahrenheit
document.getElementById("convert-temp").addEventListener("click", function () {
  const c = parseFloat(document.getElementById("c").value);
  if (!isNaN(c)) {
    const f = (c * 9/5) + 32;
    document.getElementById("f").value = f.toFixed(2);
  } else {
    alert("Lütfen geçerli bir sıcaklık girin.");
  }
});

// Ağırlık: KG to Pound
document.getElementById("convert-weight").addEventListener("click", function () {
  const kg = parseFloat(document.getElementById("kg").value);
  if (!isNaN(kg)) {
    const lb = kg * 2.205;
    document.getElementById("lb").value = lb.toFixed(2);
  } else {
    alert("Lütfen geçerli bir kilo girin.");
  }
});

// Mesafe: KM to Mile
document.getElementById("convert-distance").addEventListener("click", function () {
  const km = parseFloat(document.getElementById("km").value);
  if (!isNaN(km)) {
    const mile = km / 1.609;
    document.getElementById("mile").value = mile.toFixed(2);
  } else {
    alert("Lütfen geçerli bir mesafe girin.");
  }
});




