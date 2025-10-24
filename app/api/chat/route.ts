import { NextRequest, NextResponse } from 'next/server'
import anthropic from '@/lib/anthropic'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'placeholder-key') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI tutor is not configured. Please add ANTHROPIC_API_KEY to environment variables.' 
        },
        { status: 503 }
      )
    }

    const { message, conversationHistory } = await request.json()

    // English tutor system prompt
    const systemPrompt = `You are an experienced English tutor named Alex. Your role is to help students improve their English language skills through conversation and guidance. 

Key guidelines:
- Always respond in English
- Be encouraging, patient, and supportive
- Correct grammar mistakes gently and explain why
- Suggest vocabulary improvements when appropriate
- Ask follow-up questions to encourage conversation
- Provide examples when explaining concepts
- Adapt your language level to the student's proficiency
- Focus on practical, everyday English usage
- Encourage the student to practice speaking and writing

If the student makes mistakes, correct them in a friendly way and explain the correct usage. Always end your responses with a question or suggestion to keep the conversation flowing.`

    // Prepare messages for Claude
    const messages = [
      {
        role: 'user' as const,
        content: systemPrompt + '\n\nConversation history:\n' + conversationHistory.map((msg: any) => 
          `${msg.role}: ${msg.content}`
        ).join('\n') + '\n\nStudent message: ' + message
      }
    ]

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: messages,
    })

    const aiResponse = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ 
      success: true, 
      message: aiResponse 
    })

  } catch (error) {
    console.error('Claude API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get response from AI tutor. Please try again.' 
      },
      { status: 500 }
    )
  }
}
