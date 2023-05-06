import React from "react";
import {Nav, NavDropdown} from 'react-bootstrap';
import ServerAddress from "../ServerAddress";
import "./Navbar.scss";
import Searchbar from "../Searchbar";
import { List } from 'react-bootstrap-icons';
import {Link, useLocation} from 'react-router-dom';

const Navbar = ({serverAddress, setServerAddress, serverHistory, handleServerSelection} ) => {

    const location = useLocation();
    const homePath = location.pathname === '/home';

    return (
        <nav className="navbar navbar-expand-lg design-nav d-flex justify-content-between">
            <a className="navbar-brand ms-3" href="/home">
                <img src="SWELogo.png" alt="Nameplate Logo" id="nameplateLogoNav" className="rounded" ></img>
                Nameplate Generator
            </a>

            <div className="serverAddress">
            <ServerAddress onLoad={setServerAddress}></ServerAddress>
            </div>
            <div className={"d-flex justify-content-end"}>
            {homePath ? null : (
                <Searchbar suggestionsClassName={"suggestionElement"}
                           searchContainerClassName={"searchbar-container "}
                           searchIconClassName={"iconSearchNav align-middle"}
                           clearIconClassName={"iconClearNav align-middle"}
                           contentClassName={"nav-searchbar"}
                           containerClassName={"m-auto nav-search-container w-70"}
                           value={serverAddress}
                           buttonText={"Open"}
                           suggestions={serverHistory}
                           onSubmit={handleServerSelection} >
                </Searchbar>
            )}

            <Nav>
                <NavDropdown title={<List className={"hamburgerMenuIcon"}/>} id="navDropdown">
                    <NavDropdown.Item className="m-0 p-0"><Link className={"nav-link nav-item text-black text-decoration-none"} to={"/"}>Home</Link></NavDropdown.Item>


                    <NavDropdown.Item className="m-0 p-0"><Link className={"nav-link nav-item text-black text-decoration-none"} to={"/about"}>About</Link></NavDropdown.Item>

                    <NavDropdown.Item className=" nav-link nav-item me-3" href="https://github.com/mk28/TINF21C_Team2_AAS_digital_nameplate">GitHub</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </div>
        </nav>
    );
};

export default Navbar;

