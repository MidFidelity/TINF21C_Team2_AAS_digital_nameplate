import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./AssetView.css"
import AssetData from "./AssetData";

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


    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{idShort}</h3>
            <div  className={"ProductImageContainer"}>
                {assetData?
                    <img src={assetData["productImages"].length>0?assetData["productImages"][0]:""} alt={"Product Image"} className={"ProductImage"}/>:
                    <p>No Product Image found</p>
                }
            </div>
            <div className={"ProductDesc"}>
                <AssetData data={assetData?assetData["nameplate"]:[]}></AssetData>
            </div>
            <div className={"Nameplate"}>

            </div>

        </div>)
}
export default AssetView;



