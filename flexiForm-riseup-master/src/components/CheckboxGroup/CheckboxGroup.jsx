import React from 'react';
import './CheckboxGroup.css';

export default function CheckboxGroup({ 
  id, 
  label, 
  options = [],
  required = false,
  value = [],
  onChange,
  visible = true,
  className = '',
  layout = 'vertical'
}) {
  if (!visible) {
    return null;
  }

  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (optionValue, isChecked) => {
    let newValues;
    
    if (isChecked) {
      newValues = selectedValues.includes(optionValue) 
        ? selectedValues 
        : [...selectedValues, optionValue];
    } else {
      newValues = selectedValues.filter(v => v !== optionValue);
    }
    
    if (onChange) {
      onChange(id, newValues);
    }
  };

  const isChecked = (optionValue) => {
    return selectedValues.includes(optionValue);
  };

  return (
    <div className={`form-field checkbox-group-field ${className}`}>
      {label && (
        <div className="checkbox-group-label">
          {label}
          {required && <span className="required">*</span>}
        </div>
      )}
      
      <div className={`checkbox-group-container ${layout}`}>
        {options.map((option, index) => {
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          const checkboxId = `${id}-${index}`;
          const checked = isChecked(optionValue);
          
          return (
            <label key={index} htmlFor={checkboxId} className="checkbox-group-item">
              <input
                id={checkboxId}
                type="checkbox"
                checked={checked}
                onChange={(e) => handleChange(optionValue, e.target.checked)}
                className="checkbox-group-input"
              />
              <span className="checkbox-group-text">{optionLabel}</span>
            </label>
          );
        })}
      </div>
      
      {selectedValues.length > 0 && (
        <div className="selected-count">
          {selectedValues.length} opção(ões) selecionada(s)
        </div>
      )}
      
      {required && selectedValues.length === 0 && (
        <div className="error-message">
          Selecione pelo menos uma opção
        </div>
      )}
    </div>
  );
}

