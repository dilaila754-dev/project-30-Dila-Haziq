let lang = localStorage.getItem("userLanguage") || "en";

const langName = {
en:"ENGLISH", ms:"MALAY", ko:"KOREAN", ja:"JAPANESE",
zh:"CHINESE", ar:"ARABIC", es:"SPANISH", fr:"FRENCH", de:"GERMAN"
};

document.getElementById("langText").innerText =
"Language: " + (langName[lang] || "ENGLISH");




const dataSet = {
en:[
{word:"Fish",ans:"fish",img:"fish.jpg"},
{word:"Bread",ans:"bread",img:"roti.jpg"},
{word:"Water",ans:"water",img:"water.jpg"},
{word:"Apple",ans:"apple",img:"epal.jpg"},
{word:"Rice",ans:"rice",img:"nasi.jpg"},
{word:"Egg",ans:"egg",img:"egg.jpg"},
{word:"Milk",ans:"milk",img:"susu.jpg"},
{word:"Chicken",ans:"chicken",img:"ayam.png"}
],
ms:[
{word:"Fish",ans:"ikan",img:"fish.jpg"},
{word:"Bread",ans:"roti",img:"roti.jpg"},
{word:"Water",ans:"air",img:"water.jpg"},
{word:"Apple",ans:"epal",img:"epal.jpg"},
{word:"Rice",ans:"nasi",img:"nasi.jpg"},
{word:"Egg",ans:"telur",img:"egg.jpg"},
{word:"Milk",ans:"susu",img:"susu.jpg"},
{word:"Chicken",ans:"ayam",img:"ayam.png"}
]
};



let data = dataSet[lang] || dataSet.en;

let i = 0;
let score = 0;
let xp = 0;


let correctAnswers = 0;



function addBadge(id){

    let badges = JSON.parse(localStorage.getItem("badges")) || [];

    if(!badges.includes(id)){
        badges.push(id);
        localStorage.setItem("badges", JSON.stringify(badges));
    }
}



function updateXP(){
    document.getElementById("xp").innerText = xp;
}



function load(){

    document.getElementById("q-word").innerText = data[i].word;
    document.getElementById("q-img").src = data[i].img;
    document.getElementById("answerInput").value = "";
    document.getElementById("result").innerText = "";

    if(document.getElementById("questionNo")){
        document.getElementById("questionNo").innerText =
        `Question ${i+1} / ${data.length}`;
    }
}

load();
updateXP();



function check(){

    let ans =
    document.getElementById("answerInput").value.toLowerCase().trim();

    if(ans === data[i].ans){

        xp += 10;
        score++;
        correctAnswers++;

        updateXP();

        document.getElementById("result").style.color = "#2ecc71";
        document.getElementById("result").innerText = "Correct! +10 XP";

        i++;

        setTimeout(()=>{

            if(i < data.length){
                load();
            }else{

            

                let totalXP =
                parseInt(localStorage.getItem("totalXP")) || 0;

                totalXP += xp;
                localStorage.setItem("totalXP", totalXP);


          

                if(correctAnswers === data.length){
                    addBadge("writing_master");
                }


     

                document.querySelector(".card").innerHTML = `
                    <h2>🎉 Finished!</h2>
                    <h3>Score: ${score}/${data.length}</h3>
                    <h3>XP Earned: ${xp}</h3>
                    <h3>Total XP: ${totalXP}</h3>

                    ${correctAnswers === data.length ? "<h3>🏅 Writing Master Unlocked!</h3>" : ""}

                    <button onclick="location.href='leaderboard.html'">
                        Go Leaderboard
                    </button>
                `;
            }

        },800);

    }else{

        document.getElementById("result").style.color = "red";
        document.getElementById("result").innerText = "Wrong!";
    }
}




function go(page){
    window.location.href = page;
}



const words = ["Hello","Hola","Bonjour","Hallo","こんにちは"];
const container = document.getElementById("backgroundLanguage");

if(container){

    for(let x=0;x<30;x++){

        let s = document.createElement("span");
        s.className = "word";
        s.innerText = words[Math.floor(Math.random()*words.length)];
        s.style.left = Math.random()*100 + "%";
        s.style.fontSize = (14 + Math.random()*15) + "px";
        s.style.animationDuration = (10 + Math.random()*15) + "s";

        container.appendChild(s);
    }
}