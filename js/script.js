//variabel untuk untuk jenis kelamin, usia, beratbadan dan tinggi
const jeniskelamin = document.getElementsByName("jeniskelamin");
const usia = document.getElementById("usia");
const beratbadan = document.getElementById("beratbadan");
const tinggi = document.getElementById("tinggi");

//variabel untuk untuk validasi usia, beratbadan dan tinggi
const usiaNull = document.getElementById('usiaNull');
const usiaRange = document.getElementById('usiaRange');
const beratbadanNull = document.getElementById('beratbadanNull');
const beratbadanRange = document.getElementById('beratbadanRange');
const tinggiNull = document.getElementById('tinggiNull');
const tinggiRange = document.getElementById('tinggiRange');

//variabel untuk jawaban dari form
const answer = document.getElementsByName("answer");

//variabel untuk hasil dari kalkulasi bmi
const bmiResult = document.getElementById("bmi-result");

//variabel untuk kategori dan deskripsi bmi
const kategoriBMI = document.getElementById("kategori-bmi");
const deskripsiBMI = document.getElementById("deskripsi-bmi");
const deskripsiArray = [
  'BMI tidak sepenuhnya mewakili diagnosis menyeluruh dari kesehatan tubuh dan resiko penyakit seseorang',
  'Anda perlu konsultasi lebih lanjut mengenai resiko dan kekhawatiran mengenai berat badan Anda'
]

//variabel untuk untuk informasi tambahan dan arrownya
const arrowClass = document.getElementsByClassName('arrow');
const question = document.getElementsByClassName('info-question');

//fungsi submit form
function submitForm(event) {
  event.preventDefault();

  //java script untuk mendapatkan jenis kelamin yang di input
  let selectedjeniskelamin;
  for (let i = 0; i < jeniskelamin.length; i++) {
    if (jeniskelamin[i].checked) {
      selectedjeniskelamin = jeniskelamin[i].value;
      break;
    }
  }
  //validasi sebelum perhitungan
  if (validated(usia.value, beratbadan.value, tinggi.value)) {
    const tinggiMeter = tinggi.value / 100;
    const bmi = parseFloat(beratbadan.value / tinggiMeter ** 2).toFixed(1);

    //memberikan isi data yang di input ke dalam field yang telah ditentukan
    answer[0].innerHTML = selectedjeniskelamin;
    answer[1].innerHTML = usia.value;
    answer[2].innerHTML = beratbadan.value;
    answer[3].innerHTML = tinggi.value;

    //memberikan hasil perhitungan ke dalam field yang telah ditentukan
    bmiResult.innerHTML = bmi;
    kategoriBMI.innerHTML = kategori(bmi);
    deskripsiBMI.innerHTML = deskripsi(bmi);
  };
}

// validasi usia, beratbadan dan tinggi
function validated(age, weight, height) { 
  //return default jika validasi berhasil
  let condition = true;
  
  //validasi usia
  switch (true) {
    case (age == ''):
      //display error ketika terjadi error
      usiaNull.style.display = 'block';

      //sembunyikan error yang lain ketika error ini terjadi
      usiaRange.style.display = 'none';

      // return menjadi false karena terjadi error
      condition = false;
      break;
    case (age < 18 || age > 120):
      usiaNull.style.display = 'none';
      usiaRange.style.display = 'block';
      condition = false;
      break;
    default:
      usiaNull.style.display = 'none';
      usiaRange.style.display = 'none';
      break;
  }
  //weight validation
  switch (true) {
    case (weight == ''):
      beratbadanNull.style.display = 'block';
      beratbadanRange.style.display = 'none';
      condition = false;
      break;
    case (weight < 30 || weight > 600):
      beratbadanNull.style.display = 'none';
      beratbadanRange.style.display = 'block';
      condition = false;
      break;
    default:
      beratbadanNull.style.display = 'none';
      beratbadanRange.style.display = 'none';
      break;
  }
  //validasi tinggi
  switch (true) {
    case (height == ''):
      tinggiNull.style.display = 'block';
      tinggiRange.style.display = 'none';
      condition = false;
      break;
    case (height < 40 || height > 300):
      tinggiNull.style.display = 'none';
      tinggiRange.style.display = 'block';
      condition = false;
      break;
    default:
      tinggiNull.style.display = 'none';
      tinggiRange.style.display = 'none';
      break;
  }
  return condition;
}

// fungsi untuk mengkategorikan bmi
function kategori(bmi) {
  if (bmi < 18.5) {
    kategoriBMI.style.color = 'blue';
    return "Kekurangan berat badan";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    kategoriBMI.style.color = 'green';
    return "berat badan normal (ideal)";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    kategoriBMI.style.color = 'orange';
    return "Kelebihan beratbadan badan";
  }
  if (bmi >= 30) {
    kategoriBMI.style.color = 'red';
    return "Kegemukan (Obesitas)";
  }
}

// fungsi untuk memberikan deskripsi yang sesuai terhadap hasil kalkulasi bmi
function deskripsi(bmi) {
  if (bmi < 18.5) {
    return deskripsiArray[0];
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return deskripsiArray[1];
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return deskripsiArray[2];
  }
  if (bmi >= 30) {
    return deskripsiArray[2];
  }
}

// fungsi merotasi anak panah dan melakukan collapse
function rotate(num) {
  arrowClass[num].classList.toggle('rotates');
  let content = question[num].nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}