// SAVE LOCATION

$("#saveBtn").click(function(){

  let name =
    $("#saveName").val();

  if(name === ""){

    alert(
      "Enter location name"
    );

    return;

  }

  let center =
    map.getCenter();

  let saved =
    JSON.parse(

      localStorage.getItem(
        "ikmSaved"
      )

    ) || [];

  saved.push({

    name:name,
    lat:center.lat,
    lng:center.lng

  });

  localStorage.setItem(

    "ikmSaved",

    JSON.stringify(saved)

  );

  $("#saveName").val("");

  loadSaved();

});

// LOAD SAVED

function loadSaved(){

  $("#savedList").html("");

  let saved =
    JSON.parse(

      localStorage.getItem(
        "ikmSaved"
      )

    ) || [];

  saved.forEach((item,index)=>{

    $("#savedList").append(`

      <div class="saved-item"
           data-index="${index}">

        ${item.name}

      </div>

    `);

  });

}

// CLICK SAVED

$(document).on(

  "click",

  ".saved-item",

  function(){

    let index =
      $(this).data("index");

    let saved =
      JSON.parse(

        localStorage.getItem(
          "ikmSaved"
        )

      ) || [];

    let loc =
      saved[index];

    map.setView(

      [loc.lat,loc.lng],

      19

    );

  }

);

// FIRST LOAD

loadSaved();