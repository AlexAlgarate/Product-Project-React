import React from 'react';

export type FormInputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  helper?: string;
  as?: 'input' | 'textarea';
  type?: 'text' | 'number';
  required?: boolean;
};

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value = '',
  onChange,
  placeholder,
  helper,
  as = 'input',
  type = 'text',
  required = false,
}) => {
  const baseClass =
    'w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 ' +
    'text-sm text-white placeholder:text-white/40 ' +
    'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ' +
    'transition-colors';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-white/80">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          className={baseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={baseClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}

      {helper && <span className="text-xs text-white/50">{helper}</span>}
    </div>
  );
};
