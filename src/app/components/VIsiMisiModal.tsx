type Candidate = {
    number: number
    name: string
    photo?: string
    vision?: string
    mission?: string
}

type Props = {
    candidate: Candidate
    onClose: () => void
}

export default function VisiMisiModal({ candidate, onClose }: Props) {
    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        // ✅ Klik backdrop = tutup modal
        onClick={onClose}
        >
        <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.20)" }}
            // ✅ Klik dalam modal tidak menutup
            onClick={(e) => e.stopPropagation()}
        >

            {/* ── Header ── */}
            <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: "1px solid #f0f0f0" }}
            >
            <div className="flex items-center gap-3">
                {/* Badge nomor */}
                <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #0d2b5e, #1a3d7a)" }}
                >
                {String(candidate.number).padStart(2, "0")}
                </div>
                <div>
                <p className="text-xs text-gray-400 mb-0.5">Capres &amp; Cawapres</p>
                <p className="font-bold text-gray-900 text-base leading-tight">
                    {candidate.name}
                </p>
                </div>
            </div>

            {/* Tombol tutup */}
            <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                style={{ color: "#9ca3af" }}
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            {/* ── Foto ── */}
            {candidate.photo && (
            <div className="px-6 pt-5">
                <img
                src={candidate.photo}
                alt={candidate.name}
                className="w-full h-52 object-cover object-top rounded-xl"
                style={{ background: "#f0f4ff" }}
                />
            </div>
            )}

            {/* ── Konten Visi & Misi ── */}
            <div className="px-6 py-5 space-y-6">

            {/* Visi */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: "#1a56c4" }} />
                <h3 className="font-bold text-gray-800 text-base">Visi</h3>
                </div>
                <div
                className="rounded-xl p-4 text-sm text-gray-600 leading-relaxed"
                style={{ background: "#f8faff", border: "1px solid #e8eeff" }}
                >
                {candidate.vision || (
                    <span className="text-gray-400 italic">Visi belum tersedia.</span>
                )}
                </div>
            </div>

            {/* Misi */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ background: "#22a869" }} />
                <h3 className="font-bold text-gray-800 text-base">Misi</h3>
                </div>
                <div
                className="rounded-xl p-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line"
                style={{ background: "#f6fdf9", border: "1px solid #d1fae5" }}
                >
                {candidate.mission || (
                    <span className="text-gray-400 italic">Misi belum tersedia.</span>
                )}
                </div>
            </div>

            </div>

            {/* ── Footer ── */}
            <div className="px-6 pb-6">
            <button
                onClick={onClose}
                className="w-full font-semibold py-3.5 rounded-xl transition-colors text-gray-600 hover:bg-gray-50"
                style={{ border: "2px solid #e5e7eb" }}
            >
                Tutup
            </button>
            </div>

        </div>
        </div>
    )
}