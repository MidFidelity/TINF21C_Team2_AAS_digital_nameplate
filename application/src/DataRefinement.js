let adminShellAddress = "https://admin-shell-io.com/51411/";

function getDataFromServer(address) {
    return fetch(address)
        .then(response => response.json())
        .then(jsonResponse => {
            return jsonResponse;
        });
}

// At the moment, baseAddress needs to end with a "/". There is no check, whether the ending "/" is present.
function getFullAASList(baseAddress) {
    return getDataFromServer(baseAddress + "server/listaas").then(response => {
        return response.aaslist.map(aasString => AASStringToObject(aasString));
    });
}

function AASStringToObject(aasString) {
    let regex = /\d*? : (.*?) : \[IRI\] (.*?) : (.*?)$/g;
    let groups = Array.from(aasString.matchAll(regex))[0];
    return {
        name: groups[1], iri: groups[2], url: groups[3]
    };
}

getFullAASList(adminShellAddress).then(response => console.log(response));