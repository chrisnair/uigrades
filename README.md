# UI Grades

UI Grades is a web application to view grade distributions of courses at UIowa. Visit the site at [uigrades.vercel.app](https://uigrades.vercel.app/).

Based on UT Dallas Grades by [UTD Grades](https://utdgrades.com/). Maintained by ACM @UIowa

## Development

The frontend is built with ReactJS, the DB being used is [DexieJS](https://dexie.org/). By using Dexie, we avoid the need to use a backend server and instead use the browser's IndexedDB to store the data. Thus allowing us to host the application on GitHub Pages or any other static hosting service.

Necessary Libraries:

- [ReactJS](https://reactjs.org/)
- [PapaParse](https://www.papaparse.com/)
- [React Router](https://reactrouter.com/)
- [DexieJS](https://dexie.org/)
- [ChartJS](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/)

## Updating

To update the data, simply replace or add to the CSV files in the [data](/client/src/data/) folder with the same naming convention as follows: `Semester_YEAR.csv`.

Head to the [CSVFiles.js](/client/src/data/CSVFiles.js) file and add the csv file name to the imports.

## Running

To run the application, run the following commands in the root directory:

```
npm install
npm start
```

Open up [http://localhost:3000](http://localhost:3000) to view it in the browser.