import React from "react";
import {useParams, NavLink} from "react-router-dom";
import "./AssetView.css"

export function withRouter(Children) {
    return (props) => {

        const {name} = useParams()
        return <Children {...props} assetName={name}/>
    }
}

class AssetView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assetName: ""
        }

    }

    render() {
        return (
            <div className={"AssetView"}>
                <h3 className={"AssetViewTitle"}>{this.props.assetName}</h3>
                <NavLink to={"/search"} className={"LinkBackSearch"}>Back to Search</NavLink>

                <div className={"ProductImage"}>
                </div>
                <div className={"ProductDesc"}>

                </div>
                <div className={"Nameplate"}>

                </div>

            </div>)
    }
}

export default withRouter(AssetView);
