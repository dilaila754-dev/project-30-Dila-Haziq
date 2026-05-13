
// SAVE PAGE
localStorage.setItem("last_page", "welcome");

/* =========================
   APPLY DARK / LIGHT MODE
========================= */

const savedTheme =
localStorage.getItem("theme") || "dark";

if(savedTheme === "light"){
    document.body.classList.add("light-mode");
}else{
    document.body.classList.remove("light-mode");
}

/* =========================
   LANGUAGE WORDS
========================= */

const words = [

    "Hello",
    "こんにちは",
    "안녕하세요",
    "你好",
    "Bonjour",
    "Hola",
    "مرحبا",
    "Selamat Datang",
    "Ciao",
    "Hallo",
    "Xin Chào",
    "नमस्ते",
    "Привет",
    "Olá",
    "สวัสดี",

    "Language",
    "Speak",
    "Learn",
    "Translate",
    "Education",
    "English",
    "Japanese",
    "Korean",
    "Chinese",
    "French",
    "Spanish"

];

const container =
document.getElementById("backgroundLanguage");

/* =========================
   CREATE FLOATING WORDS
========================= */

for(let i = 0; i < 50; i++){

    const span =
    document.createElement("span");

    span.classList.add("word");

    span.innerText =
    words[Math.floor(Math.random() * words.length)];

    span.style.left =
    Math.random() * 100 + "%";

    span.style.fontSize =
    (20 + Math.random() * 40) + "px";

    span.style.animationDuration =
    (12 + Math.random() * 20) + "s";

    span.style.animationDelay =
    Math.random() * 10 + "s";

    span.style.opacity =
    0.2 + Math.random() * 0.5;

    container.appendChild(span);
}

/* =========================
   🔥 ADDED SOCIAL LOGIN
========================= */

function loginGoogle(){
    window.location.href =
    "https://accounts.google.com/signin";
}

function loginFacebook(){
    window.location.href =
    "https://www.facebook.com/login.php";
}

function loginApple(){
    window.location.href =
    "https://appleid.apple.com/sign-in";
}