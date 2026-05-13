(function () {

    let mode =
        localStorage.getItem("mode") ||
        localStorage.getItem("theme") ||
        "dark";

    if (mode === "light") {
        document.body.classList.add("light");
        document.body.classList.add("light-mode");
    }

})();

window.addEventListener("storage", (e) => {
    if (e.key === "mode" || e.key === "theme") {
        location.reload();
    }
});


function getBadges(){
    return JSON.parse(localStorage.getItem("badges")) || [];
}

function addBadge(id){

    let badges = getBadges();

    if(!badges.includes(id)){
        badges.push(id);
        localStorage.setItem("badges", JSON.stringify(badges));
    }
}


(function () {

    const container = document.getElementById("backgroundLanguage");
    if (!container) return;

    const lang =
        localStorage.getItem("userLanguage") || "en";

    const wordsMap = {
        en:["Hello","Love","Water","School","Friend","Study"],
        es:["Hola","Amor","Agua","Amigo","Escuela"],
        fr:["Bonjour","Amour","Eau","Ami","École"],
        de:["Hallo","Liebe","Wasser","Freund","Schule"],
        ja:["こんにちは","愛","水","友達","学校"],
        ko:["안녕하세요","사랑","물","친구","학교"],
        zh:["你好","爱","水","朋友","学校"],
        ar:["مرحبا","حب","ماء","صديق","مدرسة"],
        ms:["Helo","Cinta","Air","Kawan","Sekolah"]
    };

    const list = wordsMap[lang] || wordsMap.en;

    for (let i = 0; i < 30; i++) {

        const span = document.createElement("span");
        span.className = "word";

        span.innerText = list[Math.floor(Math.random() * list.length)];

        span.style.left = Math.random() * 100 + "%";
        span.style.fontSize = (14 + Math.random() * 22) + "px";
        span.style.animationDuration = (8 + Math.random() * 12) + "s";
        span.style.animationDelay = Math.random() * 5 + "s";

        container.appendChild(span);
    }

})();


let lang = localStorage.getItem("userLanguage") || "en";

const langName = {
    en:"English", es:"Spanish", fr:"French", de:"German",
    ja:"Japanese", ko:"Korean", zh:"Chinese", ar:"Arabic", ms:"Malay"
};

if(document.getElementById("langDisplay")){
    document.getElementById("langDisplay").innerText =
    "Language: " + langName[lang];
}


const words = {
    en:["Hello","Thank You","Apple","Water","School","Friend","Morning","Love"],
    es:["Hola","Gracias","Manzana","Agua","Escuela","Amigo","Mañana","Amor"],
    fr:["Bonjour","Merci","Pomme","Eau","École","Ami","Matin","Amour"],
    de:["Hallo","Danke","Apfel","Wasser","Schule","Freund","Morgen","Liebe"],
    ja:["こんにちは","ありがとう","リンゴ","水","学校","友達","朝","愛"],
    ko:["안녕하세요","감사합니다","사과","물","학교","친구","아침","사랑"],
    zh:["你好","谢谢","苹果","水","学校","朋友","早上","爱"],
    ar:["مرحبا","شكرا","تفاح","ماء","مدرسة","صديق","صباح","حب"],
    ms:["Helo","Terima kasih","Epal","Air","Sekolah","Kawan","Pagi","Cinta"]
};

const speechLang = {
    en:"en-US", es:"es-ES", fr:"fr-FR", de:"de-DE",
    ja:"ja-JP", ko:"ko-KR", zh:"zh-CN", ar:"ar-SA", ms:"ms-MY"
};

let list = words[lang] || words.en;

let i = 0;
let score = 0;
let xp = 0;
let current = list[0];


function updateXP(){
    const el = document.getElementById("xpValue");
    if(el) el.innerText = xp;
}


document.getElementById("playBtn").onclick = () => {

    let speech = new SpeechSynthesisUtterance(current);
    speech.lang = speechLang[lang];
    speech.rate = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
};


document.getElementById("checkBtn").onclick = () => {

    let ans = document.getElementById("answerInput").value.trim().toLowerCase();
    let result = document.getElementById("result");

    if(ans === current.toLowerCase()){

        xp += 10;
        score++;

        updateXP();

        result.innerText = "Correct!";
        result.style.color = "#2ecc71";

    } else {
        result.innerText = "Wrong!";
        result.style.color = "#ff4d4d";
    }

    setTimeout(() => {

        i++;

        if(i >= list.length){

            let perfectScore = (score === list.length);

            if(perfectScore){
                addBadge("listening_master");
                xp += 20;
            }

            let totalXP =
                parseInt(localStorage.getItem("totalXP")) || 0;

            totalXP += xp;
            localStorage.setItem("totalXP", totalXP);

            localStorage.setItem("lastScore", xp);
            localStorage.setItem("xp", xp);

            document.querySelector(".card").innerHTML = `
                <h2>🎉 Finished Listening</h2>
                <h3>Score: ${score}/${list.length}</h3>
                <h3>XP: ${xp}</h3>

                ${perfectScore ? "<h3>🏅 Listening Master Unlocked!</h3>" : ""}

                <button onclick="location.href='homepage.html'">Home</button>
                <button onclick="location.href='leaderboard.html'">Leaderboard</button>
            `;

            return;
        }

        current = list[i];

        document.getElementById("answerInput").value = "";
        document.getElementById("result").innerText = "";

        if(document.getElementById("questionNo")){
            document.getElementById("questionNo").innerText =
            `Question ${i+1} / ${list.length}`;
        }

    }, 800);
};


function go(page){
    window.location.href = page;
}