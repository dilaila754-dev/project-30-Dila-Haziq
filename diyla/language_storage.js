/* =========================
   WEB STORAGE ONLY (LANGUAGE SAVE HELPERS)
   ADD ONL Y - DO NOT MODIFY EXISTING CODE
========================= */

function saveLanguage(lang){
    localStorage.setItem("userLanguage", lang);
}

function getLanguage(){
    return localStorage.getItem("userLanguage");
}