import { GetServerSideProps, NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Head from "next/head"
import prisma from "../../lib/prisma"
import { User } from "@prisma/client"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const user = await prisma.user.findUnique({
        where: {
            username: String(params?.name),
        },
    })

     // @ts-ignore
    user.createdAt = user.createdAt.toDateString()

    return { props: { user } }
}

const Account: NextPage<{ user: User | null }> = (props) => {
    const { data: session } = useSession()
    const [ tab, setTab ] = useState(0)

    return (
        <div>
            <Head>
                <title>{props.user?.username}</title>
            </Head>

            <p className={session?.user?.email == props.user?.email? 'text-green-700' : 'text-black'}>{props.user?.username}</p>
        </div>
    )
}

export default Account