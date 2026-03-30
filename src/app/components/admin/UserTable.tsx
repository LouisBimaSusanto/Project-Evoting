type Props = {
    data: any[]
    onDelete: (id: string) => void
}

export default function UserTable({ data, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            {data.map((u) => (
                <div key={u.id} className="flex justify-between border-b py-2">
                    <div>
                        <p className="font-bold py-2 text-gray-900">{u.fullName}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                    </div>

                    <button
                        onClick={() => onDelete(u.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Hapus
                    </button>
                </div>
            ))}
        </div>
    )
}