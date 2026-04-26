"use client";

import CountUp from "react-countup";

export default function Stats() {
  const getProfile=()=>{
    
  }
  return (
    <section className="bg-[#0b1d3a] py-16 text-center text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Stat 1 */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
            <CountUp end={500} duration={2} />+
          </h2>
          <p className="text-sm tracking-widest mt-2 text-gray-300">
            SCHOLARSHIPS
          </p>
        </div>

        {/* Stat 2 */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
            <CountUp end={10000} duration={2.5} separator="," />+
          </h2>
          <p className="text-sm tracking-widest mt-2 text-gray-300">
            STUDENTS HELPED
          </p>
        </div>

        {/* Stat 3 */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
            <CountUp end={50} duration={2} />+
          </h2>
          <p className="text-sm tracking-widest mt-2 text-gray-300">
            COUNTRIES
          </p>
        </div>

      </div>
    </section>
  );
}