// localhost should be replaced with the correct domain
export const API_BASE_URL = "./api";

export const API_ENDPOINTS = {
    GET_ALL_OFFICINE: "/get_officine.php",
    GET_ALL_SERVIZI: "/get_all_servizi.php",
    GET_ALL_ACCESSORI: "/get_all_accessori.php",
    GET_ALL_PEZZI_RICAMBIO: "/get_all_pezziricambio.php",
    REGISTER_CLIENTE: "/register-cliente.php",
    LOGIN_CLIENTE: "/login-cliente.php",
    CHECK_LOGIN_STATUS: "/check-login-status.php",
    LOGOUT_CLIENTE: "/logout-cliente.php",
    ADD_PEZZO_RICAMBIO: "/add-pezzo-ricambio.php",
    ADD_PEZZO_RICAMBIO_TO_OFFICINA: "/add-pezzo-ricambio-to-officina.php",
    REMOVE_PEZZO_RICAMBIO_FROM_OFFICINA: "/remove-pezzo-ricambio-from-officina.php"
};

export async function fetchPost(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options || {})
    });
    return await response.json();
}

export async function fetchGet(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return await response.json();
}