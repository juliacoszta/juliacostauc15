
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Saudação automática
  const saudacao = document.getElementById("saudacao");

  if (saudacao) {
    const horaAtual = new Date().getHours();
    saudacao.textContent = obterSaudacao(horaAtual);
  }

  // Menu para celular
  const menuBotao = document.getElementById("botaoMenu");
  const menu = document.getElementById("menuPrincipal");

  if (menuBotao && menu) {
    menuBotao.addEventListener("click", function () {
      const aberto = menu.classList.toggle("aberto");

      menuBotao.setAttribute("aria-expanded", String(aberto));
      menuBotao.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
      );

      menuBotao.textContent = aberto ? "✕" : "☰";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("aberto");
        menuBotao.setAttribute("aria-expanded", "false");
        menuBotao.setAttribute("aria-label", "Abrir menu");
        menuBotao.textContent = "☰";
      });
    });
  }

  // Alternar tema claro e escuro
  const temaBotao = document.getElementById("botaoTema");

  if (temaBotao) {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "claro") {
      document.body.classList.add("tema-claro");
      temaBotao.textContent = "☾";
      temaBotao.setAttribute("aria-label", "Ativar modo escuro");
    }

    temaBotao.addEventListener("click", function () {
      document.body.classList.toggle("tema-claro");

      const temaClaro =
        document.body.classList.contains("tema-claro");

      localStorage.setItem("tema", temaClaro ? "claro" : "escuro");

      temaBotao.textContent = temaClaro ? "☾" : "☀";
      temaBotao.setAttribute(
        "aria-label",
        temaClaro ? "Ativar modo escuro" : "Ativar modo claro"
      );
    });
  }

  // Projetos de exemplo
  const projetos = [
    {
      titulo: "Projeto 1",
      descricao: "Uma página criada com HTML e CSS.",
      tecnologias: ["HTML", "CSS"],
      icone: "5"
    },
    {
      titulo: "Projeto 2",
      descricao: "Uma página interativa com JavaScript.",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      icone: "JS"
    },
    {
      titulo: "Projeto 3",
      descricao: "Um projeto para praticar programação.",
      tecnologias: ["JavaScript"],
      icone: "</>"
    }
  ];

  const listaProjetos = document.getElementById("listaProjetos");
  const botoesFiltro = document.querySelectorAll(".filtro");

  function mostrarProjetos(filtro = "todos") {
    if (!listaProjetos) return;

    listaProjetos.innerHTML = "";

    const projetosFiltrados = projetos.filter(function (projeto) {
      return (
        filtro === "todos" ||
        projeto.tecnologias.includes(filtro)
      );
    });

    projetosFiltrados.forEach(function (projeto) {
      const card = document.createElement("article");
      card.className = "projeto-card";

      const arte = document.createElement("div");
      arte.className = "projeto-arte";

      const icone = document.createElement("span");
      icone.textContent = projeto.icone;
      arte.appendChild(icone);

      const conteudo = document.createElement("div");
      conteudo.className = "projeto-conteudo";

      const titulo = document.createElement("h3");
      titulo.textContent = projeto.titulo;

      const descricao = document.createElement("p");
      descricao.textContent = projeto.descricao;

      const tags = document.createElement("div");
      tags.className = "tags";

      projeto.tecnologias.forEach(function (tecnologia) {
        const tag = document.createElement("span");
        tag.textContent = tecnologia;
        tags.appendChild(tag);
      });

      conteudo.appendChild(titulo);
      conteudo.appendChild(descricao);
      conteudo.appendChild(tags);

      card.appendChild(arte);
      card.appendChild(conteudo);

      listaProjetos.appendChild(card);
    });
  }

  mostrarProjetos();

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const filtro = botao.dataset.filtro;

      botoesFiltro.forEach(function (outroBotao) {
        outroBotao.classList.remove("ativo");
        outroBotao.setAttribute("aria-pressed", "false");
      });

      botao.classList.add("ativo");
      botao.setAttribute("aria-pressed", "true");

      mostrarProjetos(filtro);
    });
  });

  // Validação do formulário
  const formulario = document.getElementById("formularioContato");
  const mensagemFormulario =
    document.getElementById("mensagemFormulario");

  if (formulario) {
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const nome = document.getElementById("nome");
      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");
      const consentimento = document.getElementById("consentimento");

      const campos = [
        { campo: nome, erro: "erroNome", texto: "Digite seu nome." },
        { campo: email, erro: "erroEmail", texto: "Digite seu e-mail." },
        {
          campo: mensagem,
          erro: "erroMensagem",
          texto: "Digite sua mensagem."
        }
      ];

      let erros = [];

      campos.forEach(function (item) {
        const elementoErro = document.getElementById(item.erro);

        if (!item.campo.value.trim()) {
          erros.push(item.texto);
          item.campo.setAttribute("aria-invalid", "true");

          if (elementoErro) {
            elementoErro.textContent = item.texto;
          }
        } else {
          item.campo.removeAttribute("aria-invalid");

          if (elementoErro) {
            elementoErro.textContent = "";
          }
        }
      });

      if (email.value.trim() && !email.validity.valid) {
        erros.push("Digite um e-mail válido.");
        email.setAttribute("aria-invalid", "true");
        document.getElementById("erroEmail").textContent =
          "Digite um e-mail válido.";
      }

      const erroConsentimento =
        document.getElementById("erroConsentimento");

      if (!consentimento.checked) {
        erros.push("Você precisa aceitar o consentimento.");

        if (erroConsentimento) {
          erroConsentimento.textContent =
            "Você precisa aceitar o consentimento.";
        }
      } else if (erroConsentimento) {
        erroConsentimento.textContent = "";
      }

      if (mensagemFormulario) {
        mensagemFormulario.className = "";

        if (erros.length > 0) {
          mensagemFormulario.textContent = erros.join(" ");
          mensagemFormulario.classList.add("falha");
        } else {
          mensagemFormulario.textContent =
            "Formulário validado com sucesso!";
          mensagemFormulario.classList.add("sucesso");

          formulario.reset();
          campos.forEach(function (item) {
            item.campo.removeAttribute("aria-invalid");
          });
        }
      }
    });
  }

  // Ano atual no rodapé
  const anoAtual = document.getElementById("anoAtual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Botão voltar ao topo
  const voltarTopo = document.getElementById("voltarTopo");

  if (voltarTopo) {
    window.addEventListener("scroll", function () {
      voltarTopo.classList.toggle("visivel", window.scrollY >= 300);
    });

    voltarTopo.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
