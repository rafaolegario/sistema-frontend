window.onload = function (e) {

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "3-tela de login.html";
    }
    else {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);
                if (result.sucesso) {

                    var spnMensagem = document.getElementById("spnMensagem");

                    spnMensagem.innerText = "Bem-vindo ao sistema " + result.nome + " | ";
                }
                else {
                    window.location.href = "tela de login.html";
                }

            }
        });

        xhr.open("GET", "https://localhost:44348/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();
    }
    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");
        window.location.href = "3-tela de login.html";
    }

    var menu = document.getElementById("menu");

    menu.onclick = function (e) {
        var x = document.getElementById("menu");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
}