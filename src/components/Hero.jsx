"use client"
import Link from "next/link"
export default function Hero() {
    return (
        <section className="bg-[#0b1d3a] text-white px-10 py-20 flex flex-col md:flex-row items-center justify-between">

            {/* LEFT SIDE */}
            <div className="max-w-xl">

                {/* Badge */}
                <div className="inline-block border border-orange-400 text-orange-400 text-xs px-3 py-1 rounded-full mb-6">
                    ✨ AI-powered scholarship matching
                </div>

                {/* Heading */}
                <h1 className="text-5xl font-bold leading-tight mb-6">
                    Find Your Perfect{" "}
                    <span className="text-orange-500 block">
                        International Scholarship
                    </span>
                </h1>

                {/* Description */}
                <p className="text-gray-300 mb-8">
                    ScholarPath helps Pakistani students discover, qualify, and apply
                    to fully-funded scholarships across the USA and Europe — with confidence.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mb-6">
                    <Link href={"/register"} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md font-semibold">
                        Get Started Free →
                    </Link>

                    <Link href={"/scholarships"} className="border border-gray-500 px-6 py-3 rounded-md hover:border-white">
                        Browse Scholarships
                    </Link>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-yellow-400">★★★★★</span>
                    <span>Trusted by 10,000+ students</span>
                </div>
            </div>

            {/* RIGHT SIDE CARD */}
            <div className="mt-10 md:mt-0 bg-[#13264d] p-6 rounded-xl shadow-lg w-[320px]">

                {/* Title */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-semibold">Fulbright Program</h3>
                        <p className="text-xs text-gray-400">United States</p>
                    </div>
                    <span className="text-xs bg-orange-500 px-2 py-1 rounded">
                        Master's
                    </span>
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <p className="text-xs mb-1">Eligibility match</p>
                    <div className="w-full bg-gray-700 h-2 rounded">
                        <div className="bg-orange-500 h-2 rounded w-[94%]"></div>
                    </div>
                    <p className="text-right text-xs mt-1 text-orange-400">94%</p>
                </div>

                {/* Info */}
                <div className="flex justify-between text-sm">
                    <div>
                        <p className="text-gray-400 text-xs">Funding</p>
                        <p className="font-semibold">Full</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs">Deadline</p>
                        <p className="font-semibold">May 15</p>
                    </div>
                </div>

            </div>
        </section>
    );
}