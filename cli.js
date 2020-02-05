#!/usr/bin/env node

const [, , ...args] = process.argv;

const generateReport = require("./index");
const package = require("../../package.json");
const columns = args.length ? args : ["name", "description"];

generateReport(package, columns);
