/** Visual wrapper for login/register split layouts */

export function AuthPage({ children }) {
  return (
    <div className="page-bg">
      <div className="edu-container flex min-h-[calc(100vh-140px)] items-center py-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}

export function AuthCard({ children }) {
  return (
    <div className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-lg)] lg:grid-cols-2">
      {children}
    </div>
  );
}

export function AuthHeroPanel({ children, className = "" }) {
  return (
    <div className={`auth-panel flex flex-col justify-between p-6 lg:p-10 xl:p-12 ${className}`}>
      {children}
    </div>
  );
}

export function AuthFormPanel({ children }) {
  return (
    <div className="flex flex-col justify-center bg-white p-6 sm:p-8 lg:p-10">
      {children}
    </div>
  );
}
