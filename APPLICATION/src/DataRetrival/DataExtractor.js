export default class DataExtractor {

    langPreferences = ["de", "en"]

    constructor(nameplate) {
        this.nameplate = nameplate;
    }

    extractAllDataV1(baseUrl, nameplate = this.nameplate , path = "", ){
        let returnObject = {}
        //console.log("loading data for submodelElementCollection")
        //console.log(nameplate)
        for (const nameplateElement of nameplate) {
            switch (nameplateElement.modelType.name) {
                case "MultiLanguageProperty":
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                    break;
                case "SubmodelElementCollection":
                    if(nameplateElement.idShort.match(/(?!Markings)[Mm]arking[\-\w]*/ug)){
                        if(!("Markings" in returnObject))returnObject["Markings"]={};
                        returnObject["Markings"][nameplateElement.idShort] = this.extractAllDataV1(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort)
                        if(!"MarkingName" in returnObject["Markings"][nameplateElement.idShort])returnObject["Markings"][nameplateElement.idShort]["MarkingName"] = nameplateElement.idShort
                    }else{
                        returnObject[nameplateElement.idShort] = this.extractAllDataV1(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort)
                    }
                    break;
                case "Property":
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
                case "File":
                    //returnObject["FilePath"] = baseUrl + "/" + path + "." + nameplateElement.idShort + "/attachment"
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
            }
        }
        //console.log("-----")
        return returnObject
    }

    extractAllDataV3(baseUrl, nameplate = this.nameplate , path = "", ){
        let returnObject = {}
        //console.log("loading data for submodelElementCollection")
        //console.log(nameplate)
        for (const nameplateElement of nameplate) {
            switch (nameplateElement.modelType) {
                case "MultiLanguageProperty":
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                    break;
                case "SubmodelElementCollection":
                    if(nameplateElement.idShort.match(/(?!Markings)[Mm]arking[\-\w]*/ug)){
                        if(!("Markings" in returnObject))returnObject["Markings"]={};
                        returnObject["Markings"][nameplateElement.idShort] = this.extractAllDataV3(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort)
                        if(!"MarkingName" in returnObject["Markings"][nameplateElement.idShort])returnObject["Markings"][nameplateElement.idShort]["MarkingName"] = nameplateElement.idShort
                    }else{
                        returnObject[nameplateElement.idShort] = this.extractAllDataV3(baseUrl, nameplateElement.value, path + (path.length > 0 ? "." : "") + nameplateElement.idShort)
                    }
                    break;
                case "Property":
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
                case "File":
                    returnObject["FilePath"] = baseUrl + "/" + path + "." + nameplateElement.idShort + "/attachment"
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                    break;
            }
        }
        //console.log("-----")
        return returnObject
    }

    getLangStringValue(json){
        if ("langStrings" in json){
            let langStrings = json.langStrings
            for (let langPref of this.langPreferences){
                for (let langString of langStrings) {
                    if(langString.language === langPref){
                        return langString.text
                    }
                }
            }
        }
        return ""
    }
}