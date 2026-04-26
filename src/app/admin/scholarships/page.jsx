"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import axios from "@/app/utils/axios";

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deleteId, setDeleteId] = useState(null); // ✅ FIXED POSITION

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    degreeLevel: "",
    fieldOfStudy: "",
    deadline: "",
    link: "",
    minCGPA: "",
    minIELTS: "",
    description: "",
    source: "",
  });

  // ================= FETCH =================
  const fetchScholarships = async () => {
    try {
      const res = await axios.get("/admin/scholarships");
      setScholarships(res.data.scholarships);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= OPEN MODAL =================
  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      country: "",
      degreeLevel: "",
      fieldOfStudy: "",
      deadline: "",
      link: "",
      minCGPA: "",
      minIELTS: "",
      description: "",
      source: "",
    });
    setShowModal(true);
  };

  const openEditModal = (s) => {
    setEditingId(s._id);
    setFormData({
      ...s,
      deadline: s.deadline?.slice(0, 10),
    });
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/admin/scholarships/${editingId}`, formData);
      } else {
        await axios.post("/admin/addScholarships", formData);
      }

      setShowModal(false);
      fetchScholarships();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/scholarships/${deleteId}`);
      setDeleteId(null);
      fetchScholarships();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Scholarships</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} />
          Add Scholarship
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm border bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Country</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td>{s.country}</td>
                <td>{s.degreeLevel}</td>
                <td>{s.deadline?.slice(0, 10)}</td>

                <td className="flex gap-3 p-3">
                  <button onClick={() => openEditModal(s)} className="text-blue-500">
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => setDeleteId(s._id)}
                    className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition"
                  >
                    <Trash2 size={14} />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Delete Scholarship
            </h2>

            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete this scholarship?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[600px] shadow-lg relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Scholarship" : "Add Scholarship"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="input" />
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="input" />
              <input name="degreeLevel" value={formData.degreeLevel} onChange={handleChange} placeholder="Degree Level" className="input" />
              <input name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} placeholder="Field" className="input" />
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="input" />
              <input name="link" value={formData.link} onChange={handleChange} placeholder="Link" className="input" />

              <input name="minCGPA" value={formData.minCGPA} onChange={handleChange} placeholder="Min CGPA" className="input" />
              <input name="minIELTS" value={formData.minIELTS} onChange={handleChange} placeholder="Min IELTS" className="input" />

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="col-span-2 input" />
              <input name="source" value={formData.source} onChange={handleChange} placeholder="Source" className="input" />

              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg"
                >
                  {editingId ? "Save Changes" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}