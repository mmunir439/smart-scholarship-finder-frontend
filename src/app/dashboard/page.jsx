"use client"
import react from "react"
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import {
    CountryChart,
    DegreeChart,
    EligibilityChart,
} from "@/components/dashboard/Charts";
import AcademicProfileCard from "@/components/AcademicProfileCard"
import axios from "@/app/utils/axios"
import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { Menu, X } from "lucide-react";
import { getUser } from "../utils/token";
import { useEffect } from "react";
export default function Page() {
    const [user, setUser] = useState({});
    const getUser = async () => {
        try {
            const res = await axios.get("/user/getUser");
            setUser(res.data)
            console.log("full response:", res.data);

            // ✅ correct access
            console.log(`user role: ${res.data.role}`);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    return (
        <DashboardLayout>
            <div className="bg-white border-b px-6 py-4 mb-6 rounded-lg shadow-sm">
                <h2 className="(text)-lg font-semibold text-gray-800">
                    Dashboard
                </h2>
            </div>
            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome back, {user.name} 👋
                </h1>
                <p className="text-gray-500">Friday, April 24</p>
            </div>
            <AcademicProfileCard />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatsCard title="Total Matches" value="10" />
                <StatsCard title="Eligible" value="6" />
                <StatsCard title="Saved" value="3" />
                <StatsCard title="Profile" value="85%" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <CountryChart />
                <EligibilityChart />
                <DegreeChart />
            </div>

            {/* Bottom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <RecentMatches />
                </div>
                <ProfileCompletion />
            </div>
        </DashboardLayout>
    );
}