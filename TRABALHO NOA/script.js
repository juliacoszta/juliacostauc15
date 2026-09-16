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

    const actionText =
        typeof action === 'number'
            ? `${action > 0 ? '+' : ''}${action}`
            : action;

    const entry = {
        text: `Alterado de ${from} para ${to} (${actionText})`,
        time: timestamp
    };

    appState.history.unshift(entry);

    if (appState.history.length > 10) {
        appState.history.pop();
    }
}

function renderUI() {
    DOM.display.textContent = appState.count;

    // Atualizar Tema
    document.documentElement.setAttribute('data-theme', appState.theme);
    DOM.themeIcon.textContent = appState.theme === 'dark' ? '☀️' : '🌙';

    // Renderizar Histórico Dinamicamente
    DOM.historyList.innerHTML = '';

    appState.history.forEach(item => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${item.text}</span>
            <small>${item.time}</small>
        `;

        DOM.historyList.appendChild(li);
    });
}