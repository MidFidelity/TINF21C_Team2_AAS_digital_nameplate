export default class DataExtractor {

    langPreferences = ["de", "en"]

    constructor(nameplate) {
        this.nameplate = nameplate;
    }

    extractAllData(nameplate = this.nameplate){
        let returnObject = {}
        console.log("loading data for submodelElementCollection")
        console.log(nameplate)
        for (const nameplateElement of nameplate) {
                if(nameplateElement.modelType === "MultiLanguageProperty"){
                    returnObject[nameplateElement.idShort] = this.getLangStringValue(nameplateElement.value)
                }else if(nameplateElement.modelType === "SubmodelElementCollection"){
                    returnObject[nameplateElement.idShort] = this.extractAllData(nameplateElement.value)
                }else if(nameplateElement.modelType === "Property"){
                    returnObject[nameplateElement.idShort] = nameplateElement.value
                }else if(nameplateElement.modelType === "File"){
                    //TODO load file here
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