import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {

    const body = await req.json()

    const { email, code } = body

    const otp = await prisma.oTP.findFirst({
        where: {
        email,
        code
        }
    })

    if (!otp) {
        return Response.json({ error: "OTP salah" }, { status: 400 })
    }

    if (otp.expiresAt < new Date()) {
        return Response.json({ error: "OTP expired" }, { status: 400 })
    }

    await prisma.oTP.delete({
    where: { id: otp.id }
    })


    return Response.json({
        message: "OTP valid"
    })
    
}