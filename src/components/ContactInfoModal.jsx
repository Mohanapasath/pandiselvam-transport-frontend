import React from "react";
import "../styles/contactInfo.css";

const ContactInfoModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Contact Information</h2>

                <hr />

                <p>

                    <strong>📞 Mobile No :</strong>

                    9585399747

                </p>

                <p>

                    <strong>📱 Alternate :</strong>

                    6369386260

                </p>

                <p>

                    <strong>💬 WhatsApp :</strong>

                    9585399747

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

export default ContactInfoModal;