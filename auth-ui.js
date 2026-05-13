// LOGIN / SIGNUP SWITCH

$("#showSignup").click(function(){

  $("#loginBox").hide();

  $("#signupBox").fadeIn();

});

$("#showLogin").click(function(){

  $("#signupBox").hide();

  $("#loginBox").fadeIn();

});

// LOGIN

$("#loginBtn").click(function(){

  let username =
    $("#loginUser").val();

  let password =
    $("#loginPass").val();

  let savedUser =
    localStorage.getItem(
      "ikmUser"
    );

  let savedPass =
    localStorage.getItem(
      "ikmPass"
    );

  if(username === savedUser &&
     password === savedPass){

    $("#authPage").fadeOut();

  }

  else{

    $("#loginError").text(
      "Invalid username or password"
    );

  }

});

// SIGNUP

$("#signupBtn").click(function(){

  let user =
    $("#signupUser").val();

  let pass =
    $("#signupPass").val();

  if(user === "" || pass === ""){

    $("#signupError").text(
      "Please fill all fields"
    );

    return;

  }

  localStorage.setItem(
    "ikmUser",
    user
  );

  localStorage.setItem(
    "ikmPass",
    pass
  );

  alert(
    "Account created successfully"
  );

});

// LOGOUT

$("#logoutBtn").click(function(){

  $("#authPage").fadeIn();

  $("#sidebar").removeClass(
    "active"
  );

});