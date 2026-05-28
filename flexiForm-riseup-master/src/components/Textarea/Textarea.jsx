import React from 'react';
import './Textarea.css';

export default function Textarea({ 
  id, 
  label, 
  placeholder, 
  required = false,
  value,
  onChange,
  visible = true,
  rows = 4,
  validation,
  className = ''
}) {
  if (!visible) {
    return null;
  }

  const handleChange = (e) => {
    if (onChange) {
      onChange(id, e.target.value);
    }
  };

  return (
    <div className={`form-field textarea-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        value={value || ''}
        onChange={handleChange}
        className="form-textarea"
      />
      {validation && validation.error && (
        <span className="error-message">{validation.error}</span>
      )}
    </div>
  );
}

