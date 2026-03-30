"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/admin/SideBar"
import CandidateTable from "../components/admin/CandidateTable"
import CandidateModal from "../components/admin/CandidateModal"
import UserTable from "../components/admin/UserTable"

export default function AdminPage() {

    const [active, setActive] = useState("candidate")

    const [candidates, setCandidates] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])

    const [openModal, setOpenModal] = useState(false)
    const [editData, setEditData] = useState<any>(null)

    useEffect(() => {
        fetchCandidates()
        fetchUsers()
    }, [])

    async function fetchCandidates() {
        const res = await fetch("/api/candidate")
        setCandidates(await res.json())
    }

    async function fetchUsers() {
        const res = await fetch("/api/user")
        setUsers(await res.json())
    }

    async function handleSubmit(data: any) {
        const method = editData ? "PUT" : "POST"
        const url = editData
            ? `/api/candidate/${editData.id}`
            : "/api/candidate"

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data,
                number: Number(data.number)
            })
        })

        setOpenModal(false)
        setEditData(null)
        fetchCandidates()
    }

    async function deleteCandidate(id: string) {
        await fetch(`/api/candidate/${id}`, { method: "DELETE" })
        fetchCandidates()
    }

    async function deleteUser(id: string) {
        await fetch(`/api/user/${id}`, { method: "DELETE" })
        fetchUsers()
    }

    return (
        <div className="flex">

            <Sidebar active={active} setActive={setActive} />

            <div className="flex-1 p-6">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">
                        {active === "candidate" ? "Kandidat" : "User"}
                    </h1>

                    {active === "candidate" && (
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            + Tambah
                        </button>
                    )}
                </div>

                {/* CONTENT */}
                {active === "candidate" ? (
                    <CandidateTable
                        data={candidates}
                        onEdit={(c) => {
                            setEditData(c)
                            setOpenModal(true)
                        }}
                        onDelete={deleteCandidate}
                    />
                ) : (
                    <UserTable data={users} onDelete={deleteUser} />
                )}

                {/* MODAL */}
                <CandidateModal
                    isOpen={openModal}
                    onClose={() => {
                        setOpenModal(false)
                        setEditData(null)
                    }}
                    onSubmit={handleSubmit}
                    initialData={editData}
                />
            </div>
        </div>
    )
}