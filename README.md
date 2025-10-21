Frontend-Morimitsu

Um projeto frontend moderno construído com React, TypeScript e Vite. Este template oferece uma configuração mínima para iniciar um ambiente de desenvolvimento rápido e com tipagem segura, incluindo Hot Module Replacement (HMR) e ESLint para qualidade de código.

Índice

Funcionalidades

Primeiros Passos

Pré-requisitos

Instalação

Executando o Projeto

Configuração do ESLint

Linting com Consciência de Tipos

Linting Específico para React

Estrutura do Projeto

Scripts Disponíveis

Contribuindo

Licença

Funcionalidades

React: Biblioteca JavaScript para a construção de interfaces de usuário.

TypeScript: Adiciona tipagem estática ao JavaScript para melhorar a experiência do desenvolvedor e a confiabilidade do código.

Vite: Uma ferramenta de build rápida com Hot Module Replacement (HMR) para uma experiência de desenvolvimento otimizada.

ESLint: Ferramenta de análise estática configurável para consistência e qualidade de código com tipagem segura.

Suporte a recursos modernos de JavaScript e TypeScript de forma imediata.

Primeiros Passos

Pré-requisitos

Certifique-se de ter o seguinte instalado:

Node.js (versão v16 ou superior é recomendada)

npm ou yarn (gerenciadores de pacotes)

Um editor de código como VS Code (recomendado para suporte a TypeScript e ESLint)

Instalação

Clone o repositório:

git clone [https://github.com/rannyzita/Frontend-Morimitsu.git](https://github.com/rannyzita/Frontend-Morimitsu.git)
cd Frontend-Morimitsu


Instale as dependências:

npm install
# ou
yarn install


Executando o Projeto

Para iniciar o servidor de desenvolvimento com Vite:

npm run dev
# ou
yarn dev


A aplicação estará disponível em http://localhost:5173 (ou em outra porta, se especificado).

Configuração do ESLint

Este projeto utiliza o ESLint para impor qualidade e consistência no código. A configuração é adaptada para TypeScript e React.

Linting com Consciência de Tipos

Para aplicações de produção, habilite regras de linting com consciência de tipos. O setup recomendado é (consulte eslint.config.js):

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


Linting Específico para React

Para adicionar regras específicas do React, instale eslint-plugin-react-x e eslint-plugin-react-dom:

npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
# ou
yarn add eslint-plugin-react-x eslint-plugin-react-dom --dev


Em seguida, atualize o eslint.config.js:

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


Estrutura do Projeto

Frontend-Morimitsu/
├── src/                    # Arquivos fonte (componentes React, arquivos TypeScript)
├── public/                 # Assets estáticos
├── eslint.config.js        # Configuração do ESLint
├── tsconfig.app.json       # Configuração do TypeScript para a aplicação
├── tsconfig.node.json      # Configuração do TypeScript para Node.js
├── vite.config.ts          # Configuração do Vite
├── package.json            # Metadados e dependências do projeto
└── README.md               # Documentação do projeto


Scripts Disponíveis

No diretório do projeto, você pode executar:

npm run dev ou yarn dev: Inicia o servidor de desenvolvimento.

npm run build ou yarn build: Constrói a aplicação para produção (saída para dist).

npm run lint ou yarn lint: Executa o ESLint para verificar problemas de qualidade de código.

npm run preview ou yarn preview: Pré-visualiza a build de produção localmente.

Contribuindo

Contribuições são bem-vindas! Para contribuir:

Faça um fork (bifurcação) do repositório.

Crie uma nova branch (git checkout -b feature/sua-feature).

Faça suas alterações e commit (git commit -m 'Adiciona sua feature').

Envie para a branch (git push origin feature/sua-feature).

Abra um Pull Request.

Certifique-se de que seu código siga as regras do ESLint do projeto e inclua testes apropriados.

Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.
