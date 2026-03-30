import { prisma } from "@/lib/prisma"
import { generateOTP } from "@/lib/otp"
import { sendOTP } from "@/lib/email"

export async function POST(req: Request) {

    const body = await req.json()

    const { nim, fullName, email } = body

    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) {
        return Response.json({ error: "User sudah ada" }, { status: 400 })
    }

    const user = await prisma.user.create({
        data: {
        nim,
        fullName,
        email
        }
    })

    const code = generateOTP()

    await prisma.oTP.create({
        data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 5 * 60000)
        }
    })

    await sendOTP(email, code)

    return Response.json({
        message: "OTP terkirim"
    })
}