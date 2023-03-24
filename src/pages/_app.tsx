import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import mantineCache from '@/mantineCache';
import { ThirdwebProvider } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      emotionCache={mantineCache}
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        defaultRadius: 10,
        components: {
          Container: {
            defaultProps: {
              size: 'lg',
            },
          },
        },
      }}
    >
      <ThirdwebProvider activeChain="binance">
        <Component {...pageProps} />
      </ThirdwebProvider>
    </MantineProvider>
  );
}
