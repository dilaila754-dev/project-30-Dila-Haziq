/* =========================
   LEADERBOARD SYSTEM (FIXED)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       THEME SYSTEM (FIXED)
    ========================== */
    const mode = localStorage.getItem("theme") || "dark";

    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);

    /* =========================
       GET TOTAL XP
    ========================== */
    function getXP(){
        return parseInt(localStorage.getItem("totalXP")) || 0;
    }

    let totalXP = getXP();

    const myScore = document.getElementById("myScore");

    if(myScore){
        myScore.innerText = totalXP + " XP";
    }

    /* =========================
       PROFILE IMAGE
    ========================== */
    const img = document.getElementById("leaderboardProfile");
    const savedImg = localStorage.getItem("profileImage");

    if(img){
        img.src = savedImg || "assets/img/avatar.png";
    }

    /* =========================
       RANK SYSTEM (CLEAN FIX)
    ========================== */
    const rank = document.getElementById("userRank");

    function calculateRank(xp){

        if(xp >= 1000) return 1;
        if(xp >= 500) return 2;
        if(xp >= 200) return 3;
        if(xp > 0) return 4;
        return "-";
    }

    if(rank){
        rank.innerText = calculateRank(totalXP);
    }

    /* =========================
       🔥 LIVE XP SYNC (FIXED)
    ========================== */
    function syncXP(){

        const currentXP = parseInt(localStorage.getItem("totalXP")) || 0;
        const lastXP = parseInt(localStorage.getItem("xp")) || 0;

        const finalXP = Math.max(currentXP, lastXP);

        // update UI
        const myScore = document.getElementById("myScore");
        if(myScore){
            myScore.innerText = finalXP + " XP";
        }

        // update rank live
        const rank = document.getElementById("userRank");
        if(rank){
            rank.innerText = calculateRank(finalXP);
        }

        // save safe value
        localStorage.setItem("totalXP", finalXP);
    }

    syncXP();

    setInterval(syncXP, 1000);

});


/* =========================
   NAVIGATION
========================= */
function goPage(page){
    window.location.href = page;
}

function goBack(){
    window.history.back();
}


/* =========================
   FLOATING BACKGROUND WORDS
========================= */
const words = [
    "Hello","Hola","Bonjour","Learn",
    "Speak","Quiz","LevelUp","XP"
];

const container = document.getElementById("backgroundLanguage");

if(container){

    for(let i = 0; i < 25; i++){

        const span = document.createElement("span");
        span.className = "word";

        span.innerText = words[Math.floor(Math.random() * words.length)];

        span.style.left = Math.random() * 100 + "%";
        span.style.fontSize = (14 + Math.random() * 18) + "px";
        span.style.animationDuration = (10 + Math.random() * 20) + "s";

        container.appendChild(span);
    }
}