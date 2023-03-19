import Searchbar from "../Searchbar";
import {useNavigate} from "react-router-dom";
import "./HomeView.scss"

export function HomeView() {
    const navigate = useNavigate();

    const loadServerList=()=>{
        let storage = localStorage.getItem("serverList");
        return storage?JSON.parse(storage):undefined
    };

    const addToServerList=(address)=> {
        let serverList = loadServerList();
        if (serverList) serverList = [...serverList, address];
        else serverList = [address];

        localStorage.setItem("serverList", JSON.stringify(serverList));
        toList(address);
    };

    const toList = (address) => {
        navigate(`/list?server=${address}`);
    };

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className={"Home"}>
            <h1 className="text-center">Nameplate Generator</h1>
            <Searchbar className={"home-address-bar"} hint={"Server address"} buttonText={"Open"} suggestions={loadServerList()} onSubmit={addToServerList}></Searchbar>
            <img src="https://www.linkpicture.com/q/SWELogo.png" alt="Nameplate Logo" id="nameplateLogo" className="rounded mx-auto d-block" width="70%"></img>
        </div>
        </div>
    );
}

export default HomeView;