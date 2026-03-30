"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const router = useRouter()
    const [nim, setNim] = useState("")
    const [fullName, setFullName] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nim, fullName }),
        })
        const data = await res.json()
        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(data.user))
            router.push("/vote")
        } else {
            alert(data.error)
        }
        } finally {
        setLoading(false)
        }
    }

    return (
        <form onSubmit={handleLogin} className="space-y-5">

        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Selamat Datang</h2>
            <p className="text-sm text-gray-400 mt-1">Masuk untuk mulai memilih</p>
        </div>

        <Field label="NIM">
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

        <Field label="Nama Lengkap">
            <input
            type="text"
            placeholder="Masukkan nama lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
            className="w-full px-4 py-3 text-sm rounded-lg transition focus:outline-none"
            />
        </Field>

        <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-lg transition"
            style={btnStyle(loading)}
        >
            {loading ? "Memuat..." : "Masuk"}
        </button>

        <p className="text-center text-sm text-gray-400">
            Belum punya akun?{" "}
            <a href="/register" className="font-semibold hover:underline" style={{ color: "#1a56c4" }}>
            Daftar di sini
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