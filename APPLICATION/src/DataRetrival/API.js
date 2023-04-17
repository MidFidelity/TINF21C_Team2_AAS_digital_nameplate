function submodelPathsV1(aasIdentifier, submodelIdentifier) {
    return [
        {
            submodel: `shells/${base64UrlEncode(aasIdentifier)}/aas/submodels/${base64UrlEncode(submodelIdentifier)}/submodel`,
            submodelElements: `shells/${base64UrlEncode(aasIdentifier)}/aas/submodels/${base64UrlEncode(submodelIdentifier)}/submodel/submodel-elements`
        },
        {
            submodel: `submodels/${base64UrlEncode(submodelIdentifier)}`,
            submodelElements: `submodels/${base64UrlEncode(submodelIdentifier)}/submodel/submodel-elements`
        },
        {
            submodel: `shells/${encodeURIComponent(aasIdentifier)}/aas/submodels`,
            submodelElements: `shells/${encodeURIComponent(aasIdentifier)}/aas/submodels`
        }
    ]
}
function submodelPathsV3(aasIdentifier, submodelIdentifier) {
    return [
        {
            submodel: `shells/${base64UrlEncode(aasIdentifier)}/submodels/${base64UrlEncode(submodelIdentifier)}/submodel`,
            submodelElements: `shells/${base64UrlEncode(aasIdentifier)}/submodels/${base64UrlEncode(submodelIdentifier)}/submodel/submodelelements`
        },
        {
            submodel: `submodels/${base64UrlEncode(submodelIdentifier)}`,
            submodelElements: `submodels/${base64UrlEncode(submodelIdentifier)}/submodelelements`
        }
    ]
}

function base64UrlEncode(str) {
    // Encode the string to Base64
    let base64 = window.btoa(str);

    // Replace characters incompatible with URL encoding
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

    return base64;
}

function addressShellList() {
    return "shells";
}

export {
    addressShellList,
    submodelPathsV1,
    submodelPathsV3
}



