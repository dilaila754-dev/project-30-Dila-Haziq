/* PASSWORD TOGGLE */

document
.getElementById("togglePass")
.onclick = () => {

const pass =
document.getElementById("password");

pass.type =
pass.type === "password"
? "text"
: "password";

};

/* FLOATING WORDS */

const words = [

"Hello",
"Hola",
"Bonjour",
"こんにちは",
"안녕하세요",
"مرحبا",
"Ciao",
"Hallo",
"Language",
"Learn",
"Speak",
"Translate",
"English",
"French",
"Spanish",
"Japanese"

];

const container =
document.getElementById("backgroundLanguage");

for(let i = 0; i < 50; i++){

const span =
document.createElement("span");

span.className = "word";

span.innerText =
words[Math.floor(Math.random() * words.length)];

span.style.left =
Math.random() * 100 + "%";

span.style.fontSize =
(18 + Math.random() * 35) + "px";

span.style.animationDuration =
(10 + Math.random() * 20) + "s";

span.style.animationDelay =
Math.random() * 10 + "s";

span.style.opacity =
0.15 + Math.random() * 0.4;

container.appendChild(span);

}

/* FORM */

document
.getElementById("signUpForm")
.addEventListener("submit",(e)=>{

e.preventDefault();

const password =
document.getElementById("password").value;

if(password.length < 8){

alert(
"Password mesti sekurang-kurangnya 8 aksara!"
);

return;

}

alert("Account Created!");

window.location.href =
"language.html";

});