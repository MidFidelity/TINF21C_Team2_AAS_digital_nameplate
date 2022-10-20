import React from 'react';
import "./AssetList.css"
import "./AssetListElement"
import AssetListElement from "./AssetListElement";
import PropTypes from "prop-types";

export default class AssetList extends React.Component{
    static propTypes={
        tableData:PropTypes.array,
    };

    render() {
        return (
            <table className={"AssetList"}>
                <thead>
                <tr>
                    <td>
                        <div>Asset Name</div>
                    </td>
                </tr>
                </thead>
                <tbody>
                    {this.props.tableData.map((item, index)=>(<AssetListElement key={index} name={item.name} url={item.url} handleClick={this.handleEntryClick}>
                    </AssetListElement>))}
                </tbody>
            </table>)
    }
}