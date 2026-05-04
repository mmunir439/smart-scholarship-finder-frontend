"use client";

import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input"
import Select from "@/components/Select"
export default function AcademicProfileCard() {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        cgpa: "",
        ielts: "",
        degreeLevel: "",
        field: "",
    });

    const [loading, setLoading] = useState(false);
    const [exists, setExists] = useState(false);
    const [editing, setEditing] = useState(false);

    const loadProfile = async () => {
        try {
            const res = await axios.get("/academic/profile");

            if (res.data.data) {
                setForm(res.data.data);
                setExists(true);
            } else {
                setExists(false);
            }
        } catch {
            setExists(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (exists) {
                await axios.put("/academic/profile", form);
            } else {
                await axios.post("/academic/profile", form);
            }

            setShowForm(false);   // ✅ close form
            await loadProfile();  // ✅ refresh data
        } catch {
            alert(t("profile.error_save"));
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm(t("profile.confirm_delete"))) return;

        try {
            await axios.delete("/academic/profile");

            setForm({
                cgpa: "",
                ielts: "",
                degreeLevel: "",
                field: "",
            });

            setExists(false);
            setEditing(false);
        } catch {
            alert(t("profile.error_delete"));
        }
    };
    function Info({ label, value }) {
        return (
            <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="font-semibold text-gray-800">
                    {value || "-"}
                </p>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {t("profile.title")}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t("profile.subtitle")}
                    </p>
                </div>

                {/* EDIT BUTTON */}
                {exists && !showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-1 text-blue-600"
                    >
                        <Pencil size={16} /> {t("profile.edit")}
                    </button>
                )}
            </div>

            {/* 🆕 NO PROFILE */}
            {!exists && !showForm && (
                <div className="text-center py-6">
                    <p className="text-gray-500 mb-3">
                        No academic profile found
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        ➕ Add Profile
                    </button>
                </div>
            )}

            {/* 👁 VIEW MODE */}
            {exists && !showForm && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                    <Info label={t("profile.cgpa")} value={form.cgpa} />
                    <Info label={t("profile.ielts")} value={form.ielts} />
                    <Info label={t("profile.degree")} value={form.degreeLevel} />
                    <Info label={t("profile.field")} value={form.field} />

                    <button
                        onClick={handleDelete}
                        className="mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg col-span-full"
                    >
                        <Trash2 size={16} /> {t("profile.delete")}
                    </button>

                </div>
            )}

            {/* 📝 FORM */}
            {showForm && (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input label="CGPA" name="cgpa" value={form.cgpa} onChange={handleChange} />

                    {/* ✅ IELTS DROPDOWN */}
                    <Select
                        label="IELTS"
                        name="ielts"
                        value={form.ielts}
                        onChange={handleChange}
                        options={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]}
                    />

                    {/* ✅ DEGREE DROPDOWN */}
                    <Select
                        label="Degree"
                        name="degreeLevel"
                        value={form.degreeLevel}
                        onChange={handleChange}
                        options={["Bachelor", "Master", "PhD"]}
                    />

                    {/* ✅ FIELD DROPDOWN */}
                    <Select
                        label="Field"
                        name="field"
                        value={form.field}
                        onChange={handleChange}
                        options={[
                            "Computer Science", "Software Engineering", "Business Administration",
                            "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
                            "Medicine", "Law", "Finance", "Marketing", "Psychology",
                            "Data Science", "Artificial Intelligence", "Information Technology",
                            "Economics", "Architecture", "Biotechnology", "Physics", "Mathematics", "Other"
                        ]}
                    />

                    <div className="col-span-full flex gap-3 mt-2">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-300 px-4 py-2 rounded-lg w-full"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            )}

        </div>
    );
}