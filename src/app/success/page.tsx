"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push("/results")
        }, 2500) // 2.5 detik
    }, [])

    return (
        <div className="h-screen flex items-center justify-center bg-blue-900 text-white">

            <div className="text-center animate-fadeIn">

                <div className="text-6xl mb-4">✅</div>

                <h1 className="text-2xl font-bold">
                    Terima Kasih!
                </h1>

                <p className="mt-2 opacity-80">
                    Suara Anda telah berhasil dikirim
                </p>

                <p className="mt-4 text-sm opacity-60">
                    Mengalihkan ke hasil voting...
                </p>

            </div>

        </div>
    )
}