const produtos = [
    {
        id: 1,
        nome: "Mimoso Burger",
        categoria: "hamburguer",
        preco: 22.90,
        imagem: "🍔",
        descricao: "Hambúrguer artesanal com queijo, alface, tomate e molho especial."
    },
    {
        id: 2,
        nome: "Duplo Mimoso",
        categoria: "hamburguer",
        preco: 29.90,
        imagem: "🍔",
        descricao: "Dois hambúrgueres artesanais com queijo cheddar e molho da casa."
    },
    {
        id: 3,
        nome: "Pizza Mimosas",
        categoria: "pizza",
        preco: 39.90,
        imagem: "🍕",
        descricao: "Pizza artesanal com queijo, tomate e ingredientes selecionados."
    },
    {
        id: 4,
        nome: "Pizza Calabresa",
        categoria: "pizza",
        preco: 42.90,
        imagem: "🍕",
        descricao: "Pizza de calabresa com queijo, cebola e orégano."
    },
    {
        id: 5,
        nome: "Batata Mimosas",
        categoria: "porcao",
        preco: 15.90,
        imagem: "🍟",
        descricao: "Batata frita crocante acompanhada de molho especial."
    },
    {
        id: 6,
        nome: "Nuggets",
        categoria: "porcao",
        preco: 18.90,
        imagem: "🍗",
        descricao: "Nuggets crocantes acompanhados de molho."
    },
    {
        id: 7,
        nome: "Refrigerante",
        categoria: "bebida",
        preco: 7.00,
        imagem: "🥤",
        descricao: "Refrigerante gelado para acompanhar seu pedido."
    },
    {
        id: 8,
        nome: "Suco Natural",
        categoria: "bebida",
        preco: 8.90,
        imagem: "🧃",
        descricao: "Suco natural preparado na hora."
    },
    {
        id: 9,
        nome: "Milkshake Mimosas",
        categoria: "sobremesa",
        preco: 16.90,
        imagem: "🥤",
        descricao: "Milkshake cremoso com cobertura especial."
    },
    {
        id: 10,
        nome: "Brownie",
        categoria: "sobremesa",
        preco: 12.90,
        imagem: "🍫",
        descricao: "Brownie de chocolate servido quentinho."
    }
];

let carrinho = JSON.parse(localStorage.getItem("carrinhoMimosas")) || [];
let categoriaSelecionada = "todos";
let desconto = 0;

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos(lista = produtos) {
    const areaProdutos = document.getElementById("listaProdutos");

    if (!areaProdutos) return;

    areaProdutos.innerHTML = "";

    if (lista.length === 0) {
        areaProdutos.innerHTML = `
            <div class="sem-produtos">
                <h3>Nenhum produto encontrado 😕</h3>
                <p>Tente pesquisar por outro nome.</p>
            </div>
        `;
        return;
    }

    lista.forEach(function(produto) {
        areaProdutos.innerHTML += `
            <div class="produto">
                <div class="produto-imagem">
                    ${produto.imagem}
                </div>

                <div class="produto-info">
                    <h3>${produto.nome}</h3>

                    <p>
                        ${produto.descricao}
                    </p>

                    <div class="produto-final">
                        <strong>
                            ${formatarPreco(produto.preco)}
                        </strong>

                        <button onclick="adicionarCarrinho(${produto.id})">
                            + Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filtrarCategoria(categoria, botao) {
    categoriaSelecionada = categoria;

    document.querySelectorAll(".categoria").forEach(function(item) {
        item.classList.remove("ativa");
    });

    if (botao) {
        botao.classList.add("ativa");
    }

    pesquisarProdutos();
}

function pesquisarProdutos() {
    const campo = document.getElementById("campoBusca");

    if (!campo) return;

    const texto = campo.value.toLowerCase();

    const lista = produtos.filter(function(produto) {
        const categoriaCerta =
            categoriaSelecionada === "todos" ||
            produto.categoria === categoriaSelecionada;

        const nomeCerto =
            produto.nome.toLowerCase().includes(texto);

        return categoriaCerta && nomeCerto;
    });

    mostrarProdutos(lista);
}

function adicionarCarrinho(id) {
    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    if (!produto) return;

    const produtoExistente = carrinho.find(function(item) {
        return item.id === id;
    });

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem(
        "carrinhoMimosas",
        JSON.stringify(carrinho)
    );
}

function atualizarCarrinho() {
    const area = document.getElementById("itensCarrinho");
    const contador = document.getElementById("contadorCarrinho");

    if (!area) return;

    area.innerHTML = "";

    let quantidadeTotal = 0;
    let subtotal = 0;

    carrinho.forEach(function(item) {
        quantidadeTotal += item.quantidade;
        subtotal += item.preco * item.quantidade;

        area.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>
                        ${item.imagem} ${item.nome}
                    </strong>

                    <p>
                        ${formatarPreco(item.preco)}
                    </p>

                    <div class="quantidade">
                        <button onclick="alterarQuantidade(${item.id}, -1)">
                            -
                        </button>

                        <span>
                            ${item.quantidade}
                        </span>

                        <button onclick="alterarQuantidade(${item.id}, 1)">
                            +
                        </button>
                    </div>
                </div>

                <button
                    class="remover"
                    onclick="removerProduto(${item.id})"
                >
                    🗑️
                </button>
            </div>
        `;
    });

    if (contador) {
        contador.textContent = quantidadeTotal;
    }

    if (carrinho.length === 0) {
        area.innerHTML = `
            <div class="carrinho-vazio">
                <span>🛒</span>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione alguma coisa gostosa!</p>
            </div>
        `;
    }

    calcularTotal(subtotal);
}

