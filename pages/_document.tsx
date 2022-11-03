import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

// Document template to avoid writing the same code over and over again

const Document: React.FC = () => {
    return (
        <Html>
            <Head>
                <link rel='icon' type="image/x-icon" href='/favicon.png'></link>
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}

export default Document