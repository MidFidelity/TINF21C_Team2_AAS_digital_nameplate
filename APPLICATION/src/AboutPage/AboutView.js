import React from "react";
import "./AboutView.scss";

export function AboutView() {
    return (
        <div className={"mt-5 text-container"}>
            <div className={"text-center headline-container pt-5"}>
                <div className={"pt-3"}>
                    <h1> Digital Nameplate Generator </h1>
                    <h3> Introduction to our project </h3>
                </div>
            </div>
            <p className={"AboutText mt-3 about-text"}>
                The main purpose of the Digital Nameplate Generator is to generate nameplates for assets provided by the
                Asset Administration Shell (AAS). The AAS is a standardized and open framework for managing assets in
                Industry 4.0 environments, and the nameplate is an essential component of the AAS. It contains product
                identification information in digital form, which can be read using smartphones and tablets. The
                application we developed generates graphical illustrations based on the properties provided by the
                AAS and also generates QR codes according to the DIN standard. Additionally, we designed and implemented
                a user-friendly front-end application using React. The home page allows users to enter a server address
                and displays a list of all components available on the server. After selecting the server, the user can
                view the data regarding the asset chosen. Furthermore, our application provides the option to download
                the nameplate in SVG or PNG format. We also offer a User Manual documentation online. <br/>

                Our project is open source, and we have licensed it under the MIT License. <br/>

                This project was created as part of our course in Software Engineering at the Baden-Wuerttemberg
                Cooperative State University (DHBW) Stuttgart. Thank you for visiting our website, and please feel free
                to contact
                us if you have any questions or feedback about Digital Nameplate Generator. <br/>

                <div className={"text-center mt-5"}>
                    <h5> Design and Software development by </h5>
                    Team Lead: Adrian Khairi<br/>
                    Test Manager: Janin Ahlemeyer<br/>
                    System Architect & Software Developer: Mika Kuge<br/>
                    Technical Documentation: Maris Koch<br/>
                    Product Manager: Erika Zhang
                </div>
            </p>
        </div>
    );
}

export default AboutView;