import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// PATCH /api/community/leave
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    const session = await getSession({ req });

    const community = await prisma.community.findUnique({
        where: {
            // @ts-ignore
            id: parseInt(id)
        },
        include: {
            members: {
                select: { email: true }
            }
        }
    })

    // @ts-ignore
    let members = community.members.filter(u => u.email !== session?.user?.email)

    const result = await prisma.community.update({
        where: {
            // @ts-ignore
            id: parseInt(id)
        },
        data: {
            members: {
                set: members
            }
        }
    })

    res.status(200)
    res.json({
        'Left community': id
    })
}