import { prisma } from "@/lib/prisma"
import { generateOTP } from "@/lib/otp"
import { sendOTP } from "@/lib/email"

export async function POST(req: Request) {
  const { email } = await req.json()

  const code = generateOTP()

  await prisma.oTP.create({
    data: {
      email,
      code,
      expiresAt: new Date(Date.now() + 5 * 60000)
    }
  })

  await sendOTP(email, code)

  return Response.json({ message: "OTP dikirim ke email" })
}