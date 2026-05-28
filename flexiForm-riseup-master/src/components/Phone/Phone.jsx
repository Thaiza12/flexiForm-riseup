import React, { useState } from 'react';
import Input from '../Input/Input';
import './Phone.css';

export default function Phone({ 
  id = '',
  label = '',
  value,
  onChange,
  visible = true,
  required = false, 
  className = '',
  placeholder,
  
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }

  // Regex para formato de telefone brasileiro: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
  // Permite apenas dígitos
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  
  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (!phone) {
      return required ? 'Telefone é obrigatório' : null;
    }
    // A validação abaixo usa o regex no número "limpo" ou formata para checagem
    // Uma abordagem mais simples é checar o tamanho após a limpeza.
    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
        return 'Telefone deve ter 10 ou 11 dígitos (incluindo DDD)';
    }

    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    const error = validatePhone(fieldValue);
    setValidation({ error });
    
    if (onChange) {
      // O valor enviado é o valor "cru" (com formatação, se o Input a aplicar)
      onChange(fieldId, fieldValue, { valid: !error });
    }
  };

  return (
    <div className={`phone-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="tel" 
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
        
        
      />
    </div>
  );
}