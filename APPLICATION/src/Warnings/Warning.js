const Warning = ({text, color, className})=>{
    const divStyle = {
        backgroundColor:color
    }

    return(
        <div className={`alert p-1 m-1 ${className?className:""}`} style={divStyle} >
            <p className={"m-0"}>{text}</p>
        </div>
    )
}
export default Warning