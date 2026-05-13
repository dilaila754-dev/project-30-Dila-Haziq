// =========================
// CORE INITIALIZATION FILE
// =========================

$(document).ready(function () {

  console.log("IKM Lumut Smart Map Loaded");

  // Ensure auth screen is visible on start
  $("#authPage").show();

  // Reset sidebar state
  $("#sidebar").removeClass("active");

  // Default UI mode safety check
  if (
    !$("body").hasClass("dark") &&
    !$("body").hasClass("light")
  ) {
    $("body").addClass("dark");
  }

  // Pre-check saved data existence
  if (!localStorage.getItem("ikmSaved")) {
    localStorage.setItem("ikmSaved", JSON.stringify([]));
  }

});