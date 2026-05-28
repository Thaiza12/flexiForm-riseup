import React, { useState } from 'react';
import Input from '../Input/Input';
import './Cpf.css';


const formatCPF = (value) => {
  if (!value) return '';
  value = value.replace(/\D/g, '').substring(0, 11);

  return value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
};


const validateCPFAlgorithm = (cpf) => {
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false; 

    let sum = 0;
    let remainder;

 
    for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
 
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};


export default function Cpf({ 
  id = 'Cpf',
  label = 'CPF',
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

  const validateCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, ''); 
    
    if (required && !cleanedCPF) {
      return 'CPF é obrigatório';
    }
    
    if (cleanedCPF && cleanedCPF.length !== 11) {
      return 'CPF deve ter 11 dígitos';
    }

    if (cleanedCPF && !validateCPFAlgorithm(cleanedCPF)) {
        return 'CPF inválido (dígito verificador incorreto)';
    }

    return null;
  };

  const handleChange = (fieldId, fieldValue) => {

    const formattedValue = formatCPF(fieldValue); 
    const error = validateCPF(formattedValue);
    
    setValidation({ error });
    
    if (onChange) {
      
      onChange(fieldId, formattedValue, { valid: !error });
    }
  };

  return (
    <div className={`cpf-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="text"
        placeholder="999.999.999-99"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
        maxLength={14} 
      />
    </div>
  );
}