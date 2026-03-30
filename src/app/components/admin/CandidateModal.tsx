type Props = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
    initialData?: any
}

import { useState, useEffect } from "react"

export default function CandidateModal({
    isOpen,
    onClose,
    onSubmit,
    initialData
}: Props) {

    const [form, setForm] = useState({
        number: "",
        name: "",
        photo: "",
        vision: "",
        mission: ""
    })

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                number: String(initialData.number || "")
            })
        }
    }, [initialData])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

            <div className="bg-white p-6 rounded-xl w-96 space-y-3 text-gray-900">
                <h2 className="text-lg font-bold">
                    {initialData ? "Edit Kandidat" : "Tambah Kandidat"}
                </h2>

                <input
                    placeholder="Nomor"
                    className="border p-2 w-full"
                    value={form.number}
                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                />

                <input
                    placeholder="Nama"
                    className="border p-2 w-full"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Foto URL"
                    className="border p-2 w-full"
                    value={form.photo}
                    onChange={(e) => setForm({ ...form, photo: e.target.value })}
                />

                <textarea
                    placeholder="Visi"
                    className="border p-2 w-full"
                    value={form.vision}
                    onChange={(e) => setForm({ ...form, vision: e.target.value })}
                />

                <textarea
                    placeholder="Misi"
                    className="border p-2 w-full"
                    value={form.mission}
                    onChange={(e) => setForm({ ...form, mission: e.target.value })}
                />

                <button
                    onClick={() => onSubmit(form)}
                    className="bg-blue-600 text-white w-full p-2"
                >
                    Simpan
                </button>

                <button
                    onClick={onClose}
                    className="w-full p-2 border"
                >
                    Batal
                </button>
            </div>
        </div>
    )
}