// Pesan yang akan ditampilkan
const MESSAGE_TEXT = [
  "Selamat ulang tahun, Mei🎂",
  "Semoga Panjang Umur dan Sehat Selalu
  "Semoga segala doa yang disemogakan segera tersemogakan yak"
  "Oh ya, semoga semua sedih yang sempet dirasain belakangan ini diganti sama kebahagiaan yang lebih banyak lagi"
  "Semangat semester 5 nya",
  "- Chaca"
].join("\n\n");

// ===== Navigasi Antar Halaman =====
const screens = [...document.querySelectorAll(".screen")];
function show(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-goto]");
  if (!el) return;
  show(el.dataset.goto);
});

// ===== Modal Pesan =====
const overlay = document.getElementById("overlay");
const messageEl = document.getElementById("message");
const progress = document.getElementById("progress");
const readBtn = document.getElementById("readBtn");
const closeBtn = document.getElementById("closeMsg");

function typeWriter(el, text, speed = 26) {
  return new Promise(resolve => {
    el.textContent = "";
    el.scrollTop = 0;
    let i = 0;
    progress.textContent = "Menulis...";
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i % 6 === 0) el.scrollTop = el.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        el.scrollTop = el.scrollHeight;
        progress.textContent = "Selesai ✓";
        resolve();
      }
    }, speed);
  });
}

readBtn?.addEventListener("click", async () => {
  overlay.classList.add("open");
  await typeWriter(messageEl, MESSAGE_TEXT);
});
closeBtn?.addEventListener("click", () => {
  overlay.classList.remove("open");
  messageEl.textContent = "";
  progress.textContent = "";
});
overlay?.addEventListener("click", e => {
  if (e.target === overlay) closeBtn.click();
});

// ===== Toast Helper =====
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg, duration = 3000) {
  if (!toast) return alert(msg);
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
}

// ===== Tampilkan Gambar Kado & Pesan =====
const giftBtn = document.getElementById("giftBtn");
const giftContainer = document.getElementById("giftContainer");
const giftImage = document.getElementById("giftImage");

giftBtn?.addEventListener("click", e => {
  e.stopPropagation(); // cegah klik merambat ke elemen dalamnya
  if (giftContainer.style.display !== "block") {
    giftContainer.style.display = "block";
    showToast("");
  }
});

giftImage?.addEventListener("click", () => {
  showToast("Kadonya nyusul pas aku di sby yak jadi Ayok ketemu duluu😊✨");
});


const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");

startBtn?.addEventListener("click", () => {
  music.play().catch(err => {
    console.warn("Autoplay gagal:", err);
  });
});

let isPlaying = false;

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      musicBtn.textContent = "Play Music";
    } else {
      music.play();
      musicBtn.textContent = "Pause Music";
    }
    isPlaying = !isPlaying;
  });
}
giftImage?.addEventListener("click", () => {
  showToast("Kadonya nyusul pas aku di Sby yak jadi ayok ketemu duluu 😊✨");
});

// ===== Awal: tampilkan start screen =====
show("start");

