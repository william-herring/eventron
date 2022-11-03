import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import NavigationBar from "../components/NavigationBar"
import SearchBar from "../components/SearchBar"
import prisma from "../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    // This query selects all the events from communities the user is a part of
    const result = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
        select: {
            communities: {
                select: {
                    id: true,
                    title: true,
                    events: {
                        select: {
                            id: true,
                            title: true,
                        }
                    }
                }
            }
        }
    })

    const communities = result?.communities

    console.log(communities)

    return { props: { communities } }
}

const Discover: NextPage<{
    communities: {
        id: number,
        title: string,
        events: {
            id: string,
            title: string
        }[]
    }[]
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

    console.log(props)
  
    return (
        <div>
            <Head>
              <title>Discover</title>
            </Head>
            <NavigationBar active={2} />
            <div className='flex flex-col items-center text-center'>
                <div className='flex flex-col mt-24 items-center space-y-3'>
                    <h1 className='font-semibold text-4xl'>Search for events, communities and users</h1>
                    <SearchBar />
                    {props.communities != undefined? props.communities.map(c => <div>
                        {c.events.map(e => <Link href={`/event/${e.id}`}>
                        <a className='flex p-3 text-center justify-center my-2 w-96'>
                            <p className='font-medium text-blue-700'>{e.title}</p>
                            <p className='text-gray-500 ml-3'>{c.title}</p>
                        </a></Link>)}
                    </div>) : <h2>No suggested posts</h2>}
                </div>
            </div>
        </div>
    )
  }
  
  export default Discover