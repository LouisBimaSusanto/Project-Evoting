import { prisma } from "@/lib/prisma"

export async function GET() {
    const candidates = await prisma.candidate.findMany({
        include: {
            votes: true
        }
    })

    const results = candidates.map((c) => ({
        id: c.id,
        name: c.name,
        number: c.number,
        photo: c.photo,
        totalVotes: c.votes.length
    }))

    results.sort((a, b) => b.totalVotes - a.totalVotes)

    return Response.json(results)
}