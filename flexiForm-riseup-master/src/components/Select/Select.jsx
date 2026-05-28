import React from 'react';
import './Select.css';

export default function Select({ 
  id, 
  label, 
  options = [],
  required = false,
  value,
  onChange,
  visible = true,
  placeholder = 'Selecione uma opção',
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
    <div className={`form-field select-field ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={id}
        required={required}
        value={value || ''}
        onChange={handleChange}
        className="form-select"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'object' ? option.value : option}>
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );
}

