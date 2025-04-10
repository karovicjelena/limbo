'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, LogOut, Home } from 'lucide-react';
import { format } from 'date-fns';
import { EmptyState } from '@/components/dashboard/EmptyState';

type Entry = {
  id: string;
  content: string;
  mood: string;
  created_at: string;
  ai_reflection: string | null;
};

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setEntries(data || []);
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const { error } = await supabase.from('entries').delete().eq('id', id);
      if (error) throw error;
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const renderMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      'happy': '🫨',
      'sad': '🧛🏾‍♀️',
      'angry': '🖕',
      'anxious': '🤯',
      'calm': '˚⊱🪷⊰˚',
      'excited': '💗',
      'tired': '🦦',
      'neutral': '🗿',
    };
    return moodMap[mood] || '📝';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Link href="/?view=landing" className="text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold">Welcome to Limbo</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.location.href = '/new'} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
            <Button onClick={signOut} variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-lg animate-pulse">Loading your journey...</p>
          </div>
        ) : entries.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        {entry.mood && renderMoodEmoji(entry.mood)}
                        <span>{format(new Date(entry.created_at), 'MMMM d, yyyy')}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(entry.created_at), 'h:mm a')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/edit/${entry.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 text-sm">{entry.content}</p>
                  {entry.ai_reflection && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-sm italic text-muted-foreground">
                        "{entry.ai_reflection}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}