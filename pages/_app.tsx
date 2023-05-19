import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { trpc } from "../lib/trpc/util-trpc";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps, session: any) {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps}/>
        </SessionProvider>
    );
}

export default trpc.withTRPC(App);
