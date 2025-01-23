const fs = require("fs");
const csv = require("csv-parser");

function readCSVtoJSON(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        if (hasValidData(data)) {
          results.push(data);
        }
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

function hasValidData(row) {
  return Object.values(row).some((value) => value && value.trim());
}

module.exports = readCSVtoJSON;
