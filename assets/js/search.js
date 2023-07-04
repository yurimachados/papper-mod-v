const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

searchButton.addEventListener('click', realizarPesquisa)


function realizarPesquisa() {
    // Obter o valor do campo de pesquisa
    const termoPesquisa = document.getElementById('search-input').value.toLowerCase();

    // Obter todos os cards de cliente
    const cardsClientes = document.getElementsByClassName('client-data');

    // Iterar sobre os cards de cliente
    for (let i = 0; i < cardsClientes.length; i++) {
        const cardCliente = cardsClientes[i];

        // Obter o conteúdo do card de cliente
        const conteudoCliente = cardCliente.textContent.toLowerCase();

        // Verificar se o termo de pesquisa está presente no conteúdo do card
        if (conteudoCliente.includes(termoPesquisa)) {
            // Exibir o card de cliente se houver correspondência
            cardCliente.style.display = 'flex';
        } else {
            // Ocultar o card de cliente se não houver correspondência
            cardCliente.style.display = 'none';
        }
    }
}