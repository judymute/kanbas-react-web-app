import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import CourseNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import './index.css';
import breadcrumbArrowLight from './breadcrumb-arrow-light.svg';
import Quizzes from './Quizzes';
import QuizEditPage from './Quizzes/QuizEditPage';
import Questions from './Quizzes/Questions';
axios.defaults.withCredentials = true

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
  const { courseId } = useParams();
  console.log("Courses component: courseId =", courseId);
  const request = axios.create({ withCredentials: true });
  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: '' });
  const [quizName, setQuizName] = useState('Unnamed Quiz');

  const findCourseById = async (courseId?: string) => {
    try {
      const response = await request.get(`${COURSES_API}/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Course with ID ${courseId} not found.`);
      } else {
        console.error('Failed to fetch course:', error);
      }
    }
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  const url = window.location.href;
  const term = url.split('/');
  const courseName = term[term.length - 2];
  const currentLocation = term[term.length - 1];

  return (
    <div className="course-container">
      <div className="course-name-container">
        <h3 className="course-name">
          <GrMenu className="breadcrumb-icon" />
          {course.number}.{courseName}
          <img src={breadcrumbArrowLight} alt="Arrow" className="angle-icon" />
          {currentLocation === 'edit' ? (
            <>
              <MdOutlineKeyboardArrowRight className="angle-icon" />
              Quizzes
              <MdOutlineKeyboardArrowRight className="angle-icon" />
              {quizName}
            </>
          ) : (
            <span className="current-nav-location">{currentLocation}</span>
          )}
        </h3>
      </div>
      <div className="d-flex">
        <CourseNavigation />
        <div className="overflow-y-scroll" style={{ left: '320px', top: '50px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId/edit/*" element={<QuizEditPage quizName={quizName} setQuizName={setQuizName} />} />
            {/* <Route path="Quizzes/:quizId/edit/questions/*" element={<Questions />} /> */}
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;