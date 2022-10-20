//import './App.css'
import React from "react"
import {Route, NavLink, HashRouter, Routes, Navigate} from "react-router-dom"
import "./App.css"
import AssetView from "./AssetView/AssetView"
import ListView from "./AssetList/ListView"
import HomeView from "./Homescreen/HomeView";
import ServerAddress from "./ServerAddress";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverAddress: this.getSessionStorage("serverAddress", ""),
            tableData: this.getSessionStorage("tableData", [])
        }
    }

    getSessionStorage = (key, empty)=>{
        let value = sessionStorage.getItem(key);
        if (value){
            return JSON.parse(value)[key];
        }
        return empty
    };


    addElement = () => {
        let a = this.state.tableData;
        for (let i = 0; i < 100; i++) {
            let r = (Math.random() + 1).toString(36).substring(7);
            a = [...a, {
                name: r, displayName: r
            }]
        }
        this.setState({tableData: a}, ()=>{
            sessionStorage.setItem("tableData",JSON.stringify({tableData: this.state.tableData}));
        })
    };

    setServerAddress=(address)=>{
        this.setState({serverAddress:address}, ()=>sessionStorage.setItem("ServerAddress", this.state.serverAddress))
    };

    render() {
        return (<HashRouter>
            <div className={"NavBar"}>

                <table>
                    <tbody>
                    <tr>
                        <td>
                            <button onClick={this.addElement}>Add Data</button>
                        </td>
                        <td>
                            <ServerAddress onLoad={this.setServerAddress}></ServerAddress>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NavLink to={"/home"}
                                     className={({isActive}) => isActive ? "NavLink NLActive" : "NavLink"}>Home</NavLink>
                        </td>
                        <td>
                            <NavLink to={"/list"}
                                     className={({isActive}) => isActive ? "NavLink NLActive" : "NavLink"}>ListView</NavLink>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"Content"}>
                <Routes>
                    <Route exact path={"/home"} element={<HomeView />}></Route>
                    <Route exact path={"/list"} element={<ListView tableData={this.state.tableData}></ListView>}></Route>
                    <Route exact path={"/asset"} element={<AssetView/>}>
                        <Route path={":name"} element={<AssetView/>}></Route>
                    </Route>
                    <Route exact path={"/"} element={<Navigate to={"/home"} replace></Navigate>}></Route>
                </Routes>
            </div>
        </HashRouter>)
    }
}