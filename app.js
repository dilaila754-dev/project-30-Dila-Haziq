Object.keys(locationNames).forEach(key => {

  $("#start").append(
    `<option value="${key}">
      ${locationNames[key]}
    </option>`
  );

  $("#end").append(
    `<option value="${key}">
      ${locationNames[key]}
    </option>`
  );

});