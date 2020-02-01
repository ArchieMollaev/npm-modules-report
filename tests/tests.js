const { getPackagesReport } = require("../index");
const package = require("../package.json");

getPackagesReport(package).then(output => {
  console.log("output", output);
});
