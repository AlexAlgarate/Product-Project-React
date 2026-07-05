import React from 'react';
import { cn } from '@shared/utils/cn';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  value?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  required,
  minLength,
  autoComplete,
  value,
  checked,
  onChange,
  error,
  ref,
}) => {
  const isCheckbox = type === 'checkbox';

  if (isCheckbox) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          ref={ref}
        />
        <label htmlFor={id}>{label}</label>
        {error && <span className="block text-#ef4444 text-sm mt-1">{error}</span>}
      </div>
    );
  }

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block font-semibold text-[.9rem] mb-1.5 text-text-light"
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={type === 'password' ? 8 : minLength}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={cn(
          `
            w-full box-border px-3.5 py-2.5 text-[0.95rem] 
            rounded-lg bg-bg-dark text-text-light border
            placeholder:text-text-placeholder transition-all duration-200
            focus:outline-none focus:ring-2
          `,
          error
            ? 'border-error focus:border-error focus:ring-error/10'
            : 'border-border focus:border-primary focus:ring-primary/10'
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        ref={ref}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="block text-#ef4444 text-sm mt-1"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

Input.displayName = 'Input';
