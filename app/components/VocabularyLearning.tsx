'use client'

import { useState, useEffect } from 'react'

interface Word {
  id: number
  word: string
  meaning: string
  pronunciation: string
  example: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

interface QuizQuestion {
  id: number
  word: string
  correctAnswer: string
  options: string[]
}

const vocabularyWords: Word[] = [
  {
    id: 1,
    word: "Serendipity",
    meaning: "The occurrence of events by chance in a happy or beneficial way",
    pronunciation: "/ˌserənˈdipədē/",
    example: "Meeting my best friend was pure serendipity.",
    difficulty: "Advanced"
  },
  {
    id: 2,
    word: "Ubiquitous",
    meaning: "Present, appearing, or found everywhere",
    pronunciation: "/yo͞oˈbikwədəs/",
    example: "Smartphones have become ubiquitous in modern society.",
    difficulty: "Advanced"
  },
  {
    id: 3,
    word: "Eloquent",
    meaning: "Fluent or persuasive in speaking or writing",
    pronunciation: "/ˈeləkwənt/",
    example: "She gave an eloquent speech about environmental protection.",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    word: "Resilient",
    meaning: "Able to withstand or recover quickly from difficult conditions",
    pronunciation: "/rəˈzilyənt/",
    example: "Children are remarkably resilient and adapt quickly.",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    word: "Meticulous",
    meaning: "Showing great attention to detail; very careful and precise",
    pronunciation: "/məˈtikyələs/",
    example: "He was meticulous in his preparation for the exam.",
    difficulty: "Advanced"
  },
  {
    id: 6,
    word: "Optimistic",
    meaning: "Hopeful and confident about the future",
    pronunciation: "/ˌäptəˈmistik/",
    example: "Despite the challenges, she remained optimistic.",
    difficulty: "Beginner"
  },
  {
    id: 7,
    word: "Perseverance",
    meaning: "Persistence in doing something despite difficulty or delay",
    pronunciation: "/ˌpərsəˈvirəns/",
    example: "Success requires hard work and perseverance.",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    word: "Innovative",
    meaning: "Featuring new methods; advanced and original",
    pronunciation: "/ˈinəˌvātiv/",
    example: "The company is known for its innovative technology.",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    word: "Comprehensive",
    meaning: "Complete and including everything that is necessary",
    pronunciation: "/ˌkämprəˈhensiv/",
    example: "The report provides a comprehensive analysis of the situation.",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    word: "Sophisticated",
    meaning: "Developed to a high degree of complexity; refined",
    pronunciation: "/səˈfistəˌkādəd/",
    example: "The software uses sophisticated algorithms.",
    difficulty: "Advanced"
  }
]

export default function VocabularyLearning() {
  const [currentMode, setCurrentMode] = useState<'learn' | 'quiz' | 'results'>('learn')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Generate quiz questions
  const generateQuizQuestions = () => {
    const questions: QuizQuestion[] = vocabularyWords.map((word, index) => {
      // Get 3 random wrong answers
      const wrongAnswers = vocabularyWords
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.meaning)
      
      // Combine correct and wrong answers and shuffle
      const allOptions = [word.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5)
      
      return {
        id: word.id,
        word: word.word,
        correctAnswer: word.meaning,
        options: allOptions
      }
    })
    
    setQuizQuestions(questions)
  }

  const handleNextWord = () => {
    if (currentWordIndex < vocabularyWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    }
  }

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleQuizSubmit = () => {
    const newAnswers = [...userAnswers, selectedAnswer]
    setUserAnswers(newAnswers)
    
    if (selectedAnswer === quizQuestions[currentQuizIndex].correctAnswer) {
      setScore(score + 1)
    }
    
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setSelectedAnswer('')
    } else {
      setCurrentMode('results')
    }
  }

  const resetQuiz = () => {
    setCurrentQuizIndex(0)
    setSelectedAnswer('')
    setUserAnswers([])
    setScore(0)
    setShowResult(false)
    generateQuizQuestions()
  }

  const startQuiz = () => {
    generateQuizQuestions()
    setCurrentMode('quiz')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (currentMode === 'learn') {
    const currentWord = vocabularyWords[currentWordIndex]
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Vocabulary Learning</h2>
          <p className="text-gray-600">Learn 10 advanced English words with examples and pronunciation</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentWordIndex + 1) / vocabularyWords.length) * 100}%` }}
          ></div>
        </div>

        {/* Word Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentWord.difficulty)}`}>
                {currentWord.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {currentWordIndex + 1} of {vocabularyWords.length}
              </span>
            </div>
            
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{currentWord.word}</h3>
            <p className="text-lg text-gray-600 italic">{currentWord.pronunciation}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Meaning:</h4>
              <p className="text-blue-800">{currentWord.meaning}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Example:</h4>
              <p className="text-green-800 italic">"{currentWord.example}"</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={handlePrevWord}
            disabled={currentWordIndex === 0}
            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex space-x-2">
            {vocabularyWords.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWordIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentWordIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNextWord}
            disabled={currentWordIndex === vocabularyWords.length - 1}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center mt-8">
          <button
            onClick={startQuiz}
            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            🎯 Start Quiz
          </button>
        </div>
      </div>
    )
  }

  if (currentMode === 'quiz') {
    const currentQuestion = quizQuestions[currentQuizIndex]
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Vocabulary Quiz</h2>
          <p className="text-gray-600">Test your knowledge of the words you just learned</p>
        </div>

        {/* Progress */}
        <div className="bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-sm text-gray-500 mb-4 block">
              Question {currentQuizIndex + 1} of {quizQuestions.length}
            </span>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentQuestion.word}</h3>
            <p className="text-lg text-gray-600">What does this word mean?</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswer === option
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium text-gray-900">{option}</span>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleQuizSubmit}
              disabled={!selectedAnswer}
              className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuizIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentMode === 'results') {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Quiz Results</h2>
          <p className="text-gray-600">Great job completing the vocabulary quiz!</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-500 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-600">
              You scored {score} out of {quizQuestions.length} correct!
            </div>
          </div>

          {/* Performance Message */}
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="text-green-600 text-lg font-semibold">
                🌟 Excellent! You have a great understanding of these words!
              </div>
            ) : percentage >= 60 ? (
              <div className="text-yellow-600 text-lg font-semibold">
                👍 Good job! Keep practicing to improve further!
              </div>
            ) : (
              <div className="text-red-600 text-lg font-semibold">
                📚 Keep studying! Review the words and try again!
              </div>
            )}
          </div>

          {/* Detailed Results */}
          <div className="space-y-3 text-left">
            <h4 className="font-semibold text-gray-900 mb-3">Detailed Results:</h4>
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{question.word}</span>
                  <span className="text-gray-600 ml-2">- {question.correctAnswer}</span>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  userAnswers[index] === question.correctAnswer
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {userAnswers[index] === question.correctAnswer ? '✓ Correct' : '✗ Wrong'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCurrentMode('learn')}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            📚 Review Words
          </button>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return null
}
