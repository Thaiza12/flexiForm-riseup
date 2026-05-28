import React, { useState } from 'react';
import Input from '../Input/Input';
import './Email.css';

export default function Email({ 
  id = 'email',
  label = 'E-mail',
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return required ? 'E-mail é obrigatório' : null;
    }
    if (!emailRegex.test(email)) {
      return 'E-mail inválido';
    }
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    const error = validateEmail(fieldValue);
    setValidation({ error });
    
    if (onChange) {
      onChange(fieldId, fieldValue, { valid: !error });
    }
  };

  return (
    <div className={`email-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="email"
        placeholder="exemplo@email.com"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
      />
    </div>
  );
}

