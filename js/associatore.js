document.addEventListener("DOMContentLoaded", main);

async function loadAllServizi(container) {
    const endpoint = "../api/get_all_servizi.php"

    const response = await fetch(endpoint);

    const body = await response.text();
    console.log(body);
    const json = JSON.parse(body);

    if (!json.success) return;

    let servizi = json["data"];

    servizi.forEach(s => {
        let servizioDiv = document.createElement("div");

        servizioDiv.classList.add("divServizioSelectable");

        servizioDiv.innerHTML = `
                <h3>Servizio: ${s.descrizione}</h3>
                Costo Orario: ${s.costo_orario}
        `;

        servizioDiv.addEventListener("click", () => handleServizioClick(s.codice, servizioDiv));

        container.append(servizioDiv);
    });
}

let serviziSelected = [];

function handleServizioClick(codice, servizioDiv) {
    console.log("pressed servizio:", codice);

    let index = serviziSelected.indexOf(codice);
    if (index !== -1) {
        serviziSelected.splice(index, 1);
        servizioDiv.classList.remove("divServizioSelected");
    } else {
        serviziSelected.push(codice);
        servizioDiv.classList.add("divServizioSelected");
    }
}

let accessoriSelected = [];

function handleAccessorioClick(codice, accessorioDiv) {
    console.log("pressed accessorio:", codice);

    let index = accessoriSelected.indexOf(codice);
    if (index !== -1) {
        accessoriSelected.splice(index, 1);
        accessorioDiv.classList.remove("divAccessorioSelected");
    } else {
        accessoriSelected.push(codice);
        accessorioDiv.classList.add("divAccessorioSelected");
    }
}

async function loadAllAccessori(container) {
    const endpoint = "../api/get_all_accessori.php"

    const response = await fetch(endpoint);

    const body = await response.text();
    console.log(body);
    const json = JSON.parse(body);

    if (!json.success) return;

    let accessori = json["data"];

    accessori.forEach(a => {
        let accessorioDiv = document.createElement("div");

        accessorioDiv.classList.add("divAccessorioSelectable");

        accessorioDiv.innerHTML = `
                <h3>Accessorio: ${a.descrizione}</h3>
                Costo Unitario: ${a.costo_unitario}
        `;

        accessorioDiv.addEventListener("click", () => handleAccessorioClick(a.codice, accessorioDiv));

        container.append(accessorioDiv);
    });
}

let officineSelected = [];

function handleOfficinaClick(codice, officinaDiv) {
    console.log("pressed officina:", codice);

    let index = officineSelected.indexOf(codice);
    if (index !== -1) {
        officineSelected.splice(index, 1);
        officinaDiv.classList.remove("divOfficinaSelected");
    } else {
        officineSelected.push(codice);
        officinaDiv.classList.add("divOfficinaSelected");
    }

}

async function loadAllOfficine(container) {
    const endpoint = "../api/get_officine.php"

    const response = await fetch(endpoint);

    const body = await response.text();
    console.log(body);
    const json = JSON.parse(body);

    if (!json.success) return;

    let officine = json["data"];

    officine.forEach(o => {
        let officinaDiv = document.createElement("div");

        officinaDiv.classList.add("divOfficinaSelectable");

        officinaDiv.innerHTML = `
                <h3>Officina: ${o.denominazione}</h3>
                Indirizzo: ${o.indirizzo}
        `;

        officinaDiv.addEventListener("click", () => handleOfficinaClick(o.codice, officinaDiv));

        container.append(officinaDiv);
    });
}



function main() {
    let serviziContainer = document.querySelector("#serviziContainer");
    let accessoriContainer = document.querySelector("#accessoriContainer");
    let officineContainer = document.querySelector("#officineContainer");

    if (serviziContainer) {
        loadAllServizi(serviziContainer);
    }

    if (accessoriContainer) {
        loadAllAccessori(accessoriContainer);
    }

    if (officineContainer) {
        loadAllOfficine(officineContainer);
    }

    let btnConferma = document.querySelector("#btnConferma");
    if (btnConferma) {
        btnConferma.addEventListener("click", confermaAssociazione);
    }
}

async function confermaAssociazione() {
    if ((serviziSelected.length === 0 && accessoriSelected.length === 0) || officineSelected.length === 0) {
        alert("Seleziona almeno un servizio o un accessorio, e un'officina.");
        return;
    }

    try {
        let successServizi = true;
        let successAccessori = true;
        let msgs = [];

        if (serviziSelected.length > 0) {
            const endpointServizi = "../api/associa_servizi.php";
            const dataServizi = {
                servizi: serviziSelected,
                officine: officineSelected
            };
            const resp = await fetch(endpointServizi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataServizi)
            });
            const jsonServizi = await resp.json();
            if (!jsonServizi.success) {
                successServizi = false;
                msgs.push("Servizi: " + jsonServizi.msg);
            }
        }

        if (accessoriSelected.length > 0) {
            const endpointAccessori = "../api/associa_accessori.php";
            const dataAccessori = {
                accessori: accessoriSelected,
                officine: officineSelected
            };
            const resp = await fetch(endpointAccessori, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataAccessori)
            });
            const jsonAccessori = await resp.json();
            if (!jsonAccessori.success) {
                successAccessori = false;
                msgs.push("Accessori: " + jsonAccessori.msg);
            }
        }

        if (successServizi && successAccessori) {
            alert("Associazione avvenuta con successo!");
            window.location.reload();
        } else {
            alert("Errore nell'associazione:\n" + msgs.join("\n"));
        }
    } catch (e) {
        console.error(e);
        alert("Errore di rete");
    }
}