const API_URL = "https://6a29e0b2f59cb8f65f1db035.mockapi.io/materials";

function validarRetirada(estoqueAtual, quantidadeRetirada) {
    return quantidadeRetirada > 0 &&
           quantidadeRetirada <= estoqueAtual;
}

async function carregarMateriais() {
    try {
        const response = await fetch(API_URL);
        const materiais = await response.json();

        const lista = document.getElementById("lista-materiais");
        lista.innerHTML = "";

        materiais.forEach(material => {
            lista.innerHTML += `
                <tr>
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                    <td>
                        <button
                            class="btn-baixar"
                            onclick="baixarMaterial('${material.id}', ${material.quantidade})">
                            Baixar
                        </button>

                        <button
                            class="btn-excluir"
                            onclick="excluirMaterial('${material.id}')">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
    }
}

document.getElementById("btn-cadastrar").addEventListener("click", async () => {

    const nome = document.getElementById("input-nome").value;
    const quantidade = Number(
        document.getElementById("input-quantidade").value
    );

    if (!nome || quantidade <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                quantidade
            })
        });

        document.getElementById("input-nome").value = "";
        document.getElementById("input-quantidade").value = "";

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
    }
});

async function baixarMaterial(id, estoqueAtual) {

    const retirada = Number(
        document.getElementById("input-retirada").value
    );

    if (!validarRetirada(estoqueAtual, retirada)) {
        alert("Quantidade inválida.");
        return;
    }

    const novoEstoque = estoqueAtual - retirada;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantidade: novoEstoque
            })
        });

        document.getElementById("input-retirada").value = "";

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao baixar estoque:", erro);
    }
}

async function excluirMaterial(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        carregarMateriais();

    } catch (erro) {
        console.error("Erro ao excluir material:", erro);
    }
}

carregarMateriais();
