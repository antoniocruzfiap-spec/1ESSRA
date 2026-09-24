const API_URL = "http://localhost:3000/usuarios";

// 1. READ (Listar todos)
async function buscarUsuarios() {
  const res = await fetch(API_URL);
  return await res.json();
}

// 2. CREATE (Inserir novo)
async function criarUsuario(usuario) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return await res.json();
}

// 3. UPDATE (Atualizar pelo ID)
async function atualizarUsuario(id, usuario) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return await res.json();
}

// 4. DELETE (Remover pelo ID)
async function deletarUsuario(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}

// 5. VIA CEP (Buscar endereço)
async function buscarEnderecoPorCEP(cep) {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    const dados = await res.json();
    return dados.erro ? null : dados;
  } catch (erro) {
    console.error("Erro no ViaCEP:", erro);
    return null;
  }
}