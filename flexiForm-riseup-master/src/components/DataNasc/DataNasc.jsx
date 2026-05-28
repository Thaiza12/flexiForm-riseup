import React, { useState } from 'react';
import Input from '../Input/Input'; // Caminho corrigido
import './DataNasc.css';

// Função auxiliar para obter a data máxima (hoje)
const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};

export default function DataNasci({
    id = 'Date',
    label = 'Data de Nascimento',
    value,
    onChange,
    visible = true,
    required = true,
    className = ''
}) {
    const [validation, setValidation] = useState({ error: null });
    const maxDate = getTodayDate(); // A data máxima é sempre a data atual

    if (!visible) {
        return null;
    }

    const validateDate = (dateString) => {
        if (required && !dateString) {
            return 'A data de nascimento é obrigatória.';
        }

        if (dateString) {
            const selectedDate = new Date(dateString);
            const today = new Date();
            
            // Verifica se a data é futura
            if (selectedDate > today) {
                return 'A data não pode ser futura.';
            }
            // Adicione aqui outras validações, como idade mínima (ex: verificar se a pessoa tem mais de 18 anos)
        }
        
        return null;
    };

    const handleChange = (fieldId, fieldValue) => {
        const error = validateDate(fieldValue);

        setValidation({ error });

        if (onChange) {
            // Retorna o valor no formato YYYY-MM-DD
            onChange(fieldId, fieldValue, { valid: !error });
        }
    };

    return (
        <div className={`birth-date-field ${className}`}>
            <Input
                id={id}
                label={label}
                type="date"
                required={required}
                value={value}
                onChange={handleChange}
                validation={validation}
                max={maxDate} // Impede a seleção de datas futuras
            />
        </div>
    );
}