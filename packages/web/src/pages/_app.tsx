import { AppProps } from 'next/app'

import { AppProvider } from '~/context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} key={router.route} />
    </AppProvider>
  )
}

export default MyApp
