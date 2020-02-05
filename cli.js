#!/usr/bin/env node

const [, , ...args] = process.argv;

const { getPackagesReport } = require("./index");
const package = require("./package.json");
const columns = args.length ? args : ["name", "description"];

getPackagesReport(package, columns).then(output => {
  console.log("output", output);
});
