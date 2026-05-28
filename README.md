FlexiForm-RiseUp 🚀
Uma engine de formulários dinâmicos baseada em React e JSON Schema, com editor em tempo real.

O FlexiForm-RiseUp é uma aplicação que permite a criação, validação e renderização de formulários complexos através de configurações JSON simples. Diferente de bibliotecas estáticas, ele oferece um "Playground" onde as alterações no esquema JSON refletem instantaneamente na interface do usuário.

📋 Funcionalidades
Renderização Dinâmica: Gera inputs, selects, checkboxes e layouts baseados em um arquivo JSON.
Editor em Tempo Real: Edite o JSON na própria interface e veja o formulário mudar na hora.
Persistência Local: Salva suas configurações e dados preenchidos no localStorage do navegador.
Registro de Componentes: Arquitetura modular que mapeia strings (ex: "type": "cpf") para componentes React customizados.
Validação Integrada: Suporte a campos obrigatórios, máscaras e validações customizadas.
🛠️ Tecnologias Utilizadas
React 18+
Vite (Build tool)
CSS3 (Estilização customizada)
GitHub Pages (Deploy automatizado)
🚀 Como Rodar o Projeto
Siga os passos abaixo para baixar e executar a aplicação em sua máquina local.

Pré-requisitos
Node.js (v18 ou superior)
npm ou yarn
Instalação
Clone o repositório:
git clone [https://github.com/SEU-USUARIO/flexiform-riseup.git](https://github.com/SEU-USUARIO/flexiform-riseup.git)
cd flexiform-riseup

## 🚀 Guia de Inicialização Rápida

Siga o passo a passo abaixo para levantar o ambiente de desenvolvimento em sua máquina local.

### 1. Instalação das Dependências

Antes de iniciar, é necessário baixar as bibliotecas listadas no `package.json`. No terminal, dentro da pasta do projeto, execute:

```bash
npm install
Nota: Certifique-se de estar na raiz do projeto (onde o arquivo package.json está localizado) antes de rodar o comando.

2. Execução do Servidor Local
Após a instalação, inicie o servidor de desenvolvimento do Vite. Este comando "vigia" seus arquivos e atualiza o navegador automaticamente (Hot Reload) quando você salva alterações.

npm run dev
3. Acesso ao Projeto
Assim que o servidor iniciar, o terminal exibirá o endereço local. Abra seu navegador preferido e acesse:

👉 http://localhost:5173/flexiForm-riseup/

⚠️ Atenção: Se a porta 5173 estiver em uso, o Vite escolherá automaticamente a próxima disponível (ex: 5174). Fique atento à mensagem no seu terminal.

📂 Estrutura do Projeto
A aplicação segue uma arquitetura onde o App.jsx atua como o motor (engine) que conecta a configuração aos componentes visuais.

src/
├── components/          # 🧩 Biblioteca de Componentes de UI
│   ├── Input/           # Componente de texto simples
│   ├── Select/          # Componente de seleção
│   ├── Cpf/             # Componente com máscara de CPF
│   └── index.js         # 📍 OBRIGATÓRIO: Exporta o `componentRegistry`
├── config/
│   └── formConfig.json  # ⚙️ Estado inicial/padrão do formulário
├── App.jsx              # ⚙️ Motor de renderização e lógica de validação
└── main.jsx             # Ponto de entrada do React

⚙️ Guia de Configuração (JSON Schema)
Para criar campos no formulário, você deve editar o objeto components no arquivo JSON. Abaixo estão as propriedades suportadas:

Propriedades Comuns
Propriedade	Tipo	Obrigatório	Descrição
type	string	Sim	A chave do componente (ex: "nome", "email", "select"). Deve existir no componentRegistry.
id	string	Sim	Identificador único do campo (será a chave no JSON de resposta).
label	string	Não	O texto do rótulo exibido acima do campo.
required	boolean	Não	Se true, impede o envio do formulário caso o campo esteja vazio.
visible	boolean	Não	Controla a visibilidade do campo (true ou false).
placeholder	string	Não	Texto de ajuda cinza exibido dentro do input antes de digitar.
Exemplo de Configuração
Copie e cole este JSON no editor do projeto para testar um formulário completo:

{
  "title": "Cadastro de Cliente",
  "description": "Preencha seus dados abaixo",
  "components": [
    {
      "type": "nome",
      "id": "full_name",
      "label": "Nome Completo",
      "required": true,
      "placeholder": "Digite seu nome"
    },
    {
      "type": "select",
      "id": "department",
      "label": "Departamento",
      "options": ["TI", "RH", "Financeiro"],
      "required": true
    },
    {
      "type": "checkbox",
      "id": "terms",
      "label": "Aceito os termos de uso",
      "required": true
    }
  ]
}
🧠 Arquitetura da Engine
Se você deseja estender o projeto ou entender como ele funciona "por baixo do capô", aqui está o fluxo lógico:

1. O Motor (App.jsx)
Gerenciamento de Estado: Mantém o config (a estrutura do formulário) e o formData (as respostas do usuário).

Renderização: A função renderComponent percorre o array config.components.

Mapeamento: Para cada item do array, ela busca o componente React correspondente no arquivo de registro (index.js).

2. Adicionando Novos Componentes
Para criar um novo tipo de campo (por exemplo: um sistema de avaliação por estrelas "Rating"), siga estes 3 passos:

Crie o componente: Desenvolva o arquivo em src/components/Rating/index.jsx.

Registre o componente: Importe e adicione ao objeto exportado no arquivo src/components/index.js.

JavaScript

// src/components/index.js 
import Rating from './Rating'; // Importe seu novo arquivo

export const componentRegistry = {
  // ... outros componentes existentes
  "rating": Rating  // Adicione a nova chave aqui
};

Use no JSON: Agora basta adicionar "type": "rating" na sua configuração JSON para vê-lo na tela.

📦 Deploy
O projeto já vem configurado para publicação automática no GitHub Pages.

1. Ajuste a Base URL
Abra o arquivo vite.config.js e certifique-se de que a propriedade base corresponde exatamente ao nome do seu repositório no GitHub:

JavaScript

// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/flexiForm-riseup/', // <--- Substitua pelo nome do seu repositório
})
2. Execute o Deploy
No terminal, rode o comando abaixo para compilar e enviar os arquivos para a branch de produção:

Bash

npm run deploy
