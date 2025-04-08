// src/components/demo/DemoEntryForm.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface DemoEntryFormProps {
  onSubmit: () => void;
}

export function DemoEntryForm({ onSubmit }: DemoEntryFormProps) {
  const [demoMood, setDemoMood] = useState('');
  const [demoContent, setDemoContent] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-lg font-medium">How are you feeling today?</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
  );
}