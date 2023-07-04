const addButton = document.getElementById('add-client-button')
const addForm = document.getElementById('form-add-client')
const nameInput = document.getElementById('add_name')
const addEmailInput = document.getElementById('add_email')
const cpfInput = document.getElementById('add_cpf')
const cepInput = document.getElementById('add_cep')
const addressInput = document.getElementById('add_address')
const cityInput = document.getElementById('add_city')
const numberInput = document.getElementById('add_number')
const stateInput = document.getElementById('add_whatsapp')
const whatsappInput = document.getElementById('add_state')
let client = {}

addForm.addEventListener('submit', (e) => {

    e.preventDefault()

    client.name = nameInput.value
    client.email = addEmailInput.value
    client.cpf = cpfInput.value
    client.address = `${addressInput.value}, ${numberInput.value}`
    client.city = cityInput.value
    client.state = stateInput.value
    client.whatsapp = whatsappInput.value

    if (client.name)

    cadastrarCliente(client)
})

function cadastrarCliente(client) {

    fetch('http://192.168.0.133:3000/api/client', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(client)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro no cadastro: ", response.status)
            }
            return response.json()
        })
        .then((data) => {
            console.log('Cliente cadastrado com sucesso!', data)
            mostrarPagina('clientes')
        })
        .catch((error) => {
            console.log('Erro ao cadastrar cliente!', error)
        })
}