const AssetData = ({data}) => {
    console.log(data);
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    const recursiveTable = (json)=>{
        return(
            <table>
                {
                Object.entries(json).map(([key, value], index) => {
                    if (typeof value === "object"){
                      return <tr key={index}>
                          <td><p class="categories">{key}</p></td>
                          <td>{recursiveTable(value)}</td>
                      </tr>
                    }else if(key === "FilePath"){
                        return <tr key={index}>
                            <td><p>{key}</p></td>
                            <td><img className={"ProductImage"} src={value} alt={"Marking Image"}></img></td>
                        </tr>
                    } else{
                        return <tr key={index}>
                            <td><p class="categories">{key}</p></td>
                            <td><p>{value}</p></td>
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