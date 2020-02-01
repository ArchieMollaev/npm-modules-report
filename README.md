# npm-modules-report

`npm-modules-report` helps you to assemble specific information about npm modules inside your package.json in form of table and export it as xlsx file.

## Installing

Using npm:

```bash
$ npm install npm-modules-report
```

## Example

```js
const { getPackagesReport } = require("npm-modules-report");
const packageFile = require('./package.json');

const my_config = {
  sheetName: 'My packages report', // optional. Default: "Packages"
  columns: ['name', 'description', 'version', 'author'] // optional. Default: ['name', 'description']
  outputFile: 'project-technologies.xlsx', // optional. Default: "packages.xlsx"
}


// it will create project-technologies.xlsx in the root of your project
getPackagesReport(
  packageFile, // required
  my_config // optional
).then((output) => console.log(output)) // resolve data that has been exported

```

`project-technologies.xlsx` example. You can edit your report however you want in your favorite xlsx editor
![Preview](./preview.png)

## `NOTE`: The process of export can take 1-2 minutes!

Dependencies:

- [child_process](https://nodejs.org/api/child_process.html) - nodejs native module
- [xlsx](https://www.npmjs.com/package/xlsx) - Parser and writer for various spreadsheet formats
