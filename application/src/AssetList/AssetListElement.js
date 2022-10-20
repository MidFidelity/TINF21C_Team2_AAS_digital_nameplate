import {NavLink} from "react-router-dom";
import "./AssetListElement.css"

function AssetListElement({displayName, name, handleClick}) {

    const handleClickFunc=()=>{
        handleClick(name);
    };

    return(
            <tr className="AssetListElement">
                <td>
                    <div className={"AssetListElementName"}><NavLink to={"/asset/"+name}><p>{displayName}</p></NavLink></div>
                </td>
            </tr>
        )
}
export default AssetListElement;