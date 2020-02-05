# npm-modules-report

`npm-modules-report` helps you to assemble specific information about npm modules inside your package.json in form of table and export it as xlsx file.

## Installing

Using npm:

```bash
$ npm install npm-modules-report
```

## Example #1

```js
const { getPackagesReport } = require("npm-modules-report");
const packageFile = require("./package.json");

const columns = ["name", "description", "version", "author"];

// it will create npm_report folder with report.xlsx inside
getPackagesReport(
  packageFile, // required
  columns // optional. default ['name', 'description']
).then(output => console.log(output)); // resolve data that has been exported
```

`report.xlsx` example. You can edit your report however you want in your favorite xlsx editor
![Preview](./preview.png)

## Example #2 via terminal

Just run

`npx build-npm-report`

or with columns names

`npx build-npm-report name description version`

Dependencies:

- [xlsx](https://www.npmjs.com/package/xlsx) - Parser and writer for various spreadsheet formats
