import React, { useState } from 'react';
import './Genero.css';

// Opções padrão, que podem ser sobrescritas via props se necessário
const DEFAULT_OPTIONS = [
    { value: '', label: 'Selecione o Gênero...' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'nao_binario', label: 'Não-Binário' },
    { value: 'outro', label: 'Outro' },
    { value: 'nao_informar', label: 'Prefiro não informar' },
];

export default function Genero({
    id = 'gender',
    label = 'Gênero/Identidade',
    value,
    onChange,
    visible = true,
    required = true,
    className = '',
    options = DEFAULT_OPTIONS
}) {
    const [validation, setValidation] = useState({ error: null });

    if (!visible) {
        return null;
    }

    const validateGender = (selectedValue) => {
        if (required && !selectedValue) {
            return 'A seleção do gênero é obrigatória.';
        }
        return null;
    };

    const handleChange = (e) => {
        const fieldValue = e.target.value;
        const error = validateGender(fieldValue);

        setValidation({ error });

        if (onChange) {
            onChange(id, fieldValue, { valid: !error });
        }
    };

    return (
        <div className={`gender-select-field ${className}`}>
            <label htmlFor={id} className="form-label">
                {label}
                {required && <span className="required-star">*</span>}
            </label>
            <select
                id={id}
                value={value || ''}
                onChange={handleChange}
                required={required}
                className="form-select"
            >
                {options.map((option) => (
                    <option 
                        key={option.value} 
                        value={option.value} 
                        // Desabilita a primeira opção se for o placeholder
                        disabled={option.value === '' && required}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {validation.error && (
                <span className="error-message">{validation.error}</span>
            )}
        </div>
    );
}