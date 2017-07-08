function create(modifier) {

  return countLetters;

}

const vowels = ["a", "e", "i", "o", "u"];

function countLetters(tokens) {

  const item = tokens[0].toLowerCase();
  const result = [];
  let count = 0;

  for (let i = 0; i < item.length; i++) {

    const letter = item[i];

    if (vowels.indexOf(letter) > -1) {
      count++;
    }

  }

  return [`vowels:${count}`];
}

exports.create = create;
