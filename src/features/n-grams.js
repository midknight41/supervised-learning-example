const NGrams = require("natural").NGrams;

function create(modifier) {

  return function ngramFeature(tokens) {
    return createNGrams(tokens, modifier);
  };

}

function createNGrams(tokens, number) {

  const letters = tokens[0].toLowerCase().split("");

  const arrays = NGrams.ngrams(letters, number);
  const result = arrays.map(array => {
    return `ng-${number}:${array.join("")}`;
  });

  return result;

}

exports.create = create;
