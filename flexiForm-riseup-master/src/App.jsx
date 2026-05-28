import React, { useState, useEffect } from 'react';
import { componentRegistry } from './components/index.js';
import formConfig from './config/formConfig.json';
import './App.css';
import FlexiFormLogo from './assets/FlexiForm_logo.png';

// --- Função Auxiliar: Inicializa o formData com base na configuração ---
const getInitialFormData = (config) => {
  const initialData = {};
  if (config && config.components) {
    config.components.forEach(component => {
      // 1. Inicializa campos booleanos (checkbox, Termos) como false
      if (component.type === 'checkbox' || component.type === 'Termos' || component.type === 'Escolha') {
        initialData[component.id] = false;
      // 2. Inicializa campos array (checkboxGroup, ListaDinamica, Habilidades)
      } else if (component.type === 'checkboxGroup' || component.type === 'ListaDinamica' || component.type === 'Habilidades') {
        initialData[component.id] = [];
      // 3. Inicializa campos de Rating e seu campo de melhoria associado
      } else if (component.type === 'Rating') {
        initialData[component.id] = 0; // Nota inicial
        // Inicializa o campo de melhoria como string vazia
        initialData[`${component.id}_melhoria`] = ''; 
      // 4. Outros campos (textos, números, seleções) como string vazia
      } else {
        initialData[component.id] = '';
      }
    });
  }
  return initialData;
};

export default function App() {

const [config, setConfig] = useState(formConfig);
// Usa a função auxiliar para inicializar o estado
const [formData, setFormData] = useState(getInitialFormData(formConfig));
const [formErrors, setFormErrors] = useState({});
const [jsonText, setJsonText] = useState(JSON.stringify(formConfig, null, 2));
const [jsonError, setJsonError] = useState(null);

useEffect(() => {

const displayErrorNotification = (message) => {

const errorMsg = document.createElement('div');

errorMsg.textContent = `⚠️ ERRO: ${message}`;

errorMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #dc3545; color: white; padding: 1rem 1.5rem; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600;';

document.body.appendChild(errorMsg);

setTimeout(() => {

errorMsg.style.opacity = '0';

errorMsg.style.transition = 'opacity 0.3s';

setTimeout(() => document.body.removeChild(errorMsg), 300);

}, 3000);

};

window.customAlert = (message) => {

const msg = document.createElement('div');

msg.textContent = message;

msg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #007bff; color: white; padding: 1rem 1.5rem; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600;';

document.body.appendChild(msg);

setTimeout(() => {

msg.style.opacity = '0';

msg.style.transition = 'opacity 0.3s';

setTimeout(() => document.body.removeChild(msg), 300);

}, 3000);

};



const savedConfig = localStorage.getItem('formConfig');

if (savedConfig) {

try {

const parsed = JSON.parse(savedConfig);

setConfig(parsed);
// CRÍTICO: Inicializa o estado com a nova configuração salva
setFormData(getInitialFormData(parsed));

} catch (e) {

console.error('Erro ao carregar configuração salva:', e);

displayErrorNotification('Erro ao carregar configuração salva.');

}

}

}, []);



useEffect(() => {

localStorage.setItem('formConfig', JSON.stringify(config));

setJsonText(JSON.stringify(config, null, 2));

setJsonError(null);

}, [config]);



useEffect(() => {

const root = document.documentElement;

const theme = config.theme || {};

const colors = theme.colors || {};



if (colors.background) {

root.style.setProperty('--bg-gradient-start', colors.background);

root.style.setProperty('--bg-gradient-end', colors.background);

}



if (colors.primary) root.style.setProperty('--primary', colors.primary);

if (colors.primaryDark) root.style.setProperty('--primary-dark', colors.primaryDark);

if (colors.primaryLight) root.style.setProperty('--primary-light', colors.primaryLight);

if (colors.accent) root.style.setProperty('--accent', colors.accent);



if (colors.surface) root.style.setProperty('--surface', colors.surface);

if (colors.surfaceSecondary) root.style.setProperty('--surface-secondary', colors.surfaceSecondary);



if (colors.textMain) root.style.setProperty('--text-main', colors.textMain);

if (colors.textMuted) root.style.setProperty('--text-muted', colors.textMuted);



if (colors.error) root.style.setProperty('--error', colors.error);

if (colors.errorBg) root.style.setProperty('--error-bg', colors.errorBg);

if (colors.success) root.style.setProperty('--success', colors.success);

}, [config]);



const handleFieldChange = (fieldId, value, validation = {}) => {

setFormData(prev => ({

...prev,

[fieldId]: value

}));



if (validation.error) {

setFormErrors(prev => ({

...prev,

[fieldId]: validation.error

}));

} else {

setFormErrors(prev => {

const newErrors = { ...prev };

delete newErrors[fieldId];

return newErrors;

});

}

};



const handleSubmit = (e) => {

e.preventDefault();

const errors = {};

config.components.forEach(component => {
// Nota: O Rating agora tem dois campos. A validação precisa ser ajustada.
  const value = formData[component.id];

  if (component.required) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        errors[component.id] = `${component.label || component.id} é obrigatório`;
      }
    } else if (typeof value === 'boolean') {
      // Validação de Checkbox (Termos)
      if (!value) {
        errors[component.id] = `${component.label || component.id} é obrigatório (deve ser aceito)`;
      }
    } else if (component.type === 'Rating') {
      // Validação de Rating
      if (!value || value === 0) {
        errors[component.id] = `${component.label || component.id} é obrigatório`;
      } else if (value <= 3) {
        // Validação do campo de melhoria se a nota for baixa
        const feedbackValue = formData[`${component.id}_melhoria`];
        if (!feedbackValue || feedbackValue.trim() === '') {
          errors[`${component.id}_melhoria`] = 'O comentário de melhoria é obrigatório para esta nota.';
        }
      }
    } else if (!value) {
      errors[component.id] = `${component.label || component.id} é obrigatório`;
    }
  }

});



