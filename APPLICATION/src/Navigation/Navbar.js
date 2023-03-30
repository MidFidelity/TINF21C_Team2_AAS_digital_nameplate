import React from "react";
import {NavLink} from "react-router-dom";
import {Nav} from 'react-bootstrap';
import ServerAddress from "../ServerAddress";
import "./Navbar.scss";
import Searchbar from "../Searchbar";

const Navbar = ({ setServerAddress, serverHistory, handleServerSelection} ) => {
    return (
        <nav className="navbar navbar-expand-lg design-nav ">
            <a className="navbar-brand ms-3">
                Nameplate Generator
            </a>
            <div className="m-auto align-middle">
            <ServerAddress onLoad={setServerAddress}></ServerAddress>
            </div>
            <Searchbar className={"nav-searchbar"} hint={"Server address"} buttonText={"Open"} suggestions={serverHistory} onSubmit={handleServerSelection} ></Searchbar>
            <Nav className='ms-auto'>
                <ul className="navbar-nav">
                    <li className="nav-item me-2 ">
                        <NavLink className="nav-link" to={"/home"}> Home </NavLink>
                    </li>
                    <li className="nav-item me-2">
                        <NavLink className="nav-link" to={"/about"}> About </NavLink>
                    </li>
                    <li className="nav-item me-3">
                        <a className="nav-link" href="https://github.com/mk28/TINF21C_Team2_AAS_digital_nameplate">
                            GitHub
                        </a>
                    </li>
                </ul>
            </Nav>
        </nav>
    );
};

export default Navbar;

