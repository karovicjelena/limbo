// src/components/landing/Timeline.tsx
import { format, addDays, subDays } from "date-fns";

// Define the types
type TimelineEntry = {
  date: Date;
  mood: string;
};

type Mood = {
  value: string;
  emoji: string;
  label: string;
};

interface TimelineProps {
  moods: Mood[];
}

export function Timeline({ moods }: TimelineProps) {
  // Generate a sample week timeline centered around today
  const today = new Date();
  const timelineEntries: TimelineEntry[] = [
    { date: subDays(today, 6), mood: 'sad' },
    { date: subDays(today, 5), mood: 'anxious' },
    { date: subDays(today, 4), mood: 'tired' },
    { date: subDays(today, 3), mood: 'neutral' },
    { date: subDays(today, 2), mood: 'calm' },
    { date: subDays(today, 1), mood: 'happy' },
    { date: today, mood: 'excited' },
    { date: addDays(today, 1), mood: 'neutral' },  // Future entry (planned)
  ];

  const getMoodEmoji = (moodValue: string) => {
    return moods.find(m => m.value === moodValue)?.emoji || '📝';
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        <div className="flex items-center mb-4">
          {timelineEntries.map((entry, index) => (
            <div key={index} className="flex flex-col items-center px-4 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${index === timelineEntries.length - 2 ? 'ring-2 ring-primary' : ''}`}>
                <span className="text-xl">{getMoodEmoji(entry.mood)}</span>
              </div>
              <div className="h-0.5 w-full bg-border absolute top-4 -z-10"></div>
              <p className="text-xs font-medium mt-2">{format(entry.date, 'E')}</p>
              <p className="text-xs text-muted-foreground">{format(entry.date, 'd')}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-4">
        Track your moods and see patterns emerge over time
      </p>
    </div>
  );
}