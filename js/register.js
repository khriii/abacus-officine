document.addEventListener("DOMContentLoaded", main);

let emailInput;
let cognomeInput;
let nomeInput;
let numeroTelefonoInput;
let passwordInput;
let registerBtn;

function findDomElements() {
    mailInput = document.querySelector("#mailInput");
    cognomeInput = document.querySelector("#cognomeInput");
    nomeInput = document.querySelector("#nomeInput");
    numeroTelefonoInput = document.querySelector("#numeroTelefonoInput");
    passwordInput = document.querySelector("#passwordInput");
    registerBtn = document.querySelector("#registerBtn");
}

async function register(mail, cognome, nome, numero_telefono, password) {
    const endpoint = "../api/register_cliente.php"

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mail: mail,
            cognome: cognome,
            nome: nome,
            numero_telefono: numero_telefono,
            password: password,
        })
    });

    const body = await response.text();

    console.log(body);
    const json = JSON.parse(body);
}

function main() {
    findDomElements();


    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            let mail = mailInput.value;
            let cognome = cognomeInput.value;
            let nome = nomeInput.value;
            let numeroTelefono = numeroTelefonoInput.value;
            let password = passwordInput.value;

            register(mail, cognome, nome, numeroTelefono, password);

        })
    }



}