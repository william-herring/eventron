import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import prisma from "../lib/prisma"
import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import ActionButton from "../components/buttons/ActionButton"
import { useState } from "react"
import Link from "next/link"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
        select: {
            events: {
                select: { title: true, organisers: true, id: true, startDate: true, endDate: true }
            }
        }
    })

    if (user?.events == undefined) {
        const events: { 
            title: string,
            id: string, 
            startDate: number, 
            organisers: string[],
            endDate: number }[] = []
        return { props: { events } }
    }

    const events = user?.events

    events.map(e => {
        // @ts-ignore
        e.startDate = e.startDate.getTime()
        // @ts-ignore
        e.endDate = e.endDate.getTime()
        var orgs: any[] = []
        e.organisers.forEach((o) => orgs.push(o.email))
        e.organisers = orgs
        
        return e
    } )

    return { props: { events } }
}

const Dashboard: NextPage<{ events: {
    title: string,
    id: string,
    organisers: string[],
    startDate: number, 
    endDate: number }[] 
}> = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [eventFilter, setEventFilter] = useState('upcoming')
    const [listView, setListView] = useState(false)
    let calendarObjs: { id: string; title: string; start: string; end: string }[] | undefined = []
    let organisedEvents: { id: string; title: string; start: string; end: string }[] = []

    const deregister = async (event: { id: string }) => {
        const res = await fetch(`../api/event/deregister?id=${event.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })

        if (res.status == 403) {
            alert('Cannot remove organiser registration')
        } else {
            router.reload()
        }
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

    props.events.forEach((e) => calendarObjs?.push({
        id: e.id,
        title: e.title,
        start: new Date(e.startDate).toISOString(),
        end: new Date(e.endDate).toISOString()
    }))

    props.events.forEach((e) => {
        if (e.organisers.includes(session.user?.email || ''))
        organisedEvents.push({
            id: e.id,
            title: e.title,
            start: new Date(e.startDate).toISOString(),
            end: new Date(e.endDate).toISOString()
        })
    })
  
    return (
        <div>
            <Head>
              <title>My Events</title>
              <style>
                {`
                    .dropdown {
                        position: relative;
                        display: inline-block;
                    }

                    .dropdown-content {
                        display: none;
                        position: absolute;
                        background-color: #f9f9f9;
                        min-width: 160px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        padding: 12px 16px;
                        z-index: 1;
                    }

                    .dropdown:hover .dropdown-content {
                        display: block;
                    }
                `}
            </style>
            </Head>
            <NavigationBar active={1} />
            <div className='p-6'>
                <div className='flex items-center mt-16'>
                    <div className='my-4 mr-4'>
                        <ActionButton glow={false} onClick={() => setListView(!listView)}>Switch to {listView? 'calendar' : 'list'} view</ActionButton>
                    </div>
                    <div className='dropdown text-gray-500'>
                        <span className='flex font-bold text-lg items-center hover:cursor-pointer'>
                            {eventFilter.charAt(0).toUpperCase() + eventFilter.slice(1)} events
                            <svg className='ml-1' width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 9l6 6 6-6" stroke="#6b7280" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </span>
                        <div className='dropdown-content rounded-b-lg'>
                            <button onClick={() => setEventFilter(eventFilter == 'upcoming'? 'organised' : 'upcoming')}>{eventFilter == 'upcoming'? 'Organised' : 'Upcoming'} events</button>
                        </div>
                    </div>
                </div>
                {listView? 
                    <div className='flex flex-col space-y-2'>
                        {eventFilter == 'organised'? organisedEvents.reverse().map((e) => <div className='text-gray-500 flex space-x-3 p-3 border-2 rounded-lg'>
                            <button onClick={() => deregister(e)}>
                                <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ef4444" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>
                            <Link href={`/event/${e.id}`}>
                                <a className='w-full'>
                                    <p className='font-semibold'>{e.title}</p>
                                    <p>{new Date(e.start).toLocaleDateString()}</p>
                                </a>
                            </Link>
                        </div>) : 
                        calendarObjs.reverse().map((e) => <div className='text-gray-500 flex space-x-3 p-3 border-2 rounded-lg'>
                            <button onClick={() => deregister(e)}>
                                <svg width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ef4444" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>
                            <Link href={`/event/${e.id}`}>
                                <a className='w-full'>
                                    <p className='font-semibold'>{e.title}</p>
                                    <p>{new Date(e.start).toLocaleDateString()}</p>
                                </a>
                            </Link>
                        </div>)}
                    </div> : 
                    <FullCalendar
                        plugins={[ timeGridPlugin ]}
                        initialView="timeGridWeek"
                        events={eventFilter == 'organised'? organisedEvents : calendarObjs}
                    />
                }
            </div>
        </div>
    )
  }
  
  export default Dashboard