if (Object.keys(errors).length > 0) {

setFormErrors(errors);

window.customAlert('Por favor, preencha todos os campos obrigatórios.');

return;

}



console.log('Dados do formulário:', formData);

window.customAlert('Formulário enviado com sucesso!');

};



const renderComponent = (componentConfig) => {

const Component = componentRegistry[componentConfig.type];

if (!Component) {

console.warn(`Componente do tipo "${componentConfig.type}" não encontrado no registro`);

return null;

}



if (componentConfig.visible === false) {

return null;

}



const baseProps = {

id: componentConfig.id,

label: componentConfig.label,

required: componentConfig.required || false,

visible: componentConfig.visible !== false,

value: formData[componentConfig.id],

onChange: handleFieldChange,

className: componentConfig.className || '',

};



const specificProps = { ...componentConfig };

delete specificProps.type;

delete specificProps.id;

delete specificProps.label;

delete specificProps.required;

delete specificProps.visible;

delete specificProps.className;


// --- INSERÇÃO DA LÓGICA DO RATING (CUSTOMIZAÇÃO E VALOR DO FEEDBACK) ---
if (componentConfig.type === 'Rating') {
  // CRÍTICO para a customização de cor: Passa a cor customizada do JSON
  specificProps.componentPrimaryColor = componentConfig.componentPrimaryColor;
  
  // CRÍTICO para a digitação: Passa o valor atual do campo de melhoria
  specificProps.feedbackValue = formData[`${componentConfig.id}_melhoria`];
  
  // Opcional: passa a validação do campo de melhoria se houver erro
  specificProps.validationFeedback = formErrors[`${componentConfig.id}_melhoria`]; 
}
// --- FIM DA LÓGICA DO RATING ---


return (

<Component

key={componentConfig.id}

{...baseProps}

{...specificProps}

validation={formErrors[componentConfig.id] ? { error: formErrors[componentConfig.id] } : undefined}
/>

);

};



const handleConfigUpdate = (jsonString) => {

try {

const parsed = JSON.parse(jsonString);

if (!parsed.components || !Array.isArray(parsed.components)) {

throw new Error('O JSON deve conter um array "components"');

}

setConfig(parsed);
// CRÍTICO: Re-inicializa o estado com a nova configuração
setFormData(getInitialFormData(parsed));

setFormErrors({});

setJsonError(null);

const successMsg = document.createElement('div');

successMsg.textContent = '✓ Configuração atualizada com sucesso!';

successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 1rem 1.5rem; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600;';

document.body.appendChild(successMsg);

setTimeout(() => {

successMsg.style.opacity = '0';

successMsg.style.transition = 'opacity 0.3s';

setTimeout(() => document.body.removeChild(successMsg), 300);

}, 2000);

} catch (e) {

setJsonError(e.message);

throw e;

}

};



const handleJsonChange = (e) => {

const value = e.target.value;

setJsonText(value);

try {

JSON.parse(value);

setJsonError(null);

} catch (err) {

setJsonError('JSON inválido: ' + err.message);

}

};



