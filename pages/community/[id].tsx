import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import NavigationBar from "../../components/NavigationBar"
import Image from "next/image"
import ActionButton from "../../components/buttons/ActionButton"
import { useRouter } from "next/router"

interface CommunityProps {
    id: string,
    title: string,
    events: { title: string, id: string }[]
    members: { email: string, id: number }[]
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const community = await prisma.community.findUnique({
        where: {
            id: parseInt(String(params?.id)),
        },
        include: {
            events: {
                select: {
                    id: true,
                    title: true
                }
            },
            members: {
                select: {
                    email: true,
                    id: true,
                }
            }
        }
    })

    return { props: { community } }
}

const CommunityPage: NextPage<{ community: CommunityProps }> = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    // Join community function
    const joinCommunity = async () => {
        const res = await fetch(`../api/community/join?id=${props.community.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

    // Leave community function
    const leaveCommunity = async () => {
        const res = await fetch(`../api/community/leave?id=${props.community.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        })
        router.reload()
    }

    return (
        <div>
            <Head>
                <title>{props.community.title}</title>
            </Head>

            <NavigationBar active={8} />

            <div className='flex flex-col items-center justify-center h-screen w-screen text-center'>
                <div className='flex flex-col w-1/3 h-screen items-center justify-center'>
                    <h1 className='font-bold text-4xl mb-3 text-blue-700'>{props.community.title}</h1>
                    <p className='text-gray-500 text-xl font-medium mb-6'>{props.community.events.length || 0} Events, {props.community.members.length || 0} Members</p>
                    <div className='w-40'>
                        {session?.user?.email == undefined? null : !props.community.members.some(u => u.email === session?.user?.email)?
                            <ActionButton glow={false} onClick={joinCommunity}>
                                Join
                            </ActionButton> :
                            <ActionButton glow={true} onClick={leaveCommunity}>
                                Leave
                            </ActionButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPage