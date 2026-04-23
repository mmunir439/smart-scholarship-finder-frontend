export default function StatsCard({ title, value }) {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm w-full">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
    );
}