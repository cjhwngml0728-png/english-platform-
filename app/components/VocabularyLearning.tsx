'use client'

import { useState, useEffect } from 'react'

interface Word {
  id: number
  word: string
  meaning: string
  koreanMeaning: string
  pronunciation: string
  example: string
  koreanExample: string
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
    word: "Happy",
    meaning: "Feeling or showing pleasure or contentment",
    koreanMeaning: "행복한, 기쁜",
    pronunciation: "/ˈhæpi/",
    example: "I am very happy today because it's sunny.",
    koreanExample: "날씨가 좋아서 오늘 정말 행복해요.",
    difficulty: "Beginner"
  },
  {
    id: 2,
    word: "Friend",
    meaning: "A person you know well and like",
    koreanMeaning: "친구",
    pronunciation: "/frend/",
    example: "She is my best friend from school.",
    koreanExample: "그녀는 학교에서 만난 제 베스트 프렌드예요.",
    difficulty: "Beginner"
  },
  {
    id: 3,
    word: "Beautiful",
    meaning: "Pleasing to the senses or mind; attractive",
    koreanMeaning: "아름다운, 예쁜",
    pronunciation: "/ˈbjuːtɪfəl/",
    example: "The sunset was beautiful tonight.",
    koreanExample: "오늘 저녁 노을이 정말 아름다웠어요.",
    difficulty: "Beginner"
  },
  {
    id: 4,
    word: "Important",
    meaning: "Of great significance or value",
    koreanMeaning: "중요한",
    pronunciation: "/ɪmˈpɔːtənt/",
    example: "It is important to eat healthy food.",
    koreanExample: "건강한 음식을 먹는 것은 중요해요.",
    difficulty: "Beginner"
  },
  {
    id: 5,
    word: "Comfortable",
    meaning: "Providing physical ease and relaxation",
    koreanMeaning: "편안한",
    pronunciation: "/ˈkʌmftəbəl/",
    example: "This chair is very comfortable to sit in.",
    koreanExample: "이 의자는 앉기에 정말 편안해요.",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    word: "Interesting",
    meaning: "Arousing curiosity or attention",
    koreanMeaning: "흥미로운, 재미있는",
    pronunciation: "/ˈɪntrəstɪŋ/",
    example: "The movie was very interesting and fun.",
    koreanExample: "그 영화는 정말 흥미롭고 재미있었어요.",
    difficulty: "Beginner"
  },
  {
    id: 7,
    word: "Difficult",
    meaning: "Hard to do or understand",
    koreanMeaning: "어려운",
    pronunciation: "/ˈdɪfɪkəlt/",
    example: "Math can be difficult, but practice helps.",
    koreanExample: "수학은 어려울 수 있지만, 연습하면 도움이 돼요.",
    difficulty: "Beginner"
  },
  {
    id: 8,
    word: "Popular",
    meaning: "Liked or admired by many people",
    koreanMeaning: "인기 있는",
    pronunciation: "/ˈpɑːpjələr/",
    example: "This song is very popular right now.",
    koreanExample: "이 노래는 지금 정말 인기가 많아요.",
    difficulty: "Beginner"
  },
  {
    id: 9,
    word: "Delicious",
    meaning: "Highly pleasant to taste",
    koreanMeaning: "맛있는",
    pronunciation: "/dɪˈlɪʃəs/",
    example: "The cake was delicious and sweet.",
    koreanExample: "그 케이크는 맛있고 달콤했어요.",
    difficulty: "Beginner"
  },
  {
    id: 10,
    word: "Excited",
    meaning: "Feeling very enthusiastic and eager",
    koreanMeaning: "신나는, 들뜬",
    pronunciation: "/ɪkˈsaɪtɪd/",
    example: "I'm excited about the school trip tomorrow.",
    koreanExample: "내일 수학여행이 가서 정말 신나요.",
    difficulty: "Beginner"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 단어 학습 (Vocabulary Learning)</h2>
          <p className="text-gray-600">예문과 발음이 포함된 10개의 영어 단어를 배워보세요</p>
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
              <h4 className="font-semibold text-blue-900 mb-2">뜻 (Meaning):</h4>
              <p className="text-blue-800 font-semibold text-lg mb-1">{currentWord.koreanMeaning}</p>
              <p className="text-blue-700 text-sm">{currentWord.meaning}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">예문 (Example):</h4>
              <p className="text-green-800 italic mb-2">"{currentWord.example}"</p>
              <p className="text-green-700 text-sm">"{currentWord.koreanExample}"</p>
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
            ← 이전
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
            다음 →
          </button>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center mt-8">
          <button
            onClick={startQuiz}
            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            🎯 퀴즈 시작하기
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 단어 퀴즈 (Vocabulary Quiz)</h2>
          <p className="text-gray-600">방금 배운 단어들을 테스트해보세요</p>
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
            <p className="text-lg text-gray-600">이 단어의 뜻은 무엇일까요?</p>
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
              {currentQuizIndex === quizQuestions.length - 1 ? '퀴즈 완료' : '다음 문제'}
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 퀴즈 결과 (Quiz Results)</h2>
          <p className="text-gray-600">단어 퀴즈를 완료하셨습니다! 수고하셨어요!</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary-500 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-600">
              {quizQuestions.length}문제 중 {score}문제를 맞추셨어요!
            </div>
          </div>

          {/* Performance Message */}
          <div className="mb-6">
            {percentage >= 80 ? (
              <div className="text-green-600 text-lg font-semibold">
                🌟 훌륭해요! 단어를 정말 잘 이해하고 계시네요!
              </div>
            ) : percentage >= 60 ? (
              <div className="text-yellow-600 text-lg font-semibold">
                👍 잘했어요! 조금만 더 연습하면 완벽해질 거예요!
              </div>
            ) : (
              <div className="text-red-600 text-lg font-semibold">
                📚 계속 공부해요! 단어를 복습하고 다시 도전해보세요!
              </div>
            )}
          </div>

          {/* Detailed Results */}
          <div className="space-y-3 text-left">
            <h4 className="font-semibold text-gray-900 mb-3">상세 결과:</h4>
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
                  {userAnswers[index] === question.correctAnswer ? '✓ 정답' : '✗ 오답'}
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
            📚 단어 복습하기
          </button>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            🔄 다시 도전하기
          </button>
        </div>
      </div>
    )
  }

  return null
}
