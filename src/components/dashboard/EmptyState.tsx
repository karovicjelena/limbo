// src/components/dashboard/EmptyState.tsx
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  const emptyStateMessages = [
    "Your journey begins with the first entry...",
    "This page looks a bit empty. Time to fill it with your thoughts!",
    "The canvas is blank, waiting for your story.",
    "Ready to capture your first moment?",
    "No entries yet, but endless possibilities ahead."
  ];

  // Select a random message
  const randomMessage = emptyStateMessages[Math.floor(Math.random() * emptyStateMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-6">
        <PlusCircle className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No entries yet</h3>
      <p className="text-muted-foreground max-w-md mb-8">{randomMessage}</p>
      <Button asChild size="lg">
        <Link href="/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Your First Entry
        </Link>
      </Button>
    </div>
  );
}