"use client";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost-light",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-200 transition hover:bg-red-100",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm rounded-lg",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-6 py-3.5 text-base",
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
  const sizeClass = size === "icon" ? sizes.icon : "";
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${variantClass} ${sizeClass} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
