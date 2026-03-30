"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
    
    const [open, setOpen] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const router = useRouter()

    const [user, setUser] = useState<any>({})

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        async function checkVote() {
            if (!user.id) return

            const res = await fetch("/api/vote/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id
                })
            })

            const data = await res.json()
            setHasVoted(data.hasVoted)
        }

        checkVote()
    }, [])

    function handleLogOut() {
        localStorage.removeItem("user")
        router.push("/login")
    }

    return(
        <div className="w-full bg-blue-900 text-white px-6 py-4 flex justify-between items-center">

            {/* LEFT */}
            <div>
                <h1 className="text-xl font-bold">
                    SPIDERWEB
                </h1>
                <p className="text-sm opacity-80">
                    Sistem Pemilihan Elektronik
                </p>
            </div>

            {/* RIGHT */}
            <div className="relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <img
                        src="https://i.pravatar.cc/40"
                        className="w-10 h-10 rounded-full"
                    />

                    <div>
                        <p className="font-semibold">
                            {user.fullName || "User"}
                        </p>

                        <p className="text-xs opacity-70">
                            {hasVoted ? "Sudah Memilih" : "Belum Memilih"}
                        </p>
                    </div>
                </div>

                {open && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded shadow w-40">
                        <button
                            onClick={handleLogOut}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}