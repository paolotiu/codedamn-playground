import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '@styles/globals.css';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
