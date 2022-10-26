import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import "./AssetView.css"
import DataRefinery from "../DataRetrival/DataRefinery";
import AssetData from "./AssetData";

const AssetView = () => {
    const {name} = useParams();
    const [query] = useSearchParams();
    const [assetData, setAssetData] = useState();
    const refinery = new DataRefinery(query.get("server"));
    

    useEffect(()=>{
        console.log("Loading AssetView")
        refinery.getNameplateDataOfAsset(name).then(result=>setAssetData(result))
    },[])

    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{name}</h3>
            <div  className={"ProductImage"}>
            </div>
            <div className={"ProductDesc"}>
                <AssetData data={assetData?assetData:{}}></AssetData>
            </div>
            <div className={"Nameplate"}>

            </div>

        </div>)
}
export default AssetView;



