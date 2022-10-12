import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { Event } from "@prisma/client"
import NavigationBar from "../../components/NavigationBar"
import Image from "next/image"
import ActionButton from "../../components/buttons/ActionButton"
import { useRouter } from "next/router"

interface EventProps {
    id: string,
    organisers: { username: string }[],
    community: { title: string },
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    location: string,
    image: string,
    attendeeLimit: number,
    attendees: { username: string }[]
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const event = await prisma.event.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            community: {
                select: { title: true }
            },
            organisers: {
                select: { username: true }
            },
            attendees: {
                select: { username: true }
            }
        }
    })

    // @ts-ignore
    event.startDate = event.startDate.toLocaleDateString()
    // @ts-ignore
    event.endDate = event.endDate.toLocaleDateString()

    console.log(event)

    return { props: { event } }
}

const Account: NextPage<{ event: EventProps }> = (props) => {
    const { data: session, status } = useSession()
    const [ showDesc, setShowDesc ] = useState(false)
    const router = useRouter()
    const attendees = props.event.attendees.map(a => a.username)

    const register = async () => {
        const res = await fetch(`../api/event/register?id=${props.event.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

    const deregister = async () => {
        const res = await fetch(`../api/event/deregister?id=${props.event.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

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

    console.log(props.event.image)
    
    return (
        <div className='overflow-hidden'>
            <Head>
                <title>{props.event?.title}</title>
            </Head>
            <NavigationBar active={5} />
            <div className='flex bottom-0 items-center justify-center h-screen bg-gray-100'>
                <div className='rounded-2xl translate-y-10 p-12 shadow-lg bg-white'>
                    <div className='flex items-center'>
                        <svg width="20px" height="20px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280"><path d="M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M13 14v0a5 5 0 015-5v0a5 5 0 015 5v.5" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M8 12a4 4 0 100-8 4 4 0 000 8zM18 9a3 3 0 100-6 3 3 0 000 6z" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p className='text-gray-500 ml-2 text-sm'>{props.event.community != undefined? props.event.community.title : ''}</p>
                    </div>
                    <h1 className='font-bold text-2xl text-blue-700'>
                        {props.event.title}
                    </h1>
                    <Image src={props.event.image} width={80} height={52} />
                    <div className='flex mt-2 justify-center'>
                        {attendees.includes(session?.user?.name || '')? 
                            <ActionButton glow={false} onClick={deregister}><div className='flex justify-center'>Registered 
                            <svg width="24px" height="24px" stroke-width="1.96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="1.96" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></ActionButton>
                            :
                            <ActionButton glow={false} onClick={register}>Register {`(${props.event.attendees.length}/${props.event.attendeeLimit})`}</ActionButton>
                        }
                    </div>
                    {showDesc? <div className='w-80 my-2'>
                        <p className='text-gray-500 font-medium'>{props.event.description}</p>
                    </div> : <div className='my-2 space-y-1'>
                        <div className='flex'>
                            <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="#6b7280" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className='ml-2 text-gray-500 font-medium'>{props.event?.organisers.map((u) => u.username + (props.event.organisers.length > 1? ', ' : ''))}</p>
                        </div>
                        <div className='flex'>
                            <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#6b7280" stroke-width="2.04"></path><path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="#6b7280" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className='ml-2 text-gray-500 font-medium'>{props.event?.location}</p>
                        </div>
                        <div className='flex'>
                            <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280"><path d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9H3zM3 10V6a2 2 0 012-2h2M7 2v4M21 10V6a2 2 0 00-2-2h-.5" stroke="#6b7280" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            {props.event?.startDate == props.event?.endDate? <p className='ml-2 text-gray-500 font-medium'>{props.event?.startDate}</p> :
                            <p className='ml-2 text-gray-500 font-medium'>{props.event?.startDate} – {props.event?.endDate}</p>}
                        </div>
                    </div>}

                    <button className='font-semibold text-blue-700 w-full text-center' onClick={() => setShowDesc(!showDesc)}>{showDesc? 'Show details' : 'Show description'}</button>
                </div>
            </div>
        </div>
    )
}

export default Account