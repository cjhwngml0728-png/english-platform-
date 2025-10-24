'use client'

import { useState } from 'react'

export default function StudyDashboard() {
  const [studyStats] = useState({
    totalLessons: 12,
    completedLessons: 3,
    streak: 2,
    totalTime: 4.5
  })

  const lessons = [
    { id: 1, title: 'Basic Greetings', progress: 100, difficulty: 'Beginner' },
    { id: 2, title: 'Common Words', progress: 75, difficulty: 'Beginner' },
    { id: 3, title: 'Family Members', progress: 50, difficulty: 'Beginner' },
    { id: 4, title: 'Food & Drinks', progress: 25, difficulty: 'Beginner' },
    { id: 5, title: 'Colors & Numbers', progress: 0, difficulty: 'Beginner' },
    { id: 6, title: 'Daily Activities', progress: 0, difficulty: 'Beginner' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 학습 대시보드</h2>
        <p className="text-gray-600">학습 진행 상황을 확인하고 영어 공부를 계속하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.completedLessons}</div>
          <div className="text-blue-100">완료한 레슨</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.streak}</div>
          <div className="text-green-100">연속 학습일</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.totalTime}시간</div>
          <div className="text-purple-100">총 학습 시간</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{Math.round((studyStats.completedLessons / studyStats.totalLessons) * 100)}%</div>
          <div className="text-orange-100">진행률</div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📖 사용 가능한 레슨</h3>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{lesson.progress}% 완료</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white text-sm rounded-md hover:bg-primary-600 transition-colors">
                    {lesson.progress === 0 ? '시작하기' : lesson.progress === 100 ? '복습하기' : '계속하기'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-medium">오늘의 도전</h4>
          <p className="text-sm text-gray-600">오늘의 단어 챌린지를 완료하세요</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <div className="text-2xl mb-2">📝</div>
          <h4 className="font-medium">문법 퀴즈</h4>
          <p className="text-sm text-gray-600">문법 실력을 테스트해보세요</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <div className="text-2xl mb-2">🎧</div>
          <h4 className="font-medium">듣기 연습</h4>
          <p className="text-sm text-gray-600">듣기 실력을 향상시키세요</p>
        </button>
      </div>
    </div>
  )
}
