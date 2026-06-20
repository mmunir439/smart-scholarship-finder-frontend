import { inputClass, labelClass } from "@/lib/styles";

export default function Input({
  label,
  error,
  required,
  className = "",
  inputClassName = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className={labelClass}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <input
        {...props}
        className={`${inputClass} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${inputClassName}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
