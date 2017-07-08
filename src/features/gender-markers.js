function create(modifier) {

  return function grabFirstLetters(tokens) {
    return checkForGenderMarkers(tokens, modifier);
  };

}

function checkForGenderMarkers(tokens) {

  const maleMarker = ["tian", "tien", "no"];
  const femaleMarker = ["na", "tte", "ty"];

  //TODO: find markers

  return [`bias-${number}:${beginning}`];

}

exports.create = create;
