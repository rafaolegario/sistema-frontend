window.onload = function (e) {

    var entrar = document.getElementById("entrar");

    var txtemail = document.getElementById("email");

    var txtsenha = document.getElementById("senha");

    email.focus();

    entrar.onclick = function (e) {
        e.preventDefault();

        var email = txtemail.value;

        var senha = txtsenha.value;

        if (senha == "" & email == "") {
            mensagemErro("Os campos acima são obrigatorios.");

        }
        else if (email == "") {
            mensagemErro("E-mail obrigatório.");

        }
        else if (senha == "") {
            mensagemErro("Senha obrigatório.");
        }
        else {
            realizarLogin(email, senha);
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


    function realizarLogin(email, senha) {

        var data = JSON.stringify({
            "email": email,
            "senha": senha
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

        xhr.open("POST", "https://localhost:44348/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}
