import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/feed/create
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, organisers, image, startDate, endDate, startTime, endTime, community, attendeeLimit, location } = req.body;
    const session = await getSession({ req });

    const start = new Date(startDate)
    const end =  new Date(endDate)

    start.setHours(parseInt(startTime[0] + startTime[1]))
    end.setHours(parseInt(endTime[0] + endTime[1]))
    start.setMinutes(parseInt(startTime[3] + startTime[4]))
    end.setMinutes(parseInt(endTime[3] + endTime[4]))

    const organiserObjs: { username: string | null | undefined }[] = [{ username: session?.user?.name }]
    organisers.forEach((u: string) => organiserObjs.push({
        username: u
    }))

    console.log(organiserObjs)

    const result = await prisma.event.create({
        data: {
            title: title,
            description: description,
            // @ts-ignore
            organisers: { connect: organiserObjs },
            image: image,
            startDate: start,
            endDate:  end,
            community: {
                connect: {
                    title: community
                }
            },
            attendeeLimit: attendeeLimit,
            location: location,
            // @ts-ignore
            attendees: { connect: { email: session?.user?.email } }
        },
    });
    res.json(result)
}