import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// PATCH /api/event/register
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    const session = await getSession({ req });

    const feed = await prisma.event.findUnique({
        where: {
            id: id?.toString() || ''
        },
        include: {
            attendees: {
                select: { email: true }
            }
        }
    })

    const result = await prisma.event.update({
        where: {
            id: id?.toString() || ''
        },
        data: {
            attendees: {
                connect: { email: session?.user?.email || '' }
            }
        }
    })

    res.status(200)
    res.json({
        'Joined event': id
    })
}