import { labelClass } from "@/lib/styles";

export default function Select({
  label,
  name,
  value,
  onChange,
  options,
  className = "",
}) {
  return (
    <div className={className}>
      {label && <label className={labelClass}>{label}</label>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
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
