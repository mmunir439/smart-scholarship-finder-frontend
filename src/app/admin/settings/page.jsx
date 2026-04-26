"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = ["general", "scraper", "decision", "account"];

    return (
        <div className="p-6">

            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-4">Settings</h1>

            {/* TABS */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm capitalize ${activeTab === tab
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {tab === "general" && "General"}
                        {tab === "scraper" && "Web Scraper"}
                        {tab === "decision" && "Decision Tree"}
                        {tab === "account" && "Account"}
                    </button>
                ))}
            </div>

            {/* ================= GENERAL ================= */}
            {activeTab === "general" && (
                <div className="grid grid-cols-2 gap-6">

                    {/* SITE SETTINGS */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Site Settings</h2>

                        <div className="space-y-3">
                            <input placeholder="Site Name" className="input" defaultValue="ScholarFinder" />

                            <select className="input">
                                <option>English</option>
                                <option>Urdu</option>
                            </select>

                            <label className="flex items-center justify-between">
                                Multilingual
                                <input type="checkbox" />
                            </label>

                            <label className="flex items-center justify-between">
                                Text-to-Speech
                                <input type="checkbox" />
                            </label>

                            <select className="input">
                                <option>JWT Expiry: 24h</option>
                                <option>JWT Expiry: 7d</option>
                            </select>

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Save Settings
                            </button>
                        </div>
                    </div>

                    {/* SCHOLARSHIP SCOPE */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Scholarship Scope</h2>

                        <div className="space-y-3">
                            {["USA", "Europe", "Bachelor", "Master", "PhD"].map((item) => (
                                <label key={item} className="flex justify-between">
                                    {item}
                                    <input type="checkbox" defaultChecked />
                                </label>
                            ))}

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Save Scope
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= SCRAPER ================= */}
            {activeTab === "scraper" && (
                <div className="grid grid-cols-2 gap-6">

                    {/* SCHEDULE */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Scraper Schedule</h2>

                        <div className="space-y-3">
                            <label className="flex justify-between">
                                Auto Scrape
                                <input type="checkbox" defaultChecked />
                            </label>

                            <input placeholder="Cron (0 0 * * *)" className="input" />

                            <select className="input">
                                <option>Every 24h</option>
                                <option>Every 12h</option>
                            </select>

                            <input placeholder="Delay (ms)" className="input" />
                            <input placeholder="Timeout (ms)" className="input" />

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Run Scraper Now
                            </button>
                        </div>
                    </div>

                    {/* SOURCES */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Trusted Sources</h2>

                        <div className="space-y-2">
                            {["Scholars4Dev", "Opportunities Circle", "Scholarship Positions"].map((src) => (
                                <label key={src} className="flex justify-between">
                                    {src}
                                    <input type="checkbox" defaultChecked />
                                </label>
                            ))}
                        </div>

                        <button className="mt-4 border px-3 py-2 rounded">
                            + Add Source
                        </button>
                    </div>
                </div>
            )}

            {/* ================= DECISION TREE ================= */}
            {activeTab === "decision" && (
                <div className="grid grid-cols-2 gap-6">

                    {/* RULES */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Decision Rules</h2>

                        <div className="space-y-3">
                            <input placeholder="Min CGPA (Masters)" className="input" />
                            <input placeholder="Min CGPA (PhD)" className="input" />
                            <input placeholder="Min IELTS" className="input" />

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Update Rules
                            </button>
                        </div>
                    </div>

                    {/* LOGIC */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Eligibility Logic</h2>

                        <div className="space-y-3">
                            {[
                                "Check CGPA first",
                                "Then IELTS",
                                "Then Degree",
                                "Show Partial Eligibility",
                            ].map((rule) => (
                                <label key={rule} className="flex justify-between">
                                    {rule}
                                    <input type="checkbox" defaultChecked />
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= ACCOUNT ================= */}
            {activeTab === "account" && (
                <div className="grid grid-cols-2 gap-6">

                    {/* PROFILE */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Admin Profile</h2>

                        <div className="space-y-3">
                            <input placeholder="Name" className="input" defaultValue="Admin User" />
                            <input placeholder="Email" className="input" defaultValue="admin@mail.com" />

                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                                Update Profile
                            </button>
                        </div>
                    </div>

                    {/* SECURITY */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="font-semibold mb-4">Security</h2>

                        <div className="space-y-3">
                            <button className="border px-4 py-2 rounded">
                                Change Password
                            </button>

                            <select className="input">
                                <option>JWT Expiry: 24h</option>
                            </select>

                            <label className="flex justify-between">
                                Two-Factor Auth
                                <input type="checkbox" />
                            </label>

                            <div className="border p-3 rounded text-red-500">
                                <p className="font-semibold">Danger Zone</p>
                                <button className="border px-3 py-1 mt-2">
                                    Reset Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}