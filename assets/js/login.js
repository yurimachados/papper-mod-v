const loginEmailInput = document.getElementById('user')
const loginPasswordInput = document.getElementById('password')
const loginForm = document.getElementById('login-form')

let authToken = '';

function login(credentials) {

    try {
        fetch('http://192.168.0.133:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na solicitação de Login: ", response.status)
                }
                return response.json()
            })
            .then((data) => {
                let authToken = data.token;
                mostrarPagina('clientes')
            })
            .catch((error) => {
                console.error('Erro na solicitação', error);
            })
    } catch (error) {
        console.error('Erro na solicitação', error);
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let email = loginEmailInput.value
    let password = loginPasswordInput.value
    const loginData = { email, password }

    login(loginData)
})


