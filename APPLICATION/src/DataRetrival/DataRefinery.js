import DataExtractor from "./DataExtractor.js";
import {
    addressShellList,
    submodelListPath, imageBasePath
} from "./API";

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
            await this.#findAllSubmodels("Nameplate").then((result) => this.nameplateSubmodels = result)
        }
        if (!this.technicalDataSubmodels){
            await this.#findAllSubmodels("TechnicalData").then((result) => this.technicalDataSubmodels = result)
        }
        return this.#getDataFromServer(this.serverBaseAddress + addressShellList()).then(response => {
            if (!response || (Object.hasOwn(response, 'success/') && !response.success)) {
                throw new Error(this.serverBaseAddress + addressShellList())
            }
            console.log(response);
            let returnData = response.map((obj, index) => {
                let id = obj["identification"] ? obj["identification"]["id"] : obj["id"]

                let nameplateData = this.nameplateSubmodels.find((item) => {
                    return obj["submodels"].find((sub) => {
                        return item.id === sub.keys[0].value
                    })
                });
                let technicalData = this.technicalDataSubmodels.find((item) => {
                    return obj["submodels"].find((sub) => {
                        return item.id === sub.keys[0].value
                    })
                });

                let productImages = technicalData?this.searchForKey(technicalData, /[pP]roductImage\d*/):null

                return {
                    "idShort": obj["idShort"],
                    "id": id,
                    "idEncoded": window.btoa(id),
                    "nameplateId": nameplateData ? nameplateData.id : null,
                    "nameplateIdEncoded": nameplateData ? nameplateData.idEncoded : null,
                    "num": index,
                    "productImages": productImages,
                    "nameplate":nameplateData?nameplateData:null
                }
            });
            console.log(returnData)
            return returnData
        }).catch(err => {
            console.warn(err);
            return [];
        });
    }

    async #findAllSubmodels(name) {
        return this.#getDataFromServer(this.serverBaseAddress + submodelListPath()).then(result => {
            console.log("Submodels:")
            console.log(result);
            let filteredResult = result.filter((item) => {
                return item.idShort ? item.idShort === name : false
            }).map((item) => {
                return {
                    idShort:item.idShort ,id:item.id, idEncoded: window.btoa(item.id), ...new DataExtractor(item["submodelElements"]).extractAllData(this.serverBaseAddress + imageBasePath(window.btoa(item.id)))
                }
            })
            console.log("Filtered Submodels:")
            console.log(filteredResult);
            return filteredResult;
        });
    }

    searchForKey(json, regex){
        let returnList = []
        if(typeof json === "object") {
            for (let key in json) {
                if (regex.test(key) && json["FilePath"]) {
                    returnList.push(json["FilePath"]);
                }
                returnList = returnList.concat(this.searchForKey(json[key], regex));
            }
        }
        return returnList;
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
            });
    }
}
