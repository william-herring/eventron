import Router, { useRouter } from "next/router"
import { GetServerSideProps, NextPage } from "next"
import { useSession, getSession } from "next-auth/react"
import prisma from "../lib/prisma"

interface AccountRedirectProps {
    user: {
        email: string,
        username: string
    }
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session) return { props: { } }
    
    var user = await prisma.user.findUnique({
        where: {
            username: session?.user?.name?.toString()
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: session?.user?.email as string,
                username: session?.user?.name as string,
            }
        })
    }

    return { props: { user: { email: user.email, username: user.username } } }
}

const AccountRedirect: NextPage<AccountRedirectProps | null> = (props) => {
    const { data: session } = useSession()
    const { redirectUrl } = useRouter().query

    if (session) {
        Router.push('' + redirectUrl)
    }

    return (
        <div>
            {!session? <p>Did you mean to go to the <a href='/login' className='text-blue-500 font-semibold'>log in page</a>?</p> : <p>Redirect not working? Try <a href={'' + redirectUrl} className='text-blue-500 font-semibold'>this link</a>.</p>}
        </div>
    )
}

export default AccountRedirect