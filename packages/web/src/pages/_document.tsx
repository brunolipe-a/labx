import { ColorModeScript } from '@chakra-ui/core'

import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <title>Labx</title>
          <link
            rel="shortcut icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="shortcut apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#6C6CFF" />
          <link rel="stylesheet" href="/css/global.css"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript defaultColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
