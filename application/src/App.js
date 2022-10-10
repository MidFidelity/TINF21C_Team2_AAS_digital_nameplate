//import './App.css'
import React from "react"
import {Route, NavLink, HashRouter, Routes} from "react-router-dom"
import AssetView from "./AssetView"
import ListView from "./ListView"

export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            searchTerm:""
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
        this.setState({tableData: a})

    }

    render() {
        return (
            <HashRouter>
                <div className={"NavBar"}>
                    <button onClick={this.addElement}>Add Data</button><br/>
                    <NavLink to={"/search"}>ListView</NavLink><br/>
                    <NavLink to={"/asset"}>AssetView</NavLink>
                </div>
                <div className={"Content"}>
                    <Routes>
                    <Route exact path={"/search"} element={<ListView tableData={this.state.tableData}></ListView>}>
                        <Route path={":term"} element={<ListView tableData={this.state.tableData}></ListView>}></Route>
                    </Route>
                        <Route path={"/asset"} element={<AssetView />}>
                            <Route path={":name"} element={<AssetView />}></Route>
                        </Route>
                    </Routes>
                </div>
            </HashRouter>)
    }
}