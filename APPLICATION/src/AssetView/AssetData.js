const AssetData = ({data}) => {
    console.log(data);
    if (!data || data.length === 0 || (data.constructor === Object && Object.keys(data).length === 0)) {
        return <p>No Nameplate data found</p>;
    }

    return (<table>
            <tbody>
            {Object.entries(data).map(([key, value], index) => {
                return (<tr key={index}>
                    <td>{key}</td>
                    <td>{JSON.stringify(value, null, 2)}</td>
                </tr>)
            })
            }
            </tbody>
        </table>)
}
export default AssetData;