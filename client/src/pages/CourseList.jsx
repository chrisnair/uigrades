import React, { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import SearchBar from "../components/SearchBar";
import CourseListItem from "../components/CourseListItem";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import CourseListNavbar from "../components/CourseListNavbar.jsx";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";
import { csvFiles } from "../data/CSVFiles.js";
import { useTheme } from "../context/ThemeContext.js";

import "../App.css";

const CourseList = () => {
  const [loading, setLoading] = useState(true); // Added loading state
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currSearchQuery, setCurrSearchQuery] = useState("");

  const pageSize = 9;
  const SERVER = 'http://localhost:8080/api' // idc about leaking this, this is all temp anyways

  const { isDarkMode, toggleTheme } = useTheme();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const parsedData = [];

  //     for (const file of csvFiles) {
  //       const response = await fetch(file);
  //       const text = await response.text();
  //       const result = await parseCSV(text);
  //       parsedData.push(...result.data);
  //       // iterate each row in result.data and add a course : section to the csv data
  //       // this is used to filter by semester and year later
  //       for (const row of result.data) {
  //         let course = row["SUBJECT_COURSE_SECTION"].slice(0, -5);
  //         let section = row["SUBJECT_COURSE_SECTION"].slice(-4);
  //         row["COURSE"] = course;
  //         row["SECTION"] = section;
  //       }
  //     }

  //     setData(parsedData);
  //     setFilteredData(parsedData);
  //     setTotalPages(Math.ceil(parsedData.length / pageSize));
  //     setLoading(false); // Set loading to false once data is fetched
  //   };

  //   fetchData();
  // }, []);
  // // help function to parse the csv text
  // const parseCSV = (text) => {
  //   return new Promise((resolve, reject) => {
  //     Papa.parse(text, {
  //       header: true,
  //       skipEmptyLines: true,
  //       complete: resolve,
  //       error: reject,
  //     });
  //   });
  // };

  useEffect(() => {
    const pageParam = new URLSearchParams(window.location.search).get("page");
    console.log(pageParam)
    const page = pageParam ? parseInt(pageParam) : 1;

    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const url = `/courses?page=${currentPage}${
      currSearchQuery ? "&q=" + currSearchQuery : ""
    }`;
    window.history.pushState({}, "", url);

    getCourses(currentPage, currSearchQuery);
  }, [currentPage, currSearchQuery]);

  const getCourses = async (page, q) => {
    const res = await fetch(`${SERVER}/courses?page=${page}&q=${q}`);
    const { data, totalItems } = await res.json();
    setData(data);
    setTotalPages(Math.ceil(totalItems / pageSize));
    setLoading(false);
  }

  /**
   * this is definitely where i started getting lost in my own code
   * TLDR: checks if there is a query in the url, if there is, set the search value to that query
   * then calls handleSearch to filter the courses based on the query
   */
  // useEffect(() => {
  //   // get the query from the url if it exists
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const query = urlParams.get("query");
  //   if (query) {
  //     handleSearch(query);
  //     setCurrSearchQuery(query); // Update the search query state
  //   } else {
  //     handleSearch("");
  //     setCurrSearchQuery(""); // If there is no query, set the search query state to empty
  //   }
  // }, [data, window.location.search]);

  // handles the search to filter courses based on user input
  const handleSearch = (query) => {
    setCurrSearchQuery(query); // if we've queried something before, but now we're searching for something else, we need to update the search query state
    const searchTerms = query.toLowerCase().split(" ");

    const filteredCourses = data.filter((course) => {
      const subject = course["SUBJECT_COURSE_SECTION"] || "";
      const instructor1 = course["PRIMARY_INSTRUCTOR_NAME"] || "";
      const title = course["COURSE_TITLE"] || "";
      const semester = course["SEMESTER"] || "";
      const year = course["YEAR"] || "";

      return searchTerms.every(
        (term) =>
          subject.toLowerCase().includes(term) ||
          instructor1.toLowerCase().includes(term) ||
          title.toLowerCase().includes(term) ||
          semester.toLowerCase().includes(term) ||
          year.toLowerCase().includes(term)
      );
    });

    setFilteredData(filteredCourses);
    setTotalPages(Math.ceil(filteredCourses.length / pageSize));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentResults = filteredData.slice(startIndex, endIndex);

  const navigate = useNavigate();

  // async function handleCourseClick(row) {
  //   // since the db can't accept strange characters such as +, we must convert the csv file symbols to words
  //   const modifiedRow = {
  //     ...row,
  //     Aplus: row["A_PLUS"],
  //     Aminus: row["A_MINUS"],
  //     Bplus: row["B_PLUS"],
  //     Bminus: row["B_MINUS"],
  //     Cplus: row["C_PLUS"],
  //     Cminus: row["C_MINUS"],
  //     Dplus: row["D_PLUS"],
  //     Dminus: row["D_MINUS"],
  //   };

  //   //append to the url the search query
  //   const url =
  //     currSearchQuery !== "" ? `/courses?query=${currSearchQuery}` : "/courses";
  //   window.history.pushState({}, "", url);

  //   /**
  //    * temporary solution to allow courses to be shared (this is terrible but it'll do the job)
  //    * store course info in the url and then redirect to the course page
  //    * this will allow each page to go through and linearly find the course in the csv files (essentially dropping the use of the db)
  //    */
  //   navigate(
  //     `/search/selected?result=${modifiedRow["SUBJECT_COURSE_SECTION"]}&semester=${modifiedRow["SEMESTER"]}&year=${modifiedRow["YEAR"]}`
  //   );
  // }

  const handleCourseClick = (id) => {
    console.log(id)
  }

  return (
    <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-list-dark" : "bg-list"
        } bg-cover bg-center bg-cover lg:bg-fixed`}
        style={{ zIndex: -1 }}
      ></div>
      <CourseListNavbar />
      <SearchBar
        handleSearch={handleSearch}
        setSearchQuery={setCurrSearchQuery}
        query={currSearchQuery}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center p-10 w-full min-h-full mt-32">
          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-2 w-full h-full">
              {data.map((course, index) => (
                <div
                  key={index}
                  onClick={() => handleCourseClick(course[0])}
                  className={`${
                    isDarkMode
                      ? "bg-zinc-600 hover:bg-zinc-500 text-stone-50"
                      : "hover:bg-white bg-stone-200"
                  } flex h-full w-full justify-between items-center rounded-md cursor-pointer rounded-xl transition duration-300 p-4`}
                >
                  <CourseListItem course={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
      />
      {data.length == 0 && !loading ? (
        <div
          className={`text-lg ${
            isDarkMode ? "text-zinc-300" : "text-zinc-700"
          } flex items-center justify-center flex-col text-center p-10`}
        >
          <p className="">No courses found 😥</p>
          <p className="">Did you spell it right?</p>
        </div>
      ) : (
        ""
      )}

      {!loading ? <Footer /> : null}
    </div>
  );
};

export default CourseList;
