import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

const Document: React.FC = () => {
    return (
        <Html>
            <Head>
               <title>Eventron</title>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document