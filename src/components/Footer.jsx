import React from "react";
import "../styles/footer.css";

const Footer = () => {

    return (

        <footer className="footer">

            <h2 className="footer-title">

                Pandiselvam Transport

            </h2>

            <p className="footer-address">

                3/6D,Indra Nagar, Anaikuttam, Sivakasi-626130.

            </p>

            <div className="footer-phone">

                <span>📞 +91 9585399747</span>

                <span>|</span>

                <span>📞 +91 6369386260</span>

            </div>

            <div className="footer-whatsapp">

                💬 WhatsApp :

                <a
                    href="https://wa.me/919585399747"
                    target="_blank"
                    rel="noreferrer"
                >
                    +91 9585399747
                </a>

            </div>

            <p className="footer-copy">

                © 2026 Pandiselvam Transport. All Rights Reserved.

            </p>

        </footer>

    );

};

export default Footer;