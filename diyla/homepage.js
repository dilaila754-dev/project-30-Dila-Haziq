
function applyTheme(mode){
    document.body.classList.remove("dark","light");
    document.body.classList.add(mode);
}

let theme = localStorage.getItem("theme") || "dark";
applyTheme(theme);


window.addEventListener("storage", (e) => {
    if(e.key === "theme"){
        applyTheme(e.newValue || "dark");
    }
});



function getLang(){
    let lang = localStorage.getItem("userLanguage") || "en";

    const valid = ["en","es","fr","ja","ko","zh","ar","ms","de"];

    return valid.includes(lang) ? lang : "en";
}

let lang = getLang();

const langName = {
    en:"English", es:"Spanish", fr:"French", de:"German",
    ja:"Japanese", ko:"Korean", zh:"Chinese", ar:"Arabic", ms:"Malay"
};

// safe element check
let langBox = document.getElementById("langDisplay");
if(langBox){
    langBox.innerText = "Language: " + langName[lang];
}



const words = {
en:["Hello","Thank You","Apple","Water","School","Friend"],
es:["Hola","Gracias","Manzana","Agua","Escuela","Amigo"],
fr:["Bonjour","Merci","Pomme","Eau","École","Ami"],
de:["Hallo","Danke","Apfel","Wasser","Schule","Freund"],
ja:["こんにちは","ありがとう","学校","水","友達"],
ko:["안녕하세요","감사합니다","학교","물","친구"],
zh:["你好","谢谢","学校","水","朋友"],
ar:["مرحبا","شكرا","مدرسة","ماء","صديق"],
ms:["Helo","Terima kasih","Sekolah","Air","Kawan"]
};

const container = document.getElementById("backgroundLanguage");

if(container && container.childElementCount === 0){

    let list = words[lang] || words.en;

    for(let i=0;i<30;i++){
        const span = document.createElement("span");
        span.className = "word";
        span.innerText = list[Math.floor(Math.random()*list.length)];
        span.style.left = Math.random()*100+"%";
        span.style.fontSize = (14 + Math.random()*20)+"px";
        span.style.animationDuration = (10 + Math.random()*15)+"s";
        container.appendChild(span);
    }
}


const nodes = document.querySelectorAll(".node");

if(nodes){
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            let page = node.getAttribute("data-page");
            if(page){
                window.location.href = page;
            }
        });
    });
}



const icons = document.querySelectorAll(".footer i");

if(icons){
    icons.forEach(icon => {
        icon.addEventListener("click", () => {

            let page = icon.getAttribute("data-page");

            if(page){
                window.location.href = page;
            }

        });
    });
}