const AssetData = ({data}) => {
    console.log(data);
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    return (<table>
            <tbody>
            {data.map((item, index) => {
                return (<tr key={index}>
                    <td>{item.idShort.toString()}</td>
                    <td>{JSON.stringify(item.value, null, 2)}</td>
                </tr>)
            })}
            </tbody>
        </table>)
}
export default AssetData;