import React, {useEffect, useReducer, useState} from "react";
import {useParams} from "react-router-dom";
import "./AssetView.scss"
import AssetData from "./AssetData";
import NameplateGenerator from "../NameplateGeneration/NameplateGenerator";
import {Accordion, Row} from "react-bootstrap";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionHeader from "react-bootstrap/AccordionHeader";

const AssetView = ({assetList}) => {
    const {idShort} = useParams();
    const [assetData, setAssetData] = useState();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    window.addEventListener("forceUpdate", () => {
        forceUpdate()
    })

    useEffect(() => {
        console.log("Loading AssetView")
        if (!assetList || assetList.length === 0) {
            console.log("AssetList not loaded (yet)")
            return
        }
        setAssetData(assetList.find(item => item["idShort"] === idShort))
    }, [assetList])

    useEffect(() => {
        if (assetData && assetData["Nameplate"]) {
            NameplateGenerator.nameplateBootstrap(assetData, 'nameplateDisplay')
        }
    })

    return (<div className={"AssetView"}>
        <h3 className={"AssetViewTitle"}>{idShort}</h3>
        <div className="container-fluid grid">
            <div className={"row justify-content-center"}>
                <div className="col-md-6">
                    <div className={"ProductImageContainer col-12 col-lg-auto d-flex justify-content-center mb-3"}>
                        {assetData && assetData["productImages"].length > 0 ? <>
                            <a href={assetData["productImages"][0]} download>
                                <img src={assetData["productImages"][0]}
                                     alt={"Product Image"} className={"ProductImage"} id={"assetimg"}/>
                            </a>
                        </> : <p>No Product Image found</p>}
                    </div>
                </div>
                <div className="col-md-6">
                    {assetData && assetData["Nameplate"] ?
                        <div className={"Nameplate justify-content-center mb-3"}>
                            <div className={"accordion mw-700 w-100 "}>
                                <div className={"accordion-item"} id={"nameplateAccordionItem"}>
                                    <h2 className={"accordion-header"} id={"nameplateAccordion"}>
                                        <button className={"accordion-button collapsed"} data-bs-toggle={"collapse"}
                                                data-bs-target={"#nameplateAccordionContent"}>Nameplate
                                        </button>
                                    </h2>
                                    <div className={"accordion-collapse collapse show mb-3"}
                                         id={"nameplateAccordionContent"}>
                                        <div className={"accordion-body"}>
                                            <div id={"nameplateDisplay"} className={""}></div>
                                            <button variant={"none"} onClick={NameplateGenerator.downloadSvg}
                                                    className={"btn btn-secondary mt-2 download-svg-btn"}>Download SVG
                                            </button>
                                            <button onClick={NameplateGenerator.downloadPng}
                                                    className={"btn btn-secondary mt-2 ms-2 download-png-btn"}>Download
                                                PNG
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {assetData && assetData["AssetRef"] ?
                        <div className={"ProductDesc"}>
                            <table width={"100%"}>
                                <tr>
                                    <td className={"col-5"}>
                                        <span className={"categories"}>AssetRef</span>
                                    </td>
                                    <td className={"col-7"}>
                                        <span className={"field-value"}>
                                        <a href={assetData["AssetRef"]}>{assetData["AssetRef"]}</a>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        : ""}
                    <div className="ProductDesc">
                        <AssetData data={assetData ? assetData["Nameplate"] : []}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="ProductDesc">
                        {assetData && Object.keys(assetData)
                            .filter((key) => typeof assetData[key] === "object" && "idShort" in assetData[key] && key !== "Nameplate").length > 0 && (
                            <Accordion alwaysOpen={true} className="">
                                {Object.keys(assetData)
                                    .filter((key) => typeof assetData[key] === "object" && "idShort" in assetData[key] && key !== "Nameplate")
                                    .map((key, index) => (<AccordionItem eventKey={index}>
                                        <AccordionHeader>{key}</AccordionHeader>
                                        <AccordionBody>
                                            <AssetData data={assetData[key]}/>
                                        </AccordionBody>
                                    </AccordionItem>))}
                            </Accordion>)}
                    </div>
                </div>
            </div>

        </div>
    </div>)
}
export default AssetView;



