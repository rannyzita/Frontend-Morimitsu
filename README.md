# 🥋 Frontend-Morimitsu 🥋

## Desenvolvimento de Alta Performance para Jiu-Jitsu

Um projeto frontend moderno e robusto, construído sobre a fundação de **React**, **TypeScript** e **Vite**. Este template é otimizado para uma experiência de desenvolvimento **rápida** e com **tipagem segura**, ideal para sistemas de gestão.

## 📌 Índice Rápido

  * [Funcionalidades](#funcionalidades)
  * [Primeiros Passos](#primeiros-passos)
  * [Configuração do ESLint](#configuração-do-eslint)
  * [Estrutura do Projeto](#estrutura-do-projeto)
  * [Scripts Disponíveis](#scripts-disponíveis)
  * [Contribuindo](#contribuindo)
  * [Licença](#licença)

-----

## ✨ Funcionalidades

| Recurso | Descrição | Benefício |
| :--- | :--- | :--- |
| **React** | Biblioteca líder para a construção de interfaces de usuário reativas. | Componentes reutilizáveis e UI eficiente. |
| **TypeScript** | Adiciona tipagem estática ao JavaScript. | Melhor detecção de erros, código mais confiável e escalável. |
| **Vite** | Ferramenta de build extremamente rápida com Hot Module Replacement (HMR). | Desenvolvimento ágil e *feedback* instantâneo. |
| **ESLint** | Análise estática configurável. | Garante consistência e alta qualidade de código. |

## 🚀 Primeiros Passos

### Pré-requisitos

Certifique-se de ter o seguinte instalado em sua máquina:

  * **Node.js** (versão v16 ou superior é recomendada)
  * `npm` ou `yarn` (gerenciadores de pacotes)
  * Um editor de código como **VS Code** (altamente recomendado).

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/rannyzita/Frontend-Morimitsu.git
    cd Frontend-Morimitsu
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento com Vite:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (ou em outra porta, se especificado).

-----

## 🛠️ Configuração do ESLint

Este projeto utiliza o ESLint para impor qualidade. A configuração é adaptada para TypeScript e React.

### Linting com Consciência de Tipos

Para aplicações de produção, habilite regras de linting com consciência de tipos. O setup recomendado é (consulte `eslint.config.js`):

```javascript
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      // Opcionalmente use regras mais rígidas
      ...tseslint.configs.strictTypeChecked,
      // Opcionalmente adicione regras estilísticas
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### Linting Específico para React

Para adicionar regras específicas do React, instale `eslint-plugin-react-x` e `eslint-plugin-react-dom`:

```bash
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
# ou
yarn add eslint-plugin-react-x eslint-plugin-react-dom --dev
```

Em seguida, atualize o `eslint.config.js`:

```javascript
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

-----

## 📁 Estrutura do Projeto

```text
Frontend-Morimitsu/
├── src/                    # Arquivos fonte (componentes React, arquivos TypeScript)
├── public/                 # Assets estáticos
├── eslint.config.js        # Configuração do ESLint
├── tsconfig.app.json       # Configuração do TypeScript para a aplicação
├── tsconfig.node.json      # Configuração do TypeScript para Node.js
├── vite.config.ts          # Configuração do Vite
├── package.json            # Metadados e dependências do projeto
└── README.md               # Documentação do projeto
```

## ⚙️ Scripts Disponíveis

No diretório do projeto, você pode executar:

  * `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
  * `npm run build` ou `yarn build`: Constrói a aplicação para produção (saída para `dist`).
  * `npm run lint` ou `yarn lint`: Executa o ESLint para verificar problemas de qualidade de código.
  * `npm run preview` ou `yarn preview`: Pré-visualiza a build de produção localmente.

-----

## 🤝 Contribuindo

Contribuições são bem-vindas\! Para contribuir:

1.  Faça um *fork* (bifurcação) do repositório.
2.  Crie uma nova *branch* (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e *commit* (`git commit -m 'Adiciona sua feature'`).
4.  Envie para a *branch* (`git push origin feature/sua-feature`).
5.  Abra um *Pull Request*.

Certifique-se de que seu código siga as regras do ESLint do projeto e inclua testes apropriados.

## ⚖️ Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT). Consulte o arquivo `LICENSE` para mais detalhes.
