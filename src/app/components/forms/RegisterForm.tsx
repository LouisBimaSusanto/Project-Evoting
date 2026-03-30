"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [nim, setNim] = useState("")
    const [email, setEmail] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        if (!agreed) {
        alert("Harap centang pernyataan kebenaran data")
        return
        }
        setLoading(true)
        try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, nim, email }),
        })
        const data = await res.json()
        if (res.ok) {
            router.push(`/verify?email=${encodeURIComponent(email)}`)
        } else {
            alert(data.error)
        }
        } finally {
        setLoading(false)
        }
    }

    return (
        <form onSubmit={handleRegister} className="space-y-5">

        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Daftar Akun Baru</h2>
            <p className="text-sm text-gray-400 mt-1">Isi data diri Anda untuk mendaftar</p>
        </div>

        <Field label="Full Name">
            <input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
            className="w-full px-4 py-3 text-sm rounded-lg transition focus:outline-none"
            />
        </Field>

        <Field label="NIK / NIM">
            <input
            type="text"
            placeholder="Nomor Induk Mahasiswa"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            required
            style={inputStyle}
            className="w-full px-4 py-3 text-sm rounded-lg transition focus:outline-none"
            />
        </Field>

        <Field label="Email">
            <input
            type="email"
            placeholder="Email untuk OTP"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            className="w-full px-4 py-3 text-sm rounded-lg transition focus:outline-none"
            />
        </Field>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer">
            <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded cursor-pointer"
            style={{ accentColor: "#1a56c4" }}
            />
            <span className="text-sm text-gray-600">Saya menyatakan data ini benar</span>
        </label>

        <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-lg transition"
            style={btnStyle(loading)}
        >
            {loading ? "Memproses..." : "Daftar Sekarang & Verifikasi Data"}
        </button>

        <p className="text-center text-sm text-gray-400">
            Sudah punya akun?{" "}
            <a href="/login" className="font-semibold hover:underline" style={{ color: "#1a56c4" }}>
            Masuk di sini
            </a>
        </p>

        </form>
    )
    }

    function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
        <label className="block text-sm font-medium mb-1.5 text-gray-700">{label}</label>
        {children}
        </div>
    )
    }

    const inputStyle: React.CSSProperties = {
    border: "1px solid #d1d5db",
    color: "#111827",
    }

    function btnStyle(disabled: boolean): React.CSSProperties {
    return {
        background: disabled ? "#9ca3af" : "linear-gradient(135deg, #1a56c4, #1240a0)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        boxShadow: disabled ? "none" : "0 4px 14px rgba(26,86,196,0.30)",
    }
}