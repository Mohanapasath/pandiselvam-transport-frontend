import React from "react";
import logo from "../assets/asplogo.png";

const BillPreview = ({ bill }) => {

    if (!bill) {
        return null;
    }

    return (
        <div
            id="bill-preview"
            className="bill-preview"
        >

            {/* ===============================
                COMPANY HEADER
            =============================== */}

            <div className="company-header">

                <img
                    src={logo}
                    alt="Pandiselvam Transport"
                    className="company-logo"
                />

                <h2>PANDISELVAM TRANSPORT</h2>

                <p>
                    3/6D, Indra Nagar, Anaikuttam, Sivakasi-626130.
                </p>

                <p>
                    +91 9585399747 / +91 6369386260
                </p>

            </div>

            <hr />


            {/* ===============================
                BILL DETAILS
            =============================== */}

            <table className="bill-table">

                <tbody>

                    <tr>
                        <td>
                            <strong>LR No</strong>
                        </td>

                        <td>
                            {bill.lrNo}
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <strong>Date</strong>
                        </td>

                        <td>
                            {bill.date}
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <strong>Vehicle No</strong>
                        </td>

                        <td>
                            {bill.vehicleNo}
                        </td>
                    </tr>


                    {/* ===============================
                        GST
                    =============================== */}

                    <tr>
                        <td>
                            <strong>GST</strong>
                        </td>

                        <td>
                             {Number(bill.gstBox || 0).toFixed(2)}
                        </td>
                    </tr>


                    {/* ===============================
                        ATTENDER MAN
                    =============================== */}

                    <tr>
                        <td>
                            <strong>Attender Man</strong>
                        </td>

                        <td>
                            {bill.attenderMan || "-"}
                        </td>
                    </tr>

                </tbody>

            </table>

            <hr />


            {/* ===============================
                ROUTE DETAILS
            =============================== */}

            <table className="bill-table">

                <tbody>

                    <tr>
                        <td>
                            <strong>From</strong>
                        </td>

                        <td>
                            {bill.from}
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <strong>To</strong>
                        </td>

                        <td>
                            {bill.to}
                        </td>
                    </tr>

                </tbody>

            </table>

            <hr />


            {/* ===============================
                SENDER DETAILS
            =============================== */}

            <div className="customer-section">

                <h3>
                    Sender Details
                </h3>

                <table className="bill-table">

                    <tbody>

                        <tr>

                            <td>
                                Name
                            </td>

                            <td>
                                {bill.senderName}
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Contact
                            </td>

                            <td>
                                {bill.senderContact}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <hr />


            {/* ===============================
                RECEIVER DETAILS
            =============================== */}

            <div className="customer-section">

                <h3>
                    Receiver Details
                </h3>

                <table className="bill-table">

                    <tbody>

                        <tr>

                            <td>
                                Name
                            </td>

                            <td>
                                {bill.receiverName}
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Contact
                            </td>

                            <td>
                                {bill.receiverContact}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <hr />


            {/* ===============================
                ARTICLE DETAILS
            =============================== */}

            <table className="bill-table">

                <thead>

                    <tr>

                        <td>
                            Article
                        </td>

                        <td>
                            Qty
                        </td>

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        <td>
                            {bill.articleName}
                        </td>

                        <td>
                            {bill.quantity}
                        </td>

                    </tr>

                </tbody>

            </table>

            <hr />


            {/* ===============================
                AMOUNT DETAILS
            =============================== */}

            <table className="bill-table amount-table">

                <tbody>

                    {/* FREIGHT */}

                    <tr>

                        <td>
                            Freight
                        </td>

                        <td className="text-right">
                            ₹ {Number(bill.freight || 0).toFixed(2)}
                        </td>

                    </tr>


                    {/* LOADING CHARGE */}

                    <tr>

                        <td>
                            Loading Charge
                        </td>

                        <td className="text-right">
                            ₹ {Number(bill.loadingCharge || 0).toFixed(2)}
                        </td>

                    </tr>


                    {/* GST */}

                    <tr>

                        <td>
                            GST
                        </td>

                        <td className="text-right">
                            ₹ {Number(bill.gstBox || 0).toFixed(2)}
                        </td>

                    </tr>


                    {/* NET AMOUNT */}

                    <tr>

                        <td>
                            Net Amount
                        </td>

                        <td className="text-right">
                            ₹ {Number(bill.netAmount || 0).toFixed(2)}
                        </td>

                    </tr>


                    {/* AMOUNT PAID */}

                    <tr>

                        <td>
                            Amount Paid
                        </td>

                        <td className="text-right">
                            ₹ {Number(bill.amountPaid || 0).toFixed(2)}
                        </td>

                    </tr>


                    {/* TOTAL */}

                    <tr className="total-row">

                        <td>
                            <strong>Total</strong>
                        </td>

                        <td className="text-right">

                            <strong>
                                ₹ {Number(bill.total || 0).toFixed(2)}
                            </strong>

                        </td>

                    </tr>

                </tbody>

            </table>

            <hr />


            {/* ===============================
                FOOTER
            =============================== */}

            <div className="footer">

                <p>
                    Goods Accepted Subject To Company's Rules & Regulations.
                </p>

                <br />

                <h3>
                    THANK YOU
                </h3>

                <p>
                    Visit Again
                </p>

                <br />

                <small>
                    Computer Generated Bill
                </small>

            </div>

        </div>
    );
};

export default BillPreview;