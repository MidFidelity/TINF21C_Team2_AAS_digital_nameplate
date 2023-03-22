# Documentation for data format

This documentation is temporary. Date: 2023-03-22

## Documentation

Sollten noch Daten fehlen, können diese noch hinzugefügt werden.

Das hier ist einfach das vollste Modell, dass ich gefunden habe. Ich denke alles wichtige ist da drin.

zu Bildern:
- Product Images ist ein Array von URLs, hinter denen Bilder liegen. (Habe noch kein Asset gesehen, dass mehr als ein hat. AAS spec erlaubt aber mehrerer)
- Für alle Bilder unter dem `Nameplate` schlüssel gibt es den Key `FilePath`, hinter dem das Bild zu finden ist.

```json 
{
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
```