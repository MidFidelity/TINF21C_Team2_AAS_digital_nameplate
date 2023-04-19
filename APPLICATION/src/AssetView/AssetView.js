import React, {useEffect, useReducer, useState} from "react";
import {useParams} from "react-router-dom";
import "./AssetView.scss"
import AssetData from "./AssetData";
import NameplateGenerator from "../NameplateGeneration/NameplateGenerator";

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

    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{idShort}</h3>
            <div className="container-fluid grid">
                <div className={"row justify-content-center"}>
                    <div className={"ProductImageContainer col-12 col-lg-auto d-flex justify-content-center"}>
                        {assetData ?
                            <img src={assetData["productImages"].length > 0 ? assetData["productImages"][0] : ""}
                                 alt={"Product Image"} className={"ProductImage"} id={"assetimg"}/> :
                            <p>No Product Image found</p>
                        }
                    </div>
                    {assetData && assetData["Nameplate"] ?

                        <div className={"Nameplate col-12 col-lg-7 d-flex justify-content-center"}>
                            <div className={"accordion mw-700 w-100"}>
                                <div className={"accordion-item"} id={"nameplateAccordionItem"}>
                                    <h2 className={"accordion-header"} id={"nameplateAccordion"}>
                                        <button className={"accordion-button collapsed"} data-bs-toggle={"collapse"}
                                                data-bs-target={"#nameplateAccordionContent"}>Nameplate
                                        </button>
                                    </h2>
                                    <div className={"accordion-collapse collapse show"}
                                         id={"nameplateAccordionContent"}>
                                        <div className={"accordion-body"}>
                                            <div id={"nameplateDisplay"} className={""}></div>
                                            <button onClick={NameplateGenerator.downloadSvg}
                                                    className={"btn btn-secondary w-50"}>Download SVG
                                            </button>
                                            <button onClick={NameplateGenerator.downloadPng}
                                                    className={"btn btn-secondary w-50"}>Download PNG
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <></>}
                </div>
                <div className={"row"}>
                    <div className={"ProductDesc"}>
                        <AssetData data={assetData ? assetData["Nameplate"] : []}></AssetData>
                    </div>
                </div>
            </div>
        </div>)
}
export default AssetView;



