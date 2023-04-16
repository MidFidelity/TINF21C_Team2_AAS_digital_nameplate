import React from "react";
import {NavLink} from "react-router-dom";
import {Nav, NavDropdown, NavItem} from 'react-bootstrap';
import ServerAddress from "../ServerAddress";
import "./Navbar.scss";
import Searchbar from "../Searchbar";
import { LinkContainer } from 'react-router-bootstrap';
import { List } from 'react-bootstrap-icons';


const Navbar = ({ setServerAddress, serverHistory, handleServerSelection} ) => {
    return (
        <nav className="navbar navbar-expand-lg design-nav">
            <a className="navbar-brand ms-3">
                <img src="https://www.linkpicture.com/q/SWELogo.png" alt="Nameplate Logo" id="nameplateLogoNav" className="rounded" ></img>
                Nameplate Generator
            </a>
            <div className="m-auto align-middle serverAddress">
            <ServerAddress onLoad={setServerAddress}></ServerAddress>
            </div>
            <Searchbar suggestionsClassName={"suggestionElement"} searchContainerClassName={"searchbar-container "} iconClassName={"iconSearchNav m-auto align-middle "} contentClassName={"nav-searchbar"} containerClassName={"m-auto nav-search-container"} hint={"Server address"} buttonText={"Open"} suggestions={serverHistory} onSubmit={handleServerSelection} ></Searchbar>
            <Nav className="mr-auto">
                <NavDropdown title={<List className={"hamburgerMenuIcon"}/>} id="navDropdown">
                    <LinkContainer to="/home">
                            <NavDropdown.Item className=" nav-link nav-item me-3">Home</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <NavDropdown.Item className=" nav-link nav-item me-3">About</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item className=" nav-link nav-item me-3" href="https://github.com/mk28/TINF21C_Team2_AAS_digital_nameplate">GitHub</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </nav>
    );
};

export default Navbar;

