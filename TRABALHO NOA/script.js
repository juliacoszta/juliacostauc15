/**
 * Aplicação do Contador com Estado e Persistência
 */

// 1. Objeto de Estado da Aplicação
const appState = {
    count: 0,
    theme: 'light',
    history: [],
    limits: { min: -50, max: 50 }
};

// 2. Mapeamento dos Elementos do DOM
const DOM = {
    display: document.getElementById('counter-display'),
    status: document.getElementById('status-message'),
    historyList: document.getElementById('history-list'),
    themeToggleBtn: document.getElementById('btn-theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    btnIncrement: document.getElementById('btn-increment'),
    btnDecrement: document.getElementById('btn-decrement'),
    btnStepUp: document.getElementById('btn-step-up'),
    btnStepDown: document.getElementById('btn-step-down'),
    btnReset: document.getElementById('btn-reset'),
    btnClearHistory: document.getElementById('btn-clear-history')
};

// 3. Funções de Inicialização e Persistência (localStorage)
function initApp() {
    loadStateFromStorage();
    renderUI();
    attachEventListeners();
}

function loadStateFromStorage() {
    const savedCount = localStorage.getItem('app_count');
    const savedTheme = localStorage.getItem('app_theme');
    const savedHistory = localStorage.getItem('app_history');

    if (savedCount !== null) appState.count = parseInt(savedCount, 10);
    if (savedTheme !== null) appState.theme = savedTheme;
    if (savedHistory !== null) appState.history = JSON.parse(savedHistory);
}

function saveStateToStorage() {
    localStorage.setItem('app_count', appState.count);
    localStorage.setItem('app_theme', appState.theme);
    localStorage.setItem('app_history', JSON.stringify(appState.history));
}

// 4. Lógica de Atualização do Estado
function updateCounter(valueChange) {
    const newCount = appState.count + valueChange;

    // Validação de Limites
    if (newCount < appState.limits.min || newCount > appState.limits.max) {
        DOM.status.textContent = `Limite atingido! (${appState.limits.min} até ${appState.limits.max})`;
        return;
    }

    DOM.status.textContent = '';
    const previousCount = appState.count;
    appState.count = newCount;

    // Registrar no Histórico
    addHistoryEntry(previousCount, newCount, valueChange);
    saveStateToStorage();
    renderUI();
}

function resetCounter() {
    if (appState.count === 0) return;

    addHistoryEntry(appState.count, 0, 'Reset');
    appState.count = 0;
    DOM.status.textContent = '';
    saveStateToStorage();
    renderUI();
}

function addHistoryEntry(from, to, action) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const entry = {
        text: `Alterado de ${from} para ${to} (${action > 0 ? '+' : ''}${action})`,
        time: timestamp
    };

    appState.history.unshift(entry);

    if (appState.history.length > 10) {
        appState.history.pop();
    }
}

// 5. Renderização da Interface (UI)
function renderUI() {
    DOM.display.textContent = appState.count;

    // Atualizar Tema
    document.documentElement.setAttribute('data-theme', appState.theme);
    DOM.themeIcon.textContent = appState.theme === 'dark' ? '☀️' : '🌙';

    // Renderizar Histórico Dinamicamente
    DOM.historyList.innerHTML = '';

    appState.history.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.text}</span><small>${item.time}</small>`;
        DOM.historyList.appendChild(li);
    });
}

function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    saveStateToStorage();
    renderUI();
}

// 6. Registro de Eventos (Event Listeners)
function attachEventListeners() {
    DOM.btnStepUp.addEventListener('click', () => updateCounter(1));
    DOM.btnStepDown.addEventListener('click', () => updateCounter(-1));
    DOM.btnIncrement.addEventListener('click', () => updateCounter(5));
    DOM.btnDecrement.addEventListener('click', () => updateCounter(-5));
    DOM.btnReset.addEventListener('click', resetCounter);

    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    DOM.btnClearHistory.addEventListener('click', () => {
        appState.history = [];
        saveStateToStorage();
        renderUI();
    });
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);
