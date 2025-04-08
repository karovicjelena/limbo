// src/components/landing/SampleEntries.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";

// Define types
type SampleEntry = {
  date: Date;
  mood: string;
  content: string;
  reflection?: string;
};

type Mood = {
  value: string;
  emoji: string;
  label: string;
};

interface SampleEntriesProps {
  entries: SampleEntry[];
  moods: Mood[];
}

export function SampleEntries({ entries, moods }: SampleEntriesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {entries.map((entry, index) => (
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
            {entry.reflection && (
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-sm italic text-muted-foreground">
                  "{entry.reflection}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}