export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">

        {/* KIRI — Panel Navy*/}
        <div
            className="hidden lg:flex w-[52%] flex-col items-center justify-center relative overflow-hidden select-none"
            style={{ background: "linear-gradient(160deg, #0a1f44 0%, #0d2b5e 60%, #0f3070 100%)" }}
        >
            {/* Dekorasi lingkaran */}
            <div className="absolute top-8 left-8 w-20 h-20 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.20)" }} />
            <div className="absolute top-12 left-12 w-10 h-10 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.15)" }} />
            <div className="absolute bottom-16 right-12 w-28 h-28 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.18)" }} />
            <div className="absolute bottom-20 right-16 w-14 h-14 rounded-full"
            style={{ border: "1px solid rgba(201,168,76,0.12)" }} />
            <div className="absolute top-1/3 right-10 w-6 h-6 rounded-full"
            style={{ background: "rgba(201,168,76,0.12)" }} />

            {/* Konten */}
            <div className="relative z-10 flex flex-col items-center text-center px-14">

            {/* Icon */}
            <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                style={{
                background: "rgba(201,168,76,0.12)",
                border: "2px solid rgba(201,168,76,0.25)",
                }}
            >
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="18" r="8" fill="#c9a84c" opacity="0.9" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <line key={i} x1="26" y1="7" x2="26" y2="3"
                    stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"
                    transform={`rotate(${deg} 26 18)`} />
                ))}
                <rect x="12" y="28" width="28" height="19" rx="2"
                    stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.85" />
                <rect x="21" y="24" width="10" height="6" rx="1"
                    fill="#c9a84c" opacity="0.9" />
                <line x1="21" y1="34" x2="31" y2="34"
                    stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                </svg>
            </div>

            {/* Nama */}
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                <span style={{ color: "#c9a84c" }}>SIPER</span>WEB
            </h1>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
                Sistem Pemilihan Elektronik
            </p>

            {/* Divider */}
            <div className="w-14 h-0.5 mb-5 rounded-full"
                style={{ background: "rgba(201,168,76,0.50)" }} />

            {/* Tagline */}
            <p className="text-sm font-semibold tracking-[0.22em] uppercase"
                style={{ color: "#c9a84c" }}>
                Suara Anda, Masa Depan Bangsa
            </p>

            {/* Ilustrasi */}
            <div className="mt-14 flex items-end gap-2">
                {[32, 40, 36, 40, 34].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                    <div className="rounded-full"
                    style={{ width: "14px", height: "14px", background: "rgba(255,255,255,0.20)" }} />
                    <div className="rounded-t-lg"
                    style={{
                        width: "22px",
                        height: `${h}px`,
                        background: i === 1 || i === 3
                        ? "rgba(201,168,76,0.35)"
                        : "rgba(255,255,255,0.15)",
                    }}
                    />
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* KANAN — Form Card */}
        <div
            className="flex-1 flex items-center justify-center px-6 py-10"
            style={{ background: "#f3f5f9" }}
        >
            <div
            className="bg-white rounded-2xl w-full max-w-150 p-8"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
            >
            {children}
            </div>
        </div>

        </div>
    )
}