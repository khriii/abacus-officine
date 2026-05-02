import { API_ENDPOINTS, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function main() {
    console.log("Main function called");
    // Get the servizi div where servizi are going to be shown
    const serviziContainer = document.getElementById("servizi-container");


    // Write a debug message if something is not found
    if (serviziContainer === null) {
        console.error("Servizi container not found");
        return;
    }

    // Do a fetch request to get the all servizi
    const servizi = await fetchGet(API_ENDPOINTS.GET_ALL_SERVIZI);
    console.log(servizi);

    serviziContainer.innerHTML = "";

    // For each servizio create a div and append it to the container
    servizi.data.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("servizio");
        div.innerHTML = `
            <h4>${element.descrizione}</h4>
            <p>Costo orario: ${element.costo_orario}</p>
        `;
        serviziContainer.appendChild(div);
    });
}