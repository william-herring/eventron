import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default App
