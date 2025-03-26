// Função para exibir mensagens abaixo do botão
function mostraMensagem(mensagem, tamanhoFonte) {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p style="font-family: Poppins; font-size: ${tamanhoFonte};">${mensagem}</p>`;
}

// Função para sortear um número entre 1 e 10
function sorteia(n) {
    return Math.floor(Math.random() * n) + 1;
}

// Função para limpar o campo de tentativa
function limparTentativa() {
    let campo = document.getElementById("numeroChute");
    if (campo.value !== "") {
        campo.value = "";
    }
}

// Variáveis do jogo
const numeroMaximoTentativas = 3;
let numeroTentativas = 1;
let numeroPensado = sorteia(10);
console.log(numeroPensado); // Para testar no console

let campoChute = document.getElementById("numeroChute");
campoChute.focus();

// Função para verificar o número digitado
function verificaChute() {
    let chute = Number(document.getElementById("numeroChute").value);

    // Verifica se o número está dentro do intervalo permitido
    if (chute < 1 || chute > 10 || isNaN(chute)) {
        mostraMensagem("Digite um número entre 1 e 10!", "1rem");
        return;
    }

    // Verifica se acertou
    if (chute === numeroPensado) {
        let mensagem = numeroTentativas === 1
            ? `Uau! Você acertou na primeira tentativa! O número era ${numeroPensado}.`
            : `Parabéns! Você acertou em ${numeroTentativas} tentativas. O número era ${numeroPensado}.`;
        
        mostraMensagem(mensagem, "2rem");
        setTimeout(() => location.reload(), 3000); // Reinicia o jogo após 3 segundos
        return;
    }

    // Se errou, incrementa as tentativas
    numeroTentativas++;

    if (numeroTentativas > numeroMaximoTentativas) {
        mostraMensagem(`Você perdeu! O número era ${numeroPensado}. Vamos jogar novamente?`, "1rem");
        setTimeout(() => location.reload(), 3000); // Reinicia o jogo após 3 segundos
    } else {
        let dica = chute < numeroPensado ? "um número maior." : "um número menor.";
        mostraMensagem(`Errou! Tente ${dica}`, "1rem");
    }

    limparTentativa();
    campoChute.focus();
}

// Função para ativar o botão ao pressionar "Enter"
campoChute.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("botaoChute").click();
    }
});
