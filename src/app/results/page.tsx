"use client"

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

type Result = {
    id: string
    name: string
    number: number
    photo?: string
    totalVotes: number
}

export default function ResultsPage() {

    const [results, setResults] = useState<Result[]>([])

    useEffect(() => {
        function fetchResults() {
            fetch("/api/results")
                .then(res => res.json())
                .then(data => setResults(data))
        }

        fetchResults() // langsung fetch pertama kali
        const interval = setInterval(fetchResults, 3000)

        return () => clearInterval(interval)
    }, [])

    const totalVotes = results.reduce((sum, r) => sum + r.totalVotes, 0)

    const sortedResults = [...results].sort((a, b) => b.totalVotes - a.totalVotes)

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar/>

            <h1 className="text-3xl font-bold text-center mb-10">
                Hasil Voting
            </h1>

            <div className="space-y-6 max-w-3xl mx-auto">

                {sortedResults.map((r, index) => {
                    const percentage = totalVotes > 0
                        ? ((r.totalVotes / totalVotes) * 100).toFixed(1)
                        : 0

                    const isWinner = index === 0 && r.totalVotes > 0

                    return (
                        <div
                            key={r.id}
                            className={`bg-white p-4 rounded-xl shadow ${
                                isWinner ? "border-2 border-green-500" : ""
                            }`}
                        >

                            {/* HEADER */}
                            <div className="flex items-center gap-4">

                                <div className="text-2xl font-bold w-10 text-gray-900">
                                    #{index + 1}
                                </div>

                                <img
                                    src={r.photo || "https://via.placeholder.com/100"}
                                    className="w-16 h-16 rounded object-cover"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            No.{r.number} - {r.name}
                                        </h2>
                                        {isWinner && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                                Unggul
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        {r.totalVotes} suara ({percentage}%)
                                    </p>
                                </div>

                            </div>

                            {/* PROGRESS BAR */}
                            <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>

                        </div>
                    )
                })}

                {results.length > 0 && (
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Total suara masuk: <span className="font-semibold">{totalVotes}</span>
                    </p>
                )}

                {results.length === 0 && (
                    <p className="text-center text-gray-400 mt-20">
                        Belum ada data hasil voting.
                    </p>
                )}

            </div>

        </div>
    )
}
