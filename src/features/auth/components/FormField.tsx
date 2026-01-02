import React from 'react';
import styles from '../styles/authForm.module.css';

export type FormFieldProps = {
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

export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  required,
  minLength = 8,
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
      <div className={styles.groupControlLine}>
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
        {error && <span className={styles.fieldError}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.groupControl}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        ref={ref}
      />
      {error && (
        <span id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
