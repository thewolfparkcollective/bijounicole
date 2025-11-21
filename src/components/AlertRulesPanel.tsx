import { AlertRule, WeatherData } from '../types/weather';
import { evaluateRules } from '../utils/alerts';

interface Props {
  rules: AlertRule[];
  onUpdate(rule: AlertRule): void;
  data?: WeatherData;
}

export function AlertRulesPanel({ rules, onUpdate, data }: Props) {
  const messages = evaluateRules(rules, data);
  return (
    <div className="card-surface flex flex-col gap-4 p-4 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Alerts</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">Client-side preview</p>
      </div>
      <div className="flex flex-col gap-3">
        {rules.map(rule => (
          <label key={rule.id} className="flex items-start gap-3 rounded-xl bg-white/60 px-3 py-2 dark:bg-slate-800/70">
            <input
              type="checkbox"
              checked={rule.enabled}
              onChange={e => onUpdate({ ...rule, enabled: e.target.checked })}
              className="mt-1 h-4 w-4 accent-sky-500"
            />
            <div className="flex-1">
              <p className="font-semibold">{rule.label}</p>
              {rule.coldThreshold !== undefined && (
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Trigger below:</span>
                  <input
                    type="number"
                    value={rule.coldThreshold}
                    onChange={e => onUpdate({ ...rule, coldThreshold: Number(e.target.value) })}
                    className="w-20 rounded-lg border border-white/30 bg-white/50 px-2 py-1 text-slate-900 focus:border-sky-500 focus:outline-none dark:bg-slate-900/70 dark:text-white"
                  />
                  <span>°C</span>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
      {messages.length > 0 && (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900 dark:border-sky-800 dark:bg-sky-900/30 dark:text-sky-100">
          {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
}
