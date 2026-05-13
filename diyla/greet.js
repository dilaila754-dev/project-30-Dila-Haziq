$(document).ready(function(){

let user =
JSON.parse(localStorage.getItem("user")) || {};

let username =
user.name || "Guest";

$("#userName").text(username);


function updateGreeting(){

let hour = new Date().getHours();
let greet = "Welcome";

if(hour < 12){
greet = "Good Morning ☀️";
}
else if(hour < 18){
greet = "Good Afternoon 🌤️";
}
else{
greet = "Good Evening 🌙";
}

$("#greet").text(`${greet}, ${username}`);
}

updateGreeting();
setInterval(updateGreeting, 60000);


function setProfile(img){

if(!img) return;

$("#userImg").attr("src", img);

user.profileImage = img;

localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("profileImage", img);

$(".icon-avatar").removeClass("active");

$(".icon-avatar").each(function(){

if($(this).attr("src") === img ||
$(this).data("img") === img){

$(this).addClass("active");
}
});
}


function loadProfile(){

let savedImg =
localStorage.getItem("profileImage");

if(savedImg){

$("#userImg").attr("src", savedImg);

$(".icon-avatar").each(function(){

if($(this).attr("src") === savedImg ||
$(this).data("img") === savedImg){

$(this).addClass("active");
}
});

}
}

loadProfile();


$(document).on("click",".icon-avatar",function(){

let img = $(this).attr("src");
setProfile(img);
});


$("#imgUpload").on("change",function(){

let file = this.files[0];
if(!file) return;

let reader = new FileReader();

reader.onload = function(e){

let imgData = e.target.result;

setProfile(imgData);

$(".icon-avatar").removeClass("active");

$(".avatar-options").append(`
<img src="${imgData}" class="icon-avatar active">
`);

};

reader.readAsDataURL(file);
});


function updateStreak(){

let today = new Date().toDateString();

let streakData =
JSON.parse(localStorage.getItem("streakData")) || {
streak:0,
lastLogin:""
};

if(!streakData.lastLogin){
streakData.streak = 1;
}
else{

let lastDate = new Date(streakData.lastLogin);
let currentDate = new Date(today);

let diffDays =
(currentDate - lastDate)/(1000*60*60*24);

if(diffDays === 1){
streakData.streak += 1;
}
else if(diffDays > 1){
streakData.streak = 1;
}
}

streakData.lastLogin = today;

localStorage.setItem(
"streakData",
JSON.stringify(streakData)
);
}

updateStreak();


function applyTheme(){

let theme =
localStorage.getItem("theme") || "dark";

$("body").toggleClass(
"light-mode",
theme === "light"
);
}

applyTheme();


window.addEventListener("storage",function(e){

if(e.key === "theme"){
applyTheme();
}

if(e.key === "profileImage"){

let updatedImg =
localStorage.getItem("profileImage");

$("#userImg").attr("src", updatedImg);

$(".icon-avatar").removeClass("active");

$(".icon-avatar").each(function(){

if($(this).attr("src") === updatedImg ||
$(this).data("img") === updatedImg){

$(this).addClass("active");
}
});
}

});


$("#startBtn").click(function(){
window.location.href = "language.html";
});


let words = [
"Hello","Hola","Bonjour",
"こんにちは","안녕하세요","مرحبا",
"Learn","Speak","Quiz",
"Study","English","French"
];

let container = $("#backgroundLanguage");

for(let i=0;i<40;i++){

let span = $("<span class='word'></span>");

span.text(words[Math.floor(Math.random()*words.length)]);

span.css({
left: Math.random()*100 + "%",
fontSize: (14 + Math.random()*25) + "px",
animationDuration: (10 + Math.random()*15) + "s",
animationDelay: Math.random()*5 + "s"
});

container.append(span);
}


function addBadge(id){

let badges =
JSON.parse(localStorage.getItem("badges")) || [];

if(!badges.includes(id)){
badges.push(id);
localStorage.setItem("badges", JSON.stringify(badges));
}
}


function checkStreak(){

let streak =
parseInt(localStorage.getItem("streak")) || 0;

if(streak >= 7){
addBadge("streak_7");
}

if(streak >= 30){
addBadge("streak_30");
}
}

checkStreak();

});