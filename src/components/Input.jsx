export default function Input({ label, ...props }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <input {...props} className="border rounded-lg px-3 py-2" />
        </div>
    );
}