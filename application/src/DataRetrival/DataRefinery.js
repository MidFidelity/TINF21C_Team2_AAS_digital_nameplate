import DataExtractor from "./DataExtractor.js";

export default class DataRefinery {
    #errorObj = {
        error: "The nameplate can not be generated because there are missing information in the asset."
    };

    constructor(serverBaseAddress) {
        if (serverBaseAddress.endsWith("/")) {
            this.serverBaseAddress = serverBaseAddress;
        } else {
            this.serverBaseAddress = serverBaseAddress + "/";
        }
    }

    getFullAASList() {
        return this.#getDataFromServer(this.serverBaseAddress + "server/listaas").then(response => {
            if (!response || (Object.hasOwn(response, 'success') && !response.success)) {
                throw new Error(this.serverBaseAddress + "server/listaas")
            }
            return response.aaslist.map(aasString => this.#AASStringToObject(aasString));
        }).catch(err => {
            console.warn(err);
            return []
        });
    }

    getNameplateDataOfAsset(assetName) {
        return this.#getDataFromServer(this.serverBaseAddress + "aas/" + assetName + "/submodels/nameplate/complete").then(nameplate => {
            if (!nameplate || (Object.hasOwn(nameplate, 'success') && !nameplate.success)) throw new Error(this.serverBaseAddress + "aas/" + assetName + "/submodels/nameplate/complete");
            return this.#getIndexOfAsset(this.serverBaseAddress, assetName).then(index => {
                return this.#extractDataFromNameplate(nameplate, index, assetName);
            });
        }).catch(err => {
            console.warn(err);
            return {}
        });
    }

    #extractDataFromNameplate(nameplate, index, assetName) {
        let dataExtractor = new DataExtractor(nameplate);

        let manufacturerName = dataExtractor.getManufacturerName();
        if (!manufacturerName.success) {
            manufacturerName = "";
        }

        let physicalAddressObject = dataExtractor.getAddressObject();

        let serialNumber = dataExtractor.getSerialNumber();
        if (!serialNumber.success) {
            serialNumber = "";
        }

        let batchNumber = dataExtractor.getBatchNumber();
        if (!batchNumber.success) {
            batchNumber = "";
        }

        let productType = dataExtractor.getManufacturerProductDesignation();
        if (!productType.success) {
            productType = "";
        }

        let productCountryOfOrigin = dataExtractor.getProductCountryOfOrigin();
        if (!productCountryOfOrigin.success) {
            productCountryOfOrigin = "";
        }

        let yearOfConstruction = dataExtractor.getYearOfConstruction();
        if (!yearOfConstruction.success) {
            yearOfConstruction = "";
        }

        return {
            assetName: assetName,
            manufacturerName: manufacturerName.value,
            physicalAddress: physicalAddressObject.value,
            serialNumber: serialNumber.value,
            batchNumber: batchNumber.value,
            manufacturerProductDesignation: productType.value,
            productCountryOfOrigin: productCountryOfOrigin.value,
            yearOfConstruction: yearOfConstruction.value,
            fullNameplate: nameplate
        }
    }

    #getIndexOfAsset(serverBaseAddress, assetName) {
        return this.getFullAASList(serverBaseAddress).then(response => {
            if (response.length === 0) return -1;
            let i = 0;
            while (i < response.length && response[i].name !== assetName) {
                i++;
            }
            if (i === response.length) return -1; else return i;
        });
    }

    #getDataFromServer(address) {
        console.log("Making request to "+address);
        return fetch(address)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fetch not ok")
                }
                return response.json().then(jsonResponse => {
                    return jsonResponse;
                }).catch(err => {
                    console.log(response, err)
                })
            })
            .catch(err => {
                console.log({success: false, text: err})
            });
    }

    #AASStringToObject(aasString) {
        let regex = /\d*? : (.*?) : \[IRI\] (.*?) : (.*?)$/g;
        let groups = Array.from(aasString.matchAll(regex))[0];
        return {
            name: groups[1], iri: groups[2], url: groups[3]
        };
    }
}
