
import React from "react"
import {Route, NavLink, HashRouter, Routes, Navigate} from "react-router-dom"
import "./App.scss"
import AssetView from "./AssetView/AssetView"
import ListView from "./AssetList/ListView"
import HomeView from "./Homescreen/HomeView";
import ServerAddress from "./ServerAddress";
import DataRefinery from "./DataRetrival/DataRefinery";
import Navbar from "./Navigation/Navbar";
import AboutView from "./AboutPage/AboutView";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverAddress: "", tableData: []
        }
    }

    getSessionStorage = (key, empty) => {
        let value = sessionStorage.getItem(key);
        if (value && value != null) {
            return JSON.parse(value)[key];
        }
        return empty
    };

    setServerAddress = (address) => {
        if (address !== null /*/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(address)*/) {
            this.setState({serverAddress: address}, () => {
                sessionStorage.setItem("ServerAddress", this.state.serverAddress);
            })
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.serverAddress !== this.state.serverAddress) {
            this.refinery = new DataRefinery(this.state.serverAddress);
            this.refinery.getFullAASList().then((content) => this.setState({tableData: content}))
        }
    }

    render() {
        return (<HashRouter>
            <div className={"NavBar"}>

                <Navbar />

                <table>
                    <tbody>
                    <tr>
                        <td>
                            <ServerAddress onLoad={this.setServerAddress}></ServerAddress>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"Content"}>
                <Routes>
                    <Route exact path={"/home"} element={<HomeView/>}></Route>
                    <Route exact path={"/list"} element={<ListView tableData={this.state.tableData}
                                                                   serverAddress={this.state.serverAddress}></ListView>}></Route>
                    <Route exact path={"/asset"} element={<AssetView assetList={this.state.tableData}/>}>
                        <Route path={":idShort"} element={<AssetView assetList={this.state.tableData}/>}></Route>
                    </Route>
                    <Route path={"/"} element={<Navigate to={"/home"} replace={true}></Navigate>}></Route>
                    <Route exact path={"/about"} element={<AboutView/>}></Route>
                </Routes>
            </div>
        </HashRouter>)
    }
}