"use client"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function ScholarshipsPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            {/* HEADER */}
            <div className="bg-[#0b1d3a] text-white px-6 md:px-12 py-10">
                <h1 className="text-3xl font-bold mb-2">Scholarships</h1>
                <p className="text-sm text-gray-300">
                    Curated international scholarships for Pakistani students. Filter, sort, and find your match.
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-4 gap-6 p-6 md:p-10">

                {/* ✅ LEFT SIDEBAR */}
                <div className="md:col-span-1">
                    <div className="bg-white p-5 rounded-xl shadow-sm 
                          sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto">

                        <div className="flex justify-between mb-4">
                            <h3 className="font-semibold">Filters</h3>
                            <button className="text-orange-500 text-sm">Reset</button>
                        </div>

                        {/* DEGREE */}
                        <div className="mb-5">
                            <p className="text-xs text-gray-500 mb-2">DEGREE LEVEL</p>
                            <div className="space-y-2 text-sm">
                                <input type="radio" name="degree" /> Bachelor's
                                <br />
                                <input type="radio" name="degree" /> Master's
                                <br />
                                <input type="radio" name="degree" /> PhD
                            </div>
                        </div>

                        {/* COUNTRY */}
                        <div className="mb-5">
                            <p className="text-xs text-gray-500 mb-2">COUNTRY</p>
                            <div className="space-y-2 text-sm">
                                <input type="checkbox" /> USA <br />
                                <input type="checkbox" /> UK <br />
                                <input type="checkbox" /> Germany <br />
                                <input type="checkbox" /> France <br />                         <input type="checkbox" /> Canada <br />
                                <input type="checkbox" /> Australia <br />
                            </div>
                        </div>

                        {/* FIELD */}
                        <div className="mb-5">
                            <p className="text-xs text-gray-500 mb-2">FIELD OF STUDY</p>
                            <div className="space-y-2 text-sm">
                                <input type="checkbox" /> Engineering <br />
                                <input type="checkbox" /> Computer Science <br />
                                <input type="checkbox" /> Medicine <br />
                                <input type="checkbox" /> Business <br />
                                <input type="checkbox" /> Arts <br />
                                <input type="checkbox" /> Law <br />
                                <input type="checkbox" /> Social Sciences <br />
                                <input type="checkbox" /> Natural Sciences <br />
                            </div>
                        </div>

                        {/* ELIGIBILITY */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2">ELIGIBILITY STATUS</p>
                            <div className="space-y-2 text-sm">
                                <label><input type="radio" name="eligibility" /> Eligible</label>
                                <label><input type="radio" name="eligibility" /> Partial</label>
                                <label><input type="radio" name="eligibility" /> Not Eligible</label>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ✅ RIGHT CONTENT */}
                <div className="md:col-span-3">

                    {/* Top bar */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">10 scholarships found</p>

                        <select className="border rounded-md px-3 py-1 text-sm">
                            <option>Deadline</option>
                            <option>Newest</option>
                        </select>
                    </div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between mb-2">
                                <p className="text-xs text-gray-500">FRANCE • Partial Funding</p>
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Eligible
                                </span>
                            </div>

                            <h3 className="font-semibold text-lg mb-1">
                                Eiffel Excellence Scholarship
                            </h3>

                            <p className="text-sm text-gray-500 mb-2">
                                Sciences Po Paris
                            </p>

                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>Deadline: Jan 10, 2026</span>
                                <button className="text-orange-500">View details</button>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between mb-2">
                                <p className="text-xs text-gray-500">GERMANY • Fully Funded</p>
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Eligible
                                </span>
                            </div>

                            <h3 className="font-semibold text-lg mb-1">
                                Erasmus Mundus Joint Master
                            </h3>

                            <p className="text-sm text-gray-500 mb-2">
                                Multiple EU Universities
                            </p>

                            <div className="text-xs text-gray-500 flex justify-between">
                                <span>Deadline: Feb 15, 2026</span>
                                <button className="text-orange-500">View details</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}