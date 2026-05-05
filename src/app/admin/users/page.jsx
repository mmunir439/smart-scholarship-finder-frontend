"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axios";
import {
    FiTrash2,
    FiSearch,
    FiUsers,
    FiAlertTriangle,
    FiX,
    FiRefreshCw,
} from "react-icons/fi";

export default function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await axios.get("/user");
            setUsers(res?.data?.data ?? []);
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Failed to load users");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;

        return users.filter((u) =>
            [u.name, u.email, u.role]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q))
        );
    }, [users, search]);

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            setDeleting(true);
            await axios.delete(`/user/delete/${deleteId}`);
            setDeleteId(null);
            await getAllUsers();
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.message || "Failed to delete user");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FiUsers /> Users Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        View and remove users from the system.
                    </p>
                </div>

                <button
                    onClick={getAllUsers}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                    <FiRefreshCw size={16} />
                    Refresh
                </button>
            </div>

            <div className="bg-white border rounded-xl p-4">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or role"
                        className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm flex items-center gap-2">
                    <FiAlertTriangle /> {error}
                </div>
            )}

            <div className="bg-white border rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-6 text-sm text-gray-500">Loading users...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No users found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="text-left p-3">Name</th>
                                    <th className="text-left p-3">Email</th>
                                    <th className="text-left p-3">Role</th>
                                    <th className="text-left p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-900">
                                            {user.name || "-"}
                                        </td>
                                        <td className="p-3 text-gray-600">{user.email || "-"}</td>
                                        <td className="p-3">
                                            <span className="inline-flex px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                {user.role || "student"}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => setDeleteId(user._id)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
                                            >
                                                <FiTrash2 size={14} />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete User
                            </h2>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <FiX />
                            </button>
                        </div>

                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete this user? This action cannot be
                            undone.
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
                                disabled={deleting}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}