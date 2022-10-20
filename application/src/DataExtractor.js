export default class DataExtractor {
    #failureObject = {success: false};

    constructor(nameplate) {
        this.nameplate = nameplate;
    }

    getManufacturerName() {
        return this.getIDShortValue(this.nameplate.submodelElements, "ManufacturerName");
    }

    getAddressObject() {
        let addressObject = this.getIDShortValue(this.nameplate.submodelElements, "PhysicalAddress");
        if (!addressObject.success) return {
            success: true, value: {
                countryCode: "", cityTown: "", zipCode: "", street: ""
            }
        };

        let countryCode = this.getIDShortValue(addressObject.value, "CountryCode");
        if (!countryCode.success) {
            countryCode = "";
        }

        let cityTown = this.getIDShortValue(addressObject.value, "CityTown");
        if (!cityTown.success) {
            cityTown = "";
        }

        let zipCode = this.getIDShortValue(addressObject.value, "Zip");
        if (!zipCode.success) {
            zipCode = "";
        }

        let street = this.getIDShortValue(addressObject.value, "Street");
        if (!street.success) {
            street = "";
        }


        return {
            success: true, value: {
                countryCode: countryCode.value, cityTown: cityTown.value, zipCode: zipCode.value, street: street.value
            }
        }
    }

    getSerialNumber() {
        return this.getIDShortValue(this.nameplate.submodelElements, "SerialNumber");
    }

    getBatchNumber() {
        return this.getIDShortValue(this.nameplate.submodelElements, "BatchNumber");
    }

    getManufacturerProductDesignation() {
        return this.getIDShortValue(this.nameplate.submodelElements, "ManufacturerProductDesignation");
    }

    getProductCountryOfOrigin() {
        return this.getIDShortValue(this.nameplate.submodelElements, "ProductCountryOfOrigin");
    }

    getYearOfConstruction() {
        return this.getIDShortValue(this.nameplate.submodelElements, "YearOfConstruction");
    }

    getIDShortValue(searchObject, idShort) {
        let foundObjects = searchObject
            .filter(obj => {
                return obj.idShort === idShort;
            })
            .map(obj => obj.value);
        if (foundObjects.length !== 1 || !foundObjects[0] || (typeof foundObjects[0] === "string" && foundObjects[0].toLowerCase() === "n/a")) return this.#failureObject; else return {
            success: true, value: foundObjects[0]
        }
    }
}