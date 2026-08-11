import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

import CompanyProfileModal from "./CompanyProfileModal";
import ContactInfoModal from "./ContactInfoModal";

import "../styles/header.css";

const Header = () => {

    const navigate = useNavigate();

    const [showCompany, setShowCompany] = useState(false);
    const [showContact, setShowContact] = useState(false);

    return (

        <>

            {/* ===============================
                HEADER
            =============================== */}

            <header className="header">

                {/* ===============================
                    LOGO / COMPANY NAME
                =============================== */}

                <div className="header-logo">

                    <FontAwesomeIcon
                        icon={faTruck}
                        className="header-truck-icon"
                    />

                    <h1>
                        PANDISELVAM TRANSPORT
                    </h1>

                </div>


                {/* ===============================
                    NAVIGATION
                =============================== */}

                <nav className="header-nav">

                    {/* START BILLING */}

                    <button
                        onClick={() => navigate("/create-bill")}
                    >
                        Start Billing
                    </button>


                    {/* COMPANY PROFILE */}

                    <button
                        onClick={() => setShowCompany(true)}
                    >
                        Company Profile
                    </button>


                    {/* CONTACT INFO */}

                    <button
                        onClick={() => setShowContact(true)}
                    >
                        Contact Info
                    </button>

                </nav>

            </header>


            {/* ===============================
                COMPANY PROFILE MODAL
            =============================== */}

            <CompanyProfileModal
                isOpen={showCompany}
                onClose={() => setShowCompany(false)}
            />


            {/* ===============================
                CONTACT INFO MODAL
            =============================== */}

            <ContactInfoModal
                isOpen={showContact}
                onClose={() => setShowContact(false)}
            />

        </>

    );

};

export default Header;