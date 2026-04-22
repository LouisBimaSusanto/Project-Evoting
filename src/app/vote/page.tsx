"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CandidateCard from "../components/CandidateCard"
import VoteCard from "../components/VoteCard"
import Navbar from "../components/Navbar"
import BottomBar from "../components/BottomBar"
import VisiMisiModal from "../components/VIsiMisiModal"

type Candidate = {
    id: string
    number: number
    name: string
    photo?: string
    vision?: string
    mission?: string
}

export default function VotePage() {

    const [candidates, setCandidates] = useState<Candidate[]>([])
    const [selected, setSelected] = useState<string | null>(null)

    const [showConfirm, setShowConfirm] = useState(false)

    const [showVisiMisi, setShowVisiMisi] = useState(false)
    const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)

    const router = useRouter()

    useEffect(() => {
        fetch("/api/candidate")
            .then(res => res.json())
            .then(data => setCandidates(data))

        async function checkVoteStatus() {
            const user = JSON.parse(localStorage.getItem("user") || "{}")
            if (!user.id) return

            const res = await fetch("/api/vote/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id })
            })

            const data = await res.json()

            if (data.hasVoted) {
                router.push("/results")
            }
        }

        checkVoteStatus()
    }, [])

    async function handleVote(otp: string) {
        const user = JSON.parse(localStorage.getItem("user") || "{}")

        const verifyRes = await fetch("/api/otp/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                code: otp
            })
        })

        const verifyData = await verifyRes.json()

        if (!verifyRes.ok) {
            alert(verifyData.error)
            return
        }

        const voteRes = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                candidateId: selected
            })
        })

        const voteData = await voteRes.json()

        if (voteRes.ok) {
            router.push("/success")
        } else {
            alert(voteData.error)
        }
    }

    async function openConfirm() {
        const user = JSON.parse(localStorage.getItem("user") || "{}")

        await fetch("/api/otp/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email
            })
        })

        alert("OTP dikirim ke email")
        setShowConfirm(true)
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <h1 className="text-2xl font-bold text-center mb-8">
                Pilih Kandidat Anda
            </h1>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {candidates.map((c) => (
                        <CandidateCard
                            key={c.id}
                            candidate={c}
                            selected={selected}
                            onSelect={setSelected}
                            onShowDetail={(candidate) => {
                                setActiveCandidate(candidate)
                                setShowVisiMisi(true)
                            }}
                        />
                    ))}
                </div>
            </div>

            <BottomBar
                selected={!!selected}
                onConfirm={openConfirm}
            />

            {/* MODAL VOTE */}
            {showConfirm && selected && (
                <VoteCard
                    candidate={candidates.find(c => c.id === selected)!}
                    onConfirm={handleVote}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            {/* MODAL VISI MISI */}
            {showVisiMisi && activeCandidate && (
                <VisiMisiModal
                    candidate={activeCandidate}
                    onClose={() => setShowVisiMisi(false)}
                />
            )}

        </div>
    )
}