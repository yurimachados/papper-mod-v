const nome = document.getElementById('edit_nome');
const emailInput = document.getElementById('edit_email');
const cep = document.getElementById('edit_cep');
const estado = document.getElementById('edit_state');
const cidade = document.getElementById('edit_city');
const endereco = document.getElementById('edit_address');
const wpp = document.getElementById('edit_whatsapp');
const cpf = document.getElementById('edit_cpf');


//Formatações de campos
function formatarTelefone(wppInput) {

    let telefone = wppInput.value.replace(/\D/g, '');

    let codigoArea = telefone.substring(0, 2);
    let primeiraParte = telefone.substring(2, 7)
    let segundaParte = telefone.substring(7, 11)

    let telefoneFormatado = `+55 ${codigoArea} ${primeiraParte}-${segundaParte}`

    if (telefoneFormatado.length === 18) {
        wppInput.value = telefoneFormatado
    }
}

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

function validaEmail(email) {

    // Expressão regular para validar o formato do e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Testa se o e-mail corresponde ao formato esperado
    let validation = regex.test(email) ? "E-mail ok" : "Digite um e-mail válido.";

    return validation
}


emailInput.addEventListener("focusout", (e) => {
    validaEmail(emailInput)
})
