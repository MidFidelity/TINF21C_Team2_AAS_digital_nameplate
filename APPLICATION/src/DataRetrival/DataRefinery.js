import DataExtractor from "./DataExtractor.js";
import {
    addressShellList,
    submodelPathsV1,
    submodelPathsV3
} from "./API";

export default class DataRefinery {

    requestCount = {}

    constructor(serverBaseAddress) {
        if (serverBaseAddress.endsWith("/")) {
            this.serverBaseAddress = serverBaseAddress;
        } else {
            this.serverBaseAddress = serverBaseAddress + "/";
        }
        this.apiVersion = undefined;
        console.log(this.requestCount)
    }

    async getAPIVersion() {
        return new Promise((resolve) => {
            if (this.apiVersion) resolve(this.apiVersion)
            window.addEventListener("apiVersionSet", function mylistener(event) {
                window.removeEventListener("apiVerionSet", mylistener)
                resolve(event.detail.apiVersion)
            })
        })
    }

    async getFullAASList() {
        return this.#getDataFromServer(this.serverBaseAddress + addressShellList())
            .then(response => {
                if (!response || (Object.hasOwn(response, 'success/') && !response.success)) {
                    throw new Error(this.serverBaseAddress + addressShellList())
                }
                return response.map((obj, index) => {
                    let assetId = obj["identification"] ? obj["identification"]["id"] : obj["id"]
                    let submodels
                    if (obj["submodels"]) {
                        submodels = obj["submodels"].map((submodelReference) => {
                            return new Promise(async (resolve, reject) => {
                                let submodelReferenceId = submodelReference["keys"][0]["value"]

                                let apiVersion = this.analyzeApiVersion(submodelReference)

                                let submodelPaths
                                if (apiVersion === 3) {
                                    submodelPaths = submodelPathsV3(assetId, submodelReferenceId)
                                } else {
                                    submodelPaths = submodelPathsV1(assetId, submodelReferenceId)
                                }
                                let submodelData = {}
                                let tryCount = 1
                                for (const submodelPath of submodelPaths) {
                                    submodelData = await this.#getDataFromServer(this.serverBaseAddress + submodelPath.submodel, true)
                                        .then((result) => {
                                            let submodelDataArray
                                            if (!result) return undefined
                                            if (Array.isArray(result)) {
                                                submodelDataArray = result
                                            } else {
                                                submodelDataArray = [result]
                                            }
                                            let returnData = {}
                                            for (const submodelDataElement of submodelDataArray) {
                                                let submodelName = submodelDataElement.idShort
                                                let submodelID = apiVersion === 3?submodelReferenceId:submodelDataElement.identification.id
                                                let extractedSubmodelData
                                                let de = new DataExtractor(submodelDataElement["submodelElements"])
                                                if (apiVersion === 3) {
                                                    extractedSubmodelData = de.extractAllDataV3(this.serverBaseAddress + submodelPath.submodelElements)
                                                } else {
                                                    extractedSubmodelData = de.extractAllDataV1(this.serverBaseAddress + submodelPath.submodelElements)
                                                }

                                                returnData = {
                                                    ...returnData,
                                                    [submodelName]: {
                                                        idShort: submodelName,
                                                        id: submodelID,
                                                        ...extractedSubmodelData
                                                    }
                                                }
                                            }
                                            return returnData
                                        })
                                    if (submodelData) {
                                        break;
                                    }
                                    console.warn("Using fallback for asset ", assetId, "in try", tryCount)
                                    tryCount++
                                }
                                resolve(submodelData)
                            })
                        })
                    }
                    let assetObject = {
                        "idShort": obj["idShort"],
                        "id": assetId,
                        "num": index,
                        "productImages": []
                    }

                    Promise.all(submodels).then((result) => {
                        result.forEach((submodel) => {
                            if (!submodel) console.log(assetId)
                            assetObject[Object.keys(submodel)[0]] = submodel[Object.keys(submodel)[0]]
                            if (Object.keys(submodel)[0] === "TechnicalData") {
                                assetObject.productImages = this.searchForKey(submodel[Object.keys(submodel)[0]], /[pP]roductImage\d*/)
                            }
                            window.dispatchEvent(new Event("forceUpdate"))
                        })
                    }).catch()

                    return assetObject
                })
            })
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

    analyzeApiVersion(submodel) {
        let apiVersion
        if (submodel["type"]) {
            apiVersion = 3
        } else {
            apiVersion = 1
        }
        this.apiVersion = apiVersion
        window.dispatchEvent(new CustomEvent("apiVersionSet", {detail: {apiVersion: this.apiVersion}}))
        return apiVersion
    }


    async #getDataFromServer(address, silent = false) {
        console.log("Making request to " + address);
        this.requestCount[address] ? this.requestCount[address]++ : this.requestCount[address] = 1
        return fetch(address)
            .then(response => {
                if (!response.ok) {
                    if (!silent) {
                        console.error("Fetch not successful")
                    }
                    return undefined
                }

                return response.json().then(jsonResponse => {
                    return jsonResponse;
                }).catch(err => {
                    console.warn(response, err)
                })
            })
            .catch(err => {
                if (!silent) {
                    console.log({success: false, text: err})
                    this.apiVersion = -1
                    window.dispatchEvent(new CustomEvent("apiVersionSet", {detail: {apiVersion: this.apiVersion}}))
                }
                return undefined
            });
    }
}
