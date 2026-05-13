const words = ["Hello","Hola","Bonjour","こんにちは","안녕하세요","مرحبا","Learn","Speak"];
const container = document.getElementById("backgroundLanguage");

for(let i=0;i<30;i++){

    const span = document.createElement("span");
    span.className = "word";
    span.innerText = words[Math.floor(Math.random()*words.length)];
    span.style.left = Math.random()*100+"%";
    span.style.fontSize = (14+Math.random()*18)+"px";
    span.style.animationDuration = (10+Math.random()*20)+"s";

    container.appendChild(span);
}