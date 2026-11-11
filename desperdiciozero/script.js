const REFERENCIAS = {
  brasil: { valor: 41.6, rotulo: "Média Brasil", fonte: "Embrapa/FGV, 2018" },
  mundo: { valor: 79, rotulo: "Média mundial", fonte: "PNUMA, 2024" }
};
 
const SEMANAS_POR_ANO = 52;
const SEMANAS_POR_MES = SEMANAS_POR_ANO / 12;
 
const causas = [
  { icone: "📝", titulo: "Falta de planejamento", texto: "Comprar sem lista e sem saber o que já existe em casa." },
  { icone: "❄️", titulo: "Armazenamento incorreto", texto: "Alimentos guardados no lugar errado estragam mais rápido." },
  { icone: "🍲", titulo: "Excesso de preparo", texto: "Cozinhar ou servir mais do que será consumido." },
  { icone: "🗑️", titulo: "Descarte de alimentos bons", texto: "Jogar fora frutas “feias”, cascas e sobras ainda próprias para consumo." },
  { icone: "📅", titulo: "Confusão com a validade", texto: "Não acompanhar as datas e deixar produtos vencerem." },
  { icone: "💡", titulo: "Falta de conscientização", texto: "Não perceber o impacto ambiental, social e econômico do desperdício." }
];
 
const perguntas = [
  {
    pergunta: "Qual meta do ODS 12 trata especificamente do desperdício de alimentos?",
    opcoes: ["Meta 12.1", "Meta 12.3", "Meta 12.5", "Meta 12.8"],
    correta: 1,
    explicacao: "A meta 12.3 busca reduzir pela metade o desperdício de alimentos per capita no varejo e no consumidor até 2030, além de reduzir as perdas na produção e no abastecimento."
  },
  {
    pergunta: "Segundo a Embrapa/FGV, quanto cada brasileiro desperdiça de comida em casa, em média, por ano?",
    opcoes: ["Cerca de 4 kg", "Cerca de 15 kg", "Cerca de 41,6 kg", "Cerca de 200 kg"],
    correta: 2,
    explicacao: "A pesquisa da Embrapa com a FGV (2018) estimou 41,6 kg por pessoa ao ano — cerca de 128,8 kg por família."
  },
  {
    pergunta: "Qual atitude ajuda MAIS a evitar compras em excesso?",
    opcoes: ["Ir ao mercado com fome", "Fazer uma lista após conferir a geladeira e a despensa", "Comprar tudo o que está em promoção", "Comprar sempre em grande quantidade"],
    correta: 1,
    explicacao: "Conferir o que já existe em casa e fazer uma lista evita compras repetidas e por impulso."
  },
  {
    pergunta: "O que é a compostagem?",
    opcoes: ["Queimar o lixo orgânico", "Misturar todo o lixo em um só saco", "Transformar resíduos orgânicos em adubo", "Congelar restos de comida"],
    correta: 2,
    explicacao: "A compostagem transforma cascas, borra de café e outros restos orgânicos em adubo, evitando que eles vão para o aterro."
  },
  {
    pergunta: "Segundo a ONU, de onde vem a MAIOR parte do desperdício de alimentos no mundo?",
    opcoes: ["Das residências", "Dos supermercados", "Dos restaurantes", "Das indústrias de embalagens"],
    correta: 0,
    explicacao: "O relatório do PNUMA (2024) mostra que cerca de 60% do desperdício vem das casas — por isso as atitudes individuais fazem tanta diferença."
  }
];
 
