import * as React from "react";
import Head from "next/head";

export interface IPageHeadProps {
  title: string,
}

export default function PageHead(props: IPageHeadProps) {
  return (
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
  );
}
