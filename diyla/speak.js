let lang = localStorage.getItem("userLanguage") || "en";


const dataSet = {
en:[
{word:"Water",img:"water.jpg"},
{word:"Bread",img:"bread.jpg"},
{word:"Apple",img:"apple.jpg"},
{word:"Milk",img:"milk.jpg"},
{word:"Rice",img:"rice.jpg"},
{word:"Book",img:"book.jpg"},
{word:"Pen",img:"pen.jpg"},
{word:"School",img:"school.jpg"}
],
ms:[
{word:"Air",img:"water.jpg"},
{word:"Roti",img:"bread.jpg"},
{word:"Epal",img:"apple.jpg"},
{word:"Susu",img:"milk.jpg"},
{word:"Nasi",img:"rice.jpg"},
{word:"Buku",img:"book.jpg"},
{word:"Pen",img:"pen.jpg"},
{word:"Sekolah",img:"school.jpg"}
]
};

let data = dataSet[lang] || dataSet.en;

let i = 0;
let xp = 0;
let successCount = 0;


let totalXP = parseInt(localStorage.getItem("totalXP")) || 0;

function addBadge(id){

    let badges = JSON.parse(localStorage.getItem("badges")) || [];

    if(!badges.includes(id)){
        badges.push(id);
        localStorage.setItem("badges", JSON.stringify(badges));
    }
}


function load(){
    document.getElementById("word").innerText = data[i].word;
    document.getElementById("img").src = data[i].img;
}
load();


function speak(){
    let msg = new SpeechSynthesisUtterance(data[i].word);
    msg.lang = lang === "ms" ? "ms-MY" : "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}


function startSpeak(){

    let rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = lang === "ms" ? "ms-MY" : "en-US";

    document.getElementById("result").innerText = "Listening...";
    rec.start();

    rec.onresult = function(e){
        let text = e.results[0][0].transcript.toLowerCase().trim();
        check(text);
    };
}


function check(text){

    let correct = data[i].word.toLowerCase();

    if(text === correct){

        xp += 10;
        totalXP += 10;
        successCount++;

        document.getElementById("result").innerText = "Correct +10 XP";
        document.getElementById("result").style.color = "#2ecc71";

    }else{

        document.getElementById("result").innerText =
        "Wrong: " + text;

        document.getElementById("result").style.color = "red";
    }

    document.getElementById("xp").innerText = xp;

    setTimeout(next, 1200);
}


function next(){

    i++;

    if(i >= data.length){

        localStorage.setItem("totalXP", totalXP);

        

        if(successCount === data.length){
            addBadge("speaking_master");
        }

        document.querySelector(".card").innerHTML = `
            <h2>🎉 Finished Speaking</h2>
            <h3>Session XP: ${xp}</h3>
            <h3>Total XP: ${totalXP}</h3>

            ${successCount === data.length ? "<h3>🏅 Speaking Master Unlocked!</h3>" : ""}

            <button onclick="location.href='homepage.html'">Home</button>
            <button onclick="location.href='leaderboard.html'">Leaderboard</button>
        `;

        return;
    }

    load();
    document.getElementById("result").innerText = "";
}


function go(page){
    window.location.href = page;
}



const words = ["Hello","Hola","Bonjour","こんにちは","안녕하세요","مرحبا"];
const container = document.getElementById("backgroundLanguage");

if(container){

    for(let x=0;x<35;x++){

        let s = document.createElement("span");
        s.className = "word";

        s.innerText = words[Math.floor(Math.random()*words.length)];

        s.style.left = Math.random()*100 + "%";
        s.style.fontSize = (16 + Math.random()*20) + "px";
        s.style.animationDuration = (10 + Math.random()*15) + "s";

        container.appendChild(s);
    }
}