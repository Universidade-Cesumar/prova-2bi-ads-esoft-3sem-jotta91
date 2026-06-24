const API_URL = "https://6a29e0b2f59cb8f65f1db035.mockapi.io/materials";

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    return quantidadeRetirada > 0 && quantidadeRetirada <= estoqueAtual;
}

async function carregarMateriais() {
    try {
        const response = await fetch(API_URL);
        const materiais = await response.json();

        renderizar(materiais);

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
    }
}

function renderizar(materiais) {
    const lista = document.getElementById("lista-materiais");
    const total = document.getElementById("total-itens");
    const busca = document.getElementById("input-busca").value.toLowerCase();

    lista.innerHTML = "";

    const filtrados = materiais.filter(item =>
        item.nome.toLowerCase().includes(busca)
    );

    total.textContent = `Total de itens: ${filtrados.length}`;

    filtrados.forEach(item => {

        const classeCritica = item.quantidade < 10 ? "estoque-critico" : "";

        lista.innerHTML += `
            <tr class="${classeCritica}">
                <td>${item.nome}</td>
                <td>${item.quantidade}</td>
                <td>
                    <button class="btn-baixar"
                        onclick="baixarMaterial('${item.id}', ${item.quantidade})">
                        Baixar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirMaterial('${item.id}')">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

document.getElementById("btn-cadastrar").addEventListener("click", async () => {

    const nome = document.getElementById("input-nome").value;
    const quantidade = Number(document.getElementById("input-quantidade").value);

    if (!nome || quantidade <= 0) return alert("Dados inválidos");

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, quantidade })
        });

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
    }
});

async function baixarMaterial(id, estoqueAtual) {

    const retirada = Number(document.getElementById("input-retirada").value);

    if (!validarRetirada(estoqueAtual, retirada)) {
        alert("Quantidade inválida");
        return;
    }

    const novo = estoqueAtual - retirada;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantidade: novo })
        });

        document.getElementById("input-retirada").value = "";
        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao atualizar:", erro);
    }
}

async function excluirMaterial(id) {

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao excluir:", erro);
    }
}

document.getElementById("input-busca").addEventListener("input", () => {
    carregarMateriais();
});

carregarMateriais();
