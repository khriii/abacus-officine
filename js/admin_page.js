document.addEventListener("DOMContentLoaded", main);

// solo chi e' loggato con account dato da /api/is_logged_in.php puo' caricare questa pagina

async function checkLogin() {
    const response = await fetch("../api/is_logged_in.php");
    const json = await response.json();
    if (!json.success) {
        window.location.href = "../pages/login.html";
    }
}

function main() {
    checkLogin();

    const addServizioButton = document.querySelector("#addServizioButton");
    const addAccessorioButton = document.querySelector("#addAccessorioButton");

    if (addServizioButton && addAccessorioButton) {
        addServizioButton.addEventListener("click", addServizio);
        addAccessorioButton.addEventListener("click", addAccessorio);
    }
}

async function addServizio() {
    const descrizione = document.querySelector("#descrizioneServizio").value;
    const costoOrario = document.querySelector("#costo_orarioServizio").value;

    const response = await fetch("../api/add_servizio.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descrizione,
            costo_orario: costoOrario
        })
    });

    const json = await response.json();
    console.log(json);
}

async function addAccessorio() {
    const descrizione = document.querySelector("#descrizioneAccessorio").value;
    const costoUnitario = document.querySelector("#costo_unitarioAccessorio").value;

    const response = await fetch("../api/add_accessorio.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descrizione,
            costo_unitario: costoUnitario
        })
    });

    const json = await response.json();
    console.log(json);
}