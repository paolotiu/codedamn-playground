import { useEffect, useRef } from 'react';

export const useBroadcastChannel = (name: string) => {
  const bcRef = useRef<BroadcastChannel | null>(null);
  useEffect(() => {
    bcRef.current = new BroadcastChannel(name);
  }, [name]);

  return bcRef.current;
};
