const words = ["Hello","Hola","Bonjour","مرحبا","こんにちは"];

const container =
document.getElementById("backgroundLanguage");

if (container) {

    for (let i = 0; i < 40; i++) {

        const s = document.createElement("span");
        s.className = "word";

        s.innerText =
        words[Math.floor(Math.random() * words.length)];

        s.style.left =
        Math.random() * 100 + "%";

        s.style.fontSize =
        (15 + Math.random() * 25) + "px";

        s.style.animationDuration =
        (10 + Math.random() * 15) + "s";

        container.appendChild(s);
    }
}

/* =========================
   LANGUAGE MAP
========================= */

const langMap = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Japanese: "ja",
    Korean: "ko",
    Chinese: "zh",
    Arabic: "ar",
    Malay: "ms"
};

/* =========================
   MP3 AUDIO MAP
========================= */

const audioMap = {

    en: "eng.mp3",
    es: "spanish.mp3",

    fr: "french.mp3",
    de: "german.mp3",

    ja: "konichiwa.mp3",
    ko: "japan.mp3",

    zh: "cina.mp3",
    ar: "arab.mp3",

    ms: "malay.mp3"
};



function saveLanguage(lang){
    localStorage.setItem("userLanguage", lang);
}


function setMode(mode){
    document.body.classList.remove("light","dark");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);

    window.dispatchEvent(
        new StorageEvent("storage", {
            key: "theme"
        })
    );
}

document.addEventListener("DOMContentLoaded", () => {

    const mode =
    localStorage.getItem("theme") || "dark";

    document.body.classList.remove("light","dark");
    document.body.classList.add(mode);
});

/* =========================
   PLAY AUDIO (MP3)
========================= */

let audio = new Audio();

function playAudio(langCode){

    if(audio){
        audio.pause();
        audio.currentTime = 0;
    }

    const file =
    audioMap[langCode];

    if(!file) return;

    audio = new Audio(file);
    audio.play();
}

/* =========================
   LANGUAGE CLICK
========================= */

document.querySelectorAll(".lang-card")
.forEach(card => {

    card.addEventListener("click", function(){

        document.querySelectorAll(".lang-card")
        .forEach(c => c.classList.remove("active"));

        this.classList.add("active");

        const selected =
        this.dataset.lang;

        const code =
        langMap[selected] || "en";

        saveLanguage(code);

        localStorage.setItem("progress", "1");

        
        playAudio(code);

        const btn =
        document.getElementById("btnContinue");

        if(btn){
            btn.disabled = false;
        }

    });

});


document.getElementById("btnContinue")
?.addEventListener("click", () => {
    window.location.href = "homepage.html";
});