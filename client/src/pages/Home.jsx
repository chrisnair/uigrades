import Footer from '../components/Footer.jsx'
import LandingNavbar from '../components/LandingNavbar.jsx'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext.js'
import "../App.css";

const Home = () => {

  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component renders
    document.title = `UIGrades`;
  }, []);

  return (
    <div className="min-h-screen flex flex-col z-10 relative justify-center items-center">
      <LandingNavbar />
      <div
        className={`absolute top-0 left-0 w-full h-full ${
          isDarkMode ? "bg-landing-dark" : "bg-landing"
        } bg-cover lg:bg-fixed bg-center`}
        style={{ zIndex: -1 }}
      ></div>
      <div className="h-full flex flex-col md:flex-row text-center items-center justify-center w-full">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="text-5xl md:text-7xl cursor-default text-zinc-700">
            <span className="text-yellow-400 font-bold hover:text-yellow-500 transition duration-200">
              UI
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              G
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              R
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              A
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              D
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              E
            </span>
            <span
              className={`${
                isDarkMode ? "text-zinc-200" : ""
              } hover:text-yellow-400 transition duration-200`}
            >
              S
            </span>{" "}
          </div>
          <h2
            className={`${
              isDarkMode ? "text-zinc-400" : ""
            } font-light text-stone-600 m-4`}
          >
            Explore courses that fellow{" "}
            <span className="text-yellow-400 hover:text-yellow-500 transition duration-200">
              Hawkeyes
            </span>{" "}
            have taken.
          </h2>
          <Link
            to="/courses"
            className="p-5 py-4 m-7 text-lg text-zinc-700 opacity-100 rounded-full bg-yellow-400 hover:bg-yellow-500 transition duration-300"
          >
            Browse Courses
          </Link>
        </div>
        <div className="hidden md:flex px-10 w-full flex-col items-center justify-center relative img-container h-40">
          {/* <DisplayBarGraph /> */}
          <img
            src="/static/images/uigrades0.png"
            alt="UI Grades"
            className="w-full md:w-3/4 rounded-lg landing-img absolute top-0 left-0 z-10"
            id="landing-img0"
          />
          <img
            src="/static/images/uigrades1.png"
            alt="UI Grades"
            className="w-full md:w-3/4 rounded-lg landing-img absolute bottom-2 right-10 z-0"
            id="landing-img1"
          />
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex md:hidden md:px-10 w-full flex-col items-center justify-center relative img-container">
        <img
          src="/static/images/mobile-landing.png"
          alt="UI Grades"
          className="w-full"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home