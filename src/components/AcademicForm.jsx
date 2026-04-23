"use client";
import { useState } from "react";
import axios from "@/app/utils/axios";

export default function AcademicForm() {
    const [formData, setFormData] = useState({
        cgpa: "",
        ielts: "",
        degreeLevel: "",
        field: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/academicinformation/academicinformation", formData);
            console.log(res.data);
            alert("Data submitted successfully ✅");
        } catch (error) {
            console.error(error);
            alert("Error submitting data ❌");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">
                Academic Information
            </h2>

            {/* CGPA */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    CGPA
                </label>
                <input
                    type="number"
                    name="cgpa"
                    placeholder="Enter CGPA"
                    value={formData.cgpa}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="4"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* IELTS */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    IELTS
                </label>
                <input
                    type="number"
                    name="ielts"
                    placeholder="Enter IELTS"
                    value={formData.ielts}
                    onChange={handleChange}
                    step="0.5"
                    min="0"
                    max="9"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Degree */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Degree Level
                </label>
                <select
                    name="degreeLevel"
                    value={formData.degreeLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Degree</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                </select>
            </div>

            {/* Field */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Field
                </label>
                <select
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Field</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Arts">Arts</option>
                    <option value="Law">Law</option>
                </select>
            </div>

            {/* Button */}
            <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
}