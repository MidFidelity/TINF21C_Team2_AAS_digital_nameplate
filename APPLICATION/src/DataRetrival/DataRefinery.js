import DataExtractor from "./DataExtractor.js";
import {addressNameplateOfAsset, addressShellList, addressSubmodelList, imageAddress} from "./API";

export default class DataRefinery {

    constructor(serverBaseAddress) {
        if (serverBaseAddress.endsWith("/")) {
            this.serverBaseAddress = serverBaseAddress;
        } else {
            this.serverBaseAddress = serverBaseAddress + "/";
        }
    }

    async getFullAASList() {
        if (!this.nameplateSubmodels) {
            await this.#findAllNameplateSubmodels(this.serverBaseAddress).then((result) => this.nameplateSubmodels = result)
        }
        return this.#getDataFromServer(this.serverBaseAddress + addressShellList()).then(response => {
            if (!response || (Object.hasOwn(response, 'success/') && !response.success)) {
                throw new Error(this.serverBaseAddress + addressShellList())
            }
            console.log(response);
            let res = response.map((obj, index) => {
                let nameplateId = this.nameplateSubmodels.find((item) => {
                    return obj.submodels.find((sub) => {
                        return item.id === sub.keys[0].value
                    })
                });
                return {
                    idShort: obj["idShort"],
                    id: obj["identification"] ? obj["identification"]["id"] : obj["id"],
                    idEncoded: window.btoa(obj["identification"] ? obj["identification"]["id"] : obj["id"]),
                    nameplateId: nameplateId ? nameplateId.id : null,
                    nameplateIdEncoded: nameplateId ? nameplateId.idEncoded : null,
                    num: index
                }
            });
            console.log(res)
            return res
        }).catch(err => {
            console.warn(err);
            return [];
        });
    }

    getNameplateDataOfAsset(assetData) {
        return this.#getDataFromServer(this.serverBaseAddress + addressNameplateOfAsset(assetData.idEncoded, assetData.nameplateIdEncoded)).then(result => {
            if (!result || (Object.hasOwn(result, 'success') && !result.success)) throw new Error(this.serverBaseAddress + addressNameplateOfAsset(assetData.idEncoded, assetData.nameplateIdEncoded));
            let de = new DataExtractor(result)
            return de.extractAllData(this.serverBaseAddress + imageAddress(assetData.idEncoded, assetData.nameplateIdEncoded))

        }).catch(err => {
            console.warn(err);
            return {}
        });
    }

    async #findAllNameplateSubmodels() {
        return this.#getDataFromServer(this.serverBaseAddress + addressSubmodelList()).then(result => {
            console.log("Submodels:")
            console.log(result);
            let filteredResult = result.filter((item) => {
                return item.idShort ? item.idShort === "Nameplate" : false
            }).map((item) => {
                return {
                    idShort: item.idShort, id: item.id, idEncoded: window.btoa(item.id)
                }
            })
            console.log("Filtered Submodels:")
            console.log(filteredResult);
            return filteredResult;
        });
    }

    #getDataFromServer(address) {
        console.log("Making request to " + address);
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
}
