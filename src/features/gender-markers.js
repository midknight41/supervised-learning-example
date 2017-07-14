const _ = require("lodash");

function create(modifier) {

  return checkForGenderMarkers;

}

function checkForGenderMarkers(tokens) {

  const item = tokens[0].toLowerCase();

  const maleMarker = ["tian", "tien", "no"];
  const femaleMarker = ["na", "tte", "ty", "ra", "ya", "fy", "la"];

  for (const entry of maleMarker) {

    if (_.endsWith(item, entry)) {
      return ["bias:M"];
    }
  }

  for (const entry of femaleMarker) {
    if (_.endsWith(item, entry)) {
      return ["bias:F"];
    }
  }

  return [];

}

exports.create = create;
