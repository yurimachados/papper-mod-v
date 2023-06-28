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