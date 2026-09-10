const btnBuscar = document.getElementById("btnBuscar");
const spanStatus = document.getElementById("status");

const resultadoContainer = document.getElementById("resultadoContainer");
const elImagem = document.getElementById("imagemResultado");
const elAutor = document.getElementById("autorFoto");
const elDescricao = document.getElementById("descricaoFoto");

function buscarFotoHD() {
    // Sorteia um ID de imagem entre 1 e 500
    const idSorteado = Math.floor(Math.random() * 500) + 1;

    spanStatus.innerText = "🔄 Consultando dados da foto via API...";
    spanStatus.style.color = "#38bdf8";

    // Requisita a API para pegar os metadados da foto
    fetch(`https://picsum.photos/id/${idSorteado}/info`)
        .then(resposta => {
            if (!resposta.ok) throw new Error("Foto não encontrada");
            return resposta.json();
        })
        .then(dados => {
            // Atualiza o DOM com a imagem e as informações retornadas no JSON
            elImagem.src = `https://picsum.photos/id/${dados.id}/600/400`;
            elAutor.innerText = dados.author;
            elDescricao.innerText = `${dados.width}px x ${dados.height}px (Original)`;

            resultadoContainer.style.display = "block";
            spanStatus.innerText = "✅ Foto HD carregada com sucesso!";
            spanStatus.style.color = "#4ade80";
        })
        .catch(erro => {
            // Em caso de erro em um ID específico, busca uma imagem aleatória de backup
            elImagem.src = `https://picsum.photos/600/400?random=${Date.now()}`;
            elAutor.innerText = "Fotógrafo Picsum";
            elDescricao.innerText = "Resolução HD de Alta Qualidade";

            resultadoContainer.style.display = "block";
            spanStatus.innerText = "✅ Foto carregada com sucesso!";
            spanStatus.style.color = "#4ade80";
        });
}

btnBuscar.addEventListener("click", buscarFotoHD);