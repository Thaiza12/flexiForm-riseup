import React, { useState } from 'react';
import Input from '../Input/Input';
import './Url.css';

export default function Url({ 
  id = 'url',
  label = 'Endereço Web (URL)',
  value,
  onChange,
  visible = true,
  required = false,
  className = ''
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }
  
  // Regex simplificado que verifica se começa com http/https e tem pelo menos um ponto
  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;

  const validateUrl = (url) => {
    if (required && !url) {
      return 'URL é obrigatória';
    }
    if (url && !urlRegex.test(url)) {
      return 'URL inválida. Use o formato: https://www.exemplo.com';
    }
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    const error = validateUrl(fieldValue);
    setValidation({ error });
    
    if (onChange) {
      onChange(fieldId, fieldValue, { valid: !error });
    }
  };

  return (
    <div className={`url-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="url" // Importante: Usa o tipo nativo do HTML para validação de formato
        placeholder="https://www.seusite.com.br"
        required={required}
        value={value}
        onChange={handleChange}
        visible={true}
        validation={validation}
      />
    </div>
  );
}