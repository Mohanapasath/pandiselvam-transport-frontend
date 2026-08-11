import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import "../styles/homebody.css";

const HomeBody = () => {

    const navigate = useNavigate();

    return (
        <section className="home-body">

            {/* BODY IMAGE */}
            <img
                src={logo}
                alt="Pandiselvam Transport"
                className="home-body-image"
            />

            {/* START BILLING BUTTON */}
            <div className="home-button-container">

                <button
                    className="start-btn"
                    onClick={() => navigate("/create-bill")}
                >
                    START BILLING
                </button>

            </div>

        </section>
    );
};

export default HomeBody;