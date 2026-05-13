// =========================
// SAVE PAGE
// =========================
localStorage.setItem("last_page", "welcome");


// =========================
// APPLY THEME (FIXED GLOBAL)
// =========================
function applyTheme(){

    let theme = localStorage.getItem("theme") || "dark";

    document.body.classList.remove("light","dark");
    document.body.classList.add(theme);
}

applyTheme();


// =========================
// LIVE THEME SYNC (FIXED)
// =========================
function syncThemeLive(){

    let theme = localStorage.getItem("theme") || "dark";

    document.body.classList.remove("light","dark");
    document.body.classList.add(theme);
}

syncThemeLive();

window.addEventListener("storage", (e) => {
    if(e.key === "theme"){
        syncThemeLive();
    }
});


// =========================
// FLOATING WORDS
// =========================
const words = [
    "Hello","Hola","Bonjour","こんにちは","안녕하세요","مرحبا",
    "Ciao","Hallo","Language","Learn","Speak","Translate",
    "English","French","Spanish","Japanese","Study","Quiz"
];

const container = document.getElementById("backgroundLanguage");

if(container){

    for(let i = 0; i < 60; i++){

        const span = document.createElement("span");
        span.className = "word";

        span.innerText =
        words[Math.floor(Math.random() * words.length)];

        span.style.left = Math.random() * 100 + "%";
        span.style.fontSize = (16 + Math.random() * 30) + "px";
        span.style.animationDuration = (10 + Math.random() * 18) + "s";
        span.style.animationDelay = (Math.random() * 8) + "s";

        container.appendChild(span);
    }
}


// =========================
// PASSWORD TOGGLE
// =========================
const togglePass = document.getElementById("togglePass");

if(togglePass){

    togglePass.addEventListener("click", () => {

        const pass = document.getElementById("password");

        if(pass){
            pass.type = pass.type === "password" ? "text" : "password";
        }

    });

}


// =========================
// FORM SUBMIT (LEADERBOARD FIXED)
// =========================
const form = document.getElementById("signUpForm");

if(form){

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const username = document.getElementById("username")?.value || "Player";
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        if(pass.length < 8){
            alert("Password mesti sekurang-kurangnya 8 aksara!");
            return;
        }

        const user = {
            name: username,
            email: email,
            password: pass,
            xp: 0
        };

        localStorage.setItem("user", JSON.stringify(user));

        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        let exist = leaderboard.find(u => u.email === email);

        if(exist){
            exist.name = username;
            exist.password = pass;
        } else {
            leaderboard.push(user);
        }

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        alert("Account Created & Saved!");

        window.location.href = "login.html";
    });

}


// =========================
// ADD XP FUNCTION
// =========================
function addXP(points){

    let user = JSON.parse(localStorage.getItem("user"));

    if(user){

        user.xp = (user.xp || 0) + points;

        localStorage.setItem("user", JSON.stringify(user));

        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        let exist = leaderboard.find(u => u.email === user.email);

        if(exist){
            exist.xp = user.xp;
        } else {
            leaderboard.push(user);
        }

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
}