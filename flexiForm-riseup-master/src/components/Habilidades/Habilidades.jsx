import React, { useState } from 'react';
import './Habilidades.css';

export default function Habilidades({
  id = 'tags',
  label = 'Palavras-chave',
  value = [], // Valor é um Array de Strings
  onChange,
  visible = true,
  className = '',
}) {
  const [inputValue, setInputValue] = useState('');

  if (!visible) return null;

  const addTag = (tagText) => {
    const newTag = tagText.trim();
    if (newTag && !value.includes(newTag)) {
      const newTags = [...value, newTag];
      if (onChange) {
        onChange(id, newTags, { valid: true });
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = value.filter(tag => tag !== tagToRemove);
    if (onChange) {
      onChange(id, newTags, { valid: true });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  const handleBlur = () => {
    addTag(inputValue);
    setInputValue('');
  };

  return (
    <div className={`tags-input-field ${className}`}>
      <label htmlFor={id} className="tags-label">
        {label}
      </label>
      <div className="tags-container">
        {value.map(tag => (
          <span key={tag} className="tag-item">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="tag-remove-button">
              &times;
            </button>
          </span>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Adicione tags e pressione Enter ou Vírgula"
          className="tags-input-box"
        />
      </div>
    </div>
  );
}