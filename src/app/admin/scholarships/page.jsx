"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import axios from "@/app/utils/axios";
import { useTranslation } from "react-i18next";

export default function AdminScholarshipsPage() {
  const { t } = useTranslation();

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/scholarships/${deleteId}`);
      setDeleteId(null);
      fetchScholarships();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("admin.title")}</h1>

        <button onClick={openAddModal} className="flex gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg">
          <Plus size={16} />
          {t("admin.add")}
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>{t("admin.loading")}</p>
      ) : (
        <table className="w-full text-sm border bg-white">
          <thead>
            <tr>
              <th>{t("admin.name")}</th>
              <th>{t("admin.country")}</th>
              <th>{t("admin.degree")}</th>
              <th>{t("admin.deadline")}</th>
              <th>{t("admin.actions")}</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.country}</td>
                <td>{s.degreeLevel}</td>
                <td>{s.deadline?.slice(0, 10)}</td>

                <td className="flex gap-2">
                  <button onClick={() => openEditModal(s)}>
                    <Pencil size={16} />
                  </button>

                  <button onClick={() => setDeleteId(s._id)}>
                    <Trash2 size={16} /> {t("admin.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h2>{t("admin.delete_title")}</h2>
            <p>{t("admin.delete_msg")}</p>

            <button onClick={() => setDeleteId(null)}>
              {t("admin.cancel")}
            </button>

            <button onClick={handleDelete}>
              {t("admin.delete")}
            </button>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[500px]">

            <h2>
              {editingId ? t("admin.edit") : t("admin.add")}
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-2">

              <input name="name" placeholder={t("admin.name")} onChange={handleChange} value={formData.name} />
              <input name="country" placeholder={t("admin.country")} onChange={handleChange} value={formData.country} />
              <input name="degreeLevel" placeholder={t("admin.degree")} onChange={handleChange} value={formData.degreeLevel} />
              <input name="fieldOfStudy" placeholder={t("admin.field")} onChange={handleChange} value={formData.fieldOfStudy} />

              <button type="button" onClick={() => setShowModal(false)}>
                {t("admin.cancel")}
              </button>

              <button type="submit">
                {editingId ? t("admin.save") : t("admin.add")}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}