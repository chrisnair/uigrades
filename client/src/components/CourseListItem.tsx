import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import React from 'react';

interface Course {
  id: number;
  SUBJECT_COURSE_SECTION: string;
  COURSE_TITLE: string;
  PRIMARY_INSTRUCTOR_NAME: string;
  A_PLUS: string;
  A: string;
  A_MINUS: string;
  B_PLUS: string;
  B: string;
  B_MINUS: string;
  C_PLUS: string;
  C: string;
  C_MINUS: string;
  D_PLUS: string;
  D: string;
  D_MINUS: string;
  F: string;
  WITHDRAWN: string;
  SEMESTER: string;
  YEAR: string;
  IS_NEW: number;
}

interface CourseListItemProps {
  course: Course
}

const CourseListItem: React.FC<CourseListItemProps> = ({course}) => {
  const [isNew, setIsNew] = useState(false);
  const [classTotal, setClassTotal] = useState(0);

    useEffect(() => {
      document.title = 'UIGrades | Course List';
      if (course[20] === 1) {
          setIsNew(true);
      }
      // index 4 - 17 contain all grades, we can sum these up to get the total number of students
      // index 4 - 8 contain new course grades
      if (course) {
        let total = 0;
        for (let i = 4; isNew ? i < 9 : i < 18; i++) {
          total += parseInt(course[i]) || 0;
        }
        setClassTotal(total);
      }
    }, [course, isNew]);

    return (
      <div className='flex justify-between items-center w-full text-zinc-300'>
        <div className={`flex justify-center items-start flex-col`}>
          <h1 className="font-bold text-primary">{course[1]} </h1>
            <h2 className="font-bold w-[200px] sm:w-full md:w-[150px] lg:w-[225px] xl:w-[350px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">
              {course[2]}
            </h2>
          <p className="max-w-[250px] truncate overflow-hidden whitespace-nowrap overflow-ellipsis">{course[3]}</p>
          <p className="">
            {course[18]} {course[19]}
          </p>
        </div>
        <p className="items-center flex gap-1">
          <FontAwesomeIcon icon={faUser} className="text-yellow-400 text-xl" />{" "}
          <span className="text-xl">{classTotal}</span>
        </p>
      </div>
    );
}

export default CourseListItem