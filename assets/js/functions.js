
/**
 * Autopreenche o endereço com base no CEP fornecido.
 * @param {string} cepInput - O CEP a ser utilizado para preencher o endereço.
 */
function autopreencherEndereco(cepInput) {

    let cep = cepInput.value
    let cepData = {}

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
                    cepData.cidade = `${data.localidade} - ${data.uf}`;
                    cepData.endereco = `${data.logradouro} - ${data.bairro}`;
                    // data.wpp = `${data.ddd}`;
                    console.log(cepData)
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
        document.getElementById('edit-client-page').style.display = 'none';
    } else if (pagina === 'clientes') {
        // limparListagemClientes()
        // Exibe a página de listagem de clientes
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'flex';
        document.getElementById('add-client-page').style.display = 'none';
        document.getElementById('edit-client-page').style.display = 'none';
        // const listagem = document.getElementById('')
        listarClientes()
    }
    else if (pagina === 'adicionar') {
        // Exibe a página de adicionar cliente
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'none';
        document.getElementById('add-client-page').style.display = 'flex';
        document.getElementById('edit-client-page').style.display = 'none';
    } else if (pagina === 'editar') {
        // Exibe a página de editar cliente
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('clients-page').style.display = 'none';
        document.getElementById('add-client-page').style.display = 'none';
        document.getElementById('edit-client-page').style.display = 'flex';
    }
}

function extrairCidadeEstado(cidadeEstado) {
    // console.log(cidadeEstado)
    const regex = /(.*?) - (.*)/;
    const match = cidadeEstado.match(regex);
    if (match) {
        return [match[1], match[2]]; // Retorna um array com a cidade e o estado
    }
    return [null, null]; // Retorna um array com valores nulos se não encontrar a cidade e o estado
}

function limparListagemClientes() {
    const clientItens = document.getElementById('client-itens');
    while (clientItens.firstChild) {
        clientItens.removeChild(clientItens.firstChild);
    }
}