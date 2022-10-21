const AssetData = ({data}) => {
    console.log(data)
  return(
    <table>
      <tbody>
      {Object.keys(data).map(item=>{return {"key":item, "value":data[item]}}).map((item, index)=><tr key={index}><td>{item.key}</td><td>{item.value&&JSON.stringify(item.value)}</td></tr>)}
      </tbody>
    </table>
  )
}
export default AssetData;