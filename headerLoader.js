async function loadHeader() {
    try {
        const response = await fetch("header.html");
        if (!response.ok) throw new Error("Erro ao carregar o header.");
        const headerHTML = await response.text();
        document.body.insertAdjacentHTML("afterbegin", headerHTML);

        const themeToggle = document.getElementById("themeToggle");

        // Sincroniza o estado inicial com o tema padrão (modo escuro)
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "dark");
        }
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.checked = true;
        } else {
            document.body.classList.remove("dark-mode");
            themeToggle.checked = false;
        }

        // Adiciona evento para alternar tema
        themeToggle.addEventListener("change", toggleTheme);
    } catch (error) {
        console.error("Erro ao carregar o header:", error);
    }
}

// Alternar entre os temas claro e escuro
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Chamar a função ao carregar o documento
document.addEventListener("DOMContentLoaded", loadHeader);
