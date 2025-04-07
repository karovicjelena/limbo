'use client';


import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isLoading } = useAuth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Limbo</h1>
        <p className="text-xl text-muted-foreground">A simple, soulful daily log app</p>
        
        <div className="flex flex-col gap-4 max-w-md text-center sm:text-left">
          <p className="text-base">
            Track your moods, capture your thoughts, and reflect on your journey.
          </p>
          <p className="text-sm text-muted-foreground">
            Create daily entries, select your mood, and watch your self-awareness grow over time.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {!isLoading && (
            user ? (
              <Button asChild className="rounded-full">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild className="rounded-full">
                  <Link href="/login">
                    Log In
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border border-solid">
                  <Link href="/login?signup=true">
                    Sign Up
                  </Link>
                </Button>
              </>
            )
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-muted-foreground">
          Made with love, not hustle
        </span>
      </footer>
    </div>
  );
}