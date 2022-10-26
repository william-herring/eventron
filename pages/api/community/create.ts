import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next'

// POST /api/community/create
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, tags } = req.body;
    const session = await getSession({ req });

    const result = await prisma.event.create({
        data: {
            title: title,
            // @ts-ignore
            members: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result)
}