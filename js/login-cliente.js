import { API_ENDPOINTS, fetchGet, fetchPost } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function handleClickLogin() {
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");

    const email = emailInput.value;
    const password = passwordInput.value;

    // Verify if all fields are filled
    if (!email || !password) {
        alert("Per favore, compila tutti i campi");
        return;
    }

    const requestBody = {
        email: email,
        password: password
    };

    const response = await fetchPost(API_ENDPOINTS.LOGIN_CLIENTE, requestBody);
    console.log(response);

    const loginMessage = document.getElementById("login-message");

    if (!loginMessage) {
        console.error("Login message element not found");
        return;
    }

    loginMessage.classList.remove("error-toast", "success-toast");
    if (response.success) {
        loginMessage.textContent = response.msg;
        loginMessage.classList.add("success-toast");
    } else {
        loginMessage.textContent = response.msg || "Si è verificato un errore durante il login.";
        loginMessage.classList.add("error-toast");
    }
}

async function checkLoginStatus() {
    const response = await fetchGet(API_ENDPOINTS.CHECK_LOGIN_STATUS);

    if (response.success === false) {
        return false;
    }
    return response.data.isLoggedIn;
}

async function main() {
    const isLoggedIn = await checkLoginStatus();


    const loginMessageDiv = document.getElementById("login-message-div");

    if (!loginMessageDiv) {
        console.error("Login message element not found");
        return;
    }

    // If is not logged in, show the login form, otherwise show a message that the user is already logged in
    if (isLoggedIn) {
        loginMessageDiv.innerHTML = `<p>Sei già loggato. Se vuoi accedere con un altro account, effettua il <a href="./logout-cliente.html" class="logout-link">Logout</a> prima.</p>`;


        const loginForm = document.querySelector(".login-form");
        if (loginForm) {
            loginForm.style.display = "none";
        }
        return;
    }

    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        console.error("Login button not found");
        return;
    }

    loginBtn.addEventListener("click", handleClickLogin);
}