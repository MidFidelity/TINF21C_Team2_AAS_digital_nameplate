function submodelPathsV1(aasIdentifier, submodelIdentifier) {
    return [
        {
            submodel: `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel`,
            submodelElements: `shells/${aasIdentifier}/aas/submodels/${submodelIdentifier}/submodel/submodel-elements`
        },
        {
            submodel: `submodels/${submodelIdentifier}`,
            submodelElements: `submodels/${submodelIdentifier}/submodel/submodel-elements`
        },
        {
            submodel: `shells/${encodeURIComponent(window.atob(aasIdentifier))}/aas/submodels`,
            submodelElements: `shells/${encodeURIComponent(window.atob(aasIdentifier))}/aas/submodels`
        }
    ]
}
function submodelPathsV3(aasIdentifier, submodelIdentifier) {
    return [
        {
            submodel: `shells/${aasIdentifier}/submodels/${submodelIdentifier}/submodel`,
            submodelElements: `shells/${aasIdentifier}/submodels/${submodelIdentifier}/submodel/submodelelements`
        },
        {
            submodel: `submodels/${submodelIdentifier}`,
            submodelElements: `submodels/${submodelIdentifier}/submodelelements`
        }
    ]
}

function addressShellList() {
    return "shells";
}

export {
    addressShellList,
    submodelPathsV1,
    submodelPathsV3
}



