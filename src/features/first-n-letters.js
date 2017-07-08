function create(modifier) {

  return function grabFirstLetters(tokens) {
    return grabFirst(tokens, modifier);
  };

}

function grabFirst(tokens, number) {

  const item = tokens[0].toLowerCase();

  if(item === undefined) return item;
  
  if (item.length < number) {
    return [item];
  }

  const beginning = item.substring(0, number);

  return [`first-${number}:${beginning}`];

}

exports.create = create;
