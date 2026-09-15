// Preencher com validarCPF e SalvarDadosEmTXT

function validarCPF(cpf) {
    // Limpa pontuações mantendo apenas números
    cpf = cpf.replace(/\D/g, '');

    // Verifica tamanho de 11 dígitos ou sequências repetidas
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    // Cálculo do 1º Dígito Verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do 2º Dígito Verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF Válido
}

// Função Download via Blob
function salvarDadosEmTXT(nomeArquivo, conteudo)
{
    const blob = new Blob([conteudo], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}