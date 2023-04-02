window.addEventListener("load", nameplateBootstrap);

function getData() {
    return {
        "idShort": "AAS_Type_CD55B20_50",
        "id": "www.example.com/ids/aas/7031_8082_3022_7912",
        "idEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9hYXMvNzAzMV84MDgyXzMwMjJfNzkxMg==",
        "nameplateId": "www.example.com/ids/sm/0000_4121_5022_2603",
        "nameplateIdEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz",
        "num": 8,
        "productImages": [
            "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS80MTAwXzQxMjFfNTAyMl8xNzA3/submodelelements/GeneralInformation.ProductImage/attachment"
        ],
        "nameplate": {
            "idShort": "Nameplate",
            "id": "www.example.com/ids/sm/0000_4121_5022_2603",
            "idEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz",
            "ManufacturerName": "SMC",
            "ManufacturerProductDesignation": "Kompaktzylinder nach ISO 21287",
            "ManufacturerProductFamily": "C55",
            "OrderCode": "CD55B20-50",
            "SerialNumber": "",
            "YearOfConstruction": "2022",
            "Address": {
                "Department": "Kontakt zu SMC",
                "Street": "Boschring 13-15",
                "ZipCode": "63329",
                "POBox": "",
                "ZipCodeOfPOBox": "",
                "City_Town": "Egelsbach",
                "State_County": "Deutschland",
                "NationalCode": "",
                "VATNumber": "DE 0123456789",
                "AddressRemarks": "",
                "AddressOfAdditionalLink": "info@smc.de",
                "Phone": {
                    "TelephoneNumber": "+49 (0) 61 03 / 402 - 0",
                    "TypeOfTelephone": ""
                }
            },
            "Markings": {
                "Marking00": {
                    "MarkingName": "nach EU-Maschinen-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking00.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                },
                "Marking01": {
                    "MarkingName": "nach EU-RoHS-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking01.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                },
                "Marking02": {
                    "MarkingName": "nach EU-EMV-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking02.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                },
                "Marking03": {
                    "MarkingName": "RCM Mark"
                },
                "Marking04": {
                    "MarkingName": "c UL us - Listed (OL)"
                },
                "Marking05": {
                    "MarkingName": "TÜV"
                }
            }
        }
    }
}

function nameplateBootstrap() {
    console.log('Starting nameplate bootstrap');

    // raw data according to README.md specification
    const rawData = getData();

    // data and markings according to README.md specification
    // data is according to "Reduced Data"
    let data = {}, markings = {};
    ({obj:data, markings} = transformDataToArray(rawData));

    // generates the nameplate and injects it into 'nameplateDisplay'
    generateNameplate(data, markings, 'nameplateDisplay');
    console.log('End of nameplate bootstrap');
}
