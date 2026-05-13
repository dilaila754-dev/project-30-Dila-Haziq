let routeLine;

$("#routeBtn").click(function(){

  let start =
    $("#start").val();

  let end =
    $("#end").val();

  if(!start || !end){

    alert(
      "Please select locations"
    );

    return;

  }

  if(start === end){

    alert(
      "Locations cannot be the same"
    );

    return;

  }

  if(routeLine){

    map.removeLayer(routeLine);

  }

  routeLine = L.polyline(

    [locations[start],locations[end]],

    {
      color:"cyan",
      weight:5
    }

  ).addTo(map);

});