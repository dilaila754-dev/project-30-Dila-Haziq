$("#menuBtn").click(function(){

  $("#sidebar").toggleClass(
    "active"
  );

});

// MODE

$("#modeBtn").click(function(){

  $("body").toggleClass(
    "light dark"
  );

});