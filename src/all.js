const fs = require("fs");

const { toolkit, extractors } = require("./bootstrap");

const set = toolkit.buildFeatureExtractor(extractors);
const trainer = toolkit.createTrainer();

trainer.train("./training/boys.json").as("M");
trainer.train("./training/girls.json").as("F");

trainer.use(set);

console.log("training...")
const classifier = trainer.execute();
console.log("...trained.")

classifier.save("./classifier.json");

const sentences = [
  "Chad",
  "Tara",
  "Evan",
  "Liriel",
  "Lirielle",
  "Mikey",
  "Michael",
  "Mike",
  "Tarun",
  "Elsa",
  "Anna",
  "Tim",
  "Nicky"
];

const results = [];

for (const sentence of sentences) {

  const result = {};

  result.name = sentence;
  result.gender = classifier.classify(sentence);

  const classifications = classifier.getClassifications(sentence);

  result.maleValue = classifications[0].value;
  result.femaleValue = classifications[1].value;

  results.push(result);

}

for (const result of results) {
  console.log(`${result.name}, ${result.gender}, ${result.maleValue}, ${result.femaleValue}`);
}

const tester = toolkit.createTester(classifier);

tester.data("./testing/boys.json").matches("M");
tester.data("./testing/girls.json").matches("F");

tester.use(set);

console.log("verifying...");
const result = tester.verify();

const totals = {
  group: 'TOTALS',
  successful: result[0].successful + result[1].successful,
  total: result[0].total + result[1].total
};

totals.percentage = totals.successful / totals.total;
result.push(totals);

fs.writeFileSync("./errors.json", JSON.stringify(result));

console.log("result", result);
