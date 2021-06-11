import { useBroadcastChannel } from '@utils/useBroadcastChannel';
import { useIframe } from '@utils/useIframe';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DetachedPage = () => {
  const router = useRouter();
  const { iframeRef, refreshIframe } = useIframe();
  const bc = useBroadcastChannel('playground');
  const { id } = router.query;

  useEffect(() => {
    if (bc) {
      bc.onmessage = (e) => {
        if (e.data === 'update') {
          refreshIframe();
        }
      };
    }
  }, [bc, refreshIframe]);

  if (!router.isReady) return null;

  return (
    <iframe
      ref={iframeRef}
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/playground/` + id}
      title="Playground"
      className="w-screen h-screen"
    >
      You need javascript to view this page
    </iframe>
  );
};

export default DetachedPage;
