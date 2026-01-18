import React from 'react';

export type SwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
};

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  onChange,
  description,
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3 cursor-pointer hover:bg-black/40 transition-colors">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">{label}</span>
          {description && (
            <span className="text-xs text-white/50 mt-0.5">{description}</span>
          )}
        </div>

        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />

          <div className="h-5 w-9 rounded-full bg-white/20 transition-colors peer-checked:bg-indigo-600" />
          <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
        </div>
      </label>
    </div>
  );
};
