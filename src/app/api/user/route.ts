import { prisma } from "@/lib/prisma"

export async function GET() {
    const users = await prisma.user.findMany({
        include: { vote: true }
    })

    return Response.json(users)
}