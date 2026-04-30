"use client";
import { useState } from "react";

export default function Home() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const Submit = (e) => {
        e.preventDefault();

        console.log(form); // ✅ all data
        // Clear inputs
        setForm({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <>
            <form onSubmit={Submit}>
                <label>UserName:</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border px-10 py-1"
                    type="text"
                    placeholder="name"
                />

                <br />
                <label>Email:</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border px-10 py-1"
                    type="email"
                    placeholder="email"
                />

                <br />

                <label>Password:</label>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="border px-10 py-1"
                    type="password"
                    placeholder="password"
                />

                <br />

                <input type="submit" />
            </form>
        </>
    );
}