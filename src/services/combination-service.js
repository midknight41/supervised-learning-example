class CombinationService {

  constructor(broker) {
    this.broker_ = broker;
  }

  registerEvents() {
    //no listeners for this service
  }

  execute(sets) {

    this.broker_.emit("batch-started", sets);

    for (const set of sets) {
      this.broker_.emit("training-required", set.serialize());
    }

  }

}

exports.CombinationService = CombinationService;
