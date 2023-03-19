import Searchbar from "../Searchbar";
import {useNavigate} from "react-router-dom";
import "./HomeView.scss"
import {useEffect} from "react";

export function HomeView({serverHistory}) {
    const navigate = useNavigate();

    useEffect(()=>{

    },[serverHistory])

    const handleServerSelection=(address)=>{
        navigate(`/list?server=${address}`);
    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className={"Home"}>
            <h1 className="text-center">Nameplate Generator</h1>
            <Searchbar className={"home-address-bar"} hint={"Server address"} buttonText={"Open"} suggestions={serverHistory} onSubmit={handleServerSelection}></Searchbar>
            <img src="https://www.linkpicture.com/q/SWELogo.png" alt="Nameplate Logo" id="nameplateLogo" className="rounded mx-auto d-block" width="70%"></img>
        </div>
        </div>
    );
}

export default HomeView;