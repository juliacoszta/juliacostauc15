let valor = 10;

function mostrarCidade() {
     let cidade = document.getElementById("cidade").value;

      document.getElementById("mensagem").textContent =
         "que otima escolha Você pretende visitar " + cidade + "!";
}

function destacarMensagem() {
    let mensagem = document.getElementById("mensagem");

      mensagem.style.color = "white";
      mensagem.style.backgroundColor = "green";
      mensagem.style.fontSize = "24px";
      mensagem.style.padding = "10px";
}

function aumentar() {
     valor++;

      document.getElementById("contador").textContent = valor;
}

function diminuir() {
     valor--;

     document.getElementById("contador").textContent = valor;
}