return (

<div className="app-container">

<div className="form-wrapper">

<div className="app-logo-standalone">

<div className="logo-container">

<img

src={FlexiFormLogo}

alt="Logo FlexiForm"

className="logo-icon-standalone"

/>

<span className="logo-text-standalone"></span>

</div>

</div>



<div className="header-section">

<div>

<h1>{config.title || 'Formulário de Contato'}</h1>

{config.description && (

<p className="form-description">{config.description}</p>

)}

</div>

<button

type="button"

className="edit-config-button"

onClick={() => {

const configSection = document.getElementById('config-editor-section');

if (configSection) {

configSection.scrollIntoView({ behavior: 'smooth' });

const textarea = configSection.querySelector('textarea');

if (textarea) {

setTimeout(() => textarea.focus(), 300);

}

}

}}

>

⚙️ Editar Campos do Formulário

</button>

</div>



<form onSubmit={handleSubmit} className="dynamic-form">

{config.components && config.components.map(componentConfig => (
  <React.Fragment key={componentConfig.id}>
    {renderComponent(componentConfig)}
    {/* Opcional: Exibe o erro de validação do campo de melhoria se ele for obrigatório */}
    {(componentConfig.type === 'Rating' && formErrors[`${componentConfig.id}_melhoria`]) && (
      <div className="validation-error-inline" style={{ marginTop: '-10px', marginBottom: '15px', color: 'var(--error)' }}>
        ⚠️ {formErrors[`${componentConfig.id}_melhoria`]}
      </div>
    )}
  </React.Fragment>
))}


<div className="form-actions">

<button type="submit" className="submit-button">

Enviar

</button>

<button

type="button"

className="reset-button"

onClick={() => {
// CRÍTICO: Usa a função auxiliar para limpar o estado
setFormData(getInitialFormData(config));

setFormErrors({});

}}

>

Limpar

</button>

</div>

</form>



<div id="config-editor-section" className="config-editor-section">

<h2>📝 Editar Campos do Formulário</h2>

<p className="config-help-text">

Edite o JSON abaixo para adicionar, remover ou modificar os campos do formulário.

Você pode editar livremente - as mudanças serão aplicadas quando você clicar em "Aplicar Alterações" ou sair do campo (se o JSON estiver válido).

</p>

<textarea

className={`config-editor ${jsonError ? 'config-editor-error' : ''}`}

value={jsonText}

onChange={handleJsonChange}

onBlur={(e) => {

try {

handleConfigUpdate(e.target.value);

} catch (err) {

}

}}

placeholder="Cole ou edite o JSON de configuração aqui..."

/>

{jsonError && (

<div className="json-error-message">

⚠️ {jsonError}

</div>

)}

<div className="config-actions">

<button

onClick={() => {

try {

handleConfigUpdate(jsonText);

} catch (err) {

}

}}

className="apply-config-button"

disabled={!!jsonError}


>

✅ Aplicar Alterações

</button>

<button

onClick={() => {

window.customAlert('Configuração restaurada para o padrão.');

setConfig(formConfig);
// CRÍTICO: Usa a função auxiliar para restaurar o estado padrão
setFormData(getInitialFormData(formConfig));

setFormErrors({});

setJsonText(JSON.stringify(formConfig, null, 2));

setJsonError(null);

}}

className="reset-config-button"

>

🔄 Restaurar Configuração Padrão

</button>

<button

onClick={() => {

try {

const textarea = document.createElement('textarea');

textarea.value = jsonText;

document.body.appendChild(textarea);

textarea.select();

document.execCommand('copy');

document.body.removeChild(textarea);

const msg = document.createElement('div');

msg.textContent = '✓ Configuração copiada!';

msg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 1rem 1.5rem; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000; font-weight: 600;';

document.body.appendChild(msg);

setTimeout(() => {

msg.style.opacity = '0';

msg.style.transition = 'opacity 0.3s';

setTimeout(() => document.body.removeChild(msg), 300);

}, 1500);

} catch (e) {

window.customAlert('Erro ao copiar configuração.');

}

}}

className="copy-config-button"

>

📋 Copiar Configuração

</button>

</div>

</div>



<div className="debug-section">

<details>

<summary>Ver Dados do Formulário (Debug)</summary>

<pre>{JSON.stringify(formData, null, 2)}</pre>

</details>

</div>

</div>

</div>

);

}