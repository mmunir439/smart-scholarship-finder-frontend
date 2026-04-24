"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

const mockScholarships = [
  { id: 1, name: "Fulbright Program", country: "USA", degree: "Masters / PhD", deadline: "2025-10-15", status: "Active" },
  { id: 2, name: "DAAD Scholarship", country: "Germany", degree: "Masters", deadline: "2025-11-01", status: "Active" },
  { id: 3, name: "Chevening Awards", country: "UK", degree: "Masters", deadline: "2025-09-30", status: "Inactive" },
];

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState(mockScholarships);

  const handleDelete = (id) => {
    setScholarships(scholarships.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0b1d3a]">Scholarships</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all listed scholarships</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={16} />
          Add Scholarship
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-left">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Country</th>
              <th className="px-5 py-3">Degree</th>
              <th className="px-5 py-3">Deadline</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-[#0b1d3a]">{s.name}</td>
                <td className="px-5 py-3 text-gray-600">{s.country}</td>
                <td className="px-5 py-3 text-gray-600">{s.degree}</td>
                <td className="px-5 py-3 text-gray-600">{s.deadline}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex items-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}