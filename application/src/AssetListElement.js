import React from 'react';
import PropTypes from "prop-types";
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
                    <div className={"AssetListElementName"} onClick={this.handleClick}><p>{this.props.displayName}</p></div>
                </td>
            </tr>
        )
    }
}