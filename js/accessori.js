import { API_ENDPOINTS, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function main() {
    // Get the servizi div where servizi are going to be shown
    const accessoriContainer = document.getElementById("accessori-container");


    // Write a debug message if something is not found
    if (accessoriContainer === null) {
        console.error("Accessori container not found");
        return;
    }

    // Do a fetch request to get the all accessori
    const accessori = await fetchGet(API_ENDPOINTS.GET_ALL_ACCESSORI);
    console.log(accessori);

    accessoriContainer.innerHTML = "";

    // For each accessorio create a div and append it to the container
    accessori.data.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("servizio");
        div.innerHTML = `
            <h4>${element.descrizione}</h4>
            <p>Costo unitario: ${element.costo_unitario}</p>
        `;
        accessoriContainer.appendChild(div);
    });
}