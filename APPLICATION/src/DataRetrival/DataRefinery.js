import DataExtractor from "./DataExtractor.js";
import {
    addressShellList, imageBasePathV1, imageBasePathV3, submodelListPath,
} from "./API";

export default class DataRefinery {

    constructor(serverBaseAddress) {
        if (serverBaseAddress.endsWith("/")) {
            this.serverBaseAddress = serverBaseAddress;
        } else {
            this.serverBaseAddress = serverBaseAddress + "/";
        }
        this.apiVersion = undefined;
    }

    async #loadDependencies() {
        if (!this.fullSubmodelList) {
            await this.#getDataFromServer(this.serverBaseAddress + submodelListPath()).then(result => this.fullSubmodelList = result)
        }
        if (!this.apiVersion) {
            this.analyzeApiVersion()
        }
        if (!this.nameplateSubmodels) {
            this.nameplateSubmodels = this.#findAllSubmodels("Nameplate")
        }
        if (!this.technicalDataSubmodels) {
            this.technicalDataSubmodels = this.#findAllSubmodels("TechnicalData")
        }
    }

    async getAPIVersion(){
        return new Promise((resolve)=>{
            if (this.apiVersion)resolve(this.apiVersion)
            window.addEventListener("apiVersionSet", function mylistener(event){
                window.removeEventListener("apiVerionSet", mylistener)
                resolve(event.detail.apiVersion)
            })
        })
    }

    async getFullAASList() {
        await this.#loadDependencies();
        return this.#getDataFromServer(this.serverBaseAddress + addressShellList()).then(response => {
            if (!response || (Object.hasOwn(response, 'success/') && !response.success)) {
                throw new Error(this.serverBaseAddress + addressShellList())
            }
            console.log(response);
            let returnData = response.map((obj, index) => {
                let id = obj["identification"] ? obj["identification"]["id"] : obj["id"]
                let nameplateData
                let technicalData
                if (obj["submodels"]) {
                    nameplateData = this.nameplateSubmodels.find((item) => {
                        return obj["submodels"].find((sub) => {
                            return item.id === sub.keys[0].value
                        })
                    });
                    technicalData = this.technicalDataSubmodels.find((item) => {
                        return obj["submodels"].find((sub) => {
                            return item.id === sub.keys[0].value
                        })
                    });
                }

                let productImages = technicalData ? this.searchForKey(technicalData, /[pP]roductImage\d*/) : []

                return {
                    "idShort": obj["idShort"],
                    "id": id,
                    "idEncoded": window.btoa(id),
                    "nameplateId": nameplateData ? nameplateData.id : null,
                    "nameplateIdEncoded": nameplateData ? nameplateData.idEncoded : null,
                    "num": index,
                    "productImages": productImages,
                    "nameplate": nameplateData ? nameplateData : null
                }
            });
            console.log(returnData)
            return returnData
        }).catch(err => {
            console.warn(err);
            return [];
        });
    }

    #findAllSubmodels(name) {
        console.log("Submodels:")
        console.log(this.fullSubmodelList);
        let filteredResult = this.fullSubmodelList.filter((item) => {
            return item.idShort ? item.idShort === name : false
        }).map((item) => {


            let nameplate
            let ids
            switch (this.apiVersion) {
                case 1:
                    ids = {
                        idShort: item.idShort,
                        id: item.identification.id,
                        idEncoded: window.btoa(item.identification.id)
                    }
                    nameplate = new DataExtractor(item["submodelElements"]).extractAllDataV1(this.serverBaseAddress + imageBasePathV1(ids.idEncoded))
                    break;
                case 3:
                    ids = {
                        idShort: item.idShort,
                        id: item.id,
                        idEncoded: window.btoa(item.id)
                    }
                    nameplate = new DataExtractor(item["submodelElements"]).extractAllDataV3(this.serverBaseAddress + imageBasePathV3(ids.idEncoded))
                    break;
                default:
                    break;
            }
            return {
                ...ids,
                ...nameplate
            }
        })
        console.log("Filtered Submodels:")
        console.log(filteredResult);
        return filteredResult;
    }

    searchForKey(json, regex) {
        let returnList = []
        if (typeof json === "object") {
            for (let key in json) {
                if (regex.test(key) && json["FilePath"]) {
                    returnList.push(json["FilePath"]);
                }
                returnList = returnList.concat(this.searchForKey(json[key], regex));
            }
        }
        return returnList;
    }

    analyzeApiVersion() {
        if (!this.fullSubmodelList) return;
        let submodel = this.fullSubmodelList[0];
        let modelType = submodel["modelType"];
        if (modelType === "Submodel") {
            this.apiVersion = 3
        } else if (modelType["name"] === "Submodel") {
            this.apiVersion = 1
        } else {
            this.apiVersion = -1
        }
        console.log("API-Version: " + this.apiVersion)
        window.dispatchEvent(new CustomEvent("apiVersionSet", {detail:{apiVersion:this.apiVersion}}))
    }


    async #getDataFromServer(address) {
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
                this.apiVersion=-1
                window.dispatchEvent(new CustomEvent("apiVersionSet", {detail:{apiVersion:this.apiVersion}}))
            });
    }
}
