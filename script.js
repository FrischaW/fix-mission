// Pesan yang akan ditampilkan
const MESSAGE_TEXT = [
  "Selamat ulang tahun, Mei🎂",
  "Tau ini telat banget yaa… maafkeun😅. Semoga kamu selalu bahagia terus yaa Mei.",
  "Makasih mei udah jadi temen yang baik (meskipun kadang ngeselin wkwk)",
  "tapi serius, dirimu tuh selalu bikin ketawa dan tiap ketemu tuh kek auto full battery lagi anjay wkwkw.", 
  "Kalo kata Fahrun tuh, kalo lgi sedih harus ingat kalo selalu ada badut Meifha yang selalu menghibur🤭",
  "thanks ya mei udh mau jadi badutku wkwkw.",
  "ini aku ngetik sedikit malu dan merasa sedikit alay se",
  "tapi jujur semenjak kita temenan aku berasa jadi makin berwarna.....",
  "gimana yak, kyk ngerasa Frischa yang dulu tuh balik lagi",
  "(aku tau dirimu pasti ketawa sambil senyum2 baca iki hehe, tapi gapapa lah yaa sekali2...)",
  "dan jujur aku kangen sekelas pliss😢",
  "dan ga boong kadang aku kesel dirimu slowrep:(",
  "tapi aku ngerti kok, emang cuma kesel ae tapi ga yang kesel bgt paham ga sihh",
  "Apalagi ya? Hmm...",
  "Semoga segala doa yang disemogakan segera tersemogakan yak. Oh ya, semoga semua sedih yang sempet dirasain belakangan ini diganti sama kebahagiaan yang lebih banyak lagi. Semoga ke depannya kita nggak pernah jadi asing ya Mei… awas aja lek asing!!!",
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



