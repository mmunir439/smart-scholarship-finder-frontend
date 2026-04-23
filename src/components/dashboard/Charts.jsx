"use client";

import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

const countryData = [
    { name: "USA", value: 2 },
    { name: "UK", value: 3 },
    { name: "Germany", value: 2 },
    { name: "France", value: 1 },
];

const degreeData = [
    { name: "Bachelor", value: 2 },
    { name: "Master", value: 7 },
    { name: "PhD", value: 3 },
];

const pieData = [
    { name: "Eligible", value: 60 },
    { name: "Partial", value: 20 },
    { name: "Not Eligible", value: 20 },
];

const COLORS = ["#10B981", "#F5A623", "#9CA3AF"];

// 📊 Country Chart
export function CountryChart() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Scholarships by Country</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={countryData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F5A623" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// 🎓 Degree Chart
export function DegreeChart() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Scholarships by Degree</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={degreeData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0B1B34" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

// 🥧 Eligibility Chart
export function EligibilityChart() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Eligibility Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={80}
                    >
                        {pieData.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={COLORS[i]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}