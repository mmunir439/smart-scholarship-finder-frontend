/** Visual wrapper for login/register split layouts — styling only */

export function AuthPage({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/50">
      <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {children}
      </div>
    </div>
  );
}

export function AuthCard({ children }) {
  return (
    <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 lg:grid-cols-2">
      {children}
    </div>
  );
}

export function AuthHeroPanel({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#07162d] via-[#0b2447] to-orange-600 p-6 text-white lg:flex lg:flex-col lg:justify-between xl:p-12 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function AuthFormPanel({ children }) {
  return <div className="p-5 sm:p-8 lg:p-10">{children}</div>;
}
