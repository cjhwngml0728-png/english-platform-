'use client'

import { useState } from 'react'
import StudyDashboard from './components/StudyDashboard'
import ChatArea from './components/ChatArea'
import VocabularyLearning from './components/VocabularyLearning'
import AITutorChat from './components/AITutorChat'
import MyPage from './components/MyPage'

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'vocabulary' | 'ai-tutor' | 'mypage'>('dashboard')
  // Disable authentication - allow access without login
  const user = { email: 'guest@example.com' } // Mock user for demo
  const loading = false
  const signOut = () => {}

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🗣️ English Learning Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  📚 Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('vocabulary')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'vocabulary'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  📖 Vocabulary
                </button>
                <button
                  onClick={() => setCurrentView('ai-tutor')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'ai-tutor'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  🤖 AI Tutor
                </button>
                <button
                  onClick={() => setCurrentView('chat')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'chat'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => setCurrentView('mypage')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'mypage'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  👤 My Page
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {currentView === 'dashboard' ? (
            <StudyDashboard />
          ) : currentView === 'vocabulary' ? (
            <VocabularyLearning />
          ) : currentView === 'ai-tutor' ? (
            <AITutorChat />
          ) : currentView === 'mypage' ? (
            <MyPage />
          ) : (
            <ChatArea />
          )}
        </div>
      </div>
    </main>
  )
}
