import React, { useState } from 'react';
import './Escolha.css';

const DEFAULT_OPTIONS = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' }
];

export default function Escolha({
    id,
    label,
    value, // Recebe true, false, ou undefined/null
    onChange,
    visible = true,
    required = true,
    className = '',
    // Permite customizar as opções, mas o valor deve ser true/false
    options = DEFAULT_OPTIONS 
}) {
    const [validation, setValidation] = useState({ error: null });

    if (!visible) {
        return null;
    }

    const validateGroup = (currentValue) => {
        if (required && (currentValue === null || currentValue === undefined)) {
            return `A seleção de "${label}" é obrigatória.`;
        }
        return null;
    };

    const handleChange = (e) => {
        // O valor do input radio é sempre uma string, então convertemos para booleano
        const stringValue = e.target.value;
        const boolValue = stringValue === 'true'; // Converte "true" para true, qualquer outra coisa para false
        
        const error = validateGroup(boolValue);

        setValidation({ error });

        if (onChange) {
            // Retorna o valor booleano (true ou false)
            onChange(id, boolValue, { valid: !error });
        }
    };

    const error = validateGroup(value);

    return (
        <div className={`form-field-radio-group ${className}`}>
            <label className="form-radio-label-group">
                {label} {required && <span className="required-star">*</span>}
            </label>
            
            <div className="radio-options-container">
                {options.map((option) => (
                    <label key={option.value.toString()} className="radio-option">
                        <input
                            type="radio"
                            name={id} // Importante: 'name' para garantir que apenas um seja selecionado
                            value={option.value.toString()} // Passa o booleano como string
                            checked={value === option.value} // Compara o estado atual com o valor da opção
                            onChange={handleChange}
                            className="radio-input"
                        />
                        <span className="radio-custom-label">{option.label}</span>
                    </label>
                ))}
            </div>
            
            {(error || validation.error) && (
                <span className="error-message">{error || validation.error}</span>
            )}
        </div>
    );
}