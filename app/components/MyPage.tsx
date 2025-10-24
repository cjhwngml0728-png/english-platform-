'use client'

import { useState } from 'react'

export default function MyPage() {
  const [userProfile] = useState({
    name: 'English Learner',
    email: 'learner@example.com',
    level: 'Beginner',
    joinDate: 'October 2024',
    totalStudyTime: '4.5 hours',
    completedLessons: 3,
    streak: 2,
    badges: ['🌟 First Step', '📚 Word Master']
  })

  const [achievements] = useState([
    { id: 1, icon: '🎯', title: 'First Lesson', description: 'Complete your first lesson', unlocked: true },
    { id: 2, icon: '📖', title: 'Vocabulary Pro', description: 'Learn 10 new words', unlocked: true },
    { id: 3, icon: '🔥', title: '2-Day Streak', description: 'Study for 2 days in a row', unlocked: true },
    { id: 4, icon: '⭐', title: '5-Day Streak', description: 'Study for 5 days in a row', unlocked: false },
    { id: 5, icon: '💎', title: 'Perfect Score', description: 'Get 100% on a quiz', unlocked: false },
    { id: 6, icon: '🏆', title: 'Dedicated Learner', description: 'Complete 10 lessons', unlocked: false },
  ])

  const [recentActivity] = useState([
    { id: 1, activity: 'Completed "Basic Greetings"', time: '2 hours ago', icon: '✅' },
    { id: 2, activity: 'Scored 80% on Vocabulary Quiz', time: '1 day ago', icon: '📝' },
    { id: 3, activity: 'Learned 5 new words', time: '2 days ago', icon: '📖' },
    { id: 4, activity: 'Started "Common Words" lesson', time: '2 days ago', icon: '▶️' },
  ])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">👤 My Page</h2>
        <p className="text-gray-600">View your profile and learning progress</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{userProfile.name}</h3>
            <p className="text-blue-100">{userProfile.email}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {userProfile.level}
              </span>
              <span className="text-sm">Member since {userProfile.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-gray-900">{userProfile.totalStudyTime}</div>
          <div className="text-gray-600">Total Study Time</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-gray-900">{userProfile.completedLessons} Lessons</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-gray-900">{userProfile.streak} Days</div>
          <div className="text-gray-600">Current Streak</div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">🏅 My Badges</h3>
        <div className="flex flex-wrap gap-3">
          {userProfile.badges.map((badge, index) => (
            <div
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-lg font-medium shadow-lg"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">🏆 Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <div className="text-green-500 text-xl">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">📊 Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.activity}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">⚙️ Settings</h3>
        <div className="space-y-3">
          <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium">Edit Profile</div>
            <div className="text-sm text-gray-600">Update your name and email</div>
          </button>
          <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium">Change Learning Level</div>
            <div className="text-sm text-gray-600">Adjust difficulty to match your skills</div>
          </button>
          <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="font-medium">Notifications</div>
            <div className="text-sm text-gray-600">Manage your study reminders</div>
          </button>
        </div>
      </div>
    </div>
  )
}
