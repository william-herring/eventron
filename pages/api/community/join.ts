import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// PATCH /api/community/join
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

    const result = await prisma.community.update({
        where: {
            // @ts-ignore
            id: parseInt(id)
        },
        data: {
            members: {
                // @ts-ignore
                connect: { email: session?.user?.email }
            }
        }
    })

    res.status(200)
    res.json({
        'Joined community': id
    })
}