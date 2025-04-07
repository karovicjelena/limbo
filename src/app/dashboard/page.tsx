'use client';

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Limbo</h1>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Daily Log Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            This is where you'll see your past entries and create new ones.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-background rounded-lg p-4 border">
              <h3 className="font-medium mb-2">Create a New Entry</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Record your thoughts, feelings, and experiences from today.
              </p>
              <Button asChild>
                <Link href="/new">New Entry</Link>
              </Button>
            </div>
            
            <div className="bg-background rounded-lg p-4 border">
              <h3 className="font-medium mb-2">View Past Entries</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Look back at your journey and see how far you've come.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/entries">View All</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}