import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"

interface NavigationBarProps {
    active: number
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
    const { data: session } = useSession()

    return <div className='flex bg-white fixed z-10 w-screen p-4'>
        <div className="flex items-center space-x-8">
            <Link href='/dashboard'>
                <a className='flex items-center text-xl font-semibold rounded-full'>
                    <p className={props.active == 0? 'ml-2 text-blue-700 hover:text-blue-800' : 'ml-2 text-gray-500 hover:text-gray-600'}>Dashboard</p>
                </a>
            </Link>
            <Link href='/my-events'>
                <a className='flex items-center text-xl font-semibold rounded-full'>
                    <p className={props.active == 1? 'ml-2 text-blue-700 hover:text-blue-800' : 'ml-2 text-gray-500 hover:text-gray-600'}>My events</p>
                </a>
            </Link>
            <Link href='/explore'>
                <a className='flex items-center text-xl font-semibold rounded-full'>
                    <p className={props.active == 2? 'ml-2 text-blue-700 hover:text-blue-800' : 'ml-2 text-gray-500 hover:text-gray-600'}>Discover</p>
                </a>
            </Link>
        </div>
        <Link href={`/user/${session?.user?.name}`}>
            <a className='ml-auto'>
                <svg width="38px" height="38px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
        </Link>
    </div>
}

export default NavigationBar