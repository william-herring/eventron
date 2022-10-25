import { GetServerSideProps, NextPage } from "next"
import Router, { useRouter } from "next/router"
import prisma from "../lib/prisma"
import Head from "next/head"
import { Community, Event, User } from "@prisma/client"
import NavigationBar from "../components/NavigationBar"

interface SearchProps {
    events: Event[]
    users: User[]
    communities: Community[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const search = query.q as string

    const events = await prisma.event.findMany({
        where: {
            title: { contains: search, mode: 'insensitive' }
        }
    })
    const users = await prisma.user.findMany({
        where: { username: { contains: search, mode: 'insensitive' } }
    })
    const communities = await prisma.community.findMany({
        where: { title: { contains: search, mode: 'insensitive' } }
    })

    events.map(event => {
            // @ts-ignore
            event.startDate = event.startDate.toDateString()
            // @ts-ignore
            event.endDate = event.endDate.toDateString()
        }
    )
    users.map(user => 
        // @ts-ignore
        user.createdAt = user.createdAt.toDateString()
    )

    return { props: { events, users, communities } }
}

const Search: NextPage<SearchProps> = (props) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Search: {router.query.q}</title>
            </Head>

            <NavigationBar active={8} />

            <div className='p-6 mt-24'>
                <h1 className='text-2xl text-gray-500'>{props.events.length + props.users.length + props.communities.length} results for "{router.query.q}"</h1>
                <div className='flex flex-col mt-6 font-light text-gray-500'>
                    {props.users.map(u => <p key={u.id}>User: <a className='text-red-500' href={'/user/' + u.username}>{u.username}</a></p>)}
                    {props.events.map(e => <p key={e.id}>Event: <a className='text-red-500' href={'/event/' + e.id}>{e.title}</a></p>)}
                    {props.communities.map(c => <p key={c.id}>Community: <a className='text-red-500' href={'/community/' + c.id}>{c.title}</a></p>)}
                </div>
            </div>
        </div>
    )
}

export default Search