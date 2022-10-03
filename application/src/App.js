//import './App.css'
import React from "react"
import AssetList from "./AssetList";

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            tableData: []
        }
    }


    addElement = () => {
        this.setState({
            index: this.state.index + 1,
            tableData: [...this.state.tableData, {
                name: (this.state.index+1).toString(), displayName: (this.state.index).toString()
            }]
        });
    }

    render() {
        return (<div className="App">
                <header className="App-header">
                    <button onClick={this.addElement}>TestText</button>
                </header>
                <AssetList tableData={this.state.tableData}></AssetList>
            </div>);
    }
}
