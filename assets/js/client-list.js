/**
 * 
 * @param {string} className - Nome da classe a ser inserida dentro do elemento parágrafo
 * @param {string} textContent - Conteúdo de texto dentro do parágrafo
 * @returns {HTMLParagraphElement}
 */
function createParagraph(className, textContent) {

    const p = document.createElement('p')
    p.classList.add(className)
    p.textContent = textContent

    return p
}

function listarClientes() {
    try {
        fetch('http://192.168.0.133:3000/api/client', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then((data) => {

                let clientList = [];

                data.forEach(client => {

                    let clientAddress = `${client.address} - ${client.city} ${client.state}`;
                    // console.log(client.createdAt)
                    let createdAt = client.createdAt

                    let clientData = {
                        id: client.id,
                        name: client.name,
                        email: client.email,
                        cpf: client.cpf,
                        wpp: client.whatsapp,
                        address: clientAddress,
                        createdAt: createdAt
                    }
                    clientList.push(clientData)
                })

                createCard(clientList)
            })
            .catch((error) => {
                console.error('Erro na solicitação', error);
            })
    } catch (error) {
        console.log(error);
    }
}

clientItens = document.getElementById('client-itens')

function createCard(clientData) {

    console.log(clientData)
    clientData.forEach(client => {

        // console.log(client.address)
        const card = document.createElement('div')
        card.classList.add('client-data', `id_${client.id}`)
        card.id = `id_${client.id}`

        // Botão de exclusão de cliente
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('onclick', `excluirCliente(${client.id})`);

        const name = createParagraph('client-name', "Nome: " + client.name)
        const email = createParagraph('client-email', "E-mail: " + client.email)
        const cpf = createParagraph('client-cpf', "CPF: " + client.cpf)
        const wpp = createParagraph('client-wpp', "WhatsApp: " + client.wpp)
        const address = createParagraph('client-city', "Endereço: " + client.address)
        const createdAt = createParagraph('client-created-at', "Criado em: " + client.createdAt)

        card.appendChild(deleteButton)
        card.appendChild(name)
        card.appendChild(email)
        card.appendChild(cpf)
        card.appendChild(wpp)
        card.appendChild(address)
        card.appendChild(createdAt)

        clientItens.appendChild(card);
        console.log(card)
    })
}

function excluirCliente(clientId) {

    let idToDelete = 'id_' + clientId
    console.log(idToDelete)
    let elementToDelete = document.getElementById(idToDelete)
    elementToDelete.style.display = 'none'

    try {
        fetch(`http://192.168.0.133:3000/api/client/${clientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Cliente excluído com sucesso:', data.id);
            })
            .catch((error) => {
                console.error('Erro ao excluir cliente:', error);
            });
    } catch (error) {
        console.log(error);
    }

}


