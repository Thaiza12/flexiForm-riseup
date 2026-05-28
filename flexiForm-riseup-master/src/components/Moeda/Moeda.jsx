import React, { useState } from 'react';
import Input from '../Input/Input'; 
import './Moeda.css';

const formatCurrency = (value, symbol = 'R$') => {
  if (!value) return '';
  
  // Remove tudo exceto dígitos
  let cleanedValue = value.toString().replace(/\D/g, ''); 
  
  // Converte para centavos para precisão
  let number = parseInt(cleanedValue, 10) / 100;
  
  if (isNaN(number)) return '';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number);
};

export default function Moeda({
  id = 'currency',
  label = 'Valor',
  value,
  onChange,
  visible = true,
  required = false,
  className = '',
  // Props de moeda
  currencySymbol = 'R$', 
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) return null;

  const handleChange = (fieldId, fieldValue) => {
    // Apenas a parte numérica (sem o símbolo) é útil para o estado
    const numericValue = fieldValue.replace(new RegExp(`\\${currencySymbol}|\\.|,`, 'g'), '').replace(/(\d{2})$/, '.$1');
    const formattedDisplay = formatCurrency(fieldValue, currencySymbol);
    
    // Simplificando a validação para o exemplo
    const error = required && !numericValue ? 'Valor é obrigatório' : null;

    setValidation({ error });

    if (onChange) {
      // Retorna o valor numérico (ex: "1250.50") e o formatado para exibição
      onChange(fieldId, { display: formattedDisplay, numeric: parseFloat(numericValue) || null }, { valid: !error });
    }
  };

  return (
    <div className={`currency-field ${className}`}>
      <Input
        id={id}
        label={label}
        type="text"
        placeholder={`${currencySymbol} 0,00`}
        required={required}
        // Exibe o valor formatado
        value={value?.display || ''}
        onChange={handleChange}
        validation={validation}
      />
    </div>
  );
}