(function () {
    let mode = localStorage.getItem("mode") || "dark";
    if(mode === "light"){
        document.body.classList.add("light");
    }else{
        document.body.classList.remove("light");
    }
})();

const wordsList = [
    "Hello","こんにちは","안녕하세요","你好","Bonjour","Hola","مرحبا",
    "Selamat Datang","Ciao","Hallo","Xin Chào","नमस्ते","Привет","Olá","สวัสดี",
    "Language","Speak","Learn","Translate","Education","English","Japanese",
    "Korean","Chinese","French","Spanish","Deutsch","Italiano"
];

const bgContainer = document.getElementById("backgroundLanguage");

if(bgContainer){
    for(let i=0;i<42;i++){
        const wordSpan = document.createElement("span");
        wordSpan.className="word";
        wordSpan.innerText=wordsList[Math.floor(Math.random()*wordsList.length)];
        wordSpan.style.left=Math.random()*100 + "%";
        wordSpan.style.fontSize=(12+Math.random()*24)+"px";
        wordSpan.style.animationDuration=(8+Math.random()*24)+"s";
        wordSpan.style.animationDelay=Math.random()*10+"s";
        bgContainer.appendChild(wordSpan);
    }
}

window.addEventListener("storage", (e)=>{
    if(e.key==="mode"){
        if(e.newValue==="light"){
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
    }
});