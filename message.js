const messageText = [
  "Happy birth day sayangku ❤️❤️",
  "Wih dak terasa udah yang ke 21 be yo 🤣",
  "Tapi tenang kau makin bertambah umur makin cantik kok 🥰🫶",
  "Dan dak terasa juga ini yang ke 5 apo 6 yo aku ngucapin kau sampe lupo hehe, tapi yang jelas  aku bakal jadi orang pertama yang selalu excited untuk nyambut tanggal 11 Mei ini ❤️ walaupun dak pernah dapat nasi kuningnyo wkwkw",
  "semoga selalu menjadi pribadi yang lebih baik.",
  "Tetap jadi yumna yang aku kenal.",
  "Selalu berbakti samo ibu bapak.",
  "Kebanyakan doa dari aku masi samo dari yang biasonyo karna seperti cinta aku padamu tak kan berubah    🫰 (pasti salting 🤣)",
  "Oh iyo satu lagi semoga kau selalu sayang samo aku dan kito biso pegi main ke mano bae tanpa perlu takut/sembunyi sembunyi lagi.",
  "Tetap jadiin aku rumah jadi tempat kau cerito mau itu lagi senang, susah, sedih atau marah sekalipun.",
  "Walaupun semakin bertambah umur kalau mau manja atau pun memperlihatkan sifat ke anak anakan kau boleh nian kok ke aku karna aku selalu cinta dengan semua sifat kau ❤️",
  "Pokoknyo kalau samo aku kau dak perlu lagi jadi cewe yang superr duper stroong cukup diluaran bae terlihat strongnyo sisahny biso diluapkan ke akuu yo sayang.",
  "Mungkin aku dak pintar ngerangkai kata kata yang bagus atau menyentuh tapi yang harus kau tau aku sesayang itu samo kau ❤️❤️",
  "Maaf yo aku belum biso ngerayain langsung atau ngucapin langsung nyusul kau ke sano 😔 dan Maaf jugo yo aku sering ketiduran.",
  "Semoga kau suko dengan kado online yang aku buat.",
  "Love you ❤️❤️",
];

let messageBox = document.getElementById("messageBox");
let currentLine = 0;
let currentChar = 0;
let lineElement;
let typing;

function typeNextChar() {
  if (currentLine < messageText.length) {
    if (!lineElement) {
      lineElement = document.createElement("p");
      messageBox.appendChild(lineElement);
    }

    const currentText = messageText[currentLine];
    lineElement.textContent += currentText.charAt(currentChar);
    currentChar++;

    messageBox.scrollTop = messageBox.scrollHeight;

    if (currentChar >= currentText.length) {
      currentLine++;
      currentChar = 0;
      lineElement = null;

      // jeda sebelum lanjut ke baris berikutnya
      clearInterval(typing);
      setTimeout(() => {
        typing = setInterval(typeNextChar, 100);
      }, 600); // jeda antar baris
    }
  } else {
    clearInterval(typing);
  }
}

// mulai efek ketik
typing = setInterval(typeNextChar, 100);

// tombol skip
function skipMessage() {
  clearInterval(typing);
  messageBox.innerHTML = "";
  messageText.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    messageBox.appendChild(p);
  });
}
