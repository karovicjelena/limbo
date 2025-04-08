// src/app/page.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { format } from "date-fns";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [demoMood, setDemoMood] = useState('');
  const [demoContent, setDemoContent] = useState('');
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  // Array of mood options with emojis and labels
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

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignupPrompt(true);
  };

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
          
          <Card className="shadow-lg">
            <CardHeader className="text-lg font-medium">How are you feeling today?</CardHeader>
            <CardContent>
              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div className="space-y-3">
                  <ToggleGroup 
                    type="single" 
                    value={demoMood} 
                    onValueChange={setDemoMood}
                    className="flex flex-wrap gap-3 justify-center"
                  >
                    {moods.map((m) => (
                      <ToggleGroupItem 
                        key={m.value} 
                        value={m.value}
                        aria-label={m.label}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[90px] transition-all hover:scale-105"
                      >
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-xs text-center whitespace-normal">{m.label}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-base font-medium">What happened today?</h3>
                  <Textarea
                    value={demoContent}
                    onChange={(e) => setDemoContent(e.target.value)}
                    placeholder="Write about your day..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                >
                  Save Entry
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Signup Prompt Modal */}
          {showSignupPrompt && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4 py-4">
                    <Sparkles className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-bold">Ready to save your thoughts?</h3>
                    <p className="text-muted-foreground">
                      Create an account to save this entry and start tracking your journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button 
                        className="flex-1" 
                        onClick={() => router.push('/signup')}
                      >
                        Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowSignupPrompt(false)}
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
    </div>
  );
}