import { prisma } from "@/lib/prisma"

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // vote dulu
        await prisma.vote.deleteMany({
            where: { userId: id }
        })

        // hapus user
        await prisma.user.delete({
            where: { id }
        })

        return Response.json({ message: "User dihapus" })

    } catch (error: any) {
        console.error(error)

        if (error.code === "P2025") {
            return Response.json(
                { error: "User tidak ditemukan" },
                { status: 404 }
            )
        }

        return Response.json(
            { error: "Gagal hapus user" },
            { status: 500 }
        )
    }
}