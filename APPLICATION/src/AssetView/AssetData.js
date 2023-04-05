const AssetData = ({data}) => {
    console.log(data);
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
                    }else if(key === "FilePath"){
                        return <tr key={index}>
                            <td><img className={"ProductImage"} id={"markings"} src={value} alt={"Marking Image"}></img>
                            <p>{key}</p></td>
                        </tr>
                    } else{
                        return <tr key={index}>
                            <td>
                                <p className="categories">{key}</p>
                                <p>{value}</p>
                                <hr/>
                            </td>
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