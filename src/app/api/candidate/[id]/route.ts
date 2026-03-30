import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

// Update
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()

        const { number, name, photo, vision, mission } = body

        const updated = await prisma.candidate.update({
            where: { id },
            data: {
                number,
                name,
                photo,
                vision,
                mission
            }
        })

        return Response.json(updated)

    } catch (error) {
        console.error(error)
        return Response.json(
            { error: "Gagal update kandidat" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        await prisma.candidate.delete({ 
            where: { id }
        })

        return Response.json({ message: "Kandidat berhasil dihapus" })

    } catch (error: any) {
        console.error(error)

        if (error.code === "P2025") {
            return Response.json(
                { error: "Kandidat tidak ditemukan" },
                { status: 404 }
            )
        }

        return Response.json(
            { error: "Gagal hapus kandidat" },
            { status: 500 }
        )
    }
}