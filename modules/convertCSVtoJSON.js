const fs = require("fs");
const csv = require("csv-parser");

/**
 * Reads a CSV file and converts it to a JSON array.
 * Rows with invalid or empty data will be ignored.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of valid JSON objects.
 */
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

/**
 * Checks if a given row contains valid data (non-empty values).
 * @param {Object} row - A row from the CSV file.
 * @returns {boolean} - Returns true if the row has valid data, otherwise false.
 */
function hasValidData(row) {
  return Object.values(row).some((value) => value && value.trim());
}

module.exports = readCSVtoJSON;
