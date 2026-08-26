import React from "react";
import logo from "../assets/asplogo.png";

const BillPreview = ({ bill }) => {

    // ==========================================
    // NO BILL
    // ==========================================

    if (!bill) {
        return null;
    }


    // ==========================================
    // SAFE NUMERIC VALUES
    // ==========================================

    const freight =
        Number(bill.freight) || 0;

    const loadingCharge =
        Number(bill.loadingCharge) || 0;

    const gst =
        Number(bill.gstBox) || 0;

    const netAmount =
        Number(bill.netAmount) ||
        (freight + loadingCharge + gst);


    // ==========================================
    // QUANTITY
    // ==========================================

    const quantity =
        Number(bill.quantity) || 0;


    // ==========================================
    // AMOUNT OF ONE PIECE
    //
    // Your CreateBill uses:
    // name="Amount"
    // ==========================================

    const amount =
        Number(bill.Amount) || 0;


    // ==========================================
    // TOTAL
    //
    // If bill.total is available, use it.
    // Otherwise calculate:
    //
    // Quantity × Amount
    // ==========================================

    const calculatedTotal =
        quantity * amount;


    const total =
        Number.isFinite(Number(bill.total))
            ? Number(bill.total)
            : calculatedTotal;


    // ==========================================
    // PAYMENT STATUS
    //
    // IMPORTANT:
    //
    // amountPaid is now TEXT.
    //
    // Possible values:
    // "Paid"
    // "To Pay"
    //
    // DO NOT use Number() here.
    // ==========================================

    const paymentStatus =
        bill.amountPaid || "-";


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


                <h2>
                    PANDISELVAM TRANSPORT
                </h2>


                <p>
                    3/6D, Indra Nagar, Anaikuttam,
                    Sivakasi-626130.
                </p>


                <p>
                    +91 6369386260 / +91 8531044620 / +91 8610809156
                </p>

            </div>


            <hr />


            {/* ===============================
                BILL DETAILS
            =============================== */}

            <table className="bill-table">

                <tbody>


                    {/* LR NUMBER */}

                    <tr>

                        <td>
                            <strong>
                                LR No
                            </strong>
                        </td>

                        <td>
                            {bill.lrNo || "-"}
                        </td>

                    </tr>


                    {/* DATE */}

                    <tr>

                        <td>
                            <strong>
                                Date
                            </strong>
                        </td>

                        <td>
                            {bill.date || "-"}
                        </td>

                    </tr>


                    {/* VEHICLE NUMBER */}

                    <tr>

                        <td>
                            <strong>
                                Vehicle No
                            </strong>
                        </td>

                        <td>
                            {bill.vehicleNo || "-"}
                        </td>

                    </tr>


                    {/* ===============================
                        GST
                    =============================== 

                    <tr>

                        <td>
                            <strong>
                                GST
                            </strong>
                        </td>

                        <td>
                            {gst.toFixed(2)}
                        </td>

                    </tr>
*/}

                    {/* ===============================
                        ATTENDER MAN
                    =============================== */}

                    <tr>

                        <td>
                            <strong>
                                Attender Man
                            </strong>
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


                    {/* FROM */}

                    <tr>

                        <td>
                            <strong>
                                From
                            </strong>
                        </td>

                        <td>
                            {bill.from || "-"}
                        </td>

                    </tr>


                    {/* TO */}

                    <tr>

                        <td>
                            <strong>
                                To
                            </strong>
                        </td>

                        <td>
                            {bill.to || "-"}
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


                        {/* NAME */}

                        <tr>

                            <td>
                                Name
                            </td>

                            <td>
                                {bill.senderName || "-"}
                            </td>

                        </tr>


                        {/* CONTACT */}

                        <tr>

                            <td>
                                Contact
                            </td>

                            <td>
                                {bill.senderContact || "-"}
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


                        {/* NAME */}

                        <tr>

                            <td>
                                Name
                            </td>

                            <td>
                                {bill.receiverName || "-"}
                            </td>

                        </tr>


                        {/* CONTACT */}

                        <tr>

                            <td>
                                Contact
                            </td>

                            <td>
                                {bill.receiverContact || "-"}
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
                            {bill.articleName || "-"}
                        </td>

                        <td>
                            {quantity}
                        </td>

                    </tr>

                </tbody>

            </table>


            <hr />


            {/* ===============================
                AMOUNT DETAILS
            =============================== */}
{/* ===============================
    AMOUNT DETAILS
=============================== */}

<table className="bill-table amount-table">

    <tbody>

        {/* ===============================
            AMOUNT / PIECE
        =============================== */}

        <tr>

            <td>
                Amount / Piece
            </td>

            <td className="text-right">
                ₹ {amount.toFixed(2)}
            </td>

        </tr>


        {/* ===============================
            FREIGHT - HIDDEN
        =============================== */}

        {/*
        <tr>

            <td>
                Freight
            </td>

            <td className="text-right">
                ₹ {freight.toFixed(2)}
            </td>

        </tr>
        */}


        {/* ===============================
            LOADING CHARGE - HIDDEN
        =============================== */}

        {/*
        <tr>

            <td>
                Loading Charge
            </td>

            <td className="text-right">
                ₹ {loadingCharge.toFixed(2)}
            </td>

        </tr>
        */}


        {/* ===============================
            GST - HIDDEN
        =============================== */}

        {/*
        <tr>

            <td>
                GST
            </td>

            <td className="text-right">
                ₹ {gst.toFixed(2)}
            </td>

        </tr>
        */}


        {/* ===============================
            NET AMOUNT - HIDDEN
        =============================== */}

        {/*
        <tr>

            <td>
                Net Amount
            </td>

            <td className="text-right">
                ₹ {netAmount.toFixed(2)}
            </td>

        </tr>
        */}


        {/* ===============================
            PAYMENT STATUS
        =============================== */}

        <tr>

            <td>
                <strong>
                    Payment Status
                </strong>
            </td>

            <td className="text-right">

                <strong>
                    {paymentStatus}
                </strong>

            </td>

        </tr>


        {/* ===============================
            TOTAL
        =============================== */}

        <tr className="total-row">

            <td>
                <strong>
                    Total
                </strong>
            </td>

            <td className="text-right">

                <strong>
                    ₹ {total.toFixed(2)}
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
{/*}
               <p>
                    Goods Accepted Subject To
                    Company's Rules & Regulations.
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
*/}
            </div>


        </div>

    );

};


export default BillPreview;