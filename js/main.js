document.addEventListener("DOMContentLoaded", main);

const API = {
    officine: "./api/get_officine.php",
    servizi: "./api/get_servizi_by_officina.php",
    all_servizi: "./api/get_all_servizi.php",
    all_accessori: "./api/get_all_accessori.php",
    addServizio: "./api/add_servizio.php",
    login: "./api/is_logged_in.php",
    logout: "./api/logout.php",
    filter: "./api/filter.php"
};

let officineMap = new Map();

async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    return await res.json();
}

async function getAllOfficine() {
    return fetchJSON(API.officine);
}

async function getServiziByOfficina(codiceOfficina) {
    return fetchJSON(`${API.servizi}?codice_officina=${codiceOfficina}`);
}

async function addServizio(costoOrario, descrizione) {
    return fetchJSON(API.addServizio, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            costo_orario: costoOrario,
            descrizione
        })
    });
}

async function isLoggedIn() {
    const data = await fetchJSON(API.login);
    return data.success === true;
}

async function logout() {
    const data = await fetchJSON(API.logout);
    return data.success === true;
}

function createDivServizio(codice, costoOrario, descrizione) {
    const div = document.createElement("div");
    div.classList.add("divServizio");
    div.innerHTML = `Codice Officina: ${codice}<br>Costo Orario: ${costoOrario}<br>Descrizione: ${descrizione}`;
    return div;
}

function createDivOfficina(codice, denominazione, indirizzo) {
    const div = document.createElement("div");
    div.classList.add("divOfficina");
    div.innerHTML = `Denominazione: ${denominazione}<br>Indirizzo: ${indirizzo}`;
    div.addEventListener("click", () => loadServiziByOfficina(codice));
    return div;
}

function renderOfficine(container) {
    officineMap.forEach((o, codice) => {
        container.append(createDivOfficina(codice, o.denominazione, o.indirizzo));
    });
}

async function renderServizi(codice) {
    const container = document.querySelector("#serviziDiv");
    container.innerHTML = "";

    const result = await getServiziByOfficina(codice);

    if (!result.success) return;

    result.data.forEach(s => {
        container.append(createDivServizio(codice, s.costo_orario, s.descrizione));
    });
}

async function loadServiziByOfficina(codice) {
    await renderServizi(codice);
}

async function initOfficine() {
    const result = await getAllOfficine();

    officineMap.clear();
    result.data.forEach(o => {
        officineMap.set(Number(o.codice), o);
    });
}

function fillOfficineSelect(select) {
    officineMap.forEach(o => {
        const option = document.createElement("option");
        option.value = o.codice;
        option.textContent = `${o.codice} - ${o.denominazione}`;
        select.append(option);
    });
}

function setupAuthButtons() {
    const loginButton = document.querySelector("#loginButton");
    const logoutButton = document.querySelector("#logoutButton");

    loginButton?.addEventListener("click", function () {
        document.location = "./pages/login.html";
    });

    logoutButton?.addEventListener("click", async function () {
        const ok = await logout();
        console.log(ok ? "Logged out" : "Not logged in");
    });
}

async function filterOfficine(servizio, accessorio) {
    const data = await fetchJSON(API.filter, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "servizio": servizio,
            "accessorio": accessorio,
        })
    });
    return data.data || [];
}

async function getAllServizi() {
    const data = await fetchJSON(API.all_servizi);
    if (data.success === true) {
        return data;
    }
    return false;
}

async function getAllAccessori() {
    const data = await fetchJSON(API.all_accessori);
    if (data.success === true) {
        return data;
    }
    return false;
}

function populateInSelect(select, data) {
    // Aggiungi opzione vuota
    let emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.innerHTML = "--- Nessun filtro ---";
    select.append(emptyOption);
    
    data.forEach(element => {
        let option = document.createElement("option");

        option.value = element.codice;
        option.innerHTML = element.descrizione;

        select.append(option);
    });
}

async function handleFilterClick(servizioSelect, accessorioSelect) {
    if (servizioSelect && accessorioSelect) {
        const servizio = servizioSelect.value || null;
        const accessorio = accessorioSelect.value || null;
        
        if (!servizio && !accessorio) {
            alert("Seleziona almeno un filtro");
            return;
        }
        
        const result = await filterOfficine(servizio, accessorio);
        const container = document.querySelector("#officineDiv");
        if (container) {
            container.innerHTML = "";
            if (result && result.length > 0) {
                result.forEach(o => {
                    container.append(createDivOfficina(o.codice, o.denominazione, o.indirizzo));
                });
            } else {
                container.innerHTML = "<p>Nessuna officina trovata</p>";
            }
        }
    }
}

async function main() {
    await initOfficine();

    const officineContainer = document.querySelector("#officineDiv");
    if (officineContainer) renderOfficine(officineContainer);

    setupAuthButtons();

    // Prendo le select
    const servizioSelect = document.querySelector("#servizioSelect");
    const accessorioSelect = document.querySelector("#accessorioSelect");

    // Load servizi nella select con id "servizioSelect"
    let allServizi = await getAllServizi();

    populateInSelect(servizioSelect, allServizi.data);

    // Load accessori nella select con id "accessorioSelect"
    let allAccessori = await getAllAccessori();

    populateInSelect(accessorioSelect, allAccessori.data);

    // Gestisce il filter
    const filterButton = document.querySelector("#filterButton");
    filterButton.addEventListener("click", () => { handleFilterClick(servizioSelect, accessorioSelect) });


}