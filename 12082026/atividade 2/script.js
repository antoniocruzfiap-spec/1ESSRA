// 1. Mapeamento dos Elementos no DOM
const input = document.getElementById('campoTexto');
const contador = document.getElementById('contador');
const botao = document.getElementById('btnExibir');
const divResultado = document.getElementById('painelResultado');

// 2. Atualização do Contador em Tempo Real
input.addEventListener('input', function() {
    const total = input.value.length;
    contador.innerText = `${total} / 10 caracteres`;
});

// 3. Ação de Clique com Validação de Mínimo (Maior que 10 caracteres)
botao.addEventListener('click', function() {
    const texto = input.value.trim(); // .trim() remove espaços vazios nas pontas

    // Validação: Possui mais de 10 caracteres?
    if (texto.length <= 10) {
        // Aplica o estado de erro se for menor ou igual a 10
        input.classList.add('campo-erro');
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Digite mais de 10 caracteres para enviar!';
    } else {
        // Remove o estado de erro e exibe o sucesso
        input.classList.remove('campo-erro');
        divResultado.className = 'msg-sucesso';
        divResultado.innerText = `Você digitou: ${texto}`;
    }
});