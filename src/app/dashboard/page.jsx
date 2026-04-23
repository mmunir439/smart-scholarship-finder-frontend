import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import {
    CountryChart,
    DegreeChart,
    EligibilityChart,
} from "@/components/dashboard/Charts";

import { RecentMatches } from "@/components/dashboard/RecentMatches";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { Menu, X } from "lucide-react";
export default function Page() {
    return (
        <DashboardLayout>
            <div className="bg-white border-b px-6 py-4 mb-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                    Dashboard
                </h2>
            </div>
            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome back, Muhammad 👋
                </h1>
                <p className="text-gray-500">Friday, April 24</p>
            </div>

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