import "./AssetListElement.css"

function AssetListElement({name, url, onClick}) {

    const handleClick=(event)=>{
        event.stopPropagation()
        event.preventDefault()
        onClick(name);
    };

    return(
            <tr className="AssetListElement">
                <td>
                    <div onClick={handleClick} className={"AssetListElementName"}><p>{name}</p></div>
                </td>
            </tr>
        )
}
export default AssetListElement;