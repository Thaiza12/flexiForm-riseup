import React, { useState } from 'react';
import './Rating.css';

export default function Rating({
  id = 'avaliacao_produto',
  label = 'Avaliação do Produto',
  value, // Valor da estrela (number)
  onChange,
  visible = true,
  maxStars = 5,
  required = true,
  className = '',
  feedbackValue,
  // Nova prop lida diretamente do JSON para customização de cor
  componentPrimaryColor, 
}) {
  if (!visible) return null;

  const [hoverValue, setHoverValue] = useState(0);

  const feedbackThreshold = 3; 
  const showFeedback = !!value && value <= feedbackThreshold;

  const stars = [...Array(maxStars)];

  // CRÍTICO: Define a variável CSS localmente no componente
  const localStyles = componentPrimaryColor ? 
    { '--local-primary-color': componentPrimaryColor } : 
    {};

  const handleClick = (newValue) => {
    if (onChange) {
      onChange(id, newValue, { valid: true });
      
      if (newValue <= feedbackThreshold) {
          // Se nota for baixa, garante que o campo de feedback esteja no estado, 
          // preservando o valor atual (feedbackValue) ou inicializando com ''
          onChange(`${id}_melhoria`, feedbackValue || '', { valid: true });
      } else {
          // Se nota for alta, limpa o campo de feedback
          onChange(`${id}_melhoria`, '', { valid: true });
      }
    }
  };

  const handleFeedbackChange = (e) => {
    // CRÍTICO: Envia o novo valor de texto para o App.jsx,
    // que é o que permite a digitação controlada.
    if (onChange) {
      onChange(`${id}_melhoria`, e.target.value, { valid: true });
    }
  };

  return (
    // Adiciona o objeto localStyles como estilo inline
    <div className={`rating-field ${className}`} style={localStyles}>
      <label className="rating-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <div className="stars-container">
        {stars.map((_, index) => {
          const ratingValue = index + 1;
          const isSelected = ratingValue <= (hoverValue || value);
          
          return (
            <span
              key={index}
              className={`star ${isSelected ? 'selected' : ''}`}
              onClick={() => handleClick(ratingValue)}
              onMouseEnter={() => setHoverValue(ratingValue)}
              onMouseLeave={() => setHoverValue(0)}
            >
              ★
            </span>
          );
        })}
      </div>

      {/* --- CAIXA DE TEXTO CONDICIONAL --- */}
      {showFeedback && (
        <div className="feedback-container">
          <label htmlFor={`${id}_melhoria`} className="feedback-label">
            O que podemos melhorar? (Obrigatório para {feedbackThreshold} estrelas ou menos)
          </label>
          <textarea
            id={`${id}_melhoria`}
            value={feedbackValue || ''} // Usa a prop feedbackValue (CONTROLA O CAMPO)
            onChange={handleFeedbackChange} // Dispara a atualização do estado
            className="feedback-textarea"
            rows="3"
            placeholder="Conte-nos o que poderia ser melhor..."
            required={true} 
          />
        </div>
      )}
    </div>
  );
}