import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import "./AssetView.css"
import DataRefinery from "../DataRetrival/DataRefinery";
import AssetData from "./AssetData";

const AssetView = ({assetList}) => {
    const {idShort} = useParams();
    const [query] = useSearchParams();
    const [assetData, setAssetData] = useState();
    const refinery = new DataRefinery(query.get("server"));
    

    useEffect(()=>{
        console.log("Loading AssetView")
        if (!assetList || assetList.length === 0){
            console.log("AssetList not loaded (yet)")
            return
        }
        let assetData = findAssetDataByIdShort();
        if (assetData.nameplateIdEncoded) {
            refinery.getNameplateDataOfAsset(assetData).then(result => setAssetData(result))
        }
    },[assetList])


    const findAssetDataByIdShort = ()=>{
        for (const assetListElement of assetList) {
            if(assetListElement.idShort === idShort){
                return assetListElement;
            }
        }
    }


    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{idShort}</h3>
            <div  className={"ProductImage"}>
            </div>
            <div className={"ProductDesc"}>
                <AssetData data={assetData?assetData:[]}></AssetData>
            </div>
            <div className={"Nameplate"}>

            </div>

        </div>)
}
export default AssetView;



