import React, { useState } from 'react';
import Input from '../Input/Input';
import './Cep.css';

const formatCEP = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, '').substring(0, 8); 

  if (value.length > 5) {
    return value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  }
  return value;
};

export default function ZipCode({ 
  id = 'Cep',
  label = 'CEP',
  value,
  onChange,
  visible = true,
  required = true,
  className = ''
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }

  const validateCEP = (cep) => {
    const cleanedCEP = cep.replace(/\D/g, ''); // Apenas dígitos
    
    if (required && !cleanedCEP) {
      return 'CEP é obrigatório';
    }
    
    if (cleanedCEP && cleanedCEP.length !== 8) {
      return 'CEP inválido (deve ter 8 dígitos)';
    }
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
  
    const formattedValue = formatCEP(fieldValue); 
    const error = validateCEP(formattedValue);
    
    setValidation({ error });
    
    if (onChange) {
    
      onChange(fieldId, formattedValue, { valid: !error });
    }
  };

  return (
    <div className={`zip-code-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="text"
        placeholder="99999-999"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
        maxLength={9} 
      />
    </div>
  );
}