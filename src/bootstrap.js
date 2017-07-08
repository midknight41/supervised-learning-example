const { WordTokenizer, BayesClassifier } = require("natural");
const { createToolkit } = require("supervised-learning");
const { bucket } = require("./features");

// Classifier and Tokenizer could default
const opts = {
  bucket,
  itemSelector: "sentences"
};

const sets = bucket.getFeatureExtractors();

const toolkit = createToolkit(opts);

exports.toolkit = toolkit;
