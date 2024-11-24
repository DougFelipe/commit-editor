# Conventional Commit Editor

Este projeto é uma ferramenta interativa para ajudar desenvolvedores a criarem mensagens de commit seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Ele fornece uma interface amigável para configurar commits, visualizar previews e copiar comandos para o terminal.

## 🛠️ Funcionalidades

- **Editor de Commits:** Interface interativa para criação de mensagens de commit estruturadas.
- **Exemplos de Commits:** Botões rápidos para exemplos de mensagens predefinidas.
- **Preview de Mensagens:** Pré-visualização da mensagem de commit enquanto você a configura.
- **Configuração de Git Add e Git Push:** Campos para definir arquivos, repositório e branch.
- **Modo Escuro/Claro:** Alternância entre temas para melhor conforto visual.
- **Geração de Comandos:** Comando Git formatado pronto para ser copiado.

## 🚀 Como Usar

1. **Selecionar Tipo de Commit:** Use o seletor para escolher o tipo de commit (e.g., `feat`, `fix`, etc.).
2. **Adicionar Emoji (Opcional):** Marque a caixa de seleção para incluir emojis.
3. **Preencher os Campos:**
   - **Escopo:** Especifique o módulo ou componente afetado (opcional).
   - **Descrição:** Escreva uma breve descrição da alteração (obrigatório).
   - **Corpo:** Adicione detalhes adicionais da mudança (opcional).
   - **Footer:** Insira informações como `BREAKING CHANGE` ou referências (opcional).
4. **Selecionar Arquivos:** Escolha arquivos comuns ou insira manualmente.
5. **Visualizar e Copiar:** Veja o preview da mensagem e copie o comando para o terminal.

## 📖 Exemplo de Estrutura de Commit

```
feat(api): adiciona suporte para autenticação

- Implementa o login de usuários na API usando JWT.
- Atualiza a documentação do endpoint `/login`.

BREAKING CHANGE: Remove o suporte para autenticação básica.
```

## 💻 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **JSON** (para armazenamento de exemplos e dados dinâmicos)

## 📦 Requisitos

- Um navegador moderno com suporte a JavaScript.
- Servidor estático (e.g., Live Server no VSCode) para carregar os arquivos JSON.

## 🛠️ Instalação e Execução

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/conventional-commit-editor.git
   ```

2. Abra o projeto em seu editor de código preferido.

3. Inicie um servidor local para carregar os arquivos JSON:
   - Com VSCode: Use a extensão **Live Server**.
   - Ou use o comando:
     ```
     python -m http.server
     ```

4. Acesse no navegador:
   - `http://localhost:8000` (ou outra porta exibida).

## 🎨 Personalização

- Para adicionar novos tipos de commits, edite o arquivo `commitExamples.json`.
- Para incluir novos emojis, modifique `commitEmojis.json`.
- Personalize o tema alterando as variáveis no `styles.css`.

## 📝 Referências

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Doug Felipe - Conventional Commits](https://github.com/DougFelipe/conventional_commits)
- [Iuri Code - Padrões de Commits](https://github.com/iuricode/padroes-de-commits)

## 🤝 Contribuições

Sinta-se à vontade para contribuir com o projeto! Sugestões, melhorias e correções são bem-vindas. Faça um **fork** do repositório, crie uma nova branch e envie um **pull request**.

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com 💙 por [Seu Nome]
