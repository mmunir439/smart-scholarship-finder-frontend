"use client"
import react from "react"
import Link from "next/link"
export default function () {
    return (
        <>
            <nav>
                <Link href={"/"} className="bg-white-100 text-yellow-400">Dashboard</Link>
            </nav>
        </>
    )
}