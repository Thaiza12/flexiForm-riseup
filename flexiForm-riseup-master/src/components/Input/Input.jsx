import React from 'react';

import './Input.css';



export default function Input({

  id,

  label,

  type = 'text',

  placeholder,

  required = false,

  value,

  onChange,

  visible = true,

  validation,

  className = ''

}) {

  if (!visible) {

    return null;

  }



  const handleChange = (e) => {

    if (onChange) {

      onChange(id, e.target.value);

    }

  };



  return (

    <div className={`form-field ${className}`}>

      {label && (

        <label htmlFor={id} className="form-label">

          {label}

          {required && <span className="required">*</span>}

        </label>

      )}

      <input

        id={id}

        type={type}

        placeholder={placeholder}

        required={required}

        value={value || ''}

        onChange={handleChange}

        className="form-input"

      />

      {validation && validation.error && (

        <span className="error-message">{validation.error}</span>

      )}

    </div>

  );

}