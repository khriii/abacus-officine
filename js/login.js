document.addEventListener("DOMContentLoaded", main);

let passwordInput = null;
let loginBtn = null;
let passwordInputValue = null;

function findDomElements() {
    mailInput = document.querySelector("#mailInput");
    passwordInput = document.querySelector("#passwordInput");
    loginBtn = document.querySelector("#loginBtn");
}

function checkDomElements() {
    let errors = false;
    if (!passwordInput) {
        console.error("passwordInput not found");
        errors = true;
    }
    if (!loginBtn) {
        console.error("loginBtn not found");
        errors = true;
    }
    return errors;
}

async function loginBtnClick(mail, password) {
    const loginEndpoint = "../api/login_cliente.php"

    const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mail: mail,
            password: password
        })
    });

    const body = await response.text();

    console.log(body);
    const json = JSON.parse(body);


}

function addDomListeners() {
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            let mail = mailInput.value;
            let password = passwordInput.value;

            loginBtnClick(mail, password);
        });
    }
}

function main() {
    findDomElements();

    if (!checkDomElements()) {
        addDomListeners();
    }
}