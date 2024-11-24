// Seleção de elementos principais
const themeToggle = document.getElementById("themeToggle");
const clearFormButton = document.getElementById("clearFormButton");
const copyCommandButton = document.getElementById("copyCommandButton");

let commitEmojis = {}; // Variável para armazenar emojis carregados do JSON

// Função para carregar emojis de um arquivo JSON
async function loadCommitEmojis() {
    try {
        const response = await fetch("commitEmojis.json");
        const emojis = await response.json();
        commitEmojis = emojis;
    } catch (error) {
        console.error("Erro ao carregar os emojis de commit:", error);
    }
}

// Sincronizar estado do botão de tema
function syncThemeToggle() {
    if (!themeToggle) return;
    themeToggle.checked = document.body.classList.contains("dark-mode");
}

// Alternar entre os temas claro e escuro
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Carregar tema salvo no localStorage
function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// Configurar o botão de alternância de tema
function setupThemeToggle() {
    if (!themeToggle) return;
    themeToggle.addEventListener("click", toggleTheme);
}

// Função para carregar exemplos de commits do JSON
async function loadCommitExamples() {
    try {
        const response = await fetch("commitExamples.json");
        const examples = await response.json();
        return examples;
    } catch (error) {
        console.error("Erro ao carregar os exemplos de commit:", error);
        return {};
    }
}

// Atualizar preview do commit e comando
async function updateCommitPreview(commitType) {
    const commitPreview = document.getElementById("commitPreview");
    const commitCommand = document.getElementById("commitCommand");
    const examples = await loadCommitExamples();

    if (examples[commitType]) {
        commitPreview.textContent = examples[commitType].message;
        commitCommand.textContent = examples[commitType].command;
    } else {
        commitPreview.textContent = "(Selecione um tipo de commit para visualizar um exemplo)";
        commitCommand.textContent = "(Comando do commit aparecerá aqui)";
    }
}

// Adicionar eventos aos botões de exemplo de commit
function setupExampleButtons() {
    document.querySelectorAll(".commit-example-button").forEach((button) => {
        button.addEventListener("click", () => {
            const commitType = button.getAttribute("data-type");
            updateCommitPreview(commitType);

            // Atualizar botão ativo
            document.querySelectorAll(".commit-example-button").forEach((btn) =>
                btn.classList.remove("active")
            );
            button.classList.add("active");
        });
    });
}

