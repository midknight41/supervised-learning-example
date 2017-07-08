const { toolkit } = require("../bootstrap");

class TestingService {

  constructor(broker) {
    this.broker_ = broker;
  }

  registerEvents() {
    this.broker_.on("training-completed", (extractors, classifier) => this.execute(extractors, classifier));
  }

  execute(extractors, classifier) {

    console.log(`Testing ${JSON.stringify(extractors)}`);

    const set = toolkit.buildFeatureExtractorSet(extractors);

    const tester = toolkit.createTester(classifier);

    tester.defineSource("./src/testing/boys.json", "M");
    tester.defineSource("./src/testing/girls.json", "F");

    tester.use(set);

    const result = tester.verify();

    this.broker_.emit("testing-completed", extractors, result)
  }

}

exports.TestingService = TestingService;
