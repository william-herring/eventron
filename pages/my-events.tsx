import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import prisma from "../lib/prisma"
import { Event } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession()
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
        select: {
            events: {
                select: { title: true, startDate: true, endDate: true }
            }
        }
    })

    var events = user?.events.map(e => {
        return {
            title: e.title,
            startDate: e.startDate.getTime(),
            endDate: e.startDate.getTime()
        }
    } )

    console.log(events == undefined);

    return { props: { events } };
}

const Dashboard: NextPage<{ events: { 
    title: string, 
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
            <div className='flex flex-col w-screen items center justify-center'>
                {props.events.map((e) => <p>{e.title}</p>)}
            </div>
        </div>
    )
  }
  
  export default Dashboard