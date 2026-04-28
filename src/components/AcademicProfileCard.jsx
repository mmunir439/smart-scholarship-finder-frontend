"use client";

import { useEffect, useState } from "react";
import axios from "@/app/utils/axios";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AcademicProfileCard() {
    const { t } = useTranslation();

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
            const res = await axios.get("/academicRoutes/single");

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
                await axios.put("/academicRoutes/edit", form);
            } else {
                await axios.post("/academicRoutes/add", form);
            }

            setEditing(false);
            loadProfile();
        } catch {
            alert(t("profile.error_save"));
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm(t("profile.confirm_delete"))) return;

        try {
            await axios.delete("/academicRoutes/delete");

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

                {exists && !editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1 text-blue-600"
                    >
                        <Pencil size={16} /> {t("profile.edit")}
                    </button>
                )}
            </div>

            {/* VIEW MODE */}
            {exists && !editing ? (
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
            ) : (

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input label={t("profile.cgpa")} name="cgpa" value={form.cgpa} onChange={handleChange} />
                    <Input label={t("profile.ielts")} name="ielts" value={form.ielts} onChange={handleChange} />
                    <Input label={t("profile.degree")} name="degreeLevel" value={form.degreeLevel} onChange={handleChange} />
                    <Input label={t("profile.field")} name="field" value={form.field} onChange={handleChange} />

                    <div className="col-span-full flex gap-3 mt-2">

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                        >
                            <Save size={16} />
                            {loading ? t("profile.saving") : t("profile.save")}
                        </button>

                        {exists && (
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="flex items-center justify-center gap-2 bg-gray-300 px-4 py-2 rounded-lg w-full"
                            >
                                <X size={16} /> {t("profile.cancel")}
                            </button>
                        )}

                    </div>
                </form>
            )}
        </div>
    );
}

/* INPUT */
function Input({ label, ...props }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <input {...props} className="border rounded-lg px-3 py-2" />
        </div>
    );
}

/* INFO */
function Info({ label, value }) {
    return (
        <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="font-semibold text-gray-800">{value || "-"}</p>
        </div>
    );
}