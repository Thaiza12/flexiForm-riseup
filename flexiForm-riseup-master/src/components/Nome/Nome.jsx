import React, { useState } from 'react';
import Input from '../Input/Input';
import './Nome.css';

export default function Nome({ 
  id = 'nome',
  label = 'Nome Completo',
  value,
  onChange,
  visible = true,
  required = true,
  minLength = 3,
  className = ''
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }

  const validateNome = (nome) => {
    if (!nome) {
      return required ? 'Nome é obrigatório' : null;
    }
    if (nome.trim().length < minLength) {
      return `Nome deve ter pelo menos ${minLength} caracteres`;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome.trim())) {
      return 'Nome deve conter apenas letras';
    }
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    const error = validateNome(fieldValue);
    setValidation({ error });
    
    if (onChange) {
      onChange(fieldId, fieldValue, { valid: !error });
    }
  };

  return (
    <div className={`nome-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="text"
        placeholder="Digite seu nome completo"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
      />
    </div>
  );
}

