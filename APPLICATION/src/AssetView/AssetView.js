import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./AssetView.scss"
import AssetData from "./AssetData";
import NameplateGenerator from "../NameplateGeneration/NameplateGenerator";

const AssetView = ({assetList}) => {
    const {idShort} = useParams();
    const [assetData, setAssetData] = useState();
    

    useEffect(()=>{
        console.log("Loading AssetView")
        if (!assetList || assetList.length === 0){
            console.log("AssetList not loaded (yet)")
            return
        }
        setAssetData(assetList.find(item=>item["idShort"]===idShort))
    },[assetList])

    useEffect(() => {
        if (assetData) {
            NameplateGenerator.nameplateBootstrap(assetData, 'nameplateDisplay');
        }
    }, [assetData])

    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{idShort}</h3>
            <div className="d-flex flex-wrap justify-content-center">
                <div  className={"ProductImageContainer"}>
                    {assetData?
                        <img src={assetData["productImages"].length>0?assetData["productImages"][0]:""} alt={"Product Image"} className={"ProductImage"} id={"assetimg"}/>:
                        <p>No Product Image found</p>
                    }
                </div>
                <div className={"Nameplate"}>
                    <div className={"accordion"}>
                        <div className={"accordion-item"} id={"nameplateAccordionItem"}>
                            <h2 className={"accordion-header"} id={"nameplateAccordion"}>
                                <button className={"accordion-button collapsed"} data-bs-toggle={"collapse"} data-bs-target={"#nameplateAccordionContent"}>Nameplate</button>
                            </h2>
                            <div className={"accordion-collapse collapse show"} id={"nameplateAccordionContent"}>
                                <div className={"accordion-body"}>
                                    <div id={"nameplateDisplay"}></div>
                                    <button onClick={NameplateGenerator.downloadSvg} className={"btn"}>Download SVG</button>
                                    <button onClick={NameplateGenerator.downloadPng} className={"btn"}>Download PNG</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"ProductDesc"}>
                    <AssetData data={assetData?assetData["nameplate"]:[]}></AssetData>
                </div>
            </div>

        </div>)
}
export default AssetView;



