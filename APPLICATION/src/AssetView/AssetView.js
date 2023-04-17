import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./AssetView.scss"
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

    useEffect(()=>{
        console.log(assetData)
    }, [assetData])

    return (
        <div className={"AssetView"}>
            <h3 className={"AssetViewTitle"}>{idShort}</h3>
            <div className="d-flex flex-wrap justify-content-center">
                {assetData&&assetData.productImages.length>0?
                <div  className={"ProductImageContainer"}>
                        <img src={assetData["productImages"][0]} alt={"Product Image"} className={"ProductImage"} id={"assetimg"}/>
                </div>:<></>
                }
                <div className={"ProductDesc"}>
                    <AssetData data={assetData?assetData["Nameplate"]:[]}></AssetData>
                </div>
                <div className={"Nameplate"}>
                </div>
            </div>

        </div>)
}
export default AssetView;



