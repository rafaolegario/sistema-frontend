window.onload = function (e) {

    var Btrecuperar = document.getElementById("recuperar");

    var txtemail = document.getElementById("email");

    txtemail.focus();

    Btrecuperar.onclick = function (e) {

        e.preventDefault();

        var email = txtemail.value;

        if (email == "") {

            mensagemErro("Digite um E-mail ");
        }
        else {
            mudarSenha(email);
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
    function mudarSenha(email) {
        var data = JSON.stringify({
            "email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert("E-mail enviado com sucesso!");
                }
                else {
                    mensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44348/api/usuario/esqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}