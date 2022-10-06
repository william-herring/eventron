import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { Event } from "@prisma/client"
import NavigationBar from "../../components/NavigationBar"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const event = await prisma.event.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            community: {
                select: { title: true }
            }
        }
    })

    // @ts-ignore
    event.startDate = event.startDate.toDateString()
    // @ts-ignore
    event.endDate = event.endDate.toDateString()

    return { props: { event } }
}

const Account: NextPage<{ event: any | null }> = (props) => {
    const { data: session } = useSession()
    const [ tab, setTab ] = useState(0)

    return (
        <div>
            <Head>
                <title>{props.event?.title}</title>
            </Head>
            <NavigationBar active={5} />
            <div className='flex flex-col bottom-0 items-center justify-center h-screen w-screen bg-gray-100'>
                <div className='rounded-2xl p-12 shadow-lg bg-white'>
                    <div className='flex items-center'>
                        <svg width="20px" height="20px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280"><path d="M1 20v-1a7 7 0 017-7v0a7 7 0 017 7v1" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M13 14v0a5 5 0 015-5v0a5 5 0 015 5v.5" stroke="#6b7280" stroke-width="2" stroke-linecap="round"></path><path d="M8 12a4 4 0 100-8 4 4 0 000 8zM18 9a3 3 0 100-6 3 3 0 000 6z" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        <p className='text-gray-500 ml-2 text-sm'>{props.event.community != undefined? props.event.community.title : ''}</p>
                    </div>
                    <h1 className='font-bold text-2xl text-blue-700'>
                        {props.event.title}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Account