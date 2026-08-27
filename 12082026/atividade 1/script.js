// 1. Mapeamento dos Elementos no DOM
const input = document.getElementById('campoTexto');
const botao = document.getElementById('btnExibir');
const divResultado = document.getElementById('painelResultado');

// 2. Ação de Clique com Validação Simples
botao.addEventListener('click', function() {
    const texto = input.value.trim(); // .trim() remove espaços vazios nas pontas

    // Validação: O campo está vazio?
    if (texto === '') {
        // Aplica o estado de erro
        input.classList.add('campo-erro');
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Por favor, digite algum texto!';
    } else {
        // Remove o estado de erro e exibe o sucesso
        input.classList.remove('campo-erro');
        divResultado.className = 'msg-sucesso';
        divResultado.innerText = `Você digitou: ${texto}`;
    }
});