function create(modifier) {

  return function lastLettersFeature(tokens) {
    return grabLast(tokens, modifier);
  };

}

function grabLast(tokens, number) {

  const item = tokens[0].toLowerCase();

  if(item === undefined) return item;
  
  if (item.length < number) {
    return [item];
  }

  const ending = item.substring(item.length - number, item.length);

  return [`last-${number}:${ending}`];

}

exports.create = create;
