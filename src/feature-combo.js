const { TestingService } = require("./services/testing-service");
const { TrainingService } = require("./services/training-service");
const { CombinationService } = require("./services/combination-service");
const { ReportingService } = require("./services/reporting-service");
const { bucket } = require("./small-features");

const { EventEmitter } = require("events");

const broker = new EventEmitter();

const testing = new TestingService(broker);
const training = new TrainingService(broker);
const combination = new CombinationService(broker);
const reporting = new ReportingService(broker);

for (const service of [reporting, testing, training, combination]) {
  service.registerEvents();
}

const sets = bucket.getFeatureExtractors();

combination.execute(sets);
