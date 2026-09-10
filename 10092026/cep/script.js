// 1. CAPTURA DOS ELEMENTOS DO FORMULÁRIO
const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputUf = document.getElementById("uf");
const spanStatus = document.getElementById("status");

// 2. ESCUTANDO O EVENTO DE DESFOQUE (BLUR) NO CAMPO CEP
inputCep.addEventListener("blur", function() {
    // Remove qualquer caractere que não seja número
    const cepLimpo = inputCep.value.replace(/\D/g, "");

    // Valida se o CEP possui exatamente 8 dígitos
    if (cepLimpo.length !== 8) {
        spanStatus.innerText = "⚠️ CEP inválido! Digite 8 números.";
        spanStatus.style.color = "red";
        limparCampos();
        return;
    }

    spanStatus.innerText = "🔄 Buscando endereço...";
    spanStatus.style.color = "blue";

    // 3. REQUISIÇÃO VIA FETCH PARA A API REST DO VIACEP
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) {
                spanStatus.innerText = "❌ CEP não encontrado!";
                spanStatus.style.color = "red";
                limparCampos();
            } else {
                // Preenchendo os campos com os dados retornados no JSON
                inputLogradouro.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputUf.value = dados.uf;

                spanStatus.innerText = "✅ Endereço encontrado!";
                spanStatus.style.color = "green";
            }
        })
        .catch(erro => {
            spanStatus.innerText = "⚠️ Erro ao consultar a API.";
            spanStatus.style.color = "red";
            console.error("Erro na requisição:", erro);
        });
});

// FUNÇÃO AUXILIAR PARA LIMPAR OS CAMPOS
function limparCampos() {
    inputLogradouro.value = "";
    inputBairro.value = "";
    inputCidade.value = "";
    inputUf.value = "";
}