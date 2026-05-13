function getBadges(){
    return JSON.parse(localStorage.getItem("badges")) || [];
}

function saveBadges(badges){
    localStorage.setItem("badges", JSON.stringify(badges));
}

function addBadge(id){

    let badges = getBadges();

    if(!badges.includes(id)){
        badges.push(id);
        saveBadges(badges);
    }
}
/* =========================
   BADGE SYSTEM
========================= */

function getBadges(){
    return JSON.parse(localStorage.getItem("badges")) || [];
}

function saveBadges(badges){
    localStorage.setItem(
        "badges",
        JSON.stringify(badges)
    );
}

function unlockBadge(badgeId){

    let badges = getBadges();

    if(!badges.includes(badgeId)){

        badges.push(badgeId);

        saveBadges(badges);

        console.log("Unlocked:", badgeId);

        // sync realtime
        window.dispatchEvent(
            new StorageEvent("storage", {
                key:"badges"
            })
        );
    }
}