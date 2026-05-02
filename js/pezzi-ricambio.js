import { API_ENDPOINTS, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function main() {
    // Get the pezzi div where servizi are going to be shown
    const pezziRicambioContainer = document.getElementById("container-pezzi-ricambio");


    // Write a debug message if something is not found
    if (pezziRicambioContainer === null) {
        console.error("Pezzi di ricambio container not found");
        return;
    }

    // Do a fetch request to get the all pezzi di ricambio
    const pezziRicambio = await fetchGet(API_ENDPOINTS.GET_ALL_PEZZI_RICAMBIO);
    console.log(pezziRicambio);

    pezziRicambioContainer.innerHTML = "";

    // For each pezzo di ricambio create a div and append it to the container
    pezziRicambio.data.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("servizio");
        div.innerHTML = `
            <h4>${element.descrizione}</h4>
            <p>Costo unitario: ${element.costo_unitario}</p>
        `;
        pezziRicambioContainer.appendChild(div);
    });
}