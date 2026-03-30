type Candidate = {
    id: string
    number: number
    name: string
    photo?: string
}

type Props = {
    candidate: Candidate
    selected: string | null
    onSelect: (id: string) => void
    onShowDetail: (candidate: Candidate) => void
}

export default function CandidateCard({
    candidate,
    selected,
    onSelect,
    onShowDetail
}: Props) {

    const isSelected = selected === candidate.id

    return (
        <div
            className={`relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
                isSelected
                    ? "border-green-500 scale-[1.02]"
                    : "border-gray-200"
            }`}
        >

            {/* NOMOR */}
            <div className="absolute top-3 left-3 z-10">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900 text-white font-bold">
                    {String(candidate.number).padStart(2, "0")}
                </div>
            </div>

            {/* FOTO */}
            <div className="w-full h-52 bg-gray-100 overflow-hidden">
                <img
                    src={candidate.photo || "https://via.placeholder.com/300"}
                    alt={candidate.name}
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/* CONTENT */}
            <div className="p-4 text-center">

                {/* TITLE */}
                <h2 className="font-bold text-lg text-gray-900">
                    Capres & Cawapres
                </h2>

                <p className="text-sm text-gray-500 mb-3">
                    {candidate.name}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2">

                    {/* VISI MISI */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onShowDetail(candidate)
                        }}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        Visi & Misi
                    </button>

                    {/* PILIH */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onSelect(candidate.id)
                        }}
                        className={`flex-1 py-2 rounded-lg text-white font-medium transition ${
                            isSelected
                                ? "bg-green-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSelected ? "✔ Pilih" : "Pilih"}
                    </button>
                </div>

            </div>
        </div>
    )
}