document.addEventListener("DOMContentLoaded", main);

const API = {
    get_all_servizi: "../api/get_all_servizi.php",
    get_all_accessori: "../api/get_all_accessori.php",
    get_all_officine: "../api/get_officine.php",
    get_all_pezziricambio: "../api/get_all_pezziricambio.php",
    add_pezzo_ricambio: "../api/add_pezzo_ricambio.php",
};

async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    return await res.json();
}

function createDomServizio(descrizione, costoOrario) {
    let div = document.createElement("div");
    div.classList.add("servizioDiv");
    div.innerHTML = `${descrizione} - ${costoOrario}`
    return div;
}

function appendDom(result, container, attributes) {
    result.data.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("elementContainer");
        attributes.forEach(a => {
            div.innerHTML += element[a] += " "
        });

        container.append(div);
    });
}

async function addPezzoRicambio(costo_unitario, descrizione) {

    const response = await fetch(API.add_pezzo_ricambio, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            costo_unitario: costo_unitario,
            descrizione: descrizione
        })
    });

    const body = await response.text();

    console.log(body);
    const json = JSON.parse(body);
}


async function loadAllOfficineInSelect(select) {
    let result = await fetchJSON(API.get_all_officine);

    result.forEach(element => {
        let option = document.createElement("option");
        option.innerHTML = element;
        select.append(option);
    });

}

async function main() {
    const containerServizi = document.querySelector("#containerServizi");
    const containerAccessori = document.querySelector("#containerAccessori");
    const containerPezziRicambio = document.querySelector("#containerPezziRicambio");
    const containerOfficine = document.querySelector("#containerOfficine");

    let result;

    if (containerServizi) {
        // getAllServizi
        result = await fetchJSON(API.get_all_servizi);
        appendDom(result, containerServizi, ["descrizione", "costo_orario"]);
    } else if (containerAccessori) {
        // getAllAccessori
        result = await fetchJSON(API.get_all_accessori);
        appendDom(result, containerAccessori, ["descrizione", "costo_unitario"]);
    } else if (containerPezziRicambio) {
        // getAllPezziRicambio
        result = await fetchJSON(API.get_all_pezziricambio);
        appendDom(result, containerPezziRicambio, ["descrizione", "costo_unitario"]);
    } else if (containerOfficine) {
        // getAllOfficine
        result = await fetchJSON(API.get_all_officine);
        appendDom(result, containerOfficine, ["denominazione", "indirizzo"]);
    }


    const addPezziRicambioButton = document.querySelector("#addPezziRicambioButton");
    if (addPezziRicambioButton) {


        addPezziRicambioButton.addEventListener("click", async () => {
            const descrizionePezziRicambio = document.querySelector("#descrizionePezziRicambio").value;
            const costo_unitarioPezziRicambio = document.querySelector("#costo_unitarioPezziRicambio").value;
            await addPezzoRicambio(costo_unitarioPezziRicambio, descrizionePezziRicambio)
        });
    }


    const officinaSelect = document.querySelector("#officine");
    const pezziRicambioSelect = document.querySelector("#pezzi_ricambio");
    const addButton = document.querySelector("addPezzoRicambio");
    const removeButton = document.querySelector("removePezzoRicambio");

    console.log(officinaSelect)



        loadAllOfficineInSelect(officinaSelect);

        addButton.addEventListener("click", () => {
            console.log("test");
        });

       






}