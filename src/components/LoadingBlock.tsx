export function LoadingBlock() {
  return (
    <div className="card-surface p-6 text-center text-slate-900 dark:text-slate-100">
      <p className="text-lg font-semibold">Fetching the latest weather...</p>
      <p className="text-sm text-slate-500 dark:text-slate-300">One sec while we grab fresh data.</p>
    </div>
  );
}
