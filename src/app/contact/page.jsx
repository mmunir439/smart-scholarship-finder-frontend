"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log(form);
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
    <div className="px-6 md:px-16 py-16">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-2">
          We'd Love to Hear From You
        </h1>
        <p className="text-gray-500">
          Reach out — we respond within 24 hours.
        </p>
      </motion.div>

      {/* MAIN */}
      <div className="grid md:grid-cols-5 gap-10">

        {/* FORM */}
        <div className="md:col-span-3">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                placeholder="Full Name"
                className="w-full border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <select
                className="w-full border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
              >
                <option>General Inquiry</option>
                <option>Scholarship Question</option>
                <option>Technical Issue</option>
                <option>Feedback</option>
              </select>

              <textarea
                rows={5}
                placeholder="Message"
                className="w-full border p-3 rounded"
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button className="w-full bg-[#F5A623] py-3 text-white rounded">
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          ) : (
            <div className="text-green-600 text-center text-lg">
              ✔ Message sent! We'll get back to you soon.
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="md:col-span-2 space-y-4">

          <div className="bg-[#0B1437] text-white p-5 rounded">
            📧 scholarhispguidance.iiui@gmail.com
          </div>

          <div className="bg-[#0B1437] text-white p-5 rounded">
            🏛️ IIUI Islamabad
          </div>

          <div className="bg-[#0B1437] text-white p-5 rounded">
            ⏰ Within 24 hours
          </div>

          {/* FAQ */}
          <div className="mt-6 space-y-3">
            <details className="border p-3 rounded">
              <summary>Is this platform free?</summary>
              Yes, completely free.
            </details>

            <details className="border p-3 rounded">
              <summary>Do you guarantee scholarships?</summary>
              No, guidance only.
            </details>

            <details className="border p-3 rounded">
              <summary>Which countries?</summary>
              USA & Europe.
            </details>
          </div>

        </div>
      </div>

      {/* MAP */}
      <div className="mt-16 bg-[#0B1437] text-white p-10 text-center rounded">
        📍 IIUI Islamabad, H-10, Pakistan
      </div>
    </div>
      <Footer />
      </>
  );
}