import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
const { userId, candidateId } = await req.json()

  // Cek apakah user sudah vote
const existing = await prisma.vote.findUnique({
        where: { userId }
})

if (existing) {
        return Response.json({ error: "Anda sudah memilih" }, { status: 400 })
}

const vote = await prisma.vote.create({
        data: { userId, candidateId }
})

return Response.json({ message: "Suara berhasil dikirim", vote })
}