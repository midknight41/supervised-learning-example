const { Metaphone } = require('natural');

function create(modifier) {
  return metaphoneFeature;
}

function metaphoneFeature(tokens) {

  const item = tokens[0].toLowerCase();

  return [`mp:${Metaphone.process(item)}`];
}

exports.create = create;
