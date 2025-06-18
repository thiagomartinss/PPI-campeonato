import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';

const porta = 3000;
const host = "0.0.0.0";
const app  = express();

var jogadores = [];
var equipes = [];

app.use(express.urlencoded({ extended: true })); //formulario

app.use(session({ //sessão
    secret: "M1nh4Ch4v3S3cr3t4", 
    resave: false,
    saveUninitialized: true,
    cookie:{ 
        maxAge: 1000 * 60 * 30, //30 min de sessão
        httpOnly: true,
        secure: false
    }
}));

app.use(cookieParser());  // cookie

app.get("/", verificarAutenticacao,(requisicao, resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
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
                                            <li><a class="dropdown-item" href="/cadastroEquipe">Cadastros de equipes</a></li>
                                            <li><a class="dropdown-item" href="/cadastroJogador">Cadastros de jogadores</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Listagem</a>
                                        <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/listaEquipe">Lista de equipes</a></li>
                                            <li><a class="dropdown-item" href="/listaJogador">Lista de jogadores</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/logout">Sair</a>
                                    </li>
                                </ul>
                            </div>
                            <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                        </div>
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`);
    resposta.end();
});

app.get("/cadastroEquipe", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    resposta.send(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastro de Produto</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                    </div>
                </nav>
                <main class="container w-75 mt-5">
                    <form method="POST" action="/cadastroEquipe" class="row g-3 needs-validation border p-4" novalidate>
                        <h2 class="text-center">Cadastro de Equipe</h2>
                        <div class="form-floating col-md-5">
                            <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe" placeholder="Nome da equipe" required>
                            <label for="nomeEquipe" class="form-label">Nome da equipe</label>
                        </div>
                        <div class="form-floating col-md-4">
                            <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" placeholder="Nome do técnico" required>
                            <label for="nomeTecnico" class="form-label">Nome do técnico</label>
                        </div>
                        <div class="form-floating col-md-3">
                            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="Telefone do técnico" required>
                            <label for="telefone" class="form-label">Telefone do técnico</label>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-success" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`);
    resposta.end();
});

app.get("/cadastroJogador", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    var conteudo = `
            <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Cadastro de Produto</title>
                    </head>
                    <body>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="container-fluid">
                                <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                            </div>
                        </nav>
                        <main class="container w-75 mt-5">
                            <form method="POST" action="/cadastroJogador" class="row g-3 needs-validation border p-4" novalidate>
                                <h2 class="text-center">Cadastro de Jogador</h2>
                                <div class="form-floating col-md-6">
                                    <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" placeholder="Nome do jogador" required>
                                    <label for="nomeJogador" class="form-label">Nome do jogador</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <input type="date" class="form-control" id="dtNascimento" name="dtNascimento" placeholder="Data de nascimento" required>
                                    <label for="dtNascimento">Data de nascimento</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <select class="form-select" id="sexo" name="sexo" required>
                                        <option selected disabled value=""></option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                    </select>
                                    <label for="sexo" class="form-label">Sexo</label>
                                </div>
                                <div class="form-floating col-md-2">
                                    <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" placeholder="N° da camisa" required>
                                    <label for="numeroCamisa" class="form-label">N° da camisa</label>
                                </div>
                                <div class="form-floating col-md-4">
                                    <input type="text" class="form-control" id="posicao" name="posicao" placeholder="Posição" required>
                                    <label for="posicao" class="form-label">Posição</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <input type="number" class="form-control" id="altura" name="altura" placeholder="Altura (cm)" required>
                                    <label for="altura" class="form-label">Altura (cm)</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <select class="form-select" id="equipe" name="equipe" required>
                                        <option selected disabled value=""></option>`;
                                        for(let i=0; i<equipes.length; i++)
                                            conteudo += `<option value="${equipes[i].equipe}">${equipes[i].equipe}</option>`;    
                                    conteudo +=`</select>
                                    <label for="equipe" class="form-label">Equipe</label>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-success" type="submit">Cadastrar</button>
                                    <a class="btn btn-secondary" href="/">Voltar</a>
                                </div>
                            </form>
                        </main>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>`;
    resposta.send(conteudo);
    resposta.end();
});

