
/**
 * Autopreenche o endereço com base no CEP fornecido.
 * @param {string} cepInput - O CEP a ser utilizado para preencher o endereço.
 */
function autopreencherEndereco(cepInput) {

    let cep = cepInput.value

    if (cep.length === 9) {

        cepTratado = cep.replace('-', '')

        let url = `https://viacep.com.br/ws/${cepTratado}/json/`;

        fetch(url)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                if (!data.error) {
                    // estado.value = data.uf;
                    cidade.value = `${data.localidade} - ${data.uf}`;
                    endereco.value = `${data.logradouro} - ${data.bairro}`;
                    wpp.value = `+55 ${data.ddd}`;
                }
            })
            .catch((error) => {
                console.log('Erro ao consultar CEP', error);
            })
    }
    formatarCEP(cepInput)
}
/**
 * Alterna entre as páginas
 * @param {string} pagina - Página a ser exibida
 */
function mostrarPagina(pagina) {
    if (pagina === 'login') {
        // Exibe a página de login
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('clients-page').style.display = 'none';
        document.getElementById('add-client-page').style.display = 'none';
    } else if (pagina === 'clientes') { 
        // Exibe a página de listagem de clientes
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'flex';
        document.getElementById('add-client-page').style.display = 'none';
        listarClientes()
    }
    else if (pagina === 'adicionar') {
        // Exibe a página de adicionar cliente
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'none';
        document.getElementById('add-client-page').style.display = 'flex';
    } else if (pagina === 'editar') {
        // Exibe a página de editar cliente
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'none';
        document.getElementById('add-client-page').style.display = 'none';
        document.getElementById('edit-client-page').style.display = 'flex';
    }
}