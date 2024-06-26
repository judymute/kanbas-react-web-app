import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import './QuizEdit.css';
import Questions from './Questions';
import QuizDetails from './QuizDetails';
import { Quiz } from './type';

interface QuizEditProps {
  quizName?: string;
  setQuizName?: (name: string) => void;
  addQuiz: (quiz: Quiz) => void;
}

export function QuizEdit({ quizName = 'Unnamed Quiz', setQuizName = () => {}, addQuiz }: QuizEditProps) {


  const { courseId, quizId } = useParams<{ courseId: string, quizId: string }>();
  console.log("QuizEdit component: quizId =", quizId);

  const [localQuizName, setLocalQuizName] = useState(quizName);
  console.log("QuizEdit component: Initial quizName =", quizName);
  const navigate = useNavigate();


  const handleQuizNameChange = (name: string) => {
    setLocalQuizName(name);
    setQuizName?.(name);

    console.log("QuizEdit component: Quiz name changed to", name);
  };
  const handleSave = () => {
    console.log("Saving quiz...");
    const newQuiz: Quiz = {
      id: quizId || '',
      name: localQuizName,
      assignmentGroup: 'Quizzes', // Provide the appropriate assignment group value
    };
    console.log("New Quiz being added:", newQuiz);
    addQuiz(newQuiz);
    console.log("Navigating back to Quizzes list");
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };
  
  const handleLinkClick = useCallback((tabName: string) => {
    console.log(`Attempting to navigate to ${tabName}`);
  }, []);

  useEffect(() => {
    console.log('QuizEdit: quizName prop:', quizName);
    console.log('QuizEdit: localQuizName state:', localQuizName);
  }, [quizName, localQuizName]);
  
  return (
    <div className="quiz-edit-container">
      <div className="quiz-details">
        <div className="quiz-info">
          <div>Points: 0</div>
          <div>Not Published</div>
        </div>
      </div>
      <div className="quiz-tabs">
        <Link to="details" className='tab' onClick={() => handleLinkClick('Details')}>Details</Link>
        <Link to="questions" className='tab' onClick={() => handleLinkClick('Questions')}>Questions</Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Unnamed Quiz"
          value={localQuizName}
          onChange={(e) => handleQuizNameChange(e.target.value)}
        />
      </div>

      <div className="quiz-details">
        <div className="quiz-info">
          <div>Points: 0</div>
          <div>Not Published</div>
        </div>
        <button
          className="save-button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Navigate replace to="details" />} />
        <Route path="details" element={<QuizDetails />} />
        <Route path="questions/*" element={<Questions />} />
        
      </Routes>
    </div>
  );
}
