import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '@styles/globals.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-black">
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
