import React from "react"
import {HashRouter, Navigate, Route, Routes} from "react-router-dom"
import "./App.scss"
import AssetView from "./AssetView/AssetView"
import ListView from "./AssetList/ListView"
import HomeView from "./Homescreen/HomeView";
import DataRefinery from "./DataRetrival/DataRefinery";
import Navbar from "./Navigation/Navbar";
import AboutView from "./AboutPage/AboutView";
import "bootstrap/dist/css/bootstrap.min.css";
import Warning from "./Warnings/Warning";

let suggestedServers = [
    "https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/",
    "https://v3-2.admin-shell-io.com/",
    "https://admin-shell-io.com/5001",
    "http://aas.murrelektronik.com:4001/aas"
]

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverAddress: "",
            tableData: [],
            serverHistory: [],
            navTarget:"",
            warnings:[]
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
        let cookieContent = encodeURIComponent(JSON.stringify(this.state.serverHistory));
        let expDate = new Date()
        expDate.setFullYear(expDate.getFullYear() + 100)
        document.cookie = `serverHistory=${cookieContent};SameSite=Strict;expires=${expDate.toDateString()}`
    }

    updateServerHistory = (address) => {
        if (this.state.serverHistory.includes(address)) {
            let newHistory = [address, ...this.state.serverHistory.filter((item) => (item !== address))]
            this.setState({"serverHistory":newHistory})
        } else {
            let newHistory = [address, ...this.state.serverHistory]
            this.setState({"serverHistory":newHistory})
        }
    }

    handleServerSelection = (address)=>{
        this.setState({navTarget:`/list?server=${address}`}, ()=>{
            this.setState({navTarget:""});
        });
    }


    setServerAddress = (address) => {
        if (address) {
            this.setState({serverAddress: address}, () => {
                sessionStorage.setItem("ServerAddress", this.state.serverAddress);
                this.updateServerHistory(address)
            })
        }
    };

    clearState(){
        this.setState({
            tableData: [],
            warnings:[]
        })
    }

   async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.serverHistory !== this.state.serverHistory) {
            this.writeHistoryCookie()
        }
        if (prevState.serverAddress !== this.state.serverAddress) {
            this.clearState()
            this.refinery = new DataRefinery(this.state.serverAddress);
            this.refinery.getFullAASList()
                .then((content) => this.setState({tableData: content}))
            this.refinery.getAPIVersion().then((apiVersion)=>{
                switch (apiVersion) {
                    case 1:
                        this.setState({warnings:[...this.state.warnings, {message:"The Server uses the V1 API. It does not support images.", color:"#ffff00"}]})
                        break
                    case 3:
                        break
                    default:
                        this.setState({warnings:[...this.state.warnings, {message:"An error occurred while loading data from the server", color:"#ff0000"}]})
                        break
                }
            })
        }
    }

    render() {
        return (<HashRouter>
            {this.state.navTarget&&<Navigate to={this.state.navTarget}/>}
            <div className="h-100">
                <div className={"NavBar sticky-top"}>
                    <Navbar serverAddress={this.state.serverAddress} setServerAddress={this.setServerAddress} serverHistory={this.state.serverHistory} handleServerSelection={this.handleServerSelection}/>
                </div>
                <div className={"Content"}>
                    <div className={"d-flex flex-column"}>
                        {this.state.warnings.map((item, index)=>(<Warning key={index} text={item.message} color={item.color}/>))}
                    </div>
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