// Carregar tipos de commit a partir de JSON
async function loadCommitTypes() {
    const commitTypeSelect = document.getElementById("commitType");
    if (!commitTypeSelect) return;

    try {
        const response = await fetch("commitTypes.json");
        const commitTypes = await response.json();

        commitTypes.forEach((type) => {
            const option = document.createElement("option");
            option.value = type.value;
            option.textContent = `${type.value} (${type.description})`;
            commitTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar os tipos de commit:", error);
    }
}

// Carregar arquivos comuns a partir de JSON
async function loadCommonFiles() {
    const fileTypeSelect = document.getElementById("fileType");
    if (!fileTypeSelect) return;

    try {
        const response = await fetch("commonFiles.json");
        const files = await response.json();

        files.forEach((file) => {
            const option = document.createElement("option");
            option.value = file.value;
            option.textContent = file.label;
            fileTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar os arquivos comuns:", error);
    }
}

// Atualizar campo "Arquivos para adicionar" ao selecionar um arquivo comum
function setupFileSelector() {
    const fileTypeSelect = document.getElementById("fileType");
    const filesInput = document.getElementById("files");
    if (!fileTypeSelect || !filesInput) return;

    fileTypeSelect.addEventListener("change", () => {
        const selectedFile = fileTypeSelect.value;
        if (selectedFile) {
            let currentFiles = filesInput.value.trim();
            if (!currentFiles.includes(selectedFile)) {
                currentFiles = currentFiles ? `${currentFiles} ${selectedFile}` : selectedFile;
                filesInput.value = currentFiles.trim();
                updateCommitPreviewState(); // Atualizar o preview ao adicionar arquivos
            }
            fileTypeSelect.value = ""; // Resetar o seletor
        }
    });
}

// Atualizar o preview do commit gerado dinamicamente
function updateCommitPreviewState() {
    const form = document.getElementById("commitEditor");
    const commitPreview = document.getElementById("commitPreview");
    const terminalCommand = document.getElementById("terminalCommand");

    const type = document.getElementById("commitType")?.value || "";
    const scope = document.getElementById("scope")?.value.trim() || "";
    let description = document.getElementById("description")?.value.trim() || "";
    const body = document.getElementById("body")?.value.trim() || "";
    const footer = document.getElementById("footer")?.value.trim() || "";
    const reviewedBy = document.getElementById("reviewedBy")?.value.trim() || "";
    const refs = document.getElementById("refs")?.value.trim() || "";
    const repository = document.getElementById("repository")?.value.trim() || "";
    const branch = document.getElementById("branch")?.value.trim() || "";
    const files = document.getElementById("files")?.value.trim() || "";
    const includeEmoji = document.getElementById("includeEmoji")?.checked || false;

    if (description.length > 100) {
        alert("A descrição do commit não pode ultrapassar 100 caracteres");
        description = description.substring(0, 100);
        document.getElementById("description").value = description; // Atualiza o campo
    }

    const emoji = includeEmoji && commitEmojis[type] ? `${commitEmojis[type]} ` : "";

    let commitMessage = `${emoji}${type}${scope ? `(${scope})` : ""}: ${description}`;
    if (body) commitMessage += `\n\n${body}`;
    if (footer) commitMessage += `\n\n${footer}`;
    if (reviewedBy) commitMessage += `\nReviewed-by: ${reviewedBy}`;
    if (refs) commitMessage += `\nRefs: ${refs}`;

    commitPreview.textContent = commitMessage;

    const gitAdd = files ? `git add ${files}` : `git add .`;
    const gitCommit = `git commit -m "${commitMessage.replace(/"/g, '\\"')}"`;
    const gitPush = `git push ${repository} ${branch}`;

    terminalCommand.textContent = `
# Adicionar arquivos ao índice do Git
${gitAdd}

# Realizar commit com a mensagem formatada
${gitCommit}

# Enviar commit para o repositório especificado
${gitPush}
    `.trim();
}

// Configurar o preview do commit gerado
function setupCommitPreview() {
    const form = document.getElementById("commitEditor");
    if (!form) return;

    form.addEventListener("input", updateCommitPreviewState);
}

// Copiar comando do terminal para a área de transferência
function setupCopyCommand() {
    const terminalCommand = document.getElementById("terminalCommand");
    if (!copyCommandButton || !terminalCommand) return;

    copyCommandButton.addEventListener("click", () => {
        const command = terminalCommand.textContent.trim();
        if (command) {
            navigator.clipboard.writeText(command)
                .then(() => alert("Comando copiado para a área de transferência!"))
                .catch((err) => alert("Erro ao copiar comando: " + err));
        } else {
            alert("Nenhum comando disponível para copiar!");
        }
    });
}

// Limpar o formulário
function setupClearForm() {
    const form = document.getElementById("commitEditor");
    const commitPreview = document.getElementById("commitPreview");
    const terminalCommand = document.getElementById("terminalCommand");

    if (!clearFormButton || !form) return;

    clearFormButton.addEventListener("click", () => {
        form.reset();
        if (commitPreview) commitPreview.textContent = "(A pré-visualização aparecerá aqui)";
        if (terminalCommand) terminalCommand.textContent = "(Comando git aparecerá aqui)";
    });
}

// Inicializar funcionalidades ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    await loadCommitEmojis(); // Carregar emojis antes de inicializar o restante
    loadTheme();
    setupThemeToggle();
    setupExampleButtons();
    setupCommitPreview();
    setupFileSelector();
    loadCommitTypes();
    loadCommonFiles();
    syncThemeToggle();
    setupClearForm();
    setupCopyCommand();
});
