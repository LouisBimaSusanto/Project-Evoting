import { prisma } from "@/lib/prisma"

//Get
export async function GET() {
    const candidates = await prisma.candidate.findMany()

    return Response.json(candidates)
}

//Post
export async function POST(req: Request) {
try {
    const body = await req.json()

    const { number, name, photo, vision, mission } = body

    if (!number || !name) {
        return Response.json(
        { error: "Nomor dan nama wajib diisi" },
        { status: 400 }
        )
    }

    const candidate = await prisma.candidate.create({
    data: {
        number,
        name,
        photo,
        vision,
        mission
    }
    })

    return Response.json(candidate)

    } catch (error) {
    console.error(error)

return Response.json(
        { error: "Server error" },
        { status: 500 }
    )
    }
}