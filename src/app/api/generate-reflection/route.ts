// src/app/api/generate-reflection/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { content, mood } = await request.json();
    
    if (!content || !mood) {
      return NextResponse.json(
        { error: 'Content and mood are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a thoughtful, poetic journal companion. Provide a short, meaningful reflection (maximum 2 sentences) based on the user's journal entry and mood. Be supportive, insightful, and slightly poetic. Don't be too formal or clinical."
        },
        {
          role: "user",
          content: `My journal entry: "${content}". My mood: ${mood}.`
        }
      ],
      max_tokens: 100,
    });

    const reflection = completion.choices[0].message.content?.trim();
    
    return NextResponse.json({ reflection });
  } catch (error) {
    console.error('Error generating reflection:', error);
    return NextResponse.json(
      { error: 'Failed to generate reflection' },
      { status: 500 }
    );
  }
}