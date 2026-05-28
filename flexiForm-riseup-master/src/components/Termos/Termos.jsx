import React from 'react';
import './Termos.css';

/**
 * Componente Checkbox (Termos)
 * Este componente é controlado pelo componente pai (App.jsx).
 * O valor (checked) é lido da prop 'value', e a mudança é comunicada
 * ao pai através da prop 'onChange'.
 */
export default function Termos({
  id,
  label,
  value, // Valor booleano: true ou false (vindo do formData)
  onChange,
  visible = true,
  className = '',
  required = false,
  validation,
}) {
  if (!visible) {
    return null;
  }

  const handleChange = (e) => {
    // CRÍTICO: Chama a função onChange do App.jsx
    // Parâmetros: (fieldId, newValue (booleano), validationObject)
    // O App.jsx espera este formato: handleFieldChange(id, value, validation = {})
    if (onChange) {
      // e.target.checked é o novo estado booleano (true ou false)
      // O terceiro argumento ({ valid: true }) é opcional, mas garante o alinhamento de props.
      onChange(id, e.target.checked, { valid: true }); 
    }
  };

  const isInvalid = validation && validation.error;
  
  return (
    <div className={`form-field-checkbox ${className} ${isInvalid ? 'field-error' : ''}`}>
      <input
        id={id}
        type="checkbox"
        // Usa !!value para garantir que valor seja tratado como booleano (CRÍTICO)
        checked={!!value} 
        onChange={handleChange}
        className="form-checkbox-input"
        required={required}
      />
      {label && (
        // O label deve estar ligado ao input através do 'htmlFor={id}'
        <label htmlFor={id} className="form-checkbox-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {isInvalid && (
        <span className="error-message">{validation.error}</span>
      )}
    </div>
  );
}