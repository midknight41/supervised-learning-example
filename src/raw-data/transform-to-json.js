const csvFilePath = "./yob2015.txt";
const csv = require("csvtojson");
const fs = require("fs");
const path = "training";
const minCount = 50;

const boys = [];
const girls = [];
const nameIndex = {};
let total = 0;
let removed = 0;
let discarded = 0;

csv({ noheader: true })
  .fromFile(csvFilePath)
  .on("csv", (data) => {

    const obj = {
      name: data[0],
      gender: data[1],
      count: Number.parseInt(data[2])
    };

    total += obj.count;

    if (obj.count < minCount) {

      removed += obj.count;
      return;
    }

    // Clean out cross-gender names
    if (!nameIndex[obj.name]) {
      nameIndex[obj.name] = obj;
      return;
    }

    if (obj.count > nameIndex[obj.name].count) {

      console.log(` The name "${obj.name}" will been classified as ${obj.gender}`);
      discarded += nameIndex[obj.name].count;

      nameIndex[obj.name] = obj;

    }

  })
  .on("done", (error) => {

    // Sort the good names by gender
    for (key of Reflect.ownKeys(nameIndex)) {
      const obj = nameIndex[key];


      if (obj.gender === "F") girls.push(obj.name);
      if (obj.gender === "M") boys.push(obj.name);

    }

    fs.writeFileSync(`./${path}/boys.json`, JSON.stringify({ sentences: boys }));
    fs.writeFileSync(`./${path}/girls.json`, JSON.stringify({ sentences: girls }));

    let insignificant = (removed / total) * 100;
    insignificant = Math.round(insignificant * 100) / 100;

    let confusing = (discarded / total) * 100;
    confusing = Math.round(confusing * 100) / 100;


    console.log("--------------------------------------------");
    console.log("Total:", total);
    console.log(`Discard as rare names: ${insignificant}%`);
    console.log(`Discarded as confusing gender: ${confusing}%`);
    console.log("--------------------------------------------");

  });
