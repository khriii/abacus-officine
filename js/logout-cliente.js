import { API_ENDPOINTS, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);

async function handleLogout() {
    const logoutMessage = document.getElementById("logout-message");

    const response = await fetchGet(API_ENDPOINTS.LOGOUT_CLIENTE);
    console.log(response);

    if (response.success === true) {
        logoutMessage.innerHTML = `
            <h1>Logout effettuato con successo!</h1>
            <p>Verrai reindirizzato alla pagina di login tra 3 secondi...</p>
        `;
    } else {
        logoutMessage.innerHTML = `
            <h1>Non risulti loggato!</h1>
            <p>Verrai reindirizzato alla pagina di login tra 3 secondi...</p>
        `;
    }

    setTimeout(() => {
        window.location.href = "./login-cliente.html";
    }, 3000);
}

async function main() {
    await handleLogout();
}