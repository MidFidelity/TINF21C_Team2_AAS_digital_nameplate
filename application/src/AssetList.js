import React from 'react';
import "./AssetList.css"
import "./AssetListElement"
import AssetListElement from "./AssetListElement";
import PropTypes from "prop-types";

export default class AssetList extends React.Component{
    static propTypes={
        tableData:PropTypes.array
    }

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
                    {this.props.tableData.map(item=>(<AssetListElement key={item.name} name={item.name} displayName={item.displayName} handleClick={console.log}>
                    </AssetListElement>))}
                </tbody>
            </table>)
    }
}