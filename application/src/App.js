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
            tableData: [],
            filteredTableData:[]
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
        this.setState({tableData:a}, ()=>{
            this.filterTableData()
        })

    }

    filterTableData=(filterString="")=>{
        this.setState({filteredTableData: this.state.tableData.filter(item=>item.displayName.toLowerCase().includes(filterString.toLowerCase()))})
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
                                onChangeFunction={this.filterTableData}></Searchbar>
                    <AssetList tableData={this.state.filteredTableData}></AssetList>
                </div>);
                
            case AppStates.assetView:

                break;
            default:
                console.error("Not a valid state");


        }
    }
}