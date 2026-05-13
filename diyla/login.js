const form = document.getElementById("signUpForm");

if(form){

    form.addEventListener("submit", (e)=>{

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // GET SAVED USER
        const savedUser = JSON.parse(localStorage.getItem("user"));

        // CHECK ACCOUNT EXIST
        if(!savedUser){
            alert("Account belum sign up!");
            return;
        }

        // CHECK EMAIL
        if(email !== savedUser.email){
            alert("Email salah!");
            return;
        }

        // CHECK PASSWORD
        if(password !== savedUser.password){
            alert("Password salah!");
            return;
        }

        // =========================
        // SUCCESS LOGIN
        // =========================
        localStorage.setItem("is_logged_in", "true");

        // SAVE USERNAME
        if(savedUser.name){
            localStorage.setItem("username", savedUser.name);
        }

        alert("Login Berjaya!");

        window.location.href = "greet.html";
    });

}


// =========================
// TOGGLE PASSWORD
// =========================
const togglePass = document.getElementById("togglePass");

if(togglePass){

    togglePass.addEventListener("click", ()=>{

        const pass = document.getElementById("password");

        if(pass.type === "password"){

            pass.type = "text";

            togglePass.classList.remove("fa-eye");
            togglePass.classList.add("fa-eye-slash");

        }else{

            pass.type = "password";

            togglePass.classList.remove("fa-eye-slash");
            togglePass.classList.add("fa-eye");

        }

    });

}