import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore'

const quizCore = new QuizCore()

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion())
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showScore, setShowScore] = useState(false)

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option)
  }

  const handleNextQuestion = (): void => {
    if (selectedAnswer === null) {
      alert('Please select an answer first.')
      return
    }

    quizCore.answerQuestion(selectedAnswer)

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion()
      setCurrentQuestion(quizCore.getCurrentQuestion())
      setSelectedAnswer(null)
    } else {
      setShowScore(true)
    }
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    )
  }

  if (currentQuestion === null) {
    return <p>No question available.</p>
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleNextQuestion}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  )
}

export default Quiz