const edit_form = document.getElementById('form-edit-client')
const updatedCard = document.getElementById('')

edit_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const clientIdInput = document.getElementById('edit_id')
    const nameInput = document.getElementById('edit_name')
    const emailInput = document.getElementById('edit_email')
    const cpfInput = document.getElementById('edit_cpf')
    const addressInput = document.getElementById('edit_address')
    const cityInput = document.getElementById('edit_city')
    const numberInput = document.getElementById('edit_number')
    const whatsappInput = document.getElementById('edit_whatsapp')
    const client = {}

    const cityState = extrairCidadeEstado(cityInput.value)

    client.id = clientIdInput.value
    client.name = nameInput.value
    client.email = emailInput.value
    client.cpf = cpfInput.value
    client.address = `${addressInput.value} ${numberInput.value}`
    client.city = cityState[0]
    client.state = cityState[1]
    client.whatsapp = whatsappInput.value

    await updateClient(client)
    atualizarCard(client)

    document.getElementById('login-page').style.display = 'none';
    document.getElementById('clients-page').style.display = 'flex';
    document.getElementById('add-client-page').style.display = 'none';
    document.getElementById('edit-client-page').style.display = 'none';
})



