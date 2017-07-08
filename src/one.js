const { TestingService } = require("./services/testing-service");
const { TrainingService } = require("./services/training-service");
const { CombinationService } = require("./services/combination-service");
const { ReportingService } = require("./services/reporting-service");
const { toolkit } = require("./bootstrap");

const { EventEmitter } = require("events");

const broker = new EventEmitter()

const testing = new TestingService(broker);
const training = new TrainingService(broker);
const combination = new CombinationService(broker);
const reporting = new ReportingService(broker);

for (const service of [reporting, testing, training, combination]) {
  service.registerEvents();
}

const extractors = [
  { "name": "last-n-feature", "modifier": 1 }, { "name": "last-n-feature", "modifier": 3 }, { "name": "n-grams", "modifier": 3 }, { "name": "phonetics" }
];

const set = toolkit.buildFeatureExtractorSet(extractors);

combination.execute([set]);
