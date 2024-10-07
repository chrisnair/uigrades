# UI Grades

![Landing Page](./client/public/static/images/landing.png)

UI Grades is a web application to view grade distributions of courses at UIowa. Visit the site at [uigrades.vercel.app](https://uigrades.vercel.app/).

Maintained by ACM @UIowa, developed by Liao Z. For code related  questions or concerns reach out to [liaozhu@uiowa.edu](mailto:liao-zhu@uiowa.edu) or current head of the project. For other concerns please reach out to the [Undergraduate Student Government](https://usg.uiowa.edu/) @ UIowa.

## Development

The frontend is built with TypeScript, utilizing a Node/Express server, and the DB being used is [Sql.js](https://github.com/sql-js/sql.js).
Frontend hosting is done through [Vercel](https://vercel.com/), backend is done through [Render](https://render.com/) and analytics are handled via [Google Analytics](https://marketingplatform.google.com/about/analytics/).

Necessary Libraries:

- [ReactJS](https://reactjs.org/)
- [ExpressJS](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [SqlJS](https://github.com/sql-js/sql.js)
- [ChartJS](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Fontawesome](https://fontawesome.com/)
- [Pandas](https://pandas.pydata.org/)

## Updating

When adding new data, go to [/db/data](./db/data/) and add the new `.csv` files. If changes are to be made to the [clean_data.py](./db/clean_data.py) script make sure you are in the root directory, then run:
```
cd db
source uigrades_virt/bin/activate
pip3 install -r requirements.txt
```
The script should now be able to run / be edited

## Adding New Data

1. First change the filename of the spreadsheet to "Semester_Year" format (not winter will overlap two years so do "Winter_Year1_Year2")
2. Save these spreadsheets as `.csv` filetypes and add them to [/db/data](./db/data/)
3. In the [/db](./db) directory, run the first part of [clean_data.py](./db/clean_data.py) (please see the comments in this file) using the command `python3 clean_data.py`, once it's been processed comment out the first part and run the second part by uncommenting it and running the file again
4. Once new data has been processed, start the database (see below) and changes should be reflected
5. Push changes to github, then wait a few minutes, the backend should reflect the changes on [Render](https://render.com/) automatically

## Running

To run the application, run the following commands in your terminal:

```
cd client
npm install
npm start
```

Then in a seperate terminal window (make sure you're in the `uigrades` directory not `client`):

```
cd db
npm install
node index.js
```

Open up [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Disclaimer

UIGrades is an objective data-based tool for students to visualize past semester courses’ grade distributions at the University of Iowa. If you’re using UIGrades to select classes to take, please use it in conjunction with MyUI. Grade distributions are not necessarily an indicator of course difficulty nor a reflection on the instructor or department rewarding those grades. There are several factors that determine the ultimate grade distribution of a course, difficulty being only one. Additionally, UIGrades is not a substitute for an advising appointment. Please see your designated academic advisor for questions about your proposed course schedule.
