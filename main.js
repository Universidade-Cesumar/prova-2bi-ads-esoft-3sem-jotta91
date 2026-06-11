const API_URL = "https://6a29e0b2f59cb8f65f1db035.mockapi.io/materials";

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
                </tr>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar materiais:", erro);
    }
}

document.getElementById("btn-cadastrar").addEventListener("click", async () => {
    const nome = document.getElementById("input-nome").value;
    const quantidade = document.getElementById("input-quantidade").value;

    if (!nome || !quantidade) {
        alert("Preencha todos os campos.");
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

carregarMateriais();
