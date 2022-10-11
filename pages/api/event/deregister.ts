import prisma from "../../../lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "next-auth/react";

// PATCH /api/event/deregister
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id
    const session = await getSession({ req });

    const event = await prisma.event.findUnique({
        where: {
            id: id?.toString() || ''
        },
        include: {
            attendees: {
                select: { email: true }
            },
            organisers: {
                select: { email: true }
            }
        }
    })

    let o = event?.organisers.map(o => o.email) || []

    if (o.includes(session?.user?.email || '')) {
        res.status(403)
        res.json({
            'Forbidden': 'Cannot remove organiser registration'
        })
        return
    }

    // @ts-ignore
    let attendees = event.attendees.filter(u => u.email !== session?.user?.email)

    const result = await prisma.event.update({
        where: {
            id: id?.toString() || ''
        },
        data: {
            attendees: {
                set: attendees
            }
        }
    })

    res.status(200)
    res.json({
        'Deregistered from feed': id
    })
}