const dicas = [
  { icone: "🗓️", titulo: "Planeje as compras", texto: "Monte um <strong>cardápio da semana</strong> e compre pensando nas refeições que realmente vão acontecer." },
  { icone: "📋", titulo: "Faça uma lista", texto: "Antes de sair, <strong>confira geladeira e despensa</strong>. No mercado, siga a lista e evite compras por impulso." },
  { icone: "🧊", titulo: "Armazene corretamente", texto: "Guarde folhas lavadas e secas em potes fechados; deixe na frente da geladeira o que <strong>vence primeiro</strong>." },
  { icone: "🥦", titulo: "Aproveite o alimento inteiro", texto: "Talos, folhas e cascas bem higienizados viram <strong>sopas, farofas e bolos</strong>, quando apropriado." },
  { icone: "🍱", titulo: "Reutilize sobras com segurança", texto: "Leve as sobras à geladeira <strong>logo após a refeição</strong>, em potes fechados, e consuma em poucos dias." },
  { icone: "📅", titulo: "Verifique a validade", texto: "Use a regra <strong>“primeiro que vence, primeiro que sai”</strong> e confira as datas com frequência." },
  { icone: "🛒", titulo: "Evite comprar em excesso", texto: "Promoção só vale se você <strong>vai consumir a tempo</strong>. Prefira comprar perecíveis em menor quantidade." },
  { icone: "🌱", titulo: "Faça compostagem", texto: "Cascas e restos orgânicos podem virar <strong>adubo</strong> em uma composteira doméstica ou na escola." }
];
 
const desafio = [
  { dia: 1, tema: "Conhecer a despensa", tarefas: ["Organizei geladeira e despensa", "Separei o que vence primeiro", "Anotei o que já tenho em casa"] },
  { dia: 2, tema: "Planejar", tarefas: ["Montei o cardápio da semana", "Fiz a lista de compras", "Comprei só o que estava na lista"] },
  { dia: 3, tema: "Porções certas", tarefas: ["Coloquei no prato só o que ia comer", "Cozinhei a quantidade certa", "Não deixei sobras no prato"] },
  { dia: 4, tema: "Aproveitamento integral", tarefas: ["Usei talos, cascas ou folhas em uma receita", "Aproveitei uma fruta madura demais", "Pesquisei uma receita de aproveitamento"] },
  { dia: 5, tema: "Sobras com segurança", tarefas: ["Guardei as sobras em pote fechado na geladeira", "Transformei sobras em uma nova refeição", "Etiquetei potes com a data"] },
  { dia: 6, tema: "Destino correto", tarefas: ["Separei os resíduos orgânicos", "Pesquisei sobre compostagem", "Separei recicláveis do lixo comum"] },
  { dia: 7, tema: "Espalhar a ideia", tarefas: ["Conversei com a família sobre desperdício", "Compartilhei uma dica com amigos ou na escola", "Fiz o quiz e a calculadora deste site"] }
];
 
const CHAVE_STORAGE = "desperdicioZero_desafio";
 
function formatar(numero, casas = 1) {
  return numero.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}
 
