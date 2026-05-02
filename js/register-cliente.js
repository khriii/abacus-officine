import { API_ENDPOINTS, fetchPost } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function handleClickRegister() {
    const emailInput = document.getElementById("email-input");
    const surnameInput = document.getElementById("surname-input");
    const nameInput = document.getElementById("name-input");
    const phoneNumberInput = document.getElementById("phone-number-input");
    const passwordInput = document.getElementById("password-input");

    const email = emailInput.value;
    const surname = surnameInput.value;
    const name = nameInput.value;
    const phoneNumber = phoneNumberInput.value;
    const password = passwordInput.value;

    // Verify if all fields are filled
    if (!email || !surname || !name || !phoneNumber || !password) {
        alert("Per favore, compila tutti i campi");
        return;
    }

    const requestBody = {
        email: email,
        surname: surname,
        name: name,
        phone_number: phoneNumber,
        password: password
    };

    const response = await fetchPost(API_ENDPOINTS.REGISTER_CLIENTE, requestBody);
    console.log(response);

    const registerMessage = document.getElementById("register-message");

    if (!registerMessage) {
        console.error("Register message element not found");
        return;
    }

    registerMessage.classList.remove("error-toast", "success-toast");
    if (response.success) {
        registerMessage.textContent = "Registrazione avvenuta con successo! Controlla la tua email per verificare il tuo account.";
        registerMessage.classList.add("success-toast");
    } else {
        registerMessage.textContent = response.msg || "Si è verificato un errore durante la registrazione.";
        registerMessage.classList.add("error-toast");
    }
}

async function main() {
    const registerBtn = document.getElementById("register-btn");

    if (!registerBtn) {
        console.error("Register button not found");
        return;
    }

    registerBtn.addEventListener("click", handleClickRegister);
}