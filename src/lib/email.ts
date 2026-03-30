import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendOTP(email: string, code: string) {
    await transporter.sendMail({
        from: `"SIPERWEB" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Kode OTP Voting - SIPERWEB",
        html: `
        <h2>Kode OTP Anda</h2>
        <h1 style="letter-spacing: 8px;">${code}</h1>
        <p>Berlaku selama <strong>5 menit</strong></p>
        <p>Jangan bagikan kode ini kepada siapapun.</p>
        `,
    })
}