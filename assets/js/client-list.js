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

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDay()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} - ${hours}:${minutes}`
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
                        createdAt: formatDate(createdAt)
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
        card.classList.add('client-data', `${client.id}`)
        card.id = `id_${client.id}`

        // Div de opções
        const optionsDiv = document.createElement('div')
        optionsDiv.classList.add('options-div')

        // Div de dados
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('data-div')

        // Botão de exclusão de cliente
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('onclick', `excluirCliente(${client.id})`);
        
        
        // Botão de edição de cadastro
        const editIcon = document.createElement('i')
        editIcon.classList.add('fas', 'fa-cog')

        const editButton = document.createElement('button');
        editButton.appendChild(editIcon)
        editButton.classList.add('edit-button');
        editButton.setAttribute('onclick', `editarCliente(${client.id})`);

        const name = createParagraph('client-name', "Nome: " + client.name)
        const email = createParagraph('client-email', "E-mail: " + client.email)
        const cpf = createParagraph('client-cpf', "CPF: " + client.cpf)
        const wpp = createParagraph('client-wpp', "WhatsApp: " + client.wpp)
        const address = createParagraph('client-city', "Endereço: " + client.address)
        const createdAt = createParagraph('client-created-at', "Criado em: " + client.createdAt)

        card.appendChild(optionsDiv)
        card.appendChild(dataDiv)
        optionsDiv.appendChild(deleteButton)
        optionsDiv.appendChild(editButton)
        dataDiv.appendChild(name)
        dataDiv.appendChild(email)
        dataDiv.appendChild(cpf)
        dataDiv.appendChild(wpp)
        dataDiv.appendChild(address)
        dataDiv.appendChild(createdAt)

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


