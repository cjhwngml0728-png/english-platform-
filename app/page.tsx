'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LoginButton from './components/LoginButton'
import StudyDashboard from './components/StudyDashboard'
import ChatArea from './components/ChatArea'
import VocabularyLearning from './components/VocabularyLearning'
import AITutorChat from './components/AITutorChat'

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'vocabulary' | 'ai-tutor'>('dashboard')
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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
              {user ? (
                <>
                  <nav className="flex space-x-4">
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === 'dashboard'
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      📚 Study Dashboard
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
                      💬 Chat Practice
                    </button>
                  </nav>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <LoginButton onLogin={() => {}} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Welcome to Your English Learning Journey! 🚀
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Practice English conversations, track your progress, and improve your language skills with our interactive platform.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">Study Materials</h3>
                  <p className="text-gray-600">Access comprehensive learning resources and track your progress.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4">📖</div>
                  <h3 className="text-xl font-semibold mb-2">Vocabulary Learning</h3>
                  <p className="text-gray-600">Learn advanced English words with interactive quizzes and examples.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold mb-2">AI English Tutor</h3>
                  <p className="text-gray-600">Chat with Alex, your personal AI tutor powered by Claude.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-xl font-semibold mb-2">Chat Practice</h3>
                  <p className="text-gray-600">Practice English conversations with AI-powered chat.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {currentView === 'dashboard' ? (
              <StudyDashboard />
            ) : currentView === 'vocabulary' ? (
              <VocabularyLearning />
            ) : currentView === 'ai-tutor' ? (
              <AITutorChat />
            ) : (
              <ChatArea />
            )}
          </div>
        )}
      </div>
    </main>
  )
}
