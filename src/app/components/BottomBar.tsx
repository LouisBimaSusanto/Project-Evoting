type Props = {
    selected: boolean
    onConfirm: () => void
}

export default function BottomBar({ selected, onConfirm }: Props) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-between items-center">

            <p className="text-gray-700">
                {selected
                    ? "1 Kandidat Terpilih. Lanjutkan ke Konfirmasi?"
                    : "Silakan pilih kandidat"}
            </p>

            <button
                onClick={onConfirm}
                disabled={!selected}
                className={`px-6 py-2 rounded-lg text-white ${
                    selected
                        ? "bg-blue-600"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Konfirmasi & Kirim Suara
            </button>

        </div>
    )
}