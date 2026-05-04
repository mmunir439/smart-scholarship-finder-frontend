export default function Select({ label, name, value, onChange, options }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="border rounded-lg px-3 py-2"
            >
                <option value="">Select {label}</option>

                {options.map((opt, index) => (
                    <option key={index} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}