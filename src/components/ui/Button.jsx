"use client";

const variants = {
  primary:
    "bg-orange-500 text-white shadow-lg hover:bg-orange-600 active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-orange-100",
  secondary:
    "bg-[#07162d] text-white shadow-md hover:bg-[#0b2447] active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-slate-200",
  outline:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-4 focus-visible:ring-gray-100",
  ghost:
    "bg-white/10 text-white border border-white/10 hover:bg-white/15",
  danger:
    "bg-red-600/20 text-red-300 hover:bg-red-600/30",
};

const sizes = {
  sm: "px-3 py-2 text-sm rounded-lg",
  md: "px-4 py-3 text-sm rounded-xl sm:text-base",
  lg: "px-6 py-3.5 text-base rounded-xl",
  icon: "p-2.5 rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
