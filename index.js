import express from "express";

const porta = 3000;
const host = "0.0.0.0";
const app  = express();

app.get("/",(requisicao, resposta)=>{
    resposta.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Menu principal</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cadastros</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="/cadastroJogador">Cadastros de jogadores</a></li>
                                            <li><a class="dropdown-item" href="/cadastroEquipe">Cadastros de equipes</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Listagem</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="/listaClientes">Lista de jogadores</a></li>
                                            <li><a class="dropdown-item" href="/listarFornecedores">Lista de equipes</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/logout">Sair</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`);
    resposta.end();
});

app.get("/cadastroJogador", (requisicao,resposta)=>{

});

app.get("/cadastroEquipe", (requisicao,resposta)=>{

});

app.post("/cadastroJogador", (requisicao,resposta)=>{

});

app.post("/cadastroEquipe", (requisicao,resposta)=>{

});

app.get("loguin", (requisicao,resposta)=>{

});

app.post("loguin", (requisicao,resposta)=>{

});

app.get("/logout",(requisicao,resposta)=>{

});

app.listen(porta, host, ()=>{
    console.log("Aplicação rodando na porta 3000");
});