import { API_ENDPOINTS, fetchPost } from "./configs/api-configs.js";

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

async function main() {
    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        console.error("Login button not found");
        return;
    }

    loginBtn.addEventListener("click", handleClickLogin);
}