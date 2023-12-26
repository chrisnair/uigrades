import CourseList from './pages/CourseList';
import Contact from './pages/Contact';
import About from './pages/About';
import CoursePage from './pages/CoursePage';
import ChangeLog from './pages/ChangeLog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound.jsx';
import Home from './pages/Home.jsx';
import ReactGA from 'react-ga4';

const App = () => {

  const TRACKING_ID = 'G-9NYXVBNR4G';
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({hitType: 'pageview', page: "/"});


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/course/*" element={<CoursePage />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/courses/*" element={<CourseList/>} />
        <Route path="/changelog" element={<ChangeLog/>} /> 
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
