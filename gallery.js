const audio = document.getElementById("backgroundMusic");

// Waktu mulai dan akhir dalam detik
const startTime = 125; // 1 menit 30 detik
const endTime = 300; // 2 menit 45 detik

function playAudioSegment() {
  // Tunggu metadata siap
  if (audio.readyState >= 1) {
    audio.currentTime = startTime;
    audio.play();
  } else {
    audio.addEventListener("loadedmetadata", () => {
      audio.currentTime = startTime;
      audio.play();
    });
  }

  // Hentikan saat melewati batas akhir
  audio.addEventListener("timeupdate", () => {
    if (audio.currentTime >= endTime) {
      audio.pause();
    }
  });
}

let photos = [
  "foto6.jpg",
  "foto19.jpeg",
  "foto18.jpeg",
  "foto15.jpeg",
  "foto16.jpeg",
  "foto20.jpeg",
  "foto21.jpeg",
  "foto7.jpeg",
  "foto8.jpeg",
  "foto13.jpeg",
  "foto9.jpeg",
  "foto10.jpeg",
  "foto11.jpeg",
  "foto12.jpeg",
  "foto14.jpeg",
  "foto1.jpg",
  "foto2.jpg",
  "foto3.jpg",
  "foto4.jpg",
  "foto5.jpg",
  "foto22.jpg",
  "foto23.jpg",
  "foto24.jpg",
  "foto25.jpg",
  "foto26.jpg",
];

function startPrinting() {
  let box = document.getElementById("photoboxBody");
  box.innerHTML = "";

  playAudioSegment(); // 🔊 Mulai audio sesuai waktu

  let index = 0;

  function printNext() {
    if (index < photos.length) {
      let img = document.createElement("img");
      img.src = photos[index];
      img.classList.add("slide-in");
      box.appendChild(img);

      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });

      index++;
      setTimeout(printNext, 3000);
    } else {
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    }
  }

  printNext();
}