function alterarQuantidade(id, valor) {
    const produto = carrinho.find(function(item) {
        return item.id === id;
    });

    if (!produto) return;

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {
        removerProduto(id);
        return;
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function removerProduto(id) {
    carrinho = carrinho.filter(function(item) {
        return item.id !== id;
    });

    salvarCarrinho();
    atualizarCarrinho();
}

function calcularTotal(subtotal) {
    let entrega = carrinho.length > 0 ? 5 : 0;
    let valorDesconto = subtotal * desconto;
    let total = subtotal + entrega - valorDesconto;

    const subtotalElemento = document.getElementById("subtotal");
    const entregaElemento = document.getElementById("entrega");
    const descontoElemento = document.getElementById("desconto");
    const totalElemento = document.getElementById("total");

    if (subtotalElemento) {
        subtotalElemento.textContent = formatarPreco(subtotal);
    }

    if (entregaElemento) {
        entregaElemento.textContent = formatarPreco(entrega);
    }

    if (descontoElemento) {
        descontoElemento.textContent = "- " + formatarPreco(valorDesconto);
    }

    if (totalElemento) {
        totalElemento.textContent = formatarPreco(total);
    }
}

function aplicarCupom() {
    const campo = document.getElementById("campoCupom");

    if (!campo) return;

    const codigo = campo.value.trim().toUpperCase();

    if (codigo === "MIMOSAS10") {
        desconto = 0.10;
        alert("Cupom aplicado! Você ganhou 10% de desconto.");
    } else {
        desconto = 0;
        alert("Cupom inválido.");
    }

    atualizarCarrinho();
}

function abrirCarrinho() {
    const carrinho = document.getElementById("carrinho");
    const fundo = document.getElementById("fundoCarrinho");

    if (carrinho) {
        carrinho.classList.add("aberto");
    }

    if (fundo) {
        fundo.classList.add("ativo");
    }
}

function fecharCarrinho() {
    const carrinho = document.getElementById("carrinho");
    const fundo = document.getElementById("fundoCarrinho");

    if (carrinho) {
        carrinho.classList.remove("aberto");
    }

    if (fundo) {
        fundo.classList.remove("ativo");
    }
}

function abrirCheckout() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const checkout = document.getElementById("modalCheckout");

    if (checkout) {
        checkout.classList.add("ativo");
    }
}

function fecharCheckout() {
    const checkout = document.getElementById("modalCheckout");

    if (checkout) {
        checkout.classList.remove("ativo");
    }
}

function finalizarPedido(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeCliente");
    const pagamento = document.getElementById("pagamento");

    if (
        !nome ||
        !pagamento ||
        nome.value.trim() === "" ||
        pagamento.value === ""
    ) {
        alert("Preencha os campos obrigatórios.");
        return;
    }

    const numeroPedido =
        Math.floor(Math.random() * 9000) + 1000;

    const numero = document.getElementById("numeroPedido");

    if (numero) {
        numero.textContent = "Pedido #" + numeroPedido;
    }

    fecharCheckout();
    fecharCarrinho();

    const sucesso = document.getElementById("modalSucesso");

    if (sucesso) {
        sucesso.classList.add("ativo");
    }

    carrinho = [];
    desconto = 0;

    salvarCarrinho();
    atualizarCarrinho();

    const formulario = document.getElementById("formPedido");

    if (formulario) {
        formulario.reset();
    }
}

function fecharSucesso() {
    const sucesso = document.getElementById("modalSucesso");

    if (sucesso) {
        sucesso.classList.remove("ativo");
    }
}

const formularioCadastro =
    document.getElementById("formCadastro");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome =
            document.getElementById("nomeCadastro").value.trim();

        const email =
            document.getElementById("emailCadastro").value
                .trim()
                .toLowerCase();

        const senha =
            document.getElementById("senhaCadastro").value;

        const confirmarSenha =
            document.getElementById("confirmarSenha").value;

        const mensagem =
            document.getElementById("erroCadastro");

        mensagem.textContent = "";

        if (senha.length < 6) {
            mensagem.textContent =
                "A senha precisa ter pelo menos 6 caracteres.";
            return;
        }

        if (senha !== confirmarSenha) {
            mensagem.textContent =
                "As senhas não são iguais.";
            return;
        }

        let usuarios =
            JSON.parse(
                localStorage.getItem("usuariosMimosas")
            ) || [];

        const usuarioExiste =
            usuarios.find(function(usuario) {
                return usuario.email === email;
            });

        if (usuarioExiste) {
            mensagem.textContent =
                "Esse e-mail já está cadastrado.";
            return;
        }

        usuarios.push({
            nome: nome,
            email: email,
            senha: senha
        });

        localStorage.setItem(
            "usuariosMimosas",
            JSON.stringify(usuarios)
        );

        alert("Conta criada com sucesso!");

        window.location.href = "login.html";
    });
}

const formularioLogin =
    document.getElementById("formLogin");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const email =
            document.getElementById("emailLogin").value
                .trim()
                .toLowerCase();

        const senha =
            document.getElementById("senhaLogin").value;

        const mensagem =
            document.getElementById("erroLogin");

        mensagem.textContent = "";

        const usuarios =
            JSON.parse(
                localStorage.getItem("usuariosMimosas")
            ) || [];

        const usuario =
            usuarios.find(function(usuario) {
                return (
                    usuario.email === email &&
                    usuario.senha === senha
                );
            });

        if (!usuario) {
            mensagem.textContent =
                "E-mail ou senha incorretos.";
            return;
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        alert("Login realizado com sucesso!");

        window.location.href = "index.html";
    });
}

function mostrarSenha() {
    const senha =
        document.getElementById("senhaLogin");

    if (!senha) return;

    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}

function sairDaConta() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("listaProdutos")) {
        mostrarProdutos(produtos);
        atualizarCarrinho();
    }
});