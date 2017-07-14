const _ = require("lodash");
const fs = require("fs");

class ReportingService {

  constructor(broker) {
    this.broker_ = broker;
    this.counter_ = 0;
    this.groupMap_ = new Map();
    this.groupMap_.set("M", []);
    this.groupMap_.set("F", []);
    this.groupCompare_ = new Map();
    this.start_ = null;
    this.finish_ = null;

  }

  registerEvents() {
    this.broker_.on("batch-started", sets => this.logBatchStart(sets));
    this.broker_.on("testing-completed", (extractors, results) => this.logTestComplete(extractors, results))
  }

  logBatchStart(sets) {
    console.log(`A batch of ${sets.length} was started`);
    this.start_ = Date();
    this.counter_ = sets.length;
  }

  logTestComplete(extractors, results) {
    this.counter_--;

    const extractorId = JSON.stringify(extractors);

    console.log(`Finished ${extractorId}`);
    console.log(`${this.counter_} remaining...`);

    const extractComparison = [];

    for (const { group, percentage, errors } of results) {

      const item = { extractors, group, percentage, errors };
      this.groupMap_.get(group).push(item);
      extractComparison.push(item);
    }

    this.groupCompare_.set(extractorId, extractComparison);

    if (this.counter_ <= 0) {

      console.log("batch completed");

      for (const group of this.groupMap_.keys()) {
        this.getTopTenEntries(group);
      }

      this.rankOverallResult();

      console.log("started", this.start_);
      console.log("finished", Date());

    }
  }

  rankOverallResult() {

    let overall = [];

    for (const item of this.groupCompare_) {

      const data = item[1];
      const key = item[0];

      const diff = Math.abs(data[0].percentage - data[1].percentage);
      const ranking = (data[0].percentage + data[1].percentage) / 2  - diff;

      overall.push({ ranking, diff, key, "M": data[0].percentage, "F": data[1].percentage });

    }

    overall = overall.sort((a, b) => {
      return b.ranking - a.ranking;
    });

    overall = overall.slice(0, 10);

    console.log("overall top result", overall);

    const topResult = this.groupCompare_.get(overall[0].key);

    console.log("writing error reports...");

    for (const { group, errors } of topResult) {

      fs.writeFileSync(`./results/${group}-errors.json`, JSON.stringify(errors));

    }

  }

  getTopTenEntries(group) {

    let sorted = this.groupMap_.get(group)
      .sort((a, b) => {
        if (a.percentage > b.percentage) return 1;
        if (a.percentage < b.percentage) return -1;
        if (a.percentage === b.percentage) return 0;
      });

    sorted = _.reverse(sorted).slice(0, 10);

    console.log(`top results for group ${group}`);

    for (const { extractors, percentage } of sorted) {
      console.log(JSON.stringify(extractors), percentage);
    }

  }

}

exports.ReportingService = ReportingService;
