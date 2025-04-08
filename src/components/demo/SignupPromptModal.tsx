// src/components/demo/SignupPromptModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SignupPromptModalProps {
  onClose: () => void;
}

export function SignupPromptModal({ onClose }: SignupPromptModalProps) {
  const router = useRouter();

  return (
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
                onClick={onClose}
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}