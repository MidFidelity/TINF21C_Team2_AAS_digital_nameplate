function addressSubmodelList() {
    return "submodels"
}

function addressShellList() {
    return "shells";
}

function addressAsset(aasIdentifier) {
    return `shells/${aasIdentifier}`
}

function addressNameplateOfAsset(idEncoded, nameplateIdEncoded) {
    return `submodels/${nameplateIdEncoded}/submodelelements`
}

export {
    addressSubmodelList, addressShellList, addressAsset, addressNameplateOfAsset
}



