export default function Works() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">

                {/* Top Label */}
                <p className="text-orange-500 text-sm font-semibold tracking-widest mb-4">
                    HOW IT WORKS
                </p>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-[#0b1d3a] mb-4">
                    Three steps to your future
                </h2>

                {/* Subtext */}
                <p className="text-gray-500 mb-16">
                    From profile to acceptance — we guide you the whole way.
                </p>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-10 items-center">

                    {/* STEP 1 */}
                    <div className="flex flex-col items-center text-center relative">

                        <div className="bg-[#0b1d3a] w-20 h-20 rounded-2xl flex items-center justify-center text-orange-400 text-3xl relative">
                            👤
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                                1
                            </span>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-[#0b1d3a]">
                            Enter Your Profile
                        </h3>

                        <p className="text-gray-500 text-sm mt-2 max-w-xs">
                            Share your academic background, interests, and goals in minutes.
                        </p>
                    </div>

                    {/* STEP 2 */}
                    <div className="flex flex-col items-center text-center relative">

                        <div className="bg-[#0b1d3a] w-20 h-20 rounded-2xl flex items-center justify-center text-orange-400 text-3xl relative">
                            ✨
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                                2
                            </span>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-[#0b1d3a]">
                            AI Matches You
                        </h3>

                        <p className="text-gray-500 text-sm mt-2 max-w-xs">
                            Our engine ranks scholarships by your real eligibility — not guesses.
                        </p>
                    </div>

                    {/* STEP 3 */}
                    <div className="flex flex-col items-center text-center relative">

                        <div className="bg-[#0b1d3a] w-20 h-20 rounded-2xl flex items-center justify-center text-orange-400 text-3xl relative">
                            ✈️
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                                3
                            </span>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-[#0b1d3a]">
                            Apply with Confidence
                        </h3>

                        <p className="text-gray-500 text-sm mt-2 max-w-xs">
                            Get tailored guidance, deadlines, and document checklists.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}