"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type Props = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
    initialData?: any
    }

    export default function CandidateModal({ isOpen, onClose, onSubmit, initialData }: Props) {
    const [form, setForm] = useState({
        number: "",
        name: "",
        photo: "",
        vision: "",
        mission: "",
    })
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string>("")

    useEffect(() => {
        if (initialData) {
        setForm({ ...initialData, number: String(initialData.number || "") })
        setPreview(initialData.photo || "")
        } else {
        setForm({ number: "", name: "", photo: "", vision: "", mission: "" })
        setPreview("")
        }
    }, [initialData])

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Preview lokal dulu
        setPreview(URL.createObjectURL(file))
        setUploading(true)

        try {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        const data = await res.json()

        if (data.url) {
            setForm((prev) => ({ ...prev, photo: data.url }))
        } else {
            alert("Gagal upload gambar")
        }
        } catch {
        alert("Terjadi kesalahan saat upload")
        } finally {
        setUploading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-96 space-y-3 text-gray-900">
            <h2 className="text-lg font-bold">
            {initialData ? "Edit Kandidat" : "Tambah Kandidat"}
            </h2>

            <input
            placeholder="Nomor"
            className="border p-2 w-full rounded"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            />

            <input
            placeholder="Nama"
            className="border p-2 w-full rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* File Upload */}
            <div>
            <label className="block text-sm font-medium mb-1">Foto Kandidat</label>
            <input
                type="file"
                accept="image/*"
                className="border p-2 w-full rounded"
                onChange={handleFileChange}
            />
            {uploading && (
                <p className="text-sm text-blue-500 mt-1">Mengupload gambar...</p>
            )}
            {preview && !uploading && (
                <div className="mt-2 relative w-full h-40">
                <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                />
                </div>
            )}
            </div>

            <textarea
            placeholder="Visi"
            className="border p-2 w-full rounded"
            value={form.vision}
            onChange={(e) => setForm({ ...form, vision: e.target.value })}
            />

            <textarea
            placeholder="Misi"
            className="border p-2 w-full rounded"
            value={form.mission}
            onChange={(e) => setForm({ ...form, mission: e.target.value })}
            />

            <button
            onClick={() => onSubmit(form)}
            disabled={uploading}
            className="bg-blue-600 text-white w-full p-2 rounded disabled:opacity-50"
            >
            {uploading ? "Menunggu upload..." : "Simpan"}
            </button>

            <button onClick={onClose} className="w-full p-2 border rounded">
            Batal
            </button>
        </div>
        </div>
    )
}