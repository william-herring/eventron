import type { NextPage } from 'next'
import ActionButton from "../components/buttons/ActionButton";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
      <div>
          <div className='flex p-4'>
              <Link href='/join'>
                  <a className='ml-auto font-semibold text-xl text-blue-700'>Join</a>
              </Link>
          </div>
          <h1 className='text-center font-bold text-5xl mt-3 tracking-wide'><p className='text-blue-700'>Eventron</p> is the app built for
              <p className='text-blue-700'>communities</p>
          </h1>
          <div className='w-screen flex items-center mt-10 flex-col text-center space-y-8'>
              <div className='flex space-x-5 text-3xl text-gray-500'>
                  <p>2500 Users</p>
                  <p>130 Groups</p>
                  <p>1200 Events</p>
              </div>
              <ActionButton glow={false}>Get started</ActionButton>
          </div>

          <div className='flex justify-center m-6 space-x-6'>
              <div className='opacity-60'>
                  <Image src='/event_card_demo_1.png' alt='A demonstration of an event card' width={305.6} height={370.56} />
              </div>
              <div>
                  <Image src='/event_card_demo.png' alt='A demonstration of an event card' width={381.999} height={463.2} />
              </div>
              <div className='opacity-60'>
                  <Image src='/event_card_demo_2.png' alt='A demonstration of an event card' width={305.6} height={370.56} />
              </div>
          </div>

          <div className='fixed p-4 h-1/3 bottom-0 w-screen'>
              <svg className='fixed bottom-0 right-0 m-4' width="26px" height="26px" viewBox="0 0 24 24" fill="none"><path d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
      </div>
  )
}

export default Home
