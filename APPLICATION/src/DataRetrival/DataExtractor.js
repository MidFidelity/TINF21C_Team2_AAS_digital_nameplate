export default class DataExtractor {

    langPreferences = ["de", "en"]

    constructor(nameplate) {
        this.nameplate = nameplate;
    }

    extractAllData(baseUrl, nameplate = this.nameplate , path = "", ){
        let returnObject = {}
        console.log("loading data for submodelElementCollection")
        console.log(nameplate)
        for (const nameplateElement of nameplate) {
                if(nameplateElement.modelType === "MultiLanguageProperty"){
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                }else if(nameplateElement.modelType === "SubmodelElementCollection"){

                    returnObject[nameplateElement.idShort] = this.extractAllData(baseUrl, nameplateElement.value, path+(path.length>0?".":"") + nameplateElement.idShort)
                }else if(nameplateElement.modelType === "Property"){
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                }else if(nameplateElement.modelType === "File"){
                    returnObject["FilePath"] = baseUrl+"/"+ path +"."+nameplateElement.idShort+"/attachment"
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                }
        }
        console.log("-----")
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