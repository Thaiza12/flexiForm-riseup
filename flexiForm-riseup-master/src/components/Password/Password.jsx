import React, { useState } from 'react';
import Input from '../Input/Input';
import './Password.css';

export default function Password({ 
  id = 'Password',
  label = 'Senha',
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
  

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; 

  const validatePassword = (password) => {
    if (!password) {
      return required ? 'Senha é obrigatória' : null;
    }
    if (password.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres';
    }
    if (!passwordRegex.test(password)) {
      return 'A senha deve conter maiúscula, minúscula e um número';
    }
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    const error = validatePassword(fieldValue);
    setValidation({ error });
    
    if (onChange) {
      onChange(fieldId, fieldValue, { valid: !error });
    }
  };

  return (
    <div className={`password-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="password" // Máscara a entrada
        placeholder="********"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
      />
    </div>
  );
}