import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import "./AssetListElement.css"

export default class AssetListElement extends React.Component{
    static propTypes = {
        displayName:PropTypes.string,
        name:PropTypes.string,
        handleClick:PropTypes.func
    }

    handleClick=()=>{
        this.props.handleClick(this.props.name);
    }

    render() {
        return(
            <tr className="AssetListElement">
                <td>
                    <div className={"AssetListElementName"}><NavLink to={"/asset/"+this.props.name}><p>{this.props.displayName}</p></NavLink></div>
                </td>
            </tr>
        )
    }
}