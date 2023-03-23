function submodelListPath() {
    return "submodels?level=Deep"
}

function addressShellList() {
    return "shells";
}

function imageBasePathV1(submodelIdEncoded){
    return `submodels/${submodelIdEncoded}/submodel/submodel-elements`
}

function imageBasePathV3(submodelIdEncoded){
    return `submodels/${submodelIdEncoded}/submodelelements`
}

export {
    submodelListPath, addressShellList, imageBasePathV1, imageBasePathV3
}



