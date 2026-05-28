import React, { useState, useEffect } from 'react';

import Input from '../Input/Input'; 

import './Address.css';





const INITIAL_ADDRESS_STATE = {

  cep: '',

  rua: '',

  numero: '',

  bairro: '',

  cidade: '',

  estado: ''

};



export default function Address({

  id = 'address',

  label = 'Endereço Completo',

  value = INITIAL_ADDRESS_STATE, // Valor inicial é um objeto vazio ou o valor passado

  onChange,

  visible = true,

  required = true,

  className = ''

}) {

  // Estado interno para gerenciar os sub-campos

  const [addressData, setAddressData] = useState(value);

  const [validation, setValidation] = useState({});



  if (!visible) {

    return null;

  }



  // Sincroniza o estado interno com a prop 'value' externa, se ela mudar

  useEffect(() => {

    setAddressData(value);

  }, [value]);



  // Função central que atualiza o estado interno e notifica o formulário principal

  const handleFieldChange = (fieldId, fieldValue) => {

    const newAddressData = {

      ...addressData,

      [fieldId]: fieldValue

    };



    setAddressData(newAddressData);



    // Validação simples: se um campo obrigatório estiver vazio

    const allValid = Object.keys(newAddressData).every(key => {

        if (required && key !== 'complemento' && newAddressData[key].trim() === '') {

            return false;

        }

        return true;

    });



    // Chama o onChange do formulário principal, retornando o objeto completo

    if (onChange) {

      onChange(id, newAddressData, { valid: allValid });

    }

  };



  return (

    <div className={`address-group ${className}`}>

      <h3 className="address-header">{label}</h3>



      <div className="address-line">

        <Input

          id="cep"

          label="CEP"

          placeholder="00000-000"

          value={addressData.cep}

          onChange={handleFieldChange}

          required={required}

          maxLength={9}

          className="cep-input"

        />

        <Input

          id="estado"

          label="Estado (UF)"

          placeholder="SP"

          value={addressData.estado}

          onChange={handleFieldChange}

          required={required}

          maxLength={2}

          className="uf-input"

        />

      </div>



      <Input

        id="rua"

        label="Rua"

        placeholder="Rua Exemplo de Tal"

        value={addressData.rua}

        onChange={handleFieldChange}

        required={required}

      />



      <div className="address-line">

        <Input

          id="numero"

          label="Número"

          placeholder="123"

          value={addressData.numero}

          onChange={handleFieldChange}

          required={required}

          maxLength={10}

          className="numero-input"

        />

        <Input

          id="bairro"

          label="Bairro"

          placeholder="Centro"

          value={addressData.bairro}

          onChange={handleFieldChange}

          required={required}

          className="bairro-input"

        />

      </div>

     

      <Input

        id="cidade"

        label="Cidade"

        placeholder="São Paulo"

        value={addressData.cidade}

        onChange={handleFieldChange}

        required={required}

      />

     

      <Input

        id="complemento"

        label="Complemento (Opcional)"

        placeholder="Apartamento, Bloco, etc."

        value={addressData.complemento || ''}

        onChange={handleFieldChange}

        required={false}

      />

    </div>

  );

}