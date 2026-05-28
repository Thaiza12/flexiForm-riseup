import React, { useState } from 'react';
import Input from '../Input/Input'; // Importa o componente base Input
import './Idade.css';

// Função para garantir que apenas dígitos sejam aceitos e seja inteiro
const formatAge = (value) => {
  if (!value) return '';
  // Remove caracteres não numéricos e garante que é um número inteiro
  return value.toString().replace(/\D/g, '').substring(0, 3); 
};

export default function Idade({ 
  id = 'age',
  label = 'Idade',
  value,
  onChange,
  visible = true,
  required = true,
  className = '',
  min = 1,      // Idade mínima padrão
  max = 150     // Idade máxima padrão
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }

  const validateAge = (age) => {
    const numericAge = parseInt(age, 10);
    
    if (required && !age) {
      return 'A idade é obrigatória.';
    }
    
    // Se o campo não for obrigatório e estiver vazio, é válido
    if (!required && !age) {
        return null;
    }
    
    if (isNaN(numericAge) || numericAge.toString() !== age.toString().replace(/\D/g, '')) {
        return 'Insira uma idade válida.';
    }

    if (numericAge < min) {
      return `A idade mínima é ${min} anos.`;
    }
    
    if (numericAge > max) {
      return `A idade máxima permitida é ${max} anos.`;
    }
    
    return null;
  };

  const handleChange = (fieldId, fieldValue) => {
    // 1. Formata para garantir que só há números
    const formattedValue = formatAge(fieldValue); 
    
    // 2. Valida o valor formatado
    const error = validateAge(formattedValue);
    
    setValidation({ error });
    
    if (onChange) {
      // 3. Chama o onChange do formulário pai
      onChange(fieldId, formattedValue, { valid: !error });
    }
  };

  return (
    <div className={`age-input-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="text" // Usamos 'text' para ter mais controle sobre o 'onChange' e 'formatAge'
        placeholder={`Entre ${min} e ${max}`}
        required={required}
        value={value}
        onChange={handleChange}
        validation={validation}
        maxLength={3} // Limita a 3 dígitos (até 999)
      />
    </div>
  );
}