import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    const { userId } = await req.json()

    const vote = await prisma.vote.findUnique({
        where: { userId }
    })

    return Response.json({ hasVoted: !!vote })
}