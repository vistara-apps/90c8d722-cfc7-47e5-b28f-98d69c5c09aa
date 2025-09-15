'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-red-600" size={32} />
        </div>
        
        <h2 className="text-display text-text mb-2">Something went wrong</h2>
        <p className="text-body mb-6">
          We encountered an unexpected error. Don't worry, your data is safe.
        </p>
        
        <button
          onClick={reset}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Try again
        </button>
        
        <p className="text-caption mt-4">
          If the problem persists, please refresh the page.
        </p>
      </div>
    </div>
  );
}