app.post("/cadastroEquipe", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    const equipe = requisicao.body.nomeEquipe;
    const tecnico = requisicao.body.nomeTecnico;
    const telefone = requisicao.body.telefone;

    if(equipe && tecnico && telefone){
        equipes.push({
            equipe: equipe,
            tecnico: tecnico,
            telefone: telefone
        });
        resposta.redirect("/listaEquipe");
    }
    else{
        var conteudo = `
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastro de Produto</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                    </div>
                </nav>
                <main class="container w-75 mt-5">
                    <form method="POST" action="/cadastroEquipe" class="row g-3 needs-validation border p-4" novalidate>
                        <h2 class="text-center">Cadastro de Equipe</h2>
                        <div class="form-floating col-md-5">`;
                            if(!equipe){
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe" placeholder="Nome da equipe" required>
                                <label for="nomeEquipe" class="form-label">Nome da equipe</label>
                                <span class="text-danger">Digite o nome da equipe</span>`;
                            }else{
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeEquipe" name="nomeEquipe" value="${equipe}" placeholder="Nome da equipe" required>
                                <label for="nomeEquipe" class="form-label">Nome da equipe</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-4">`;
                            if(!tecnico){
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" placeholder="Nome do técnico" required>
                                <label for="nomeTecnico" class="form-label">Nome do técnico</label>
                                <span class="text-danger">Digite o nome do técnico</span>`;
                            }else{
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" value="${tecnico}" placeholder="Nome do técnico" required>
                                <label for="nomeTecnico" class="form-label">Nome do técnico</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-3">`;
                            if(!telefone){
                                conteudo +=`
                                <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="Telefone do técnico" required>
                                <label for="telefone" class="form-label">Telefone do técnico</label>
                                <span class="text-danger">Digite o telefone</span>`;
                            }else{
                                conteudo +=`
                                <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}" placeholder="Telefone do técnico" required>
                                <label for="telefone" class="form-label">Telefone do técnico</label>`;
                            }
                        conteudo +=`</div>
                        <div class="col-12">
                            <button class="btn btn-success" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;
        resposta.send(conteudo);
        resposta.end();
    }
});

app.post("/cadastroJogador", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    const jogador = requisicao.body.nomeJogador;
    const nascimento = requisicao.body.dtNascimento;
    const sexo = requisicao.body.sexo;
    const numeroCamisa = requisicao.body.numeroCamisa;
    const posicao = requisicao.body.posicao;
    const altura = requisicao.body.altura;
    const equipe = requisicao.body.equipe;
    let qtdJogador = 0;

    for (let i = 0; i < jogadores.length; i++) {
        if (jogadores[i].equipe === equipe) {
            qtdJogador++;
        }
    }

    if(jogador && nascimento && sexo && numeroCamisa && posicao && altura && equipe){
        if(qtdJogador >= 6){
            var conteudo = `
                    <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Cadastro de Produto</title>
                    </head>
                    <body>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="container-fluid">
                                <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                            </div>
                        </nav>
                        <main class="container w-75 mt-5">
                            <form method="POST" action="/cadastroJogador" class="row g-3 needs-validation border p-4" novalidate>
                                <h2 class="text-center">Cadastro de Jogador</h2>
                                <div class="form-floating col-md-6">
                                    <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" value="${jogador}" placeholder="Nome do jogador" required>
                                    <label for="nomeJogador" class="form-label">Nome do jogador</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <input type="date" class="form-control" id="dtNascimento" name="dtNascimento" value="${nascimento}" placeholder="Data de nascimento" required>
                                    <label for="dtNascimento">Data de nascimento</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <select class="form-select" id="sexo" name="sexo" required>
                                        <option selected disabled value=""></option>
                                        <option ${sexo == 'Masculino' ? 'selected' : ''} value="Masculino">Masculino</option>
                                        <option ${sexo == 'Feminino' ? 'selected' : ''} value="Feminino">Feminino</option>
                                    </select>
                                    <label for="sexo" class="form-label">Sexo</label>
                                </div>
                                <div class="form-floating col-md-2">
                                    <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" value="${numeroCamisa}" placeholder="N° da camisa" required>
                                    <label for="numeroCamisa" class="form-label">N° da camisa</label>
                                </div>
                                <div class="form-floating col-md-4">
                                    <input type="text" class="form-control" id="posicao" name="posicao" value ="${posicao}" placeholder="Posição" required>
                                    <label for="posicao" class="form-label">Posição</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <input type="number" class="form-control" id="altura" name="altura" value="${altura}" placeholder="Altura (cm)" required>
                                    <label for="altura" class="form-label">Altura (cm)</label>
                                </div>
                                <div class="form-floating col-md-3">
                                    <select class="form-select" id="equipe" name="equipe" required>
                                        <option selected disabled value=""></option>
                                        <option value="${equipe}">${equipe}</option>
                                    </select>
                                    <label for="equipe" class="form-label">Equipe</label>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-success" type="submit">Cadastrar</button>
                                    <a class="btn btn-secondary" href="/">Voltar</a>
                                    <span class="text-danger">A equipe ${equipe} já possui 6 jogadores, selecione outra</span>
                                </div>
                            </form>
                        </main>
                    </body>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>`;
            resposta.send(conteudo);
            resposta.end();
        }else{
            jogadores.push({
            jogador: jogador,
            nascimento: nascimento,
            sexo: sexo,
            numeroCamisa: numeroCamisa,
            posicao: posicao,
            altura: altura,
            equipe: equipe
            });
            resposta.redirect("/listaJogador");
        } 
    }else{
        var conteudo = `
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastro de Produto</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                    </div>
                </nav>
                <main class="container w-75 mt-5">
                    <form method="POST" action="/cadastroJogador" class="row g-3 needs-validation border p-4" novalidate>
                        <h2 class="text-center">Cadastro de Jogador</h2>
                        <div class="form-floating col-md-6">`;
                            if(!jogador){
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" placeholder="Nome do jogador" required>
                                <label for="nomeJogador" class="form-label">Nome do jogador</label>
                                <span class="text-danger">Digite o nome do jogador</span>`;
                            }else{
                                conteudo +=`
                                <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" value="${jogador}" placeholder="Nome do jogador" required>
                                <label for="nomeJogador" class="form-label">Nome do jogador</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-3">`;
                            if(!nascimento){
                                conteudo +=`
                                <input type="date" class="form-control" id="dtNascimento" name="dtNascimento" placeholder="Data de nascimento" required>
                                <label for="dtNascimento">Data de nascimento</label>
                                <span class="text-danger">Digite a data de nascimento</span>`;
                            }else{
                                conteudo +=`
                                <input type="date" class="form-control" id="dtNascimento" name="dtNascimento" value="${nascimento}" placeholder="Data de nascimento" required>
                                <label for="dtNascimento">Data de nascimento</label>`;
                            }      
                        conteudo +=`</div>
                        <div class="form-floating col-md-3">`;
                            if(!sexo){
                                conteudo +=`
                                <select class="form-select" id="sexo" name="sexo" required>
                                    <option selected disabled value=""></option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                                <label for="sexo" class="form-label">Sexo</label>
                                <span class="text-danger">Selecione o sexo</span>`;
                            }else{
                                conteudo +=`
                                <select class="form-select" id="sexo" name="sexo" required>
                                    <option selected disabled value=""></option>
                                    <option ${sexo == 'Masculino' ? 'selected' : ''} value="Masculino">Masculino</option>
                                    <option ${sexo == 'Feminino' ? 'selected' : ''} value="Feminino">Feminino</option>
                                </select>
                                <label for="sexo" class="form-label">Sexo</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-2">`;
                            if(!numeroCamisa){
                                conteudo +=`
                                <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" placeholder="N° da camisa" required>
                                <label for="numeroCamisa" class="form-label">N° da camisa</label>
                                <span class="text-danger">Digite o número da camisa</span>`;
                            }else{
                                conteudo +=`
                                <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" value="${numeroCamisa}" placeholder="N° da camisa" required>
                                <label for="numeroCamisa" class="form-label">N° da camisa</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-4">`;
                            if(!posicao){
                                conteudo +=`
                                <input type="text" class="form-control" id="posicao" name="posicao" placeholder="Posição" required>
                                <label for="posicao" class="form-label">Posição</label>
                                <span class="text-danger">Digite a posição a ser jogada</span>`;
                            }else{
                                conteudo +=`
                                <input type="text" class="form-control" id="posicao" name="posicao" value ="${posicao}" placeholder="Posição" required>
                                <label for="posicao" class="form-label">Posição</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-3">`;
                            if(!altura){
                                conteudo +=`
                                <input type="number" class="form-control" id="altura" name="altura" placeholder="Altura (cm)" required>
                                <label for="altura" class="form-label">Altura (cm)</label>
                                <span class="text-danger">Digite a altura do jogador</span>`;
                            }else{
                                conteudo +=`
                                <input type="number" class="form-control" id="altura" name="altura" value="${altura}" placeholder="Altura (cm)" required>
                                <label for="altura" class="form-label">Altura (cm)</label>`;
                            }
                        conteudo +=`</div>
                        <div class="form-floating col-md-3">`;
                            if(!equipe){
                                conteudo +=`
                                 <select class="form-select" id="equipe" name="equipe" required>
                                    <option selected disabled value=""></option>`;
                                        for(let i=0; i<equipes.length; i++)
                                            conteudo += `<option value="${equipes[i].equipe}">${equipes[i].equipe}</option>`;     
                                conteudo +=`</select>
                                <label for="equipe" class="form-label">Equipe</label>
                                <span class="text-danger">Selecione a equipe</span>`;
                            }else{
                                conteudo +=`
                                <select class="form-select" id="equipe" name="equipe" required>
                                    <option selected disabled value=""></option>
                                    <option value="${equipe}">${equipe}</option>
                                </select>
                                <label for="equipe" class="form-label">Equipe</label>`;
                            }
                        conteudo +=`</div>
                        <div class="col-12">
                            <button class="btn btn-success" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;
        resposta.send(conteudo);
        resposta.end();
    }
});

app.get("/listaEquipe", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    let conteudo =`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                        </div>
                    </nav>
                    <main class="container-fluid p-4 mt-5">
                        <h2 class="text-center mb-3">Lista de equipes</h2>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome da equipe</th>
                                    <th scope="col">Nome do técnico</th>
                                    <th scope="col">Telefone do técnico</th>
                                </tr>
                            </thead>
                            <tbody>`;
                               for(let i=0; i<equipes.length; i++){
                                    conteudo +=`
                                        <tr>
                                            <td>${equipes[i].equipe}</td>
                                            <td>${equipes[i].tecnico}</td>
                                            <td>${equipes[i].telefone}</td>
                                        </tr>
                                    `;
                               }
                conteudo +=`</tbody>
                        </table>
                        <a class="btn btn-success mt-5" href="/cadastroEquipe">Novo Cadastro</a>
                        <a class="btn btn-secondary mt-5" href="/">Voltar</a>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`;
    resposta.send(conteudo);
    resposta.end();
});

app.get("/listaJogador", verificarAutenticacao, (requisicao,resposta)=>{
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    let conteudo =`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <span class=navbar-text ms-auto>${ultimoLogin?"Último login: " + ultimoLogin: ""}</span>
                        </div>
                    </nav>
                    <main class="container-fluid p-4 mt-5">
                        <h2 class="text-center mb-3">Lista de jogadores</h2>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome do jogador</th>
                                    <th scope="col">Data de nascimento</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">N° camisa</th>
                                    <th scope="col">Posição</th>
                                    <th scope="col">Altura</th>
                                    <th scope="col">Equipe</th>
                                </tr>
                            </thead>
                            <tbody>`;
                               for(let i=0; i<jogadores.length; i++){
                                    conteudo +=`
                                        <tr>
                                            <td>${jogadores[i].jogador}</td>
                                            <td>${jogadores[i].nascimento}</td>
                                            <td>${jogadores[i].sexo}</td>
                                            <td>${jogadores[i].numeroCamisa}</td>
                                            <td>${jogadores[i].posicao}</td>
                                            <td>${jogadores[i].altura}</td>
                                            <td>${jogadores[i].equipe}</td>
                                        </tr>
                                    `;
                               }
                conteudo +=`</tbody>
                        </table>
                        <a class="btn btn-success mt-5" href="/cadastroJogador">Novo Cadastro</a>
                        <a class="btn btn-secondary mt-5" href="/">Voltar</a>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`;
    resposta.send(conteudo);
    resposta.end();
});

app.get("/login", (requisicao,resposta)=>{
    resposta.send(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>Login do Sistema</title>
            <style>
                .gradient-custom {
                    /* fallback for old browsers */
                    background: #6a11cb;
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
                }
            </style>
        </head>
        <body>
            <main>
                <section class="vh-100 gradient-custom">
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                                    <div class="card-body p-5 text-center">
                                        <div class="mb-md-5 mt-md-4 pb-5">
                                            <form id="login-form" class="form" action="" method="post">
                                                <h3 class="fw-bold mb-2 text-uppercase">Login Campeonato</h3>
                                                <div data-mdb-input-init class="form-floating mb-4 mt-4">
                                                    <input type="text" id="login" name="login" class="form-control form-control-lg" />
                                                    <label class="form-label" for="login">Usuário</label>
                                                </div>
                                                <div data-mdb-input-init class="form-floating mb-4">
                                                    <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                                                    <label class="form-label" for="senha">Senha</label>
                                                </div>
                                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </html>`);
});

app.post("/login", (requisicao,resposta)=>{
    const usuario = requisicao.body.login;
    const senha = requisicao.body.senha;
    
    if(usuario == "admin" && senha == "123"){
        requisicao.session.logado = true;
        const dataHoraAtual = new Date();
        resposta.cookie('ultimoLogin', dataHoraAtual.toLocaleString(), {maxAge: 1000* 60 * 60 * 24 * 30}); // 30 dias
        resposta.redirect("/");
    }else{
        resposta.send(`
                    <html lang="pt-br">
                        <head>
                            <meta charset="UTF-8">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                            <title>Login do Sistema</title>
                            <style>
                                .gradient-custom {
                                    /* fallback for old browsers */
                                    background: #6a11cb;
                                    /* Chrome 10-25, Safari 5.1-6 */
                                    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
                                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                                    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
                                }
                            </style>
                        </head>
                        <body>
                            <main>
                                <section class="vh-100 gradient-custom">
                                    <div class="container py-5 h-100">
                                        <div class="row d-flex justify-content-center align-items-center h-100">
                                            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                                                    <div class="card-body p-5 text-center">
                                                        <div class="mb-md-5 mt-md-4 pb-5">
                                                            <form id="login-form" class="form" action="" method="post">
                                                                <h3 class="fw-bold mb-2 text-uppercase">Login Campeonato</h3>
                                                                <div data-mdb-input-init class="form-floating mb-4 mt-4">
                                                                    <input type="text" id="login" name="login" class="form-control form-control-lg" />
                                                                    <label class="form-label" for="login">Usuário</label>
                                                                </div>
                                                                <div data-mdb-input-init class="form-floating mb-4">
                                                                    <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                                                                    <label class="form-label" for="senha">Senha</label>
                                                                    <span class="text-danger">Usuário ou senha inválidos!</span>
                                                                </div>
                                                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                    </html>`
        );
    }
});

function verificarAutenticacao(requisicao, resposta, next){
    if(requisicao.session.logado){
        next(); 
    }else{
        resposta.redirect("/login");
    }
}

app.get("/logout",(requisicao,resposta)=>{
    requisicao.session.destroy();
    resposta.redirect("/login");
});

app.listen(porta, host, ()=>{
    console.log("Servidor em execução em http://${host}:${port}/");
});