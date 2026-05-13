

const theme = localStorage.getItem("theme") || "dark";

if(theme === "light"){
    document.body.classList.add("light-mode");
}


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


const quiz = [
{q:"Apple",a:"La Manzana",o:["La Manzana","El Pan","Agua","Gato"]},
{q:"Water",a:"Agua",o:["Agua","Pan","Gato","Cafe"]},
{q:"Cat",a:"El Gato",o:["El Gato","Perro","Agua","Pan"]},
{q:"Dog",a:"El Perro",o:["El Perro","Gato","Sol","Pan"]},
{q:"Milk",a:"Leche",o:["Leche","Agua","Pan","Gato"]},
{q:"Rice",a:"Arroz",o:["Arroz","Pan","Gato","Sol"]},
{q:"Fish",a:"Pescado",o:["Pescado","Pan","Agua","Gato"]},
{q:"Bread",a:"Pan",o:["Pan","Agua","Gato","Sol"]}
];

let i = 0;
let xp = 0;

function load(){

    if(i >= quiz.length){

        localStorage.setItem("last_xp", xp);

        /* 🏆 BADGE CONDITION */
        if(xp >= 80){
            addBadge("quiz_master");
        }

        document.getElementById("q").innerHTML =
        `Finished! Total XP: ${xp}`;

        document.getElementById("opt").innerHTML = "";

        setTimeout(()=>{
            window.location.href = "homepage.html";
        },1500);

        return;
    }

    let d = quiz[i];

    document.getElementById("q").innerText = d.q;
    document.getElementById("opt").innerHTML = "";

    d.o.forEach(o=>{
        document.getElementById("opt").innerHTML +=
        `<button onclick="check(this,'${o}')">${o}</button>`;
    });
}

function check(btn,ans){

    let correct = quiz[i].a;

    let ok = document.getElementById("correctSound");
    let no = document.getElementById("wrongSound");

    if(ans === correct){

        btn.classList.add("correct");
        ok.play();

        xp += 10;
        document.getElementById("xp").innerText = xp;

        i++;
        setTimeout(load,500);

    }else{

        btn.classList.add("wrong");
        no.play();

        setTimeout(()=>btn.classList.remove("wrong"),400);
    }
}

function go(page){
    window.location.href = page;
}



const words = ["Hello","Hola","Bonjour","Hi","こんにちは","안녕하세요"];
const bg = document.getElementById("bg");

for(let x=0;x<40;x++){
    let s = document.createElement("span");
    s.className="word";
    s.innerText = words[Math.floor(Math.random()*words.length)];
    s.style.left = Math.random()*100+"%";
    s.style.fontSize = (14+Math.random()*20)+"px";
    s.style.animationDuration = (10+Math.random()*15)+"s";
    bg.appendChild(s);
}

load();