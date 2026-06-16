import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="label">
            {label} {props.required && <span style={{ color: 'var(--color-error)' }}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`input-field ${error ? 'error' : ''} ${className}`}
          style={{ resize: 'vertical', minHeight: '100px' }}
          {...props}
        />
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

TextareaField.displayName = 'TextareaField';
export default TextareaField;