function iniciarNavegacao() {
  const botao = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const links = document.querySelectorAll(".nav-link");
 
  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    botao.setAttribute("aria-expanded", String(!aberto));
    botao.querySelector(".sr-only").textContent = aberto ? "Abrir menu" : "Fechar menu";
    menu.classList.toggle("open", !aberto);
  });
 
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.querySelector(".sr-only").textContent = "Abrir menu";
    });
  });
 
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      botao.setAttribute("aria-expanded", "false");
      botao.focus();
    }
  });
 
  const secoes = document.querySelectorAll("main section[id]");
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        links.forEach((l) => {
          const ativo = l.getAttribute("href") === "#" + entrada.target.id;
          l.classList.toggle("active", ativo);
          if (ativo) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secoes.forEach((s) => observador.observe(s));
}
 
function iniciarAnimacoes() {
  const elementos = document.querySelectorAll(".reveal");
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  elementos.forEach((el) => observador.observe(el));
 
  document.querySelectorAll(".stat-number").forEach((el) => {
    const alvo = parseFloat(el.dataset.count);
    const casas = parseInt(el.dataset.decimals || "0", 10);
    const sufixo = el.dataset.suffix || "";
    const duracao = 1500;
    const inicio = performance.now();
 
    function passo(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const valor = alvo * (1 - Math.pow(1 - progresso, 3));
      el.textContent = formatar(valor, casas) + sufixo;
      if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  });
}
 
function renderizarCausas() {
  const grid = document.getElementById("causasGrid");
  grid.innerHTML = causas.map((c) => `
    <article class="card cause-card reveal">
      <span class="icon" aria-hidden="true">${c.icone}</span>
      <h4>${c.titulo}</h4>
      <p>${c.texto}</p>
    </article>
  `).join("");
}
 
function iniciarAbas() {
  const abas = Array.from(document.querySelectorAll('[role="tab"]'));
 
  function selecionar(aba) {
    abas.forEach((a) => {
      const ativa = a === aba;
      a.setAttribute("aria-selected", String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      document.getElementById(a.getAttribute("aria-controls")).hidden = !ativa;
    });
    aba.focus();
  }
 
  abas.forEach((aba, i) => {
    aba.addEventListener("click", () => selecionar(aba));
    aba.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") selecionar(abas[(i + 1) % abas.length]);
      if (e.key === "ArrowLeft") selecionar(abas[(i - 1 + abas.length) % abas.length]);
      if (e.key === "Home") selecionar(abas[0]);
      if (e.key === "End") selecionar(abas[abas.length - 1]);
    });
  });
}
 
function iniciarCalculadora() {
  const form = document.getElementById("calcForm");
  const campoKg = document.getElementById("kgSemana");
  const campoPessoas = document.getElementById("pessoas");
  const resultado = document.getElementById("calcResult");
  const conteudoInicial = resultado.innerHTML;
 
  function mostrarErro(campo, mensagem) {
    const erro = document.getElementById(campo.id + "Erro");
    erro.textContent = mensagem;
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
  }
 
  function validar() {
    const textoKg = campoKg.value.trim().replace(",", ".");
    const textoPessoas = campoPessoas.value.trim();
    const kg = parseFloat(textoKg);
    const pessoas = Number(textoPessoas);
    let valido = true;
 
    if (textoKg === "") {
      mostrarErro(campoKg, "Informe a quantidade desperdiçada por semana.");
      valido = false;
    } else if (!/^\d+(\.\d+)?$/.test(textoKg) || isNaN(kg) || kg < 0) {
      mostrarErro(campoKg, "Digite um número igual ou maior que zero.");
      valido = false;
    } else if (kg > 200) {
      mostrarErro(campoKg, "O valor parece muito alto. Use no máximo 200 kg por semana.");
      valido = false;
    } else {
      mostrarErro(campoKg, "");
    }
 
    if (textoPessoas === "") {
      mostrarErro(campoPessoas, "Informe quantas pessoas moram na residência.");
      valido = false;
    } else if (!Number.isInteger(pessoas) || pessoas < 1) {
      mostrarErro(campoPessoas, "Digite um número inteiro a partir de 1.");
      valido = false;
    } else if (pessoas > 30) {
      mostrarErro(campoPessoas, "Use no máximo 30 pessoas.");
      valido = false;
    } else {
      mostrarErro(campoPessoas, "");
    }
 
    return valido ? { kg, pessoas } : null;
  }
 
  function calcular(kgSemana, pessoas) {
    const mensal = kgSemana * SEMANAS_POR_MES;
    const anual = kgSemana * SEMANAS_POR_ANO;
    return {
      mensal,
      anual,
      porPessoaAno: anual / pessoas,
      porPessoaMes: mensal / pessoas
    };
  }
 
  function mensagemEducativa(porPessoaAno) {
    if (porPessoaAno === 0) {
      return { classe: "bom", texto: "🌟 <strong>Desperdício zero!</strong> Continue assim e inspire outras pessoas." };
    }
    if (porPessoaAno <= REFERENCIAS.brasil.valor / 2) {
      return { classe: "bom", texto: "🌿 <strong>Muito bem!</strong> Seu desperdício por pessoa está abaixo da metade da média brasileira — exatamente o espírito da meta 12.3." };
    }
    if (porPessoaAno <= REFERENCIAS.brasil.valor) {
      return { classe: "medio", texto: "🙂 <strong>Bom caminho!</strong> Você está até a média brasileira. Que tal tentar reduzir pela metade com as dicas e o desafio de 7 dias?" };
    }
    return { classe: "alto", texto: "⚠️ <strong>Atenção!</strong> Seu desperdício por pessoa está acima da média brasileira. Comece pelo planejamento das compras e pelo armazenamento correto." };
  }
 
  function exibir(dados, pessoas) {
    const r = calcular(dados.kg, pessoas);
    const msg = mensagemEducativa(r.porPessoaAno);
    const maior = Math.max(r.porPessoaAno, REFERENCIAS.mundo.valor, REFERENCIAS.brasil.valor);
    const pct = (v) => (maior === 0 ? 0 : (v / maior) * 100).toFixed(1);
 
    resultado.innerHTML = `
      <h3>Seus resultados</h3>
      <div class="result-boxes">
        <div class="result-box"><span class="valor">${formatar(r.mensal)} kg</span><span class="rotulo">por mês</span></div>
        <div class="result-box"><span class="valor">${formatar(r.anual)} kg</span><span class="rotulo">por ano</span></div>
        <div class="result-box"><span class="valor">${formatar(r.porPessoaAno)} kg</span><span class="rotulo">por pessoa/ano</span></div>
      </div>
      <p>Média por pessoa: <strong>${formatar(r.porPessoaMes)} kg por mês</strong>.</p>
 
      <div class="chart" role="img" aria-label="Gráfico comparando seu desperdício por pessoa ao ano (${formatar(r.porPessoaAno)} kg) com a média brasileira (${formatar(REFERENCIAS.brasil.valor)} kg) e a média mundial doméstica (${formatar(REFERENCIAS.mundo.valor, 0)} kg).">
        <p class="chart-title">Comparação por pessoa, por ano (kg)</p>
        <div class="chart-row">
          <span class="chart-label">Você</span>
          <div class="chart-track"><div class="chart-bar voce" data-w="${pct(r.porPessoaAno)}"></div></div>
          <span class="chart-value">${formatar(r.porPessoaAno)}</span>
        </div>
        <div class="chart-row">
          <span class="chart-label">${REFERENCIAS.brasil.rotulo}</span>
          <div class="chart-track"><div class="chart-bar brasil" data-w="${pct(REFERENCIAS.brasil.valor)}"></div></div>
          <span class="chart-value">${formatar(REFERENCIAS.brasil.valor)}</span>
        </div>
        <div class="chart-row">
          <span class="chart-label">${REFERENCIAS.mundo.rotulo}</span>
          <div class="chart-track"><div class="chart-bar mundo" data-w="${pct(REFERENCIAS.mundo.valor)}"></div></div>
          <span class="chart-value">${formatar(REFERENCIAS.mundo.valor, 0)}</span>
        </div>
        <p class="small">Fontes: ${REFERENCIAS.brasil.fonte} (lares brasileiros) e ${REFERENCIAS.mundo.fonte} (lares, média mundial).</p>
      </div>
 
      <div class="feedback ${msg.classe}">${msg.texto}</div>
      <p class="small">🎯 Meta 12.3 aplicada à sua casa: chegar a <strong>${formatar(r.anual / 2)} kg por ano</strong> (metade do valor atual).</p>
    `;
 
    requestAnimationFrame(() => {
      resultado.querySelectorAll(".chart-bar").forEach((b) => { b.style.width = b.dataset.w + "%"; });
    });
  }
 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = validar();
    if (!dados) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    exibir(dados, dados.pessoas);
  });
 
  [campoKg, campoPessoas].forEach((campo) => {
    campo.addEventListener("input", () => {
      if (campo.getAttribute("aria-invalid") === "true") validar();
    });
  });
 
  form.addEventListener("reset", () => {
    mostrarErro(campoKg, "");
    mostrarErro(campoPessoas, "");
    resultado.innerHTML = conteudoInicial;
  });
}
 
