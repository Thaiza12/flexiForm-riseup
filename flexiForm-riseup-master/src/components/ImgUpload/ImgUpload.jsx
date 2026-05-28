import React, { useState } from 'react';
import Input from '../Input/Input'; // Assumindo que você tem um Input genérico
import './ImgUpload.css';

export default function ImgUpload({ 
  id = 'image-upload',
  label = 'Pergunta e Imagem',
  value = { question: '', file: null, preview: null }, // O valor será um objeto
  onChange,
  visible = true,
  required = false,
  className = ''
}) {
  const [validation, setValidation] = useState({ error: null });

  if (!visible) {
    return null;
  }

  // A validação é simples: se required for true, pelo menos a pergunta deve existir.
  const validateField = (currentValue) => {
    if (required && (!currentValue.question || currentValue.question.trim() === '')) {
      return 'A pergunta é obrigatória.';
    }
    // Adicione validação de tipo de arquivo/tamanho aqui, se necessário.
    return null;
  };

  const handleChange = (fieldId, fieldValue, isQuestion = true) => {
    let newQuestion = isQuestion ? fieldValue : value.question;
    let newFile = isQuestion ? value.file : fieldValue;
    let newPreview = value.preview;

    if (!isQuestion && newFile) {
        // Lógica de pré-visualização da imagem (apenas no navegador)
        const file = newFile instanceof File ? newFile : null;

        if (file) {
            newPreview = URL.createObjectURL(file);
        } else {
            newPreview = null;
        }
    }
    
    const newValue = { question: newQuestion, file: newFile, preview: newPreview };
    const error = validateField(newValue);

    setValidation({ error });
    
    if (onChange) {
      // Retorna o objeto { question: string, file: File, preview: string }
      onChange(fieldId, newValue, { valid: !error });
    }
  };
  
  // Função para lidar com a seleção do arquivo
  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleChange(id, file, false); // O segundo argumento 'false' indica que não é a pergunta
  };

  return (
    <div className={`image-upload-field ${className}`}>
      <label className="field-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      
      {/* 1. CAMPO PARA A PERGUNTA (TEXTAREA ou INPUT) */}
      <Input
        id={`${id}-question`}
        label="Sua Pergunta" // Rótulo interno
        type="textarea" 
        placeholder="Digite sua pergunta aqui..."
        required={required}
        value={value.question}
        // Quando a pergunta muda, chamamos handleChange com o novo valor da pergunta
        onChange={(fieldId, fieldValue) => handleChange(id, fieldValue, true)}
      />

      {/* 2. CAMPO DE UPLOAD DE ARQUIVO */}
      <div className="upload-section">
        <label htmlFor={`${id}-file`} className="file-label">
          Selecione uma Imagem:
        </label>
        <input
          type="file"
          id={`${id}-file`}
          accept="image/*" // Permite apenas arquivos de imagem
          onChange={handleFileChange}
          className="file-input"
        />
        
        {/* 3. PRÉ-VISUALIZAÇÃO DA IMAGEM */}
        {value.preview && (
          <div className="image-preview-container">
            <img 
              src={value.preview} 
              alt="Pré-visualização do upload" 
              className="image-preview" 
            />
          </div>
        )}

        {validation.error && (
            <div className="error-message">{validation.error}</div>
        )}
      </div>
    </div>
  );
}