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

function imageAddress(idEncoded, nameplateIdEncoded){
   return `shells/${idEncoded}/submodels/${nameplateIdEncoded}/submodel/submodelelements`
}

export {
    addressSubmodelList, addressShellList, addressAsset, addressNameplateOfAsset, imageAddress
}



