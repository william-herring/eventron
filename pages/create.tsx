import { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import ActionButton from "../components/buttons/ActionButton"
import NavigationBar from "../components/NavigationBar"

const Create: NextPage = () => {
    const { data: session, status } = useSession()
    const [title, setTitle] = useState('New event')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('/placeholder.png')
    const [startDate, setStartDate] = useState('dd/mm/yyyy')
    const [endDate, setEndDate] = useState('dd/mm/yyy')
    const [startTime, setStartTime] = useState('03:00')
    const [endTime, setEndTime] = useState('21:00')
    const [community, setCommunity] = useState(1)
    const [organisers, setOrganisers] = useState([])
    const [location, setLocation] = useState('Virtual')
    const [attendeeLimit, setAttendeeLimit] = useState(15)
    const router = useRouter()

    if (status === "loading") {
        return <div className='flex w-screen h-screen justify-center items-center'>
                <Image width={80} height={80} src='/loading_spinner.svg' className='animate-spin' />
            </div>
    }

    if (status === "unauthenticated") {
        router.replace('/')
    }

    if (status != "authenticated") {
        return <div></div>
    }

    const submit = async () => {
        const data = {
            title: title,
            description: description,
            image: image || '/placeholder.png',
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            community: community || 1,
            organisers: organisers,
            location: location,
            attendeeLimit: attendeeLimit
        }

        const res = await fetch('../api/event/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        console.log(startTime, endTime)

        if (res.status != 200) {
            alert('Something went wrong')
            return
        }
        const obj = await res.json()
        await router.replace('/feed/' + obj['id'])
    }

    return (
        <div>
            <Head>
                <title>{title || 'New title'}</title>
            </Head>
            <NavigationBar active={5} />
            <div className='flex flex-col items-center h-screen w-screen justify-center text-center'>
                <div className='w-1/3 mt-96'>
                    <h1 className='font-bold text-4xl my-6 text-blue-700'>Create an Event</h1>
                    <form>
                        <input className='w-full text-xl p-3 mb-3 text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)} />
                        <input className='w-full text-xl p-3 mb-3 text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Location' 
                        onChange={(e) => setLocation(e.target.value)} />
                        <input className='w-full text-xl p-3 mb-3 text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Image URL' 
                        onChange={(e) => setImage(e.target.value)} />
                        <div className='flex mb-3'>
                            <input className='text-xl p-3 mb-3 w-full text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Start (yyyy/mm/dd)' 
                            onChange={(e) => setStartDate(e.target.value)} />
                            <input className='text-xl p-3 mb-3 w-full text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='End (yyyy/mm/dd)' 
                            onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className='flex mb-3'>
                            <input className='text-xl p-3 mb-3 w-full text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Start (hh:mm)' 
                            onChange={(e) => setStartTime(e.target.value)} />
                            <input className='text-xl p-3 mb-3 w-full text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='End (hh:mm)' 
                            onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                        <input className='w-full text-xl p-3 mb-3 text-gray-500 outline-0 border-b-2 border-gray-400 focus:border-blue-700 focus:caret-blue-700' type='text' placeholder='Attendee limit' 
                        onChange={(e) => setAttendeeLimit(parseInt(e.target.value))} />
                        <textarea className='w-full text-lg p-3 mb-3 text-gray-500 outline-0 border-dashed border-2 rounded-lg border-gray-400 focus:border-blue-700 focus:caret-blue-700 focus:border-solid' rows={4} placeholder='Description' 
                        onChange={(e) => setDescription(e.target.value)} />
                        <button className='flex items-center text-gray-500 text-xl mb-3 ml-2'>
                            <svg width="24px" height="24px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280"><path d="M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M13 14v0a5 5 0 015-5v0a5 5 0 015 5v.5" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M8 12a4 4 0 100-8 4 4 0 000 8zM18 9a3 3 0 100-6 3 3 0 000 6z" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className='ml-2 text-lg'>{community || 'Add community'}</p>
                        </button>
                        <button className='flex items-center text-gray-500 text-xl mb-3 ml-2'>
                            <svg width="24px" height="24px" stroke-width="1.96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M8 12a4 4 0 100-8 4 4 0 000 8z" stroke="#6b7280" stroke-width="1.96" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className='ml-2 text-lg'>{organisers.length == 0? 'Add organisers' : organisers}</p>
                        </button>
                        <ActionButton glow={false} onClick={submit}>Submit</ActionButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create