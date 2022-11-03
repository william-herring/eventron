import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BuiltInProviderType } from 'next-auth/providers';

export const getServerSideProps: GetServerSideProps = async () => {
    return { props: { providers: await getProviders() } }
}

const Login: NextPage<{ providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> }> = (props) => {
  const { query } = useRouter()

  return (
    <div>
        <Head>
            <title>Log in to Eventron</title>
        </Head>

        <div className='flex w-screen items-center justify-center h-screen'>
            <div className='flex-col flex items-center text-center'>
                <h1 className='text-center font-bold text-4xl inline'>Log in to <p className='text-blue-700 inline'>Eventron</p></h1>
                <div className='p-6 space-y-2'>
                    <button className='flex flex-row items-center space-x-3 text-blue-700 text-xl font-medium' onClick={() => signIn(Object.values(props.providers)[0].id, {
                                callbackUrl: `/account-redirect?redirectUrl=${query.callbackUrl?.toString()}`,
                                })}>
                        <svg width="48px" height="48px" stroke-width="2.01" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M15.547 8.303A5.148 5.148 0 0012.11 7C9.287 7 7 9.239 7 12s2.287 5 5.109 5c3.47 0 4.751-2.57 4.891-4.583h-4.159" stroke="#1d4ed8" stroke-width="2.01"></path><path d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z" stroke="#1d4ed8" stroke-width="2.01" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p>Continue with Google</p>
                    </button>
                    <button className='flex flex-row items-center space-x-3 text-blue-700 text-xl font-medium' onClick={() => signIn(Object.values(props.providers)[1].id, {
                                callbackUrl: `/account-redirect?redirectUrl=${query.callbackUrl?.toString()}`,
                                })}>
                        <svg width="48px" height="48px" stroke-width="2.01" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M21 8v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z" stroke="#1d4ed8" stroke-width="2.01" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 21v-9c0-2.188.5-4 4-4M9 13h6" stroke="#1d4ed8" stroke-width="2.01" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p>Continue with Facebook</p>
                    </button>
                </div>
                <p className='text-gray-500 text-sm w-96'>We use OAuth providers like Google and Facebook instead of storing credentials to keep you safer.</p>
            </div>
        </div>

        <div className='fixed p-4 h-1/3 bottom-0 w-screen'>
              <Link href='https://github.com/william-herring/eventron'>
                  <a>
                      <svg className='fixed bottom-0 right-0 m-4' width="26px" height="26px" viewBox="0 0 24 24" fill="none"><path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
              </Link>
          </div>
    </div>
  )
}

export default Login