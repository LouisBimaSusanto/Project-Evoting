import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

    const body = await req.json()

    const { nim, fullName } = body

    const user = await prisma.user.findFirst({
        where: {
        nim,
        fullName
        }
    })

    if (!user) {
        return Response.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    return Response.json({
        user
    })
}