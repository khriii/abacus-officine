// localhost should be replaced with the correct domain
export const API_BASE_URL = "http://localhost/abacus-officine/api";

export const API_ENDPOINTS = {
    GET_ALL_OFFICINE: "/get_officine.php",
    GET_ALL_SERVIZI: "/get_all_servizi.php",
    GET_ALL_ACCESSORI: "/get_all_accessori.php",
    GET_ALL_PEZZI_RICAMBIO: "/get_all_pezziricambio.php",
    REGISTER_CLIENTE: "/register-cliente.php"
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