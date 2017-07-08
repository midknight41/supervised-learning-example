const { toolkit } = require("../bootstrap");

class TrainingService {

  constructor(broker) {
    this.broker_ = broker;
  }

  registerEvents() {
    this.broker_.on("training-required", (extractors) => this.execute(extractors));
  }

  execute(extractors) {

    console.log(`Training ${JSON.stringify(extractors)}`);

    const set = toolkit.buildFeatureExtractorSet(extractors);
    const trainer = toolkit.createTrainer();

    trainer.defineSource("./src/training/boys.json", "M");
    trainer.defineSource("./src/training/girls.json", "F");

    trainer.use(set);

    const classifier = trainer.createClassifier();

    this.broker_.emit("training-completed", extractors, classifier)
  }

}

exports.TrainingService = TrainingService;
