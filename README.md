# npm-modules-report - creates xlsx report based on your packages.json file

npm-modules-report helps you to assemble all the information about npm modules inside your package.json and export it into xlsx sheet

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
  columns: ['author', 'name', 'description', 'license'] // optional. Default: ['name', 'description']
  outputFile: 'project-technologies.xlsx', // optional. Default: "packages.xlsx"
}


// it will create outputFile in the root of your project
getPackagesReport(
  packageFile, // required
  my_config // optional
)

```

## Example 2

```js
...

getPackagesReport(packageFile)
  .then((output) => console.log(output))
  /** returns data like
   * [
   *  ['name', 'description'],
   *  ['npm-modules-report', 'creates xlsx report based on your packages.json file']
   * ] **/

```

## NOTE: The process of export can take 1-2 minutes!

Dependencies:

- [child_process](https://nodejs.org/api/child_process.html) - nodejs native module
- [xlsx](https://www.npmjs.com/package/xlsx) - Parser and writer for various spreadsheet formats
