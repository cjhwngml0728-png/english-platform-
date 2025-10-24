'use client'

import { useState } from 'react'

export default function StudyDashboard() {
  const [studyStats] = useState({
    totalLessons: 24,
    completedLessons: 8,
    streak: 5,
    totalTime: 12.5
  })

  const lessons = [
    { id: 1, title: 'Basic Greetings', progress: 100, difficulty: 'Beginner' },
    { id: 2, title: 'Daily Conversations', progress: 80, difficulty: 'Beginner' },
    { id: 3, title: 'Shopping Vocabulary', progress: 60, difficulty: 'Intermediate' },
    { id: 4, title: 'Travel Phrases', progress: 40, difficulty: 'Intermediate' },
    { id: 5, title: 'Business English', progress: 20, difficulty: 'Advanced' },
    { id: 6, title: 'Academic Writing', progress: 0, difficulty: 'Advanced' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Study Dashboard</h2>
        <p className="text-gray-600">Track your learning progress and continue your English journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.completedLessons}</div>
          <div className="text-blue-100">Completed Lessons</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.streak}</div>
          <div className="text-green-100">Day Streak</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{studyStats.totalTime}h</div>
          <div className="text-purple-100">Study Time</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="text-2xl font-bold">{Math.round((studyStats.completedLessons / studyStats.totalLessons) * 100)}%</div>
          <div className="text-orange-100">Progress</div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📖 Available Lessons</h3>
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
                    <span className="text-sm text-gray-500">{lesson.progress}% Complete</span>
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
                    {lesson.progress === 0 ? 'Start' : lesson.progress === 100 ? 'Review' : 'Continue'}
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
          <h4 className="font-medium">Daily Challenge</h4>
          <p className="text-sm text-gray-600">Complete today's vocabulary challenge</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <div className="text-2xl mb-2">📝</div>
          <h4 className="font-medium">Grammar Quiz</h4>
          <p className="text-sm text-gray-600">Test your grammar knowledge</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow text-left">
          <div className="text-2xl mb-2">🎧</div>
          <h4 className="font-medium">Listening Practice</h4>
          <p className="text-sm text-gray-600">Improve your listening skills</p>
        </button>
      </div>
    </div>
  )
}
