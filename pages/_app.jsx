import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import '../styles/global.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