const estadoQuiz = { atual: 0, pontos: 0, respondida: false };
 
function renderizarPergunta() {
  const caixa = document.getElementById("quizBox");
  const q = perguntas[estadoQuiz.atual];
  const letras = ["A", "B", "C", "D"];
  const progresso = (estadoQuiz.atual / perguntas.length) * 100;
  estadoQuiz.respondida = false;
 
  caixa.innerHTML = `
    <div class="quiz-top">
      <span class="quiz-count">Pergunta ${estadoQuiz.atual + 1} de ${perguntas.length}</span>
      <span class="quiz-score">Pontos: ${estadoQuiz.pontos}</span>
    </div>
    <div class="quiz-progress" aria-hidden="true"><div style="width:${progresso}%"></div></div>
    <h3 class="quiz-question" id="quizPergunta" tabindex="-1">${q.pergunta}</h3>
    <ul class="quiz-options" aria-labelledby="quizPergunta">
      ${q.opcoes.map((op, i) => `
        <li><button type="button" class="quiz-option" data-index="${i}">
          <span class="letra" aria-hidden="true">${letras[i]}</span><span>${op}</span>
        </button></li>`).join("")}
    </ul>
    <div id="quizFeedback" aria-live="polite"></div>
  `;
 
  caixa.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => responder(Number(btn.dataset.index)));
  });
}
 
