import { API_ENDPOINTS, fetchGet } from "./configs/api-configs.js";

document.addEventListener("DOMContentLoaded", main);


async function main() {
    console.log("Main function called");
    // Get the officine div where officine are going to be shown
    const officineContainer = document.getElementById("officine-container");


    // Write a debug message if something is not found
    if (officineContainer === null) {
        console.error("Officine container not found");
        return;
    }

    // Do a fetch request to get the all officine
    const officine = await fetchGet(API_ENDPOINTS.GET_ALL_OFFICINE);
    console.log(officine);

    officineContainer.innerHTML = "";

    // For each officina create a div and append it to the container
    officine.data.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("officina");
        div.innerHTML = `
            <h4>${element.denominazione}</h4>
            <p>Indirizzo: ${element.indirizzo}</p>
        `;
        officineContainer.appendChild(div);
    });
}