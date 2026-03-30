type Props = {
    data: any[]
    onEdit: (c: any) => void
    onDelete: (id: string) => void
}

export default function CandidateTable({ data, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b py-3 text-gray-900">
                        <th>No</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((c) => (
                        <tr key={c.id} className="border-b">
                            <td className="py-3 text-gray-900">{c.number}</td>
                            <td className="py-3 text-gray-900">{c.name}</td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => onEdit(c)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onDelete(c.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}