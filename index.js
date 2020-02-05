const XLSX = require("xlsx");
const fs = require("fs");

function getPackageInfo(packageName, tag) {
  return new Promise((res, rej) => {
    fs.readFile(
      `./node_modules/${packageName}/package.json`,
      "utf-8",
      (err, data) => {
        if (err) {
          rej(err);
        }

        const parsedData = JSON.parse(data);
        res(parsedData[tag]);
      }
    );
  });
}

async function getSheetData({ columns, packageObj }) {
  const obj = {
    ...packageObj.dependencies,
    ...packageObj.devDependencies
  };

  const pkgsList = Object.keys(obj);
  const rows = [];

  for (let packageName of pkgsList) {
    const row = [];

    for (let colName of columns) {
      if (colName === "name") {
        row.push(packageName);
      } else {
        row.push(await getPackageInfo(packageName, colName));
      }
    }

    rows.push(row);
  }

  return [columns, ...rows];
}

function exportToXlsx(outputFile, wb) {
  return new Promise(resolve => {
    XLSX.writeFileAsync(outputFile, wb, resolve);
  });
}

async function getPackagesReport(
  packageObj,
  columns = ["name", "description"]
) {
  try {
    console.log(
      "\x1b[7m",
      "NPM-MODULE-REPORT: ...processing your package.json. Please wait!"
    );
    if (!packageObj) {
      throw new Error(
        'NPM-MODULE-REPORT: "Please provide provide package.json object!'
      );
    }

    if (!packageObj.version) {
      throw new Error(
        'NPM-MODULE-REPORT: "It does not seem like npm package.json object'
      );
    }

    const wb = XLSX.utils.book_new();
    const ws_name = "npm-report";

    /* make worksheet */
    const ws_data = await getSheetData({ columns, packageObj });
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    const dir = "./npm_report";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await exportToXlsx(`${dir}/report.xlsx`, wb);

    console.log("\x1b[32m", "NPM-MODULE-REPORT - done successfully");

    return ws_data;
  } catch (err) {
    console.log("\x1b[31m", err.message);
  }
}

module.exports = { getPackagesReport };
