let listaDeNumerosSorteados = []
let numerolimite = 10;
let numeroSecreto = gerararNumeroAleatorio();
let tentativas = 1

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemIncial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 a ${numerolimite}`);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log (chute == numeroSecreto);

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');

        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerararNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numerolimite + 1);
    let quantidadeDeElementosEscolhidos = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosEscolhidos == numerolimite){
        listaDeNumerosSorteados = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerararNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
            chute = document.querySelector('input')
            chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerararNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled',false)
}

exibirMensagemIncial();