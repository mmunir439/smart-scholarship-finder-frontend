"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import { useTranslation } from "react-i18next";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiExternalLink,
} from "react-icons/fi";

const initialForm = {
  name: "",
  country: "",
  degreeLevel: "",
  field: "",
  deadline: "",
  link: "",
  minCGPA: "",
  minIELTS: "",
  description: "",
  source: "",
};

export default function AdminScholarshipsPage() {
  const { t } = useTranslation();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const tx = (key, fallback) => t(key, fallback);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/scholarship/all");
      setScholarships(res?.data?.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Failed to load scholarships.");
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return scholarships;
    return scholarships.filter((s) =>
      [s.name, s.country, s.degreeLevel, s.field, s.source]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [scholarships, search]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (s) => {
    setEditingId(s._id);
    setFormData({
      name: s.name ?? "",
      country: s.country ?? "",
      degreeLevel: s.degreeLevel ?? "",
      field: s.field ?? "",
      deadline: s.deadline ? String(s.deadline).slice(0, 10) : "",
      link: s.link ?? "",
      minCGPA: s.minCGPA ?? "",
      minIELTS: s.minIELTS ?? s.ielts ?? "",
      description: s.description ?? "",
      source: s.source ?? "",
    });
    setShowModal(true);
  };

  const normalizePayload = (data) => ({
    name: data.name.trim(),
    country: data.country.trim(),
    degreeLevel: data.degreeLevel.trim(),
    field: data.field.trim(),
    deadline: data.deadline,
    link: data.link.trim(),
    source: data.source.trim(),
    description: data.description?.trim() || "",
    minCGPA: data.minCGPA === "" ? null : Number(data.minCGPA),
    minIELTS: data.minIELTS === "" ? null : Number(data.minIELTS),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");

      const payload = normalizePayload(formData);

      if (editingId) {
        await axios.put(`/scholarship/update/${editingId}`, payload);
      } else {
        await axios.post("/scholarship/create", payload);
      }

      setShowModal(false);
      setEditingId(null);
      setFormData(initialForm);
      await fetchScholarships();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to save scholarship.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setSubmitting(true);
      setError("");
      await axios.delete(`/scholarship/delete/${deleteId}`);
      setDeleteId(null);
      await fetchScholarships();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to delete scholarship.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {tx("admin.title", "Scholarships Management")}
          </h1>
          <p className="text-sm text-gray-500">
            Create, update, and manage scholarship records.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FiPlus size={16} />
          {tx("admin.add", "Add Scholarship")}
        </button>
      </div>

      <div className="bg-white rounded-xl border p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, country, degree, field..."
          className="w-full md:w-96 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">
            {tx("admin.loading", "Loading...")}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No scholarships found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Country</th>
                  <th className="text-left p-3">Degree</th>
                  <th className="text-left p-3">Field</th>
                  <th className="text-left p-3">Deadline</th>
                  <th className="text-left p-3">Link</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id} className="border-t">
                    <td className="p-3 font-medium text-gray-900">{s.name}</td>
                    <td className="p-3">{s.country}</td>
                    <td className="p-3">{s.degreeLevel}</td>
                    <td className="p-3">{s.field || "-"}</td>
                    <td className="p-3">{s.deadline?.slice(0, 10) || "-"}</td>
                    <td className="p-3">
                      {s.link ? (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          Open <FiExternalLink size={14} />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border hover:bg-gray-50"
                        >
                          <FiEdit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(s._id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editingId ? "Update Scholarship" : "Create Scholarship"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className="border rounded-lg px-3 py-2" required />
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Country *" className="border rounded-lg px-3 py-2" required />
              <input name="degreeLevel" value={formData.degreeLevel} onChange={handleChange} placeholder="Degree Level *" className="border rounded-lg px-3 py-2" required />
              <input name="field" value={formData.field} onChange={handleChange} placeholder="Field *" className="border rounded-lg px-3 py-2" required />

              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="border rounded-lg px-3 py-2" required />
              <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="Link *" className="border rounded-lg px-3 py-2" required />
              <input name="source" value={formData.source} onChange={handleChange} placeholder="Source *" className="border rounded-lg px-3 py-2" required />

              <input type="number" step="0.01" name="minCGPA" value={formData.minCGPA} onChange={handleChange} placeholder="Min CGPA" className="border rounded-lg px-3 py-2" />
              <input type="number" step="0.5" name="minIELTS" value={formData.minIELTS} onChange={handleChange} placeholder="Min IELTS" className="border rounded-lg px-3 py-2" />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={4}
                className="md:col-span-2 border rounded-lg px-3 py-2"
              />

              <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50"
                >
                  <FiX /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <FiSave /> {submitting ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900">Delete Scholarship</h3>
            <p className="text-sm text-gray-600 mt-1">
              Are you sure you want to delete this scholarship? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {submitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}