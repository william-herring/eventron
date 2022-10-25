import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/feed/create
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, organisers, image, startDate, endDate, startTime, endTime, community, attendeeLimit, location } = req.body;
    const session = await getSession({ req });

    const start = new Date(startDate)
    const end =  new Date(endDate)

    const organiserObjs: any[] = []
    organisers.forEach((u: string) => organiserObjs.push({
        email: u
    }))

    const result = await prisma.event.create({
        data: {
            title: title,
            description: description,
            // @ts-ignore
            organisers: [{ connect: { email: session?.user?.email } }].concat(organiserObjs),
            image: image,
            startDate: new Date("2020-03-19T14:21:00+0200"),
            endDate:  new Date("2020-03-19T14:21:00+0200"),
            community: {
                connect: {
                    id: community
                }
            },
            attendeeLimit: attendeeLimit,
            location: location,
        },
    });
    res.json(result)
}