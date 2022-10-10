import React from "react";
import {useParams, NavLink} from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

        const {name} = useParams()
        return <Children {...props}  assetName = {name}/>
    }
}

class AssetView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            assetName:""
        }

    }

    render(){
    return(<div>
        <p>AssetView</p>
        <p>{this.props.assetName}</p>
        <NavLink to={"/search"}>ToSearch</NavLink>
    </div>)
    }
}

export default withRouter(AssetView);