function responder(indice) {
  if (estadoQuiz.respondida) return;
  estadoQuiz.respondida = true;
 
  const q = perguntas[estadoQuiz.atual];
  const botoes = document.querySelectorAll(".quiz-option");
  const acertou = indice === q.correta;
  if (acertou) estadoQuiz.pontos++;
 
  botoes.forEach((b, i) => {
    b.disabled = true;
    if (i === q.correta) b.classList.add("correta");
    if (i === indice && !acertou) b.classList.add("errada");
  });
  document.querySelector(".quiz-score").textContent = "Pontos: " + estadoQuiz.pontos;
 
  const ultima = estadoQuiz.atual === perguntas.length - 1;
  const feedback = document.getElementById("quizFeedback");
  feedback.innerHTML = `
    <div class="quiz-explain">
      <strong>${acertou ? "✅ Resposta correta!" : "❌ Não foi dessa vez."}</strong>
      <p style="margin:0.4rem 0 0">${q.explicacao}</p>
    </div>
    <div class="quiz-next">
      <button type="button" class="btn btn-primary" id="quizProxima">${ultima ? "Ver resultado" : "Próxima pergunta →"}</button>
    </div>
  `;
  const proxima = document.getElementById("quizProxima");
  proxima.focus();
  proxima.addEventListener("click", () => {
    if (ultima) {
      mostrarResultadoQuiz();
    } else {
      estadoQuiz.atual++;
      renderizarPergunta();
      document.getElementById("quizPergunta").focus();
    }
  });
}
 
function mostrarResultadoQuiz() {
  const total = perguntas.length;
  const p = estadoQuiz.pontos;
  let icone, titulo, texto;
 
  if (p === total) {
    icone = "🏆"; titulo = "Mestre do Desperdício Zero!";
    texto = "Você acertou tudo! Agora transforme o conhecimento em prática com o desafio de 7 dias.";
  } else if (p >= 3) {
    icone = "🌿"; titulo = "Muito bem!";
    texto = "Você conhece bem o tema. Revise as dicas para ficar ainda mais afiado(a).";
  } else if (p >= 1) {
    icone = "🌱"; titulo = "Você está aprendendo!";
    texto = "Leia as seções “Conheça o problema” e “ODS 12” e tente de novo.";
  } else {
    icone = "📚"; titulo = "Hora de aprender!";
    texto = "Não desanime: explore o site e refaça o quiz. Todo mundo começa de algum lugar.";
  }
 
  document.getElementById("quizBox").innerHTML = `
    <div class="quiz-result">
      <div class="big" aria-hidden="true">${icone}</div>
      <h3 id="quizFinal" tabindex="-1">${titulo}</h3>
      <p class="pontos">${p} / ${total}</p>
      <p>${texto}</p>
      <button type="button" class="btn btn-primary" id="quizReiniciar">Refazer o quiz</button>
    </div>
  `;
  document.getElementById("quizFinal").focus();
  document.getElementById("quizReiniciar").addEventListener("click", () => {
    estadoQuiz.atual = 0;
    estadoQuiz.pontos = 0;
    renderizarPergunta();
    document.getElementById("quizPergunta").focus();
  });
}
 
