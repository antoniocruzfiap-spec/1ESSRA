// Captura dos elementos do formulário
const inputId = document.getElementById("usuarioId");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputCpf = document.getElementById("cpf");
const inputCep = document.getElementById("cep");
const inputRua = document.getElementById("rua");
const inputBairro = document.getElementById("bairro");
const inputCidadeUf = document.getElementById("cidadeUf");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tabelaCorpo = document.querySelector("#tabelaUsuarios tbody");

// --- 1. BUSCA DE CEP AUTOMÁTICA (evento blur) ---
inputCep.addEventListener("blur", async () => {
  const cep = inputCep.value;
  if (!cep) return;

  inputRua.value = "Carregando...";
  const endereco = await buscarEnderecoPorCEP(cep);

  if (endereco) {
    inputRua.value = endereco.logradouro;
    inputBairro.value = endereco.bairro;
    inputCidadeUf.value = `${endereco.localidade} - ${endereco.uf}`;
  } else {
    alert("CEP não encontrado!");
    inputRua.value = "";
    inputBairro.value = "";
    inputCidadeUf.value = "";
  }
});

// --- 2. CARREGAR TABELA ---
async function carregarTabela() {
  const usuarios = await buscarUsuarios();
  tabelaCorpo.innerHTML = "";

  usuarios.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.cpf}</td>
      <td>${u.cep}</td>
      <td>
        <button class="btn-editar" onclick="prepararEdicao('${u.id}')">Editar</button>
        <button class="btn-deletar" onclick="excluir('${u.id}')">Excluir</button>
      </td>
    `;
    tabelaCorpo.appendChild(tr);
  });
}

// --- 3. SALVAR (CREATE / UPDATE) ---
btnSalvar.addEventListener("click", async () => {
  const id = inputId.value;
  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    cpf: inputCpf.value,
    cep: inputCep.value,
    rua: inputRua.value,
    bairro: inputBairro.value,
    cidadeUf: inputCidadeUf.value
  };

  if (!usuario.nome || !usuario.email) {
    alert("Preencha ao menos Nome e E-mail!");
    return;
  }

  if (id) {
    await atualizarUsuario(id, usuario);
  } else {
    await criarUsuario(usuario);
  }

  limparFormulario();
  carregarTabela();
});

// --- 4. PREPARAR EDIÇÃO ---
async function prepararEdicao(id) {
  const usuarios = await buscarUsuarios();
  const u = usuarios.find(user => String(user.id) === String(id));

  if (!u) return;

  inputId.value = u.id;
  inputNome.value = u.nome;
  inputEmail.value = u.email;
  inputCpf.value = u.cpf;
  inputCep.value = u.cep;
  inputRua.value = u.rua || "";
  inputBairro.value = u.bairro || "";
  inputCidadeUf.value = u.cidadeUf || "";

  btnSalvar.innerText = "Atualizar Usuário";
  btnCancelar.style.display = "inline-block";
}

// --- 5. EXCLUIR ---
async function excluir(id) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    await deletarUsuario(id);
    carregarTabela();
  }
}

// --- 6. CANCELAR E LIMPAR ---
btnCancelar.addEventListener("click", limparFormulario);

function limparFormulario() {
  inputId.value = "";
  inputNome.value = "";
  inputEmail.value = "";
  inputCpf.value = "";
  inputCep.value = "";
  inputRua.value = "";
  inputBairro.value = "";
  inputCidadeUf.value = "";

  btnSalvar.innerText = "Salvar Usuário";
  btnCancelar.style.display = "none";
}

// Inicializa a tabela ao carregar a página
carregarTabela();