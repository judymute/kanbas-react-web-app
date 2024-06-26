import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import { useState, useEffect, useRef } from "react";
import "./index.css";
import "./course-color.css";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoCircle } from "react-icons/go";
import CourseColor from "./course-color";


function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, publishedCoursesCount, selectedColor,
  setSelectedColor }: {
    courses: any[]; // Courses data array
    course: any; // Current course object
    setCourse: (course: any) => void; // Function to update the current course
    addNewCourse: () => void; // Function to add a new course
    deleteCourse: (course: any) => void; // Function to delete a course
    updateCourse: (selectedColor: string) => Promise<void>; // Function to update a course
    publishedCoursesCount: number; // Count of published courses
    selectedColor: string; // Selected color state
    setSelectedColor: (color: string) => void; // Function to update selected color
  }) {

  const [showCircleIcon, setShowCircleIcon] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const courseColorRef = useRef<HTMLDivElement>(null);
  const toggleColorPicker = () => {
    setShowColorPicker((prevState) => !prevState);
  };
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleEllipsisClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowColorPicker(courseId === selectedCourseId ? !showColorPicker : true);
    setShowCircleIcon(true);
    setTimeout(() => {
      setShowCircleIcon(false);
    }, 300);
  };
  const handleUpdateCourse = () => {
    updateCourse(selectedColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const node = courseColorRef.current;

      if (
        selectedCourseId &&
        node &&
        !node.contains(event.target as Node)
      ) {
        setSelectedCourseId(null);
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedCourseId]);

  return (
    <div className="p-4 dashboard-container">


      {/* Form for adding/updating a course */}
      <div className="row">
        <div className="dashboard-header-container">
          <div className="dashboard-header">
            <span id="header">Dashboard</span>
            <div className="spacer"></div>
            <IoEllipsisVertical id="ellipsis-icon" />
          </div>
        </div>
        <h2 className="mb-3">Add/Update a Course</h2>
        <div className="col">
          <input value={course.name} className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} placeholder="Course Name" />
        </div>
        <div className="col">
          <input value={course.number} className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, number: e.target.value })} placeholder="Course Number" />
        </div>
      </div>

      {/* Input fields for start and end dates */}
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="startDateInput" className="form-label">
            Start Date
          </label>

          <input value={course.startDate} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })} id="startDateInput" />

        </div>
        <div className="col">
          <label className="form-label" htmlFor="endDateInput">
            End Date
          </label>
          <input value={course.endDate} className="form-control" type="date"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })} id="endDateInput" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            value={course.image}
            className="form-control mb-3"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
            placeholder="Image URL"
          />
        </div>
      </div>

      {/* Buttons for adding and updating courses */}
      <div className="row mb-3">
        <div className="col">
          {/* Button to invoke addNewCourse function */}
          <button onClick={addNewCourse} type="button" className="btn btn-success me-2">
            Add
          </button>
          {/* Button to invoke updateCourse function */}
          <button onClick={handleUpdateCourse} type="button" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>

      <div className="courses-container">
        {/* Section for displaying published courses */}
        <h2 className="published-courses-count">
          Published Courses ({publishedCoursesCount})</h2>
        <div className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4" id="custom-course-margin">
            {/* Mapping over courses array and rendering a card for each course */}
            {courses.map((course) => (
              <div key={course._id} className="col "
                style={{ width: 262, height: 265.992, paddingLeft: 0, paddingRight: 0, marginRight: 35 }}>

                <div className="card">
                  {selectedCourseId === course._id && (
                    <div className="color-picker-overlay">
                      <CourseColor
                        ref={courseColorRef}
                        setShowColorPicker={setShowColorPicker}
                        selectedCourseId={selectedCourseId}
                        setSelectedCourseId={setSelectedCourseId}
                        course={course}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        updateCourse={updateCourse} 
                      />
                    </div>
                  )}
                  {/* Link to the course details page */}
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                  <div className="card-img-container">
          <div className="card-img-overlay" style={{ backgroundColor: course.color }}></div>
          <img src={`/images/${course.image}`} className="card-img-top" />
        </div>
                  </Link>
                  <div className="ellipsis-icon-card-container">
                    <GoCircle className={`circle-icon ${showCircleIcon ? 'show-circle-icon' : ''}`} />
                    <IoEllipsisVertical className="ellipsis-icon-card" onClick={() => handleEllipsisClick(course._id)} />
                  </div>

                  <div className="card-body card-link">
                    {/* Link to the course details page */}
                    <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                      style={{ textDecoration: "none", color: course.color, fontWeight: "bold" }}>
                      {course.number} {course.name}

                    </Link>
                    <p className="card-text">{course.number}.{course._id}</p>

                    {/* Button to edit the course */}
                    <button onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }} type="button" className="btn btn-warning me-2">
                      Edit
                    </button>
                    {/* Button to delete the course */}
                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} type="button" className="btn btn-danger me-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
export default Dashboard;