function applyTheme() {
    let mode = localStorage.getItem("theme") || "dark";

    document.body.classList.remove("dark", "light");
    document.body.classList.add(mode);
}

/* tukar theme */
function setTheme(mode) {
    localStorage.setItem("theme", mode);
    applyTheme();
}

/* auto apply bila page load */
document.addEventListener("DOMContentLoaded", applyTheme);

/* sync semua tab/page */
window.addEventListener("storage", (e) => {
    if (e.key === "theme") {
        applyTheme();
    }
});