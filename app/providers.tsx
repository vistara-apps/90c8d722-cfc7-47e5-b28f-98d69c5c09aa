'use client';

import { useEffect, useState } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';

// Make this component client-side only to avoid static generation issues
export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      chain={base as any}
    >
      {children}
    </OnchainKitProvider>
  );
}
