const { createFeatureExtractorBucket } = require("supervised-learning");
const firstFeature = require("./features/first-n-letters");
const lastFeature = require("./features/last-n-letters");
const countLetters = require("./features/letter-counts");
const vowelCounts = require("./features/vowel-counts");
const nGrams = require("./features/n-grams");
const phonetics = require("./features/phonetics");
const genderBias = require("./features/gender-markers");

const bucket = createFeatureExtractorBucket();

// bucket.add("first-n-feature", firstFeature, [1, 2]);
bucket.add("last-n-feature", lastFeature, [1, 3]);
// bucket.add("letter-counts", countLetters);
// bucket.add("vowel-counts", vowelCounts);
// bucket.add("n-grams", nGrams, [2, 3]);
// bucket.add("phonetics", phonetics);
// bucket.add("gender-bias", genderBias);

exports.bucket = bucket;
