import React from "react";
import "react-bootstrap";

const AssetData = ({data}) => {
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    const recursiveTable = (json, idBase = "accordion") => {
        return (
            <table width={"100%"}>
                <tbody>
                {
                    Object.entries(json).map(([key, value], index) => {
                        if (typeof value === "object") {
                            return <tr key={index}>
                                {/* <td><p class="categories">{key}</p></td> */}
                                <td colSpan={2}>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target={`#${idBase}-${index}`}
                                                        aria-expanded="true" aria-controls="collapseOne">
                                                    {key}
                                                </button>
                                            </h2>
                                            <div id={`${idBase}-${index}`} className="accordion-collapse collapse"
                                                 aria-labelledby="headingOne">
                                                <div className="accordion-body">
                                                    {recursiveTable(value, idBase + "-" + index)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        } else if (key === "idShort") {
                            return <tr key={index}>
                                <td colSpan={2}>
                                    <h3 className={"idShortHeadline mb-4"}>{value}</h3>
                                </td>
                            </tr>

                        } else if (key === "FilePath") {
                            return <tr key={index}>
                                <td colSpan={2}><img className={"ProductImage"} id={"markings"} src={value}
                                                     alt={"Marking Image"}></img>
                                    <p>{key}</p></td>
                            </tr>

                        } else {
                            let valueContent = value;
                            let match = value ? value.match(/^(?:(?:http|https):\/\/)?(?:(?:[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})|localhost)\b[-a-zA-Z0-9()@:%_+.~#?&/=]*\s*$/g) : undefined
                            if (match && match[0]) {
                                valueContent = (
                                    <a href={match} target={"_blank"}>
                                        {value}
                                    </a>
                                );
                            }
                            return <><tr key={index}>
                                <td className={"col-5"}>
                                    <span className="categories">{key}</span>
                                </td>
                                <td className={"col-7"}>
                                    <span className="field-value">{valueContent}</span>
                                </td>

                            </tr>
                            <tr><td colSpan={2}><hr/></td></tr>
                            </>

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