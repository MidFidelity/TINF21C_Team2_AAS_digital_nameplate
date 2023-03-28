const AssetData = ({data}) => {
    console.log(data);
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    const recursiveTable = (json, depth=0)=>{

        // Bug beim Öffnen des zweiten Buttons schließt sich der erste 
        return(
            <table width={"100%"}>
                {
                Object.entries(json).map(([key, value], index) => {
                    if (typeof value === "object"){
                      return <tr key={index}>
                          {/* <td><p class="categories">{key}</p></td> */}

                        <td>
                            <div class="accordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#acc${index}-${depth}`} aria-expanded="true" aria-controls="collapseOne">
                                    {key}
                                </button>
                                </h2>
                                <div id={`acc${index}-${depth}`} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="null">
                                <div class="accordion-body">
                                    {recursiveTable(value,depth+1)}
                                </div>
                                </div>
                            </div>
                            </div>
                        </td>
                      </tr>
                    }else if(key === "FilePath"){
                        return <tr key={index}>
                            <td><img className={"ProductImage"} id={"markings"} src={value} alt={"Marking Image"}></img></td>
                            <td><p>{key}</p></td>
                        </tr>
                    } else{
                        return <tr key={index}>
                            <td>
                                <p class="categories">{key}</p>
                                <p>{value}</p>
                                <hr/>
                            </td>
                        </tr>
                    }
                })
                }
            </table>
        )
    }

    return (<table>
            {recursiveTable(data)}
        </table>)
}
export default AssetData;