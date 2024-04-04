window.onload = function (e) {

    var btncadastro = document.getElementById("btncadastro");

    var txtnome = document.getElementById("nome");

    var txtsenha = document.getElementById("senha");

    var txttelefone = document.getElementById("telefone");

    var txtsobrenome = document.getElementById("sobrenome");

    var txtemail = document.getElementById("email");

    var txtgenero = document.getElementById("slc1");

    txtnome.focus();

    btncadastro.onclick = function (e) {

        e.preventDefault();

        var nome = txtnome.value;

        var sobrenome = txtsobrenome.value;

        var email = txtemail.value;

        var senha = txtsenha.value;

        var telefone = txttelefone.value;

        var genero = txtgenero.value;

        if (email == "" ||
            sobrenome == "" ||
            senha == "" ||
            telefone == "" ||
            email == "" ||
            genero == "") {

            var mensagem = "Campos obrigátorios";
            mensagemErro(mensagem);
        }
        else {
            Cadastrar(nome, sobrenome, email, senha, telefone, genero);
        }
    };

    function mensagemErro(mensagem) {

        var spnerro = document.getElementById("spnerro");

        spnerro.innerText = mensagem;

        spnerro.style.display = "block";

        setTimeout(function () {
            spnerro.style.display = "none";
        }, 5000);
    }
    function Cadastrar(nome, sobrenome, email, senha, telefone, genero) {
        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "telefone": telefone,
            "senha": senha,
            "email": email,
            "genero": genero
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = "home.html";
                }
                else {
                    mensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44348/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}