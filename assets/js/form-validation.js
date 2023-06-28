const nome = document.getElementById('nome');
const cep = document.getElementById('cep');
const estado = document.getElementById('state');
const cidade = document.getElementById('city');
const endereco = document.getElementById('address');
const wpp = document.getElementById('whatsapp');
const cpf = document.getElementById('cpf');


//Formatações de campos

function formatarCEP(cepInput) {
    var cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Aplica a formatação 00000-000

    cepInput.value = cep;
}

function formatarCPF(cpfInput) {
    var cpf = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Aplica a formatação 000.000.000-00

    cpfInput.value = cpf;
}

// Validação dos campos

function validaNome(nome) {
    return nome.value > 0 ? '' : 'Por favor, preencha o campo nome';
}

function validaCep(cep) {
    return cep.value < 11 ? '' : 'Por favor, preencha os 11 numeros co campo <strong>CEP</strong>';
}

function formatarTelefone(wppInput) {

    let telefone = wppInput.value.replace(/\D/g, '');

    let codigoArea = telefone.substring(0, 2);
    let primeiraParte = telefone.substring(2, 7)
    let segundaParte = telefone.substring(7, 11)

    let telefoneFormatado = `(${codigoArea}) ${primeiraParte}-${segundaParte}`

    if (telefoneFormatado.length === 15) {
        wppInput.value = telefoneFormatado
    }
}

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
                    wpp.value = `(${data.ddd})`;
                }
            })
            .catch((error) => {
                console.log('Erro ao consultar CEP', error);
            })
    }
    formatarCEP(cepInput)
}