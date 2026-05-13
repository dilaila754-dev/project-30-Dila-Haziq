// SAVE PAGE
localStorage.setItem("last_page", "welcome");

// LANGUAGE WORDS
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

// CREATE FLOATING WORDS
for(let i = 0; i < 50; i++){

    const span =
    document.createElement("span");

    span.classList.add("word");

    span.innerText =
    words[Math.floor(Math.random() * words.length)];

    // RANDOM POSITION
    span.style.left =
    Math.random() * 100 + "%";

    // RANDOM SIZE
    span.style.fontSize =
    (20 + Math.random() * 40) + "px";

    // RANDOM SPEED
    span.style.animationDuration =
    (12 + Math.random() * 20) + "s";

    // RANDOM DELAY
    span.style.animationDelay =
    Math.random() * 10 + "s";

    // RANDOM OPACITY
    span.style.opacity =
    0.2 + Math.random() * 0.5;

    container.appendChild(span);
}