// 1. ELEMENTOS DO DOM
const tabelaCorpo = document.getElementById("tabelaCorpo");
const inputBusca = document.getElementById("inputBusca");
const btnRecarregar = document.getElementById("btnRecarregar");
const spanBadge = document.getElementById("badgeTotal");
const divStatus = document.getElementById("status");

const selectItensPagina = document.getElementById("selectItensPagina");
const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
const infoPagina = document.getElementById("infoPagina");

// 2. VARIÁVEIS DE ESTADO
let listaUsuarios = [];
let listaFiltrada = [];
let paginaAtual = 1;
let itensPorPagina = 10;

// 3. CARREGAR DADOS DA API
function carregarUsuariosAPI() {
    exibirStatus("🔄 Carregando dados da API...", "info");

    fetch("https://dummyjson.com/users?limit=50") // Puxa até 50 para testar o limite
        .then(resposta => resposta.json())
        .then(dados => {
            listaUsuarios = dados.users;
            listaFiltrada = listaUsuarios;
            paginaAtual = 1;
            
            atualizarExibicao();
            exibirStatus("✅ Dados carregados!", "success");
            setTimeout(() => divStatus.classList.add("d-none"), 1500);
        })
        .catch(erro => {
            exibirStatus("❌ Falha ao conectar com a API.", "danger");
            console.error(erro);
        });
}

// 4. LÓGICA DE PAGINAÇÃO E CORTE DO ARRAY (.slice)
function atualizarExibicao() {
    spanBadge.innerText = `${listaFiltrada.length} registros`;

    const totalPaginas = Math.ceil(listaFiltrada.length / itensPorPagina) || 1;
    
    // Garante que a página atual não ultrapasse o limite total
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    // Cálculo dos índices de corte
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + parseInt(itensPorPagina);
    const dadosPaginados = listaFiltrada.slice(inicio, fim);

    // Renderiza apenas os itens da página atual
    renderizarTabela(dadosPaginados);

    // Atualiza controles da tela
    infoPagina.innerText = `Página ${paginaAtual} de ${totalPaginas}`;
    btnAnterior.disabled = paginaAtual === 1;
    btnProximo.disabled = paginaAtual === totalPaginas || totalPaginas === 0;
}

// 5. RENDERIZAR TABELA
function renderizarTabela(usuarios) {
    tabelaCorpo.innerHTML = "";

    if (usuarios.length === 0) {
        tabelaCorpo.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-warning py-4">Nenhum registro encontrado.</td>
            </tr>`;
        return;
    }

    usuarios.forEach(usuario => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td><img src="${usuario.image}" alt="${usuario.firstName}" style="width:40px; height:40px; border-radius:50%;"></td>
            <td class="fw-bold">${usuario.firstName} ${usuario.lastName}</td>
            <td>${usuario.email}</td>
            <td><span class="badge bg-secondary">${usuario.company.title}</span></td>
            <td>${usuario.age} anos</td>
        `;
        tabelaCorpo.appendChild(linha);
    });
}

// 6. EVENTOS DE INTERAÇÃO
inputBusca.addEventListener("input", function() {
    const termo = inputBusca.value.toLowerCase().trim();

    listaFiltrada = listaUsuarios.filter(usuario => {
        const nome = `${usuario.firstName} ${usuario.lastName}`.toLowerCase();
        return nome.includes(termo) || usuario.email.toLowerCase().includes(termo);
    });

    paginaAtual = 1; // Reseta para a primeira página ao buscar
    atualizarExibicao();
});

selectItensPagina.addEventListener("change", function() {
    itensPorPagina = parseInt(this.value);
    paginaAtual = 1; // Reseta para a primeira página ao mudar a quantidade
    atualizarExibicao();
});

btnAnterior.addEventListener("click", () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        atualizarExibicao();
    }
});

btnProximo.addEventListener("click", () => {
    const totalPaginas = Math.ceil(listaFiltrada.length / itensPorPagina);
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarExibicao();
    }
});

function exibirStatus(mensagem, tipo) {
    divStatus.className = `alert alert-${tipo} mt-2`;
    divStatus.innerText = mensagem;
    divStatus.classList.remove("d-none");
}

btnRecarregar.addEventListener("click", carregarUsuariosAPI);
carregarUsuariosAPI();