import { useCallback, useRef } from 'react';

export const useIframe = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const refreshIframe = useCallback(() => {
    if (iframeRef.current?.src) {
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
  }, []);
  return { iframeRef, refreshIframe };
};
