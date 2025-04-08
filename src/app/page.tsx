// src/app/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { DemoEntryForm } from "@/components/demo/DemoEntryForm";
import { SignupPromptModal } from "@/components/demo/SignupPromptModal";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  // Array of mood options with emojis and labels - needed for rendering sample entries
  const moods = [
    { value: 'happy', emoji: '🫨', label: 'Delulu and Thriving' },         
    { value: 'sad', emoji: '🧛🏾‍♀️', label: 'Existential Dread' },        
    { value: 'angry', emoji: '🖕', label: 'Fuck it all' },                 
    { value: 'anxious', emoji: '🤯', label: 'Error 404: Sanity not found' }, 
    { value: 'calm', emoji: '˚⊱🪷⊰˚', label: 'Offline' },                 
    { value: 'excited', emoji: '💗', label: 'Wheeee!' },                  
    { value: 'tired', emoji: '🦦', label: 'Low battery Hoe' },            
    { value: 'neutral', emoji: '🗿', label: 'Meh' }                        
  ];

  // Sample entries for display
  const sampleEntries = [
    {
      date: new Date(2025, 3, 6),
      mood: 'excited',
      content: "Got the promotion today!! Team took me out for drinks after work. Still can't believe it's happening!",
    },
    {
      date: new Date(2025, 3, 7),
      mood: 'tired',
      content: "Back-to-back meetings all day. Need to learn to say no sometimes. At least I managed to squeeze in a quick walk at lunch.",
    },
    {
      date: new Date(2025, 3, 8),
      mood: 'calm',
      content: "Meditation session actually worked today. 10 minutes of peace before the chaos. Might make this a daily thing.",
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg animate-pulse">Finding your vibe...</p>
        </div>
      </div>
    );
  }

  // Render the actual landing page for non-logged-in users
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Limbo</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto">
          A simple, soulful daily log for your chaotic brain.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Try It Out</h2>
          <DemoEntryForm onSubmit={() => setShowSignupPrompt(true)} />
          {showSignupPrompt && <SignupPromptModal onClose={() => setShowSignupPrompt(false)} />}
        </div>
      </section>

      {/* Sample Entries Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Journey Visualized</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {sampleEntries.map((entry, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div>
                    <div className="flex items-center gap-2 font-semibold">
                      {entry.mood && moods.find(m => m.value === entry.mood)?.emoji}
                      <span>{format(entry.date, 'MMMM d, yyyy')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(entry.date, 'h:mm a')}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 text-sm">{entry.content}</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-sm italic text-muted-foreground">
                      "Remember that progress isn't always linear. Today's challenges are building tomorrow's strength."
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Log Your Day</h3>
              <p className="text-muted-foreground">
                Write about your experiences and select a mood that captures how you feel.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🪄</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get Reflections</h3>
              <p className="text-muted-foreground">
                Receive thoughtful AI-powered insights about your entries and moods.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Track Patterns</h3>
              <p className="text-muted-foreground">
                Watch your journey unfold as you build a collection of moments and memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
          Track your moods, capture your thoughts, and gain insights - all in one place.
        </p>
        <Button asChild size="lg">
          <Link href="/signup">Create Your Free Account</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground">
        <p>Made with love, not hustle</p>
      </footer>
    </div>
  );
}