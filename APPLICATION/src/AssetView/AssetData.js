import React from "react";
import "react-bootstrap";

const AssetData = ({data}) => {
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    const recursiveTable = (json, idBase="accordion")=>{
        return(
            <table width={"100%"}>
                <tbody>
                {
                Object.entries(json).map(([key, value], index) => {
                    if (typeof value === "object"){
                      return <tr key={index}>
                          {/* <td><p class="categories">{key}</p></td> */}
                        <td>
                            <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${idBase}-${index}`} aria-expanded="true" aria-controls="collapseOne">
                                    {key}
                                </button>
                                </h2>
                                <div id={`${idBase}-${index}`} className="accordion-collapse collapse" aria-labelledby="headingOne">
                                <div className="accordion-body">
                                    {recursiveTable(value, idBase+"-"+index)}
                                </div>
                                </div>
                            </div>
                            </div>
                        </td>
                      </tr>
                    } else if(key === "idShort"){
                        return <tr key={index}>
                            <td>
                                <h1 className={"idShortHeadline mb-4"}>{value}</h1>
                            </td>
                        </tr>
                    }else if(key === "FilePath"){
                        return <tr key={index}>
                            <td><img className={"ProductImage"} id={"markings"} src={value} alt={"Marking Image"}></img>
                            <p>{key}</p></td>
                        </tr>
                    } else{
                        return <tr  key={index}>
                                <p className={"row"}>
                                    <div className={"col-5"}>
                                    <span className="categories">{key}</span>
                                    </div>
                                    <div className={"col-7"}>
                                    <span className="field-value">{value ? value : '\u200B'}</span>
                                    </div>
                                </p>
                            <hr/>
                        </tr>

                    }
                })
                }
                </tbody>
            </table>
        )
    }

    return (
            recursiveTable(data)
        )
}
export default AssetData;