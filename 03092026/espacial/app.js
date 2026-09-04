// Mapeamento dos elementos do DOM
const selectGalaxias = document.getElementById('selectGalaxias');
const campoConstelacao = document.getElementById('campoConstelacao');
const containerPlanetas = document.getElementById('containerPlanetas');
const btnRegistrar = document.getElementById('btnRegistrar');
const divResultado = document.getElementById('painelResultado');
const secaoListagem = document.getElementById('secaoListagem');
const listaSalvos = document.getElementById('listaSalvos');

// FUNÇÃO 1: Popular o Select (Sem Retorno)
function popularSelectGalaxias(dados) {
    dados.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${item.galaxia} (${item.planetas.length} planetas)`;
        selectGalaxias.appendChild(option);
    });
}

// FUNÇÃO 2: Criar o HTML de um Planeta (Retorna Elemento DOM)
function criarBlocoPlanetaHTML(planeta, indice) {
    const divPlaneta = document.createElement('div');
    divPlaneta.className = 'bloco-planeta';
    divPlaneta.innerHTML = `
        <h4>Planeta ${indice + 1}: ${planeta.nome}</h4>
        <div class="grid-planeta">
            <div>
                <label>Nome do Planeta:</label>
                <input type="text" class="input-nome" value="${planeta.nome}">
            </div>
            <div>
                <label>Diâmetro / Tamanho:</label>
                <input type="text" class="input-diametro" value="${planeta.diametro}">
            </div>
            <div>
                <label>Distância da Terra:</label>
                <input type="text" class="input-distancia" value="${planeta.distancia}">
            </div>
            <div>
                <label>Tipo Astronômico:</label>
                <input type="text" class="input-tipo" value="${planeta.tipo}">
            </div>
        </div>
    `;
    return divPlaneta;
}

// FUNÇÃO 3: Renderizar Lista de Planetas
function renderizarPlanetasDaGalaxia() {
    const indiceSelecionado = selectGalaxias.value;
    containerPlanetas.innerHTML = '';

    if (indiceSelecionado === '') {
        btnRegistrar.style.display = 'none';
        return;
    }

    const galaxiaObjeto = galaxiasData[indiceSelecionado];

    galaxiaObjeto.planetas.forEach((planeta, i) => {
        const blocoHTML = criarBlocoPlanetaHTML(planeta, i);
        containerPlanetas.appendChild(blocoHTML);
    });

    btnRegistrar.style.display = 'block';
}

// FUNÇÃO 4: Validar Campos Obrigatorios (Retorna Booleano)
function validarFormulario(constelacao) {
    if (constelacao.trim() === '') {
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Preencha o nome do Setor / Constelação!';
        return false;
    }
    return true;
}

// FUNÇÃO 5: Coletar Dados do Formulário (Retorna Array)
function coletarDadosDosPlanetas() {
    const blocos = document.querySelectorAll('.bloco-planeta');
    const lista = [];

    blocos.forEach(bloco => {
        lista.push({
            nome: bloco.querySelector('.input-nome').value.trim(),
            diametro: bloco.querySelector('.input-diametro').value.trim(),
            distancia: bloco.querySelector('.input-distancia').value.trim(),
            tipo: bloco.querySelector('.input-tipo').value.trim()
        });
    });

    return lista;
}

// FUNÇÃO 6: Gerar Texto Formatado para o TXT (Retorna String)
function gerarConteudoTXT(nomeGalaxia, constelacao, planetas) {
    let texto = `=== REGISTRO ASTRONÔMICO ===\n`;
    texto += `Galáxia: ${nomeGalaxia}\n`;
    texto += `Setor/Constelação: ${constelacao}\n`;
    texto += `-----------------------------------\n`;

    planetas.forEach((p, index) => {
        texto += `Planeta ${index + 1}: ${p.nome}\n`;
        texto += `  - Tamanho: ${p.diametro}\n`;
        texto += `  - Distância: ${p.distancia}\n`;
        texto += `  - Classe: ${p.tipo}\n\n`;
    });

    return texto;
}

// FUNÇÃO 7: Disparar Download de Arquivo (Procedimento)
function baixarArquivoTXT(conteudo, nomeArquivo) {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// FUNÇÃO 8: Adicionar Card ao Histórico na Tela
function adicionarAoHistorico(constelacao, nomeGalaxia, planetas) {
    secaoListagem.style.display = 'block';
    const card = document.createElement('div');
    card.className = 'card-historico';

    let textoPlanetas = planetas.map(p => 
        `<b>${p.nome}</b> (${p.tipo} - ${p.diametro} - ${p.distancia})`
    ).join('<br> ');

    card.innerHTML = `<strong>Setor:</strong> ${constelacao} [${nomeGalaxia}]<br>${textoPlanetas}`;
    listaSalvos.appendChild(card);
}

// FUNÇÃO PRINCIPAL: Processar Registro (Orquestradora)
function processarRegistro() {
    const constelacao = campoConstelacao.value;

    if (!validarFormulario(constelacao)) return;

    const indiceGalaxia = selectGalaxias.value;
    const nomeGalaxia = galaxiasData[indiceGalaxia].galaxia;
    const planetasColetados = coletarDadosDosPlanetas();

    const textoFormatado = gerarConteudoTXT(nomeGalaxia, constelacao, planetasColetados);
    const nomeArquivo = `sistema_${constelacao.toLowerCase().replace(/\s+/g, '_')}.txt`;
    
    baixarArquivoTXT(textoFormatado, nomeArquivo);
    adicionarAoHistorico(constelacao, nomeGalaxia, planetasColetados);
    
    divResultado.className = 'msg-sucesso';
    divResultado.innerText = 'Registro exportado em arquivo TXT e listado abaixo com sucesso!';
}

// INICIALIZAÇÃO E EVENTOS
popularSelectGalaxias(galaxiasData);

selectGalaxias.addEventListener('change', renderizarPlanetasDaGalaxia);
btnRegistrar.addEventListener('click', processarRegistro);