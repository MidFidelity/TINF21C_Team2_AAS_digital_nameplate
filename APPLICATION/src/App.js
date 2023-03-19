import React from "react"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import "./App.scss"
import AssetView from "./AssetView/AssetView"
import ListView from "./AssetList/ListView"
import HomeView from "./Homescreen/HomeView";
import ServerAddress from "./ServerAddress";
import DataRefinery from "./DataRetrival/DataRefinery";
import Navbar from "./Navigation/Navbar";
import AboutView from "./AboutPage/AboutView";
import "bootstrap/dist/css/bootstrap.min.css";

let suggestedServers = [
    "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/",
    "https://v3-2.admin-shell-io.com/"
]

export default class App extends React.Component {
    const

    constructor(props) {
        super(props);

        this.state = {
            serverAddress: "",
            tableData: [],
            serverHistory: []
        }

    }

    componentDidMount() {
        this.loadHistoryCookie()
    }

    loadHistoryCookie() {
        console.log("Loading History")
        let cookies = decodeURIComponent(document.cookie).split(';')
        if(!cookies){
            this.writeHistoryCookie()
            this.loadHistoryCookie()
            return
        }
        for (let cookie of cookies) {
            let splitCookie = cookie.split("=", 2);
            let serverHistory = []
            if (splitCookie[0] === "serverHistory") {
                 serverHistory = JSON.parse(splitCookie[1]);
            }
            for (const suggestedServer of suggestedServers) {
                if (!serverHistory.includes(suggestedServer)) {
                    serverHistory.push(suggestedServer)
                }
            }
            this.setState({"serverHistory":serverHistory})
        }
    }

    writeHistoryCookie() {
        console.log("Writing History to Cookie")
        console.log(this.state.serverHistory)
        let cookieContent = encodeURIComponent(JSON.stringify(this.state.serverHistory));
        let expDate = new Date()
        expDate.setFullYear(expDate.getFullYear() + 100)
        document.cookie = `serverHistory=${cookieContent};SameSite=Strict;expires=${expDate.toDateString()}`
    }

    updateServerHistory = (address) => {
        console.log("Writing " + address + " to serverHistory")
        if (this.state.serverHistory.includes(address)) {
            let newHistory = [address, ...this.state.serverHistory.filter((item) => (item !== address))]
            console.log(newHistory)
            this.setState({"serverHistory":newHistory})
        } else {
            let newHistory = [address, ...this.state.serverHistory]
            console.log(newHistory)
            this.setState({"serverHistory":newHistory})
        }
    }


    setServerAddress = (address) => {
        if (address) {
            this.setState({serverAddress: address}, () => {
                sessionStorage.setItem("ServerAddress", this.state.serverAddress);
                this.updateServerHistory(address)
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.serverHistory !== this.state.serverHistory) {
            this.writeHistoryCookie()
        }
        if (prevState.serverAddress !== this.state.serverAddress) {
            this.refinery = new DataRefinery(this.state.serverAddress);
            this.refinery.getFullAASList().then((content) => this.setState({tableData: content}))
        }

    }

    render() {
        return (<HashRouter>
            <div className="h-100">
                <div className={"NavBar sticky-top"}>
                    <Navbar setServerAddress={this.setServerAddress}/>
                </div>
                <div className={"Content"}>
                    <Routes>
                        <Route exact path={"/home"} element={<HomeView serverHistory={this.state.serverHistory}/>}></Route>
                        <Route exact path={"/list"} element={<ListView tableData={this.state.tableData}
                                                                       serverAddress={this.state.serverAddress}></ListView>}></Route>
                        <Route exact path={"/asset"} element={<AssetView assetList={this.state.tableData}/>}>
                            <Route path={":idShort"} element={<AssetView assetList={this.state.tableData}/>}></Route>
                        </Route>
                        <Route path={"/"} element={<Navigate to={"/home"} replace={true}></Navigate>}></Route>
                        <Route exact path={"/about"} element={<AboutView/>}></Route>
                    </Routes>
                </div>
            </div>
        </HashRouter>)
    }
}

