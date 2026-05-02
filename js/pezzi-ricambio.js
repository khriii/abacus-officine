import { API_ENDPOINTS, fetchPost, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function handleAddNewPezzoRicambio(descrizione, costo_unitario) {
    const response = await fetchPost(API_ENDPOINTS.ADD_PEZZO_RICAMBIO, {
        descrizione,
        costo_unitario
    });

    const toast = document.getElementById("toast");
    if (response.success) {
        toast.innerText = response.msg;
        toast.classList.add("success-toast");
    } else {
        toast.innerText = response.msg;
        toast.classList.add("error-toast");
    }
}

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

    const pezziRicambioData = Array.isArray(pezziRicambio.data) ? pezziRicambio.data : [];
    pezziRicambioContainer.innerHTML = "";

    if (pezziRicambioData.length === 0) {
        pezziRicambioContainer.innerHTML = "<p>Non ci sono pezzi di ricambio disponibili al momento.</p>";
    } else {
        pezziRicambioData.forEach(element => {
            const div = document.createElement("div");
            div.classList.add("servizio");
            div.innerHTML = `
                <h4>${element.descrizione}</h4>
                <p>Costo unitario: ${element.costo_unitario}</p>
            `;
            pezziRicambioContainer.appendChild(div);
        });
    }





    // Gett add-new-pezzo-ricambio-btn
    const addNewPezzoRicambioBtn = document.getElementById("add-new-pezzo-ricambio-btn");

    // If the button is not found, write a debug message and return
    if (addNewPezzoRicambioBtn === null) {
        console.error("Add new pezzo di ricambio button not found");
        return;
    }

    addNewPezzoRicambioBtn.addEventListener("click", async () => {
        const descrizione = document.getElementById("descrizione-pezzo-ricambio-input").value;
        const costo_unitario = document.getElementById("costo-unitario-pezzo-ricambio-input").value;

        await handleAddNewPezzoRicambio(descrizione, costo_unitario);
    });




    // fetch all officine and populate the select
    const officineSelect = document.getElementById("officine-select");
    const officineResponse = await fetchGet(API_ENDPOINTS.GET_ALL_OFFICINE);
    const officineData = Array.isArray(officineResponse.data) ? officineResponse.data : [];

    if (officineSelect === null) {
        console.error("Officine select not found");
        return;
    }

    officineData.forEach(officina => {
        const option = document.createElement("option");
        option.value = officina.codice;
        option.innerText = officina.denominazione;
        officineSelect.appendChild(option);
    });

    // fetch all pezzi di ricambio and populate the select
    const pezziRicambioSelect = document.getElementById("pezzi-ricambio-select");

    if (pezziRicambioSelect === null) {
        console.error("Pezzi di ricambio select not found");
        return;
    }

    pezziRicambioData.forEach(pezzo => {
        const option = document.createElement("option");
        option.value = pezzo.codice;
        option.innerText = pezzo.descrizione;
        pezziRicambioSelect.appendChild(option);
    });

    // Add event listener to add pezzo di ricambio to officina button
    const addPezzoRicambioBtn = document.getElementById("add-pezzo-ricambio-btn");

    if (addPezzoRicambioBtn === null) {
        console.error("Add pezzo ricambio button not found");
        return;
    }

    addPezzoRicambioBtn.addEventListener("click", async () => {
        const officinaId = officineSelect.value;
        const pezzoRicambioId = pezziRicambioSelect.value;

        const response = await fetchPost(API_ENDPOINTS.ADD_PEZZO_RICAMBIO_TO_OFFICINA, {
            officine: [officinaId],
            pezzi_ricambio: [pezzoRicambioId]
        });

        const toast = document.getElementById("toast");
        if (response.success) {
            toast.innerText = response.msg;
            toast.classList.add("success-toast");
        } else {
            toast.innerText = response.msg;
            toast.classList.add("error-toast");
        }
    });

    // Add event listener to remove pezzo di ricambio from officina button
    const removePezzoRicambioBtn = document.getElementById("remove-pezzo-ricambio-btn");

    if (removePezzoRicambioBtn === null) {
        console.error("Remove pezzo ricambio button not found");
        return;
    }

    removePezzoRicambioBtn.addEventListener("click", async () => {
        const officinaId = officineSelect.value;
        const pezzoRicambioId = pezziRicambioSelect.value;

        const response = await fetchPost(API_ENDPOINTS.REMOVE_PEZZO_RICAMBIO_FROM_OFFICINA, {
            officina_id: officinaId,
            pezzo_ricambio_id: pezzoRicambioId
        });

        const toast = document.getElementById("toast");
        if (response.success) {
            toast.innerText = response.msg;
            toast.classList.add("success-toast");
        } else {
            toast.innerText = response.msg;
            toast.classList.add("error-toast");
        }
    });

}
