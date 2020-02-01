const XLSX = require("xlsx");
const { exec } = require("child_process");

function getPackageInfo(packageName, tag) {
  return new Promise((res, rej) => {
    exec(`npm view ${packageName} ${tag}`, (error, stdout, stderr) => {
      if (error) {
        rej(error);
      }
      res(stdout);
    });
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

async function getPackagesReport(packageObj, config = {}) {
  try {
    if (!packageObj) {
      throw new Error(
        'getPackagesReport: "Please provide provide package.json object!'
      );
    }

    if (!packageObj.version) {
      throw new Error(
        'getPackagesReport: "It does not seem like npm package.json object'
      );
    }

    const {
      sheetName = "Packages",
      columns = ["name", "description"],
      outputFile = "packages.xlsx"
    } = config;

    const wb = XLSX.utils.book_new();
    const ws_name = sheetName;

    /* make worksheet */
    const ws_data = await getSheetData({ columns, packageObj });
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    XLSX.writeFile(wb, outputFile);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { getPackagesReport };
