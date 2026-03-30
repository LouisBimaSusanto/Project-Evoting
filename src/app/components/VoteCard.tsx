"use client"

import { useState } from "react"
import OTPInput from "./OTPInput"

type Props = {
candidate: {
        number: number
        name: string
        photo?: string
    }
    onConfirm: (otp: string) => void
    onCancel: () => void
}

export default function VoteCard({ candidate, onConfirm, onCancel }: Props) {
    const [otp, setOtp] = useState("")

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-96 text-center">

            {/*Title*/}
            <h2 className="text-xl font-bold mb-4 text-gray-900">
            Verifikasi Pilihan Anda
            </h2>

            {/*Foto Paslon*/}
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                    src={candidate.photo || "https://via.placeholder.com/300"}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/*Informasi Data Diri Kandidat*/}
            <p className="mt-4 font-bold text-gray-900">
            No {candidate.number} - {candidate.name}
            </p>

            <p className="text-sm text-gray-500 mt-2">
            Pilihan tidak dapat diubah setelah dikirim
            </p>

            {/*OTP Input*/}
            <div className="text-gray-900 mt-4">
                <OTPInput onChange={setOtp} />
            </div>

            <div className="flex gap-2 mt-6">
                <button
                    onClick={() => onConfirm(otp)}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                Kirim Suara
                </button>

                <button
                    onClick={onCancel}
                    className="border px-4 py-2 rounded w-full"
                >
                Batal
                </button>
            </div>

        </div>
        </div>
    )
}