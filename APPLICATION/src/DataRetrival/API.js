function submodelDataPathV1(aasIdentifier, submodelIdentifier) {
    return `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel`
}

function submodelDataPathV3(aasIdentifier, submodelIdentifier) {
    return `shells/${aasIdentifier}/submodels/${submodelIdentifier}/submodel`
}

function submodelFallbackPathV1_1(aasIdentifier, submodelIdentifier) {
    return `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel`
}

function submodelElementsPathV1(aasIdentifier, submodelIdentifier){
    return `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel/submodel-elements`
}

function submodelElementsPathV3(aasIdentifier, submodelIdentifier){
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
    addressShellList, imageBasePathV1, imageBasePathV3, submodelElementsPathV1, submodelElementsPathV3, submodelDataPathV1, submodelDataPathV3
}



