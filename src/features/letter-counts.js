function create(modifier) {

  return countLetters;

}
function countLetters(tokens) {

  const item = tokens[0].toLowerCase();
  const result = [];
  const letterIndex = {}

  for (let i = 0; i < item.length; i++) {

    if (letterIndex[item[i]] === undefined) {
      letterIndex[item[i]] = 1;
    } else {

      letterIndex[item[i]] = letterIndex[item[i]] + 1;
    }

  }

  for (const letter of Reflect.ownKeys(letterIndex)) {
    result.push(`${letter}:${letterIndex[letter]}`)
  }

  return result;
}

exports.create = create;
