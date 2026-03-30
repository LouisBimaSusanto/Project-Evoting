type Props = {
    active: string
    setActive: (val: string) => void
}

export default function Sidebar({ active, setActive }: Props) {
    return (
        <div className="w-64 bg-blue-900 text-white p-5">
            <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

            <div className="space-y-2">
                <button
                    onClick={() => setActive("candidate")}
                    className={`block w-full text-left p-2 rounded ${
                        active === "candidate" ? "bg-blue-700" : ""
                    }`}
                >
                    Kandidat
                </button>

                <button
                    onClick={() => setActive("user")}
                    className={`block w-full text-left p-2 rounded ${
                        active === "user" ? "bg-blue-700" : ""
                    }`}
                >
                    User
                </button>
            </div>
        </div>
    )
}