//import './App.css'
import React from "react"
import AssetList from "./AssetList";
import Searchbar from "./Searchbar";

const AppStates = {
    startView: "startView", listView: "listView", assetView: "assetView"
};

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            appState: AppStates.listView,
            tableData: []
        }
    }


    addElement = () => {
        let a = this.state.tableData
        for (let i = 0; i < 100; i++) {
            let r = (Math.random() + 1).toString(36).substring(7);
            a = [...a, {
                name: r,
                displayName: r
            }]
        }
        this.setState({tableData:a})
    }

    render() {
        switch (this.state.appState) {
            case AppStates.startView:

                break;
            case  AppStates.listView:
                return (<div className="App">
                    <header className="App-header">
                        <button onClick={this.addElement}>TestText</button>
                    </header>
                    <Searchbar hintText={"HintText"} searchText={"SearchText"}
                               predictList={this.state.tableData.map(item => item.displayName)}></Searchbar>
                    <AssetList tableData={this.state.tableData}></AssetList>
                </div>);
                
            case AppStates.assetView:

                break;
            default:
                console.error("Not a valid state");


        }
    }
}