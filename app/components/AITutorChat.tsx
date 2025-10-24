'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isTyping?: boolean
}

export default function AITutorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "안녕하세요! 저는 Alex, 여러분의 AI 영어 튜터입니다. 대화를 통해 영어 실력을 향상시킬 수 있도록 도와드릴게요. 오늘은 무엇에 대해 이야기하고 싶으신가요? 문법, 단어, 또는 일상 대화에 대해 질문하셔도 좋아요!",
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setError('')

    try {
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory: conversationHistory
        }),
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage: Message = {
          id: messages.length + 2,
          content: data.message,
          role: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        setError(data.error || 'Failed to get response from AI tutor')
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedTopics = [
    "취미에 대해 영어로 말하고 싶어요",
    "문법을 도와주세요",
    "날씨에 관한 영어 표현을 배우고 싶어요",
    "여행 관련 영어를 가르쳐주세요",
    "면접 질문 연습을 하고 싶어요"
  ]

  const handleSuggestedTopic = (topic: string) => {
    setInputMessage(topic)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        content: "Hello! I'm Alex, your AI English tutor. I'm here to help you improve your English through conversation. What would you like to talk about today? Feel free to ask me questions about grammar, vocabulary, or just have a casual conversation!",
        role: 'assistant',
        timestamp: new Date()
      }
    ])
    setError('')
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🤖 AI 영어 튜터</h2>
        <p className="text-gray-600">Alex와 함께 영어를 배워보세요</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-900 border shadow-sm'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      A
                    </div>
                    <span className="text-xs font-medium text-gray-500">Alex (AI Tutor)</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border px-4 py-3 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                    A
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Suggested Topics */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">💡 Suggested conversation starters:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedTopic(topic)}
                className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex space-x-2">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message in English..."
          className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Chat Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          💡 Alex will help you with grammar, vocabulary, and conversation practice
        </div>
        <button
          onClick={clearChat}
          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Tutor Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-1">🎓 Tutor Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Ask Alex to explain grammar rules or correct your mistakes</li>
          <li>• Request vocabulary explanations and examples</li>
          <li>• Practice conversation on any topic you're interested in</li>
          <li>• Ask for writing tips and sentence structure help</li>
        </ul>
      </div>
    </div>
  )
}
