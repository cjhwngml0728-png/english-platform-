# English Learning Platform

A modern English learning website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Homepage**: Clean landing page with authentication
- 🔐 **Authentication**: Secure login and signup system powered by Supabase
- 📚 **Study Dashboard**: Track learning progress with statistics and lesson management
- 📖 **Vocabulary Learning**: Interactive word learning with 10 advanced English words
- 🎯 **Quiz System**: Multiple-choice quizzes to test vocabulary knowledge
- 🤖 **AI English Tutor**: Personal AI tutor powered by Claude API for grammar and conversation help
- 💬 **Chat Practice**: Interactive English conversation practice with AI
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Optimized for all device sizes
- 🔒 **Protected Routes**: Secure access to authenticated features

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager
- Supabase account (free tier available)
- Anthropic API key for Claude AI tutor

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API in your Supabase dashboard
3. Copy your Project URL and anon public key
4. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Anthropic API Setup

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Add it to your `.env.local` file:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
english-platform/
├── app/
│   ├── components/
│   │   ├── LoginButton.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── StudyDashboard.tsx
│   │   ├── ChatArea.tsx
│   │   ├── VocabularyLearning.tsx
│   │   └── AITutorChat.tsx
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/
│   ├── supabase.ts
│   └── anthropic.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── .env.local (create this file)
```

## Features Overview

### Authentication
- Secure user registration and login
- Email verification for new accounts
- Session management with automatic logout
- Protected routes for authenticated users
- User profile display in header

### Homepage
- Welcome section with feature highlights
- Login/signup forms with validation
- Responsive design with gradient background

### Study Dashboard
- Progress statistics (completed lessons, streak, study time)
- Lesson list with progress tracking
- Quick action buttons for various learning activities
- Difficulty levels (Beginner, Intermediate, Advanced)

### Vocabulary Learning
- 10 carefully selected advanced English words
- Word definitions with pronunciation guides
- Example sentences for each word
- Difficulty levels (Beginner, Intermediate, Advanced)
- Interactive learning interface with progress tracking

### Quiz System
- Multiple-choice questions for vocabulary testing
- Random answer order to prevent memorization
- Real-time scoring and progress tracking
- Detailed results with correct/incorrect answers
- Performance feedback based on score percentage

### AI English Tutor
- Personal AI tutor named "Alex" powered by Claude API
- Grammar correction and explanation
- Vocabulary help and examples
- Conversation practice on any topic
- Writing tips and sentence structure guidance
- Adaptive language level based on student proficiency
- Encouraging and supportive teaching style

### Chat Practice
- Real-time conversation simulation
- Suggested conversation starters
- Typing indicators
- Conversation tips and guidance
- Mobile-friendly chat interface

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service for authentication and database
- **Claude API**: AI-powered English tutoring via Anthropic
- **React Hooks**: State management and side effects
- **React Context**: Global state management for authentication

## Development

To build for production:

```bash
npm run build
npm start
```

To run linting:

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
