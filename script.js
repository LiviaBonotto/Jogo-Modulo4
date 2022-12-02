//Definindo a URL, que será o IP da conexão com o WiFi
let url = "http://10.254.16.192/";

//Pegando a div que mostrará o jogador atual
const currentPlayer = document.querySelector(".currentPlayer");

//Variável que irá guardar as posições e o jogador que preencheu
let selected;

//Variável para indicar que o jogo começa com X
let player = "X";

//Armazenando as posições possíves para se ter um ganhador
let positions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

//Função para iniciar o jogo
function init() {
    selected = [];

    //Mostrando o primeiro jogador
    currentPlayer.innerHTML = `Jogador da vez: ${player}`;

    //Para cada botão da tabela, ele começa vazio
    //A cada clique, chamamos a função newMove
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });

    //Ajax que manda a requisição de jogador atual da rodada 
    if (player == "X"){
      $.ajax({
        url: url + "turnX",
      })
    }
    else if (player == "O"){
      $.ajax({
        url: url + "turnO",
      })
    }
}

//Iniciando a função init() quando abrimos o arquivo
init();


function color(){
  button = document.querySelectorAll(".game button");
  if (button == "O"){
    button.style.color = "red";
  };

  console.log(button);
}


//Função de novo movimento, que recebe como parâmetro o evento referente ao botão
function newMove(e) {
    //Pegamos o atributo de cada botão
    const index = e.target.getAttribute("data-i");
    //Passamos para o botão a informação do player (insere o x ou 0 na tabela)
    e.target.innerHTML = player;
    //Depois removemos o evento click do botão da função newmove
    //Para que não fique trocando os valores na mesma casa preenchida
    e.target.removeEventListener("click", newMove);
    //Quando clicar em um botão, vai armazenar na array, em cada posição, o jogador que preencheu
    selected[index] = player;

    //Chama a função check depois de trocar o player
    setTimeout(() => {
        check();
    }, [100]);

    //Trocando o player a cada movimento
    //Se tiver X selecionado, vai ser O, se não vai ser O
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    //Ajax que manda a requisição de jogador atual da rodada 
    if (player == "X"){
      $.ajax({
        url: url + "turnX",
      })
    }
    else if (player == "O"){
      $.ajax({
        url: url + "turnO",
      })
    }

}

// Faz a checagem para caso de X ou O vencer ou empate
function check() {
    //Pegamos o último player que jogou
    let playerLastMove = player === "X" ? "O" : "X";

    //Vai mapear os itens selecionados
    //Gera um novo array com esses itens e o index
    //Filtramos esse novo array verificando quais itens selecionados batem com o último player
    //Mapeamos o índex
    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    
    //Vai percorrer cada posição onde é possível haver um ganhador, para cada jogador
    //Dá um alert indicando quem ganhou
    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            if (playerLastMove == "X"){
              winX();
              alert("UHUULL O JOGADOR " + playerLastMove + " GANHOU!");
            }
            else if ((playerLastMove == "O")){
              winO();
              alert("UHUULL O JOGADOR " + playerLastMove + " GANHOU!");
            }
            
            init();
            return;
        }
    }

    //Se tiverem 9 itens selecionados, significa que deu empate
    if (selected.filter((item) => item).length === 9) {
        draw();
        alert("VISH, DEU EMPATE!");
        init();
        return;
    }
}


//Ajax que manda a requisição de quando o X ganha
function winX(){
     $.ajax({
        url: url + "winX",
    })
}

//Ajax que manda a requisição de quando o O ganha
function winO(){
  $.ajax({
     url: url + "winO",
 })
}

//Ajax que manda a requisição de quando há um empate
function draw(){
  $.ajax({
     url: url + "draw",
 })
}