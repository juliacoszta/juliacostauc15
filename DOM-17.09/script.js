   function mudartexto () {
      document.getElementById
        ("titulo").textContent ="voce clicou no botao!";
}
    
    function mudarcor () {
      document.getElementById("mensagem").style.color =
       "purple";
    }

   function mostrarnome() {
      let nome = document.getElementById("nome").value;

      document.getElementById("resultado").textContent =
        "ola," + nome + "!";
   }

     let contador =0;

     function aumentar() {
            contador++;
       document.getElementById("numero").textContent = contador;

     }

     function diminuir() {
            contador--;
         document.getElementById("numero").textcontent = contador;
     }