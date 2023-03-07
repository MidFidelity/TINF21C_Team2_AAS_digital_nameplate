function submodelListPath() {
    return "submodels?level=Deep"
}

function addressShellList() {
    return "shells";
}

function imageBasePath(submodelIdEncoded){
    return `submodels/${submodelIdEncoded}/submodelelements`
}

export {
    submodelListPath, addressShellList, imageBasePath
}



