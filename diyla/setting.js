function applyTheme(mode){
    document.body.classList.remove("dark","light");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
}

const theme = localStorage.getItem("theme") || "dark";
applyTheme(theme);

window.addEventListener("storage", (e) => {
    if(e.key === "theme"){
        applyTheme(e.newValue || "dark");
    }
});

const words = [
    "Hello","こんにちは","안녕하세요","你好","Bonjour","Hola","مرحبا",
    "Selamat Datang","Ciao","Hallo","Xin Chào","नमस्ते","Привет","Olá","สวัสดี",
    "Language","Speak","Learn","Translate","Education","English","Japanese",
    "Korean","Chinese","French","Spanish"
];

const container = document.getElementById("backgroundLanguage");

if(container){

    for(let i=0;i<35;i++){

        const span = document.createElement("span");
        span.className = "word";

        span.innerText = words[Math.floor(Math.random()*words.length)];

        span.style.left = Math.random()*100 + "%";
        span.style.fontSize = (14 + Math.random()*18) + "px";
        span.style.animationDuration = (10 + Math.random()*20) + "s";

        container.appendChild(span);
    }
}

function go(page){
    window.location.href = page;
}

function loadReminder(){

    let reminder = localStorage.getItem("reminder") || "on";

    const el = document.getElementById("reminderStatus");

    if(el){
        el.innerText = reminder.toUpperCase();
    }
}

loadReminder();

function toggleReminder(){

    let reminder = localStorage.getItem("reminder") || "on";

    reminder = (reminder === "on") ? "off" : "on";

    localStorage.setItem("reminder", reminder);

    const el = document.getElementById("reminderStatus");

    if(el){
        el.innerText = reminder.toUpperCase();
    }
}

function toggleDarkMode(){

    let current = localStorage.getItem("theme") || "dark";
    let newTheme = (current === "dark") ? "light" : "dark";

    applyTheme(newTheme);
}

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.clear();

        window.location.href = "login.html";
    }
}

/* PROFILE IMAGE */
const profileImg = localStorage.getItem("profileImage");
const avatar = document.querySelector(".avatar img");

if(profileImg && avatar){
    avatar.src = profileImg;
}

/* USERNAME */
const user = JSON.parse(localStorage.getItem("user"));
const usernameEl = document.getElementById("username");

if(user && usernameEl){
    usernameEl.innerText = user.name;
}