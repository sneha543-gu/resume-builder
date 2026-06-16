import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
  icon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, icon, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="label">
            {label} {props.required && <span style={{ color: 'var(--color-error)' }}>*</span>}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {icon && (
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`input-field ${error ? 'error' : ''} ${className}`}
            style={{ paddingLeft: icon ? '38px' : '14px' }}
            autoComplete="off"
            {...props}
          />
        </div>
        {error && (
          <span className="error-text">
            <AlertCircle size={12} />
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
