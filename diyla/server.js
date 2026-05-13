const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let rooms = {};

// =======================
// PAGE (HTML DALAM SERVER)
// =======================
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Unilingo Game</title>
<style>
body{
font-family:Arial;
text-align:center;
background:#0b1020;
color:white;
}
input,button,select{
padding:10px;
margin:5px;
border-radius:8px;
}
button{
background:#4caf50;
color:white;
border:none;
cursor:pointer;
}
#game{margin-top:20px;}
</style>
</head>
<body>

<h1>🌍 Unilingo Speaking Game</h1>

<input id="room" placeholder="Room ID">
<button onclick="createRoom()">Create</button>
button onclick="joinRoom()">Join</button>

<br><br>

<select id="lang">
<option value="en-US">English</option>
<option value="ms-MY">Malay</option>
</select>

<div id="game">
<h2 id="q">Press Start</h2>

<button onclick="startGame()">Start</button>
<button onclick="listen()">🔊 Listen</button>
<button onclick="speak()">🎤 Speak</button>

<p id="status"></p>

<h3>Scoreboard</h3>
<div id="board"></div>
</div>

<script src="/socket.io/socket.io.js"></script>
<script>
const socket = io();

let roomId = "";
let index = 0;

const questions = [
{q:"apple",a:"apple"},
{q:"rice",a:"rice"},
{q:"milk",a:"milk"},
{q:"water",a:"water"},
{q:"bread",a:"bread"},
{q:"fish",a:"fish"},
{q:"chicken",a:"chicken"},
{q:"banana",a:"banana"}
];

let answer = "";

// =================
// ROOM SYSTEM
// =================
function createRoom(){
roomId = document.getElementById("room").value;
socket.emit("createRoom",roomId);
}

function joinRoom(){
roomId = document.getElementById("room").value;
socket.emit("joinRoom",roomId);
}

// =================
// GAME
// =================
function startGame(){
showQ();
}

function showQ(){
if(index >= questions.length){
document.getElementById("q").innerText = "Game Over";
return;
}

answer = questions[index].a;
document.getElementById("q").innerText = questions[index].q;
}

// =================
// LISTEN AUDIO
// =================
function listen(){
let msg = new SpeechSynthesisUtterance(answer);
msg.lang = document.getElementById("lang").value;
speechSynthesis.speak(msg);
}

// =================
// SPEAK MIC
// =================
function speak(){
let rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
rec.lang = document.getElementById("lang").value;

rec.start();

rec.onresult = (e)=>{
let text = e.results[0][0].transcript.toLowerCase();

document.getElementById("status").innerText = "You said: " + text;

let correct = text.includes(answer);

socket.emit("answer",{roomId,correct});

if(correct){
index++;
showQ();
}
};
}

// =================
// SCOREBOARD
// =================
socket.on("roomUpdate",(data)=>{
let html = "";
for(let id in data.players){
html += "<p>"+id.slice(0,5)+" : "+data.players[id].score+"</p>";
}
document.getElementById("board").innerHTML = html;
});
</script>

</body>
</html>
`);
});

// =======================
// SOCKET SERVER
// =======================
io.on("connection",(socket)=>{

socket.on("createRoom",(roomId)=>{
socket.join(roomId);

rooms[roomId] = {players:{}};
rooms[roomId].players[socket.id] = {score:0};

io.to(roomId).emit("roomUpdate",rooms[roomId]);
});

socket.on("joinRoom",(roomId)=>{
socket.join(roomId);

if(!rooms[roomId]){
rooms[roomId] = {players:{}};
}

rooms[roomId].players[socket.id] = {score:0};

io.to(roomId).emit("roomUpdate",rooms[roomId]);
});

socket.on("answer",({roomId,correct})=>{
if(correct && rooms[roomId]){
rooms[roomId].players[socket.id].score += 10;
}

io.to(roomId).emit("roomUpdate",rooms[roomId]);
});

});

// =======================
// START SERVER
// =======================
server.listen(3000,()=>{
console.log("Server running: http://localhost:3000");
});