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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx)
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
        select: {
            events: {
                select: { title: true, id: true, startDate: true, endDate: true }
            }
        }
    })

    if (user?.events == undefined) {
        const events: { 
            title: string,
            id: string, 
            startDate: number, 
            endDate: number }[] = []
        return { props: { events } }
    }

    const events = user?.events

    events.map(e => {
        // @ts-ignore
        e.startDate = e.startDate.getTime()
        // @ts-ignore
        e.endDate = e.endDate.getTime()

        return e
    } )

    return { props: { events } }
}

const Dashboard: NextPage<{ events: { 
    title: string,
    id: string,
    startDate: number, 
    endDate: number }[] 
}> = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    let calendarObjs: { id: string; title: string; start: string; end: string }[] | undefined = []

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

  
    return (
        <div>
            <Head>
              <title>My Events</title>
            </Head>
            <NavigationBar active={1} />
            <div className='p-6'>
                <div className='flex items-center mt-16'>
                    <div className='my-4 mr-4'>
                        <ActionButton glow={false} onClick={() => {}}>Switch to list view</ActionButton>
                    </div>
                    <button onClick={() => {}} className='text-lg flex items-center font-bold text-gray-500'>
                        Upcoming events
                        <svg className='ml-1' width="24px" height="24px" stroke-width="2.04" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 9l6 6 6-6" stroke="#6b7280" stroke-width="2.04" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                </div>
                <FullCalendar
                    plugins={[ timeGridPlugin ]}
                    initialView="timeGridWeek"
                    events={calendarObjs}
                />
            </div>
        </div>
    )
  }
  
  export default Dashboard