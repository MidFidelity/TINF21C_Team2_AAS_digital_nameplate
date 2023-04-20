function submodelListPath() {
    return "submodels?level=Deep"
}

function submodelSpecificPathV1(aasIdentifier, submodelIdentifier){
    return `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel/submodel-elements`
}

function submodelSpecificPathV3(aasIdentifier, submodelIdentifier){
    return `shells/${aasIdentifier}/submodels/${submodelIdentifier}/submodel/submodelelements`
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
    submodelListPath, addressShellList, imageBasePathV1, imageBasePathV3, submodelSpecificPathV1, submodelSpecificPathV3
}



