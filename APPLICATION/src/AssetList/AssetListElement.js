import "./AssetListElement.css"

function AssetListElement({assetData, onClick}) {

    const handleClick=(event)=>{
        event.stopPropagation()
        event.preventDefault()
        onClick(assetData.idShort, assetData.idEncoded);
    };

    return(
            <tr className="AssetListElement">
                <td>
                    <div onClick={handleClick} className={"AssetListElementName"}><p>{assetData.idShort}</p></div>
                </td>
            </tr>
        )
}
export default AssetListElement;