function renderizarDicas() {
  const grid = document.getElementById("dicasGrid");
  grid.innerHTML = dicas.map((d) => `
    <div class="tip reveal">
      <button type="button" class="tip-btn" aria-pressed="false">
        <span class="tip-inner">
          <span class="tip-face tip-front">
            <span class="icon" aria-hidden="true">${d.icone}</span>
            <span class="tip-title">${d.titulo}</span>
            <span class="ver">Clique para ver como ↻</span>
          </span>
          <span class="tip-face tip-back"><span>${d.texto}</span></span>
        </span>
      </button>
    </div>
  `).join("");
 
  grid.querySelectorAll(".tip-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const virado = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", String(!virado));
    });
  });
}
 
function carregarProgresso() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || {};
  } catch {
    return {};
  }
}
 
function salvarProgresso(progresso) {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(progresso));
  } catch {}
}
 
let progressoDesafio = carregarProgresso();
 
function renderizarDesafio() {
  const grid = document.getElementById("diasGrid");
  grid.innerHTML = desafio.map((d) => `
    <article class="card day-card" id="dia-${d.dia}">
      <fieldset>
        <legend>📆 Dia ${d.dia} <span class="day-status" hidden>Completo ✔</span></legend>
        <p class="day-theme">${d.tema}</p>
        ${d.tarefas.map((t, i) => {
          const id = `tarefa-${d.dia}-${i}`;
          const marcado = progressoDesafio[`${d.dia}-${i}`] ? "checked" : "";
          return `<label class="task" for="${id}">
                    <input type="checkbox" id="${id}" data-chave="${d.dia}-${i}" ${marcado}>
                    <span>${t}</span>
                  </label>`;
        }).join("")}
      </fieldset>
    </article>
  `).join("");
 
  grid.querySelectorAll('input[type="checkbox"]').forEach((caixa) => {
    caixa.addEventListener("change", () => {
      if (caixa.checked) progressoDesafio[caixa.dataset.chave] = true;
      else delete progressoDesafio[caixa.dataset.chave];
      salvarProgresso(progressoDesafio);
      atualizarProgresso(true);
    });
  });
 
  atualizarProgresso(false);
}
 
function atualizarProgresso(interacao) {
  const total = desafio.reduce((soma, d) => soma + d.tarefas.length, 0);
  const feitas = Object.keys(progressoDesafio).length;
  const pct = Math.round((feitas / total) * 100);
 
  document.getElementById("progressoTexto").textContent = `${feitas} de ${total} atitudes`;
  document.getElementById("progressFill").style.width = pct + "%";
  const barra = document.getElementById("progressBar");
  barra.setAttribute("aria-valuenow", String(pct));
  barra.setAttribute("aria-valuetext", `${pct}% concluído`);
 
  const niveis = [
    { min: 0, nome: "🌱 Semente" },
    { min: 25, nome: "🌿 Broto" },
    { min: 50, nome: "🪴 Planta" },
    { min: 75, nome: "🌳 Árvore" },
    { min: 100, nome: "🏆 Guardião do Desperdício Zero" }
  ];
  const nivel = niveis.filter((n) => pct >= n.min).pop();
  document.getElementById("progressoNivel").textContent = "Nível: " + nivel.nome;
 
  desafio.forEach((d) => {
    const completo = d.tarefas.every((_, i) => progressoDesafio[`${d.dia}-${i}`]);
    const card = document.getElementById("dia-" + d.dia);
    card.classList.toggle("completo", completo);
    card.querySelector(".day-status").hidden = !completo;
  });
 
  const conquista = document.getElementById("conquista");
  const terminou = feitas === total;
  const estavaOculta = conquista.hidden;
  conquista.hidden = !terminou;
  if (terminou && estavaOculta && interacao) conquista.focus();
}
 
function iniciarResetDesafio() {
  document.getElementById("resetDesafio").addEventListener("click", () => {
    if (Object.keys(progressoDesafio).length === 0) return;
    progressoDesafio = {};
    salvarProgresso(progressoDesafio);
    renderizarDesafio();
  });
}
 
document.addEventListener("DOMContentLoaded", () => {
  renderizarCausas();
  renderizarDicas();
  renderizarDesafio();
  renderizarPergunta();
  iniciarNavegacao();
  iniciarAbas();
  iniciarCalculadora();
  iniciarResetDesafio();
  iniciarAnimacoes();
});