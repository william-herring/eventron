import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/feed/create
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, description, organisers, image, startDate, endDate, community } = req.body;
    const session = await getSession({ req });

    const result = await prisma.event.create({
        data: {
            title: title,
            description: description,
            // @ts-ignore
            organisers: [{ connect: { email: session?.user?.email } }].concat(organisers),
            image: image,
            startDate: startDate,
            endDate: endDate,
            community: community
        },
    });
    res.json(result)
}