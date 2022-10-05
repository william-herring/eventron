import Link from "next/link"

const SearchBar: React.FC = () => {
    return (
        <div className='flex'>
            <div className='border-gray-400 border-2 border-r-0 rounded-l-full p-5 pr-0'>
                <svg width="24px" height="24px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#a3a3a3"><path d="M15.5 15.5L19 19M5 11a6 6 0 1012 0 6 6 0 00-12 0z" stroke="#a3a3a3" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <input type='text' placeholder='Search Eventron' className='w-96 border-gray-400 border-2 border-x-0 p-4 focus:outline-none'>
            </input>
            <div className='border-gray-400 border-2 border-l-0 rounded-r-full p-4 pl-0'>
                <Link href='/search?q='>
                    <a>
                        <div className="bg-blue-600 rounded-full p-1 hover:bg-blue-700">
                            <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h12.5m0 0l-6-6m6 6l-6 6" stroke="#fff" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default SearchBar