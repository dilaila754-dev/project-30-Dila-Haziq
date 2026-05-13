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

    if(e.key === "totalXP"){
        loadXP();
    }

    if(e.key === "badges"){
        loadBadgeCount();
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const profileImage =
    document.getElementById("profileImage");

    const savedImage =
    localStorage.getItem("profileImage");

    if(savedImage && profileImage){
        profileImage.src = savedImage;
    }

    const userData =
    JSON.parse(localStorage.getItem("user"));

    const profileName =
    document.querySelector(".profile h2");

    if(userData && profileName){

        profileName.innerText =
        userData.name || "Guest";
    }

    const streakBox =
    document.getElementById("streakCount");

    const streakData =
    JSON.parse(localStorage.getItem("streakData"));

    if(streakBox){

        streakBox.innerText =
        streakData ? streakData.streak : 0;
    }

    const langCode =
    localStorage.getItem("userLanguage");

    const langNameMap = {

        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        ja: "Japanese",
        ko: "Korean",
        zh: "Chinese",
        ar: "Arabic",
        ms: "Malay"

    };

    const langBox =
    document.getElementById("selectedLanguage");

    if(langBox){

        langBox.innerText =
        langNameMap[langCode] || "English";
    }

    loadXP();

    loadBadgeCount();

});

function loadXP(){

    const xpBox =
    document.getElementById("totalXP");

    const xp =
    parseInt(localStorage.getItem("totalXP")) || 0;

    if(xpBox){

        xpBox.innerText =
        xp >= 1000
        ? (xp/1000).toFixed(1) + "K"
        : xp;
    }
}

function loadBadgeCount(){

    const badgeBox =
    document.getElementById("badgeCount");

    const badges =
    JSON.parse(localStorage.getItem("badges")) || [];

    if(badgeBox){

        badgeBox.innerText =
        badges.length;
    }
}

const words = [

    "Hello","Hola","Bonjour",
    "Learn","Speak",
    "Roti","Nasi",
    "Susu","Apple"

];

const container =
document.getElementById("backgroundLanguage");

if(container && container.childElementCount === 0){

    for(let i=0;i<35;i++){

        const span =
        document.createElement("span");

        span.className = "word";

        span.innerText =
        words[Math.floor(Math.random()*words.length)];

        span.style.left =
        Math.random()*100+"%";

        span.style.fontSize =
        (14+Math.random()*20)+"px";

        span.style.animationDuration =
        (12+Math.random()*20)+"s";

        container.appendChild(span);
    }
}

function goPage(page){
    window.location.href = page;
}

const upload =
document.getElementById("profileUpload");

const profileImage =
document.getElementById("profileImage");

if(upload){

    upload.addEventListener("change", function(){

        const file = this.files[0];

        if(file){

            const reader =
            new FileReader();

            reader.onload = function(e){

                const imgData =
                e.target.result;

                if(profileImage){
                    profileImage.src = imgData;
                }

                localStorage.setItem(
                    "profileImage",
                    imgData
                );

            }

            reader.readAsDataURL(file);
        }

    });

}