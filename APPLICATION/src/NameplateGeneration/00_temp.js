window.addEventListener("load", TEMP_bootstrap);

function getData(i) {
    const data = [];
    // works!
    data.push({
        "idShort": "AAS_Type_CD55B20_50",
        "id": "www.example.com/ids/aas/7031_8082_3022_7912",
        "idEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9hYXMvNzAzMV84MDgyXzMwMjJfNzkxMg==",
        "nameplateId": "www.example.com/ids/sm/0000_4121_5022_2603",
        "nameplateIdEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz",
        "num": 8,
        "productImages": ["https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS80MTAwXzQxMjFfNTAyMl8xNzA3/submodelelements/GeneralInformation.ProductImage/attachment"],
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
                    "TelephoneNumber": "+49 (0) 61 03 / 402 - 0", "TypeOfTelephone": ""
                }
            },
            "Markings": {
                "Marking00": {
                    "MarkingName": "nach EU-Maschinen-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking00.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                }, "Marking01": {
                    "MarkingName": "nach EU-RoHS-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking01.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                }, "Marking02": {
                    "MarkingName": "nach EU-EMV-Richtlinie",
                    "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMDAwXzQxMjFfNTAyMl8yNjAz/submodelelements/Markings.Marking02.MarkingFile/attachment",
                    "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
                }, "Marking03": {
                    "MarkingName": "RCM Mark"
                }, "Marking04": {
                    "MarkingName": "c UL us - Listed (OL)"
                }, "Marking05": {
                    "MarkingName": "TÜV"
                }
            }
        }
    });
    // works!
    data.push({
        "idShort": "Nameplate",
        "id": "www.example.com/ids/sm/0211_6161_5022_1138",
        "idEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8wMjExXzYxNjFfNTAyMl8xMTM4",
        "ManufacturerName": "ARGO-HYTOS",
        "ManufacturerProductDesignation": "Saugfilter für Tankeinbau - Anschluss G1 - Nennvolumenstrom 45 lpm / 11,9 gpm",
        "ManufacturerProductFamily": "ES 075",
        "OrderCode": "ES 075-6121",
        "YearOfConstruction": "",
        "Address": {
            "Street": "Industriestrasse 9",
            "ZipCode": "76703",
            "City_Town": "Kraichtal",
            "State_County": "Baden-Wuerttemberg",
            "NationalCode": "D",
            "AddressOfAdditionalLink": "https://www.argo-hytos.com/de/international.html",
            "Phone": {
                "TelephoneNumber": "+49 72 50 / 76 0",
                "TypeOfTelephone": ""
            },
            "Department": "ARGO-HYTOS GmbH"
        },
        "Markings": {}
    });
    // works!
    data.push({
        "idShort": "Nameplate",
        "id": "www.example.com/ids/sm/5303_3131_5022_9206",
        "idEncoded": "d3d3LmV4YW1wbGUuY29tL2lkcy9zbS81MzAzXzMxMzFfNTAyMl85MjA2",
        "ManufacturerName": "FESTO",
        "ManufacturerProductDesignation": "Einzigartig flexibel im Anschluss: der Drucksensor SPAU. Ob Druckmessung, DruckÃ¼berwachung oder Druckabfrage â Sie haben alle Druckwerte immer auf einen Blick unter Kontrolle. Im IO-Link-Mode sind Fernwartung und -parametrierung sowie eine einfache Sensorenreplizierung mÃ¶glich.",
        "ManufacturerProductFamily": "SPAU",
        "OrderCode": "SPAU-P10R-T-G18M-L-PNLK-PNVBA-M8D",
        "SerialNumber": "12347654",
        "YearOfConstruction": "2022-01",
        "Address": {
            "Department": "Kontakt zu Festo",
            "Street": "Ruiter StraÃe 82",
            "ZipCode": "73734",
            "State_County": "Baden-Wuerttemberg",
            "VATNumber": "DE 145 339 206",
            "AddressOfAdditionalLink": "www.festo.com/contact",
            "Phone": {
                "TelephoneNumber": "+49 (0) 711 347 0",
                "TypeOfTelephone": ""
            }
        },
        "Markings": {
            "Marking00": {
                "MarkingName": "nach EU-EMV-Richtlinie",
                "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS81MzAzXzMxMzFfNTAyMl85MjA2/submodelelements/Markings.Marking00.MarkingFile/attachment",
                "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
            },
            "Marking01": {
                "MarkingName": "nach EU-RoHS-Richtlinie",
                "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS81MzAzXzMxMzFfNTAyMl85MjA2/submodelelements/Markings.Marking01.MarkingFile/attachment",
                "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
            },
            "Marking02": {
                "MarkingName": "RCM Mark"
            },
            "Marking03": {
                "MarkingName": "c UL us - Listed (OL)"
            }
        }
    });
    // throws Error in console that markings can not be loaded
    // IDK where the error is coming from in the code or how to catch it
    // but otherwise... works!
    data.push({
        "idShort": "Nameplate",
        "id": "https://emerson.com/ids/sm/7491_1122_4022_4013",
        "idEncoded": "aHR0cHM6Ly9lbWVyc29uLmNvbS9pZHMvc20vNzQ5MV8xMTIyXzQwMjJfNDAxMw==",
        "ManufacturerName": "EMERSON",
        "ManufacturerProductDesignation": "Ventilinsel Pneumatik",
        "ManufacturerProductFamily": "AES",
        "OrderCode": "R481712899",
        "SerialNumber": "90000000001",
        "YearOfConstruction": "2021",
        "Address": {
            "Department": "Kontakt zu Aventics GmbH",
            "Street": "Ulmer Str. 4",
            "ZipCode": "30880",
            "City_Town": "Laatzen",
            "State_County": "Niedersachsen",
            "NationalCode": "DE",
            "VATNumber": "DE 815 491 570",
            "AddressOfAdditionalLink": "www.emerson.com/de-de/contact-us"
        },
        "Markings": {
            "Marking00": {
                "MarkingName": "nach EU-Maschinen-Richtlinie",
                "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/aHR0cHM6Ly9lbWVyc29uLmNvbS9pZHMvc20vNzQ5MV8xMTIyXzQwMjJfNDAxMw==/submodelelements/Markings.Marking00.MarkingFile/attachment",
                "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
            },
            "Marking01": {
                "MarkingName": "nach EU-EMV-Richtlinie",
                "FilePath": "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/aHR0cHM6Ly9lbWVyc29uLmNvbS9pZHMvc20vNzQ5MV8xMTIyXzQwMjJfNDAxMw==/submodelelements/Markings.Marking01.MarkingFile/attachment",
                "MarkingFile": "/aasx/Nameplate/CE_Marking_2016.png"
            }
        }
    });
    // v1
    // MarkingName's added manually, will be provided in the future
    // MarkingFile does not exist, that means no image
    // works!
    data.push({
        "idShort": "Nameplate",
        "id": "www.company.com/ids/sm/4343_5072_7091_3242",
        "idEncoded": "d3d3LmNvbXBhbnkuY29tL2lkcy9zbS80MzQzXzUwNzJfNzA5MV8zMjQy",
        "ManufactName": "kl_780",
        "ManufacturerProductDesignation": "700",
        "PhysicalAddress": {
            "CountryCode": "DE",
            "Street": "f",
            "Zip": "73734",
            "CityTown": "Esslingen-Berkheim",
            "StateCounty": "Baden-WÃ¼rttemberg"
        },
        "ManufacturerProductFamily": "OVEL-5-H-10-P-VQ4-UA-Z-C-A-V1PNLK-H3",
        "SerialNumber": "JO43",
        "BatchNumber": "Hallo",
        "ProductCountryOfOrigin": "DE",
        "YearOfConstruction": "2019",
        "Markings": {
            "Marking_CE": {
                "CEQualificationPresent": "123",
                "File": "/aasx/Nameplate/marking_ce.png",
                "MarkingName": "Marking_CE"
            },
            "Marking_CRUUS": {
                "CRUUSLabelingPresent": "1",
                "File": "/aasx/Nameplate/marking_cruus.jpg",
                "MarkingName": "Marking_CRUUS"
            },
            "Marking_RCM": {
                "RCMLabelingPresent": "1",
                "File": "/aasx/Nameplate/marking_rcm.jpg",
                "MarkingName": "Marking_RCM"
            }
        },
        "SerialNo": "JO43"
    });
    // MarkingFile does not exist, that means no image
    // works!
    data.push({
        "idShort": "Nameplate",
        "id": "https://www.murrelektronik.com/ids/instance/sm/nameplate/1212121212",
        "idEncoded": "aHR0cHM6Ly93d3cubXVycmVsZWt0cm9uaWsuY29tL2lkcy9pbnN0YW5jZS9zbS9uYW1lcGxhdGUvMTIxMjEyMTIxMg==",
        "ManufacturerName": "Murrelektronik GmbH",
        "ManufacturerProductDesignation": "M12 male 0Â° / M12 female 0Â° A-cod. PUR 4x0.34 bk UL/CSA+drag ch. 5m",
        "ManufacturerProductFamily": " Konfektionierte Sensor-Aktor-Leitung",
        "SerialNumber": "",
        "Address": {
            "Department": "Research and Development Automation & Power",
            "Street": "FalkenstraÃe 3",
            "Zipcode": "71570",
            "POBox": "Postfach 1165",
            "ZipCodeOfPOBox": "1165",
            "CityTown": "Oppenweiler",
            "StateCounty": "Baden-WÃ¼rttemberg",
            "NationalCode": "DE",
            "AddressOfAdditionalLink": "https://shop.murrelektronik.com/7000-40021-6340500/",
            "Phone": {
                "TelephoneNumber": "+49 7191 47-0",
                "TypeOfTelephone": "1"
            },
            "Fax": {
                "FaxNumber": "+49 7191 47-491000",
                "TypeOfFaxNumber": "1"
            },
            "Email": {
                "EmailAddress": "info@murrelektronik.de",
                "TypeOfEmailAddress": "1"
            }
        },
        "YearOfConstruction": "",
        "Markings": {
            "Marking01": {
                "MarkingName": "CE Marking",
                "MarkingFile": "/aasx/CE.png",
                "MarkingAdditionalText01": ""
            },
            "Marking02": {
                "MarkingName": "UK CA",
                "MarkingFile": "/aasx/UK_CA.png",
                "MarkingAdditionalText01": ""
            }
        },
        "AssetSpecificProperties": {
            "GuidelineSpecificProperties01": {
                "GuidelineForConformityDeclaration": ""
            }
        }
    });

    // TODO: further work needed
    data.push({
        "idShort": "Nameplate",
        "id": "https://aas.murrelektronik.com/58841/sm/1/0/de02143657/nameplate",
        "idEncoded": "aHR0cHM6Ly9hYXMubXVycmVsZWt0cm9uaWsuY29tLzU4ODQxL3NtLzEvMC9kZTAyMTQzNjU3L25hbWVwbGF0ZQ==",
        "URIOfTheProduct": "https://shop.murrelektronik.com/58841/",
        "ManufacturerName": "Murrelektronik GmbH",
        "ManufacturerProductDesignation": "Xelity 10 TX IP67 M FE PN 4P,10 Port FE mit PN, PROFINET - Managed Switch, M12 Power, 4-polig, L-kodiert",
        "Address": {
            "Department": "Vertrieb",
            "Street": "FalkenstraÃe 3 ",
            "Zipcode": "71570",
            "POBox": "Postfach 1165",
            "ZipCodeOfPOBox": "1165",
            "CityTown": "Oppenweiler",
            "StateCounty": "Baden-WÃ¼rttemberg",
            "NationalCode": "DE",
            "AddressOfAdditionalLink": "",
            "Phone": {
                "TelephoneNumber": "+49 7191 47-4490",
                "TypeOfTelephone": "1"
            },
            "Fax": {
                "FaxNumber": "+49 7191 47-494490",
                "TypeOfFaxNumber": "1"
            },
            "Email": {
                "EmailAddress": "info@murrelektronik.de",
                "TypeOfEmailAddress": "1"
            }
        },
        "ManufacturerProductFamily": "Managed Switch (kabelgebunden, industrielle Anwendung)",
        "ProductArticleNumberOfManufacturer": "58841",
        "SerialNumber": "12345678",
        "YearOfConstruction": "2022",
        "DateOfManufacture": "2022-01-01",
        "HardwareVersion": "1.0.0",
        "FirmwareVersion": "1.0",
        "SoftwareVersion": "1.0.0",
        "CompanyLogo": "/aasx/Documentation/Murrelektronik_Logo.png",
        "CountryOfOrigin": "DE",
        "Markings": {
            "Marking": {
                "MarkingName": "CE Marking",
                "DesignationOfCertificateOrApproval": "",
                "IssueDate": "",
                "ExpiryDate": "",
                "MarkingFile": "/aasx/Documentation/CE.png",
                "MarkingAdditionalText": "",
                "ExplosionSafety": {
                    "DesignationOfCertificateOrApproval": "KEMA99IECEX1105/128",
                    "ApprovalAgencyTestingAgency": "PTB",
                    "TypeOfProtection": "",
                    "RatedInsulationVoltage": "",
                    "SpecificConditionsForUse": "",
                    "IncompleteDevice": "",
                    "AmbientConditions": {
                        "DeviceCategory": "",
                        "RegionalSpecificMarking": "",
                        "TypeOfProtection": "",
                        "ExplosionGroup": "",
                        "MinimumAmbientTemperature": "",
                        "MaxAmbientTemperature": "",
                        "MaxSurfaceTemperatureForDustProof": "",
                        "TemperatureClass": ""
                    },
                    "ProcessConditions": {
                        "DeviceCategory": "",
                        "RegionalSpecificMarking": "",
                        "TypeOfProtection": "",
                        "ExplosionGroup": "",
                        "LowerLimitingValueOfProcessTemperature": "",
                        "UpperLimitingValueOfProcessTemperature": "",
                        "MaxSurfaceTemperatureForDustProof": "",
                        "TemperatureClass": ""
                    },
                    "ExternalElectricalCircuit": {
                        "DesignationOfElectricalTerminal": "",
                        "TypeOfProtection": "",
                        "ExplosionGroup": "",
                        "Characteristics": "",
                        "Fisco": "",
                        "TwoWISE": "",
                        "SafetyRelatedPropertiesForPassiveBehaviour": {
                            "MaxInputPower": "",
                            "MaxInputVoltage": "",
                            "MaxInputCurrent": "",
                            "MaxInternalCapacitance": "",
                            "MaxInternalInductance": ""
                        },
                        "SafetyRelatedPropertiesForActiveBehaviour": {
                            "MaxOutputPower": "",
                            "MaxOutputVoltage": "",
                            "MaxOutputCurrent": "",
                            "MaxExternalCapacitance": "",
                            "MaxExternalInductance": "",
                            "MaxExternalInductanceResistanceRatio": ""
                        }
                    }
                }
            }
        },
        "AssetSpecificProperties": {
            "GuidelineSpecificProperties{00}": {
                "GuidelineForConformityDeclaration": ""
            },
            "{arbitrary}": ""
        }
    });

    if (i > (data.length - 1)) {
        TEMP_COUNTER = data.length - 1;
        console.log('Exceeding list of demo data. Returned to last one available');
        return data[data.length - 1];
    }
    if (i < 0) {
        TEMP_COUNTER = 0;
        console.log('Exceeding list of demo data. Returned to first one available');
        return data[0];
    }
    return data[i];
}

//TODO: Remove TEMP_COUNTER
let TEMP_COUNTER = -1;

function TEMP_bootstrap() {
    nameplateInterface(true);
}

function nameplateInterface(direction) {
    document.getElementById('nameplateDisplay').innerHTML = ``;
    if (direction) {
        TEMP_COUNTER++;
    } else {
        TEMP_COUNTER--;
    }
    nameplateBootstrap(TEMP_COUNTER);
}

function nameplateBootstrap(i) {
    // raw data according to README.md specification
    const rawData = getData(i);

    // data and markings according to README.md specification
    // data is according to "Reduced Data"
    let data = {}, markings = {};
    ({obj: data, markings} = transformDataToArray(rawData));

    // generates the nameplate and injects it into 'nameplateDisplay'
    generateNameplate(data, markings, 'nameplateDisplay');
}
