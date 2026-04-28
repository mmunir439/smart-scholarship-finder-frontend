import { useTranslation } from "react-i18next";
export default function AdminStatsCard({ title, value, icon, color = "orange" }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };
const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${colors[color]}`}>
        {t("icon")}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{t("title")}</p>
        <p className="text-2xl font-bold text-[#0b1d3a]">{t("value")}</p>
      </div>
    </div>
  );
}