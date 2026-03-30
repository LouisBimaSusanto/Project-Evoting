"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function VerifyContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // ✅ Email diambil dari URL params, tidak perlu input manual
    const email = searchParams.get("email") ?? ""

    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [loading, setLoading] = useState(false)
    const refs = useRef<(HTMLInputElement | null)[]>([])

    // Auto focus kotak pertama saat halaman dibuka
    useEffect(() => {
        refs.current[0]?.focus()
    }, [])

    // ── Handle input per kotak ──
    function handleChange(index: number, value: string) {
        // Hanya angka
        if (!/^\d*$/.test(value)) return

        const next = [...otp]
        next[index] = value.slice(-1)
        setOtp(next)

        // Auto jump ke kotak berikutnya
        if (value && index < 5) {
        refs.current[index + 1]?.focus()
        }
    }

    // Backspace → kembali ke kotak sebelumnya
    function handleKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
        refs.current[index - 1]?.focus()
        }
    }

    // Support paste 6 digit sekaligus
    function handlePaste(e: React.ClipboardEvent) {
        e.preventDefault()
        const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
        if (digits.length === 6) {
        setOtp(digits.split(""))
        refs.current[5]?.focus()
        }
    }

    // ── Submit verifikasi ──
    async function handleVerify(e: React.FormEvent) {
        e.preventDefault()

        const code = otp.join("")
        if (code.length < 6) {
        alert("Masukkan 6 digit kode OTP")
        return
        }

        setLoading(true)
        try {
        const res = await fetch("/api/otp/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
        })

        const data = await res.json()

        if (res.ok) {
            router.push("/login")
        } else {
            alert(data.error ?? "Verifikasi gagal")
            setOtp(["", "", "", "", "", ""])
            refs.current[0]?.focus()
        }
        } finally {
        setLoading(false)
        }
    }

    return (
        <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#f3f5f9" }}
        >
        <div
            className="bg-white rounded-2xl w-full max-w-md p-10"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
        >

            {/* Icon email */}
            <div className="flex justify-center mb-6">
            <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(26,86,196,0.08)" }}
            >
                <svg className="w-8 h-8" style={{ color: "#1a56c4" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            </div>

            {/* Judul */}
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Verifikasi Email
            </h2>
            <p className="text-center text-sm text-gray-400 mb-1">
            Kode OTP telah dikirim ke
            </p>
            <p
            className="text-center text-sm font-semibold mb-8"
            style={{ color: "#1a56c4" }}
            >
            {email || "email Anda"}
            </p>

            <form onSubmit={handleVerify}>

            <div
                className="flex gap-3 justify-center mb-6"
                onPaste={handlePaste}
            >
                {otp.map((digit, i) => (
                <input
                    key={i}
                    ref={(el) => { refs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="text-center text-xl font-bold rounded-xl focus:outline-none transition-all"
                    style={{
                    width: "48px",
                    height: "56px",
                    border: digit ? "2px solid #1a56c4" : "2px solid #e5e7eb",
                    background: digit ? "#f0f4ff" : "white",
                    color: "#0d2b5e",
                    boxShadow: digit ? "0 0 0 3px rgba(26,86,196,0.10)" : "none",
                    }}
                />
                ))}
            </div>

            {/* Tombol verifikasi */}
            <button
                type="submit"
                disabled={loading || otp.join("").length < 6}
                className="w-full text-white font-semibold py-3.5 rounded-xl transition"
                style={{
                background:
                    loading || otp.join("").length < 6
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #1a56c4, #1240a0)",
                cursor:
                    loading || otp.join("").length < 6
                    ? "not-allowed"
                    : "pointer",
                boxShadow:
                    otp.join("").length === 6
                    ? "0 4px 14px rgba(26,86,196,0.30)"
                    : "none",
                }}
            >
                {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                    </svg>
                    Memverifikasi...
                </span>
                ) : (
                "Verifikasi Akun"
                )}
            </button>

            </form>

            {/* Link kembali */}
            <p className="text-center text-sm text-gray-400 mt-6">
            Tidak menerima kode?{" "}
            <button
                onClick={() => router.back()}
                className="font-semibold hover:underline"
                style={{ color: "#1a56c4" }}
            >
                Kembali &amp; Daftar Ulang
            </button>
            </p>

        </div>
        </div>
    )
    }

    export default function VerifyPage() {
    return (
        <Suspense
        fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#f3f5f9]">
            <div className="text-gray-400 text-sm">Memuat...</div>
            </div>
        }
        >
        <VerifyContent />
        </Suspense>
    )
}