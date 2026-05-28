import React from 'react';
import './Checkbox.css';

export default function Checkbox({ 
  id, 
  label, 
  checked = false,
  onChange,
  visible = true,
  required = false,
  className = ''
}) {
  if (!visible) {
    return null;
  }

  const handleChange = (e) => {
    if (onChange) {
      onChange(id, e.target.checked);
    }
  };

  return (
    <div className={`form-field checkbox-field ${className}`}>
      <label htmlFor={id} className="checkbox-label">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          required={required}
          className="checkbox-input"
        />
        <span className="checkbox-text">
          {label}
          {required && <span className="required">*</span>}
        </span>
      </label>
    </div>
  );
}

