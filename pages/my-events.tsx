import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import prisma from "../lib/prisma"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';

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
  
    return (
        <div>
            <Head>
              <title>My Events</title>
            </Head>
            <NavigationBar active={1} />
            <div className='p-6'>
                <div className='mt-24'>
                    <h1></h1>
                </div>
                <FullCalendar
                    plugins={[ timeGridPlugin ]}
                    initialView="timeGridWeek"
                    events='https://fullcalendar.io/api/demo-feeds/events.json'
                />
            </div>
        </div>
    )
  }
  
  export default Dashboard