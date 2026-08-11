import React from "react";

import "../styles/companyProfile.css";

const CompanyProfileModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Pandiselvam Transport</h2>

                <hr />

                <p><strong>Owner :</strong> Saranavapandi</p>

                <p><strong>Mobile :</strong> 9585399747</p>

                <p><strong>Alternate :</strong> 6369386260</p>

                <p><strong>WhatsApp :</strong> 9585399747</p>

                <h3>Transport Routes</h3>

                <ul>
                    <li>Sivakasi</li>
                    <li>Tiruppur</li>
                    <li>Coimbatore</li>
                    <li>Erode</li>
                    <li>Chennai</li>
                    <li>Madurai</li>
                </ul>

                <h3>Address</h3>

                <p>
                    3/6D, Indra Nagar,
                    <br />
                    Anaikuttam,
                    <br />
                    Sivakasi - 626130
                </p>

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>

    );

};

export default CompanyProfileModal;