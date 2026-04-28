"use client";
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
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
export function CountryChart({ data }) {

    const countryMap = {};

    data.forEach(item => {
        const country = item?.scholarship?.country;
        if (country) {
            countryMap[country] = (countryMap[country] || 0) + 1;
        }
    });

    const chartData = Object.keys(countryMap).map(key => ({
        name: key,
        value: countryMap[key],
    }));

    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Scholarships by Country</h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F5A623" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
// 🎓 Degree Chart
export function DegreeChart({ data }) {

    const degreeMap = {};

    data.forEach(item => {
        const degree = item?.scholarship?.degreeLevel;
        if (degree) {
            degreeMap[degree] = (degreeMap[degree] || 0) + 1;
        }
    });

    const chartData = Object.keys(degreeMap).map(key => ({
        name: key,
        value: degreeMap[key],
    }));

    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Scholarships by Degree</h3>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0B1B34" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
// 🥧 Eligibility Chart
export function EligibilityChart({ data }) {

    let eligible = 0;
    let notEligible = 0;
    let partial = 0;

    data.forEach(item => {
        if (item.status === "Eligible") eligible++;
        else if (item.status === "Not Eligible") notEligible++;
        else partial++;
    });

    const chartData = [
        { name: "Eligible", value: eligible },
        { name: "Partial", value: partial },
        { name: "Not Eligible", value: notEligible },
    ];

    const COLORS = ["#10B981", "#F5A623", "#9CA3AF"];

    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h3 className="mb-4 font-semibold">Eligibility Breakdown</h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={80}
                    >
                        {chartData.map((entry, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}