import { NextRequest } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
        return Response.json({ error: "File tidak ditemukan" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Nama file unik pakai timestamp
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`

        const { error } = await supabase.storage
        .from("candidates")
        .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
        })

        if (error) throw error

        // Ambil public URL
        const { data } = supabase.storage
        .from("candidates")
        .getPublicUrl(fileName)

        return Response.json({ url: data.publicUrl })

    } catch (error) {
        console.error(error)
        return Response.json({ error: "Gagal upload gambar" }, { status: 500 })
    }
}