import Searchbar from "../Searchbar";
import {useNavigate} from "react-router-dom";

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
        <div className={"Home"}>
            <h1>Home-screen</h1>
            <Searchbar hint={"Server address"} buttonText={"Open"} previewOptions={loadServerList()} onSubmit={addToServerList} value={"https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/"}></Searchbar>
        </div>
    );
}

export default HomeView;