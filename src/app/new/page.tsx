'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewEntryPage() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please write something about your day');
      return;
    }

    if (!user) {
      setError('You must be logged in to create an entry');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Generate AI reflection
      let aiReflection = null;
      try {
        const response = await fetch('/api/generate-reflection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content, mood }),
        });
        
        if (response.ok) {
          const data = await response.json();
          aiReflection = data.reflection;
        }
      } catch (err) {
        console.error('Error generating reflection:', err);
        // Continue even if reflection fails
      }

      // Insert the new entry into the database
      const { error } = await supabase.from('entries').insert({
        user_id: user.id,
        content,
        mood,
        ai_reflection: aiReflection,
      });

      if (error) throw error;
      
      // Redirect to the dashboard after successful submission
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create entry');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>New Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How are you feeling today?</h3>
                <ToggleGroup 
                  type="single" 
                  value={mood} 
                  onValueChange={setMood}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  {moods.map((m) => (
                    <ToggleGroupItem 
                      key={m.value} 
                      value={m.value}
                      aria-label={m.label}
                      className="flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-[90px]"
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-xs text-center whitespace-normal">{m.label}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">What happened today?</h3>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write about your day..."
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Entry'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}