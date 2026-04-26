"use client";

import { useEffect, useState } from "react";
import { Trash2, X, Eye } from "lucide-react";
import axios from "@/app/utils/axios";

export default function AdminUsersPage() {
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null); // for modal

    // ================= FETCH USERS =================
    const fetchUsers = async () => {
        try {
            const res = await axios.get("/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= DELETE =================
    const handleDelete = async () => {
  try {
    await axios.delete(`/admin/users/${deleteUserId}`);
    setDeleteUserId(null);
    fetchUsers();
  } catch (err) {
    console.error(err);
  }
};

    // ================= VIEW =================
    const handleView = (user) => {
        setSelectedUser(user);
    };

    // ================= UI =================
    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Users Management</h1>
            </div>

            {/* TABLE */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full text-sm border bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Country</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-gray-50">
                                <td className="p-3">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role || "User"}</td>
                                <td>{user.profile?.country || "N/A"}</td>

                                <td className="flex gap-3 p-3">
                                    {/* VIEW */}
                                    <button
                                        onClick={() => handleView(user)}
                                        className="text-blue-500"
                                    >
                                        <Eye size={16} />
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => setDeleteUserId(user._id)}
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
{deleteUserId && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

      <h2 className="text-lg font-semibold mb-3 text-center">
        Delete User
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>

      <div className="flex justify-center gap-4">

        {/* CANCEL */}
        <button
          onClick={() => setDeleteUserId(null)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        {/* CONFIRM */}
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
            {/* VIEW USER MODAL */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg relative">

                        {/* CLOSE */}
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-3 right-3 text-gray-500"
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">
                            User Details
                        </h2>

                        <div className="space-y-2 text-sm">
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Role:</strong> {selectedUser.role}</p>

                            <hr className="my-3" />

                            <p><strong>Country:</strong> {selectedUser.profile?.country || "N/A"}</p>
                            <p><strong>Field:</strong> {selectedUser.profile?.fieldOfStudy || "N/A"}</p>
                            <p><strong>CGPA:</strong> {selectedUser.profile?.cgpa || "N/A"}</p>
                            <p><strong>IELTS:</strong> {selectedUser.profile?.ielts || "N/A"}</p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}