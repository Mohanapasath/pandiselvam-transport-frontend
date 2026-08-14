import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

import BillPreview from "../components/BillPreview";

import "../styles/createbill.css";

// ==========================================
// LIVE BACKEND
// ==========================================

const API =
    "https://pandiselvam-transport-backend.onrender.com/api";


const CreateBill = () => {

    // ==========================================
    // Navigation
    // ==========================================

    const navigate = useNavigate();


    // ==========================================
    // Today's Date
    // ==========================================

    const today =
        new Date().toISOString().split("T")[0];


    // ==========================================
    // Print Reference
    // ==========================================

    const printRef = useRef();


    // ==========================================
    // Bill State
    // ==========================================
    const [articleType, setArticleType] = useState("");
    const [bill, setBill] = useState({

        lrNo: "",

        date: today,

        vehicleNo: "",

        from: "",

        to: "",

        senderName: "",

        senderContact: "",

        receiverName: "",

        receiverContact: "",

        articleName: "",

        quantity: "",

        // Amount of ONE piece
        Amount: "",

        // Old fields kept for backend compatibility
        freight: "",

        loadingCharge: "",

        gstBox: "",

        attenderMan: "",

        netAmount: 0,

        // NEW:
        // "Paid" OR "To Pay"
        amountPaid: "",

        // Quantity × Amount
        total: 0

    });


    // ==========================================
    // Preview Bill
    // ==========================================

    const [previewBill, setPreviewBill] =
        useState(null);


    // ==========================================
    // Generate LR Number
    // ==========================================

    useEffect(() => {

        generateLRNumber();

    }, []);


    const generateLRNumber = () => {

        const number =
            Date.now().toString().slice(-6);

        setBill(prev => ({

            ...prev,

            lrNo: `LR${number}`

        }));

    };


    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setBill(prev => {

            const updated = {

                ...prev,

                [name]: value

            };


            // ==========================================
            // TOTAL CALCULATION
            //
            // Quantity × Amount
            // ==========================================

            const quantity =
                Number(updated.quantity) || 0;

            const amount =
                Number(updated.Amount) || 0;


            updated.total =
                quantity * amount;


            return updated;

        });

    };


    // ==========================================
    // Article Change
    // ==========================================

    const handleArticleChange = (e) => {

        const value = e.target.value;


        if (value === "Others") {

            setBill(prev => ({

                ...prev,

                articleName: ""

            }));

        }

        else {

            setBill(prev => ({

                ...prev,

                articleName: value

            }));

        }

    };


    // ==========================================
    // Preview Bill
    // ==========================================

    const handlePreview = async () => {

        try {

            const response =
                await axios.post(

                    `${API}/preview`,

                    bill

                );


            /*
             * IMPORTANT
             *
             * Backend may still return old fields.
             *
             * So frontend bill is merged AFTER
             * backend response.
             *
             * This preserves:
             *
             * Amount
             * Quantity
             * Payment Status
             * Total
             */

            const finalBill = {

                ...response.data.bill,

                ...bill,

                total: bill.total,

                amountPaid: bill.amountPaid,

                articleName: bill.articleName,

                quantity: bill.quantity,

                Amount: bill.Amount

            };


            setPreviewBill(finalBill);

        }

        catch (error) {

            console.error(
                "Preview Error:",
                error
            );

            alert(
                "Unable to Preview Bill"
            );

        }

    };


    // ==========================================
    // React Print
    // ==========================================

    const reactPrint = useReactToPrint({

        contentRef: printRef,

        documentTitle: bill.lrNo,

        onAfterPrint: () => {

            console.log(
                "Bill Printed Successfully"
            );

        }

    });


    // ==========================================
    // Print Bill
    // ==========================================

    const handlePrint = async () => {

        try {

            const response =
                await axios.post(

                    `${API}/print`,

                    bill

                );


            /*
             * IMPORTANT
             *
             * Do NOT allow backend's old
             * amountPaid / total values
             * to overwrite the new values.
             */

            const finalBill = {

                ...response.data.bill,

                ...bill,

                total: bill.total,

                amountPaid: bill.amountPaid,

                articleName: bill.articleName,

                quantity: bill.quantity,

                Amount: bill.Amount

            };


            setPreviewBill(finalBill);


            /*
             * Wait until React updates
             * the BillPreview component.
             */

            setTimeout(() => {

                reactPrint();

            }, 300);

        }

        catch (error) {

            console.error(
                "Print Error:",
                error
            );

            alert(
                "Unable to Print Bill"
            );

        }

    };


    // ==========================================
    // Clear Form
    // ==========================================

    const handleClear = () => {

        const number =
            Date.now().toString().slice(-6);


        setBill({

            lrNo: `LR${number}`,

            date: today,

            vehicleNo: "",

            from: "",

            to: "",

            senderName: "",

            senderContact: "",

            receiverName: "",

            receiverContact: "",

            articleName: "",

            quantity: "",

            Amount: "",

            // Old fields
            freight: "",

            loadingCharge: "",

            gstBox: "",

            attenderMan: "",

            netAmount: 0,

            amountPaid: "",

            total: 0

        });


        setPreviewBill(null);

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="create-bill-container">


            {/* ==========================================
                TOP BAR
            ========================================== */}

            <div className="top-bar">

                <button

                    className="back-btn"

                    onClick={() => navigate(-1)}

                >

                    ← Back

                </button>


                <h1 className="page-title">

                    Pandiselvam Transport Billing System

                </h1>

            </div>


            {/* ==========================================
                BILL FORM
            ========================================== */}

            <div className="bill-form">

                <div className="form-grid">


                    {/* ==========================================
                        LR NUMBER
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            LR Number
                        </label>

                        <input

                            type="text"

                            value={bill.lrNo}

                            readOnly

                        />

                    </div>


                    {/* ==========================================
                        DATE
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Date
                        </label>

                        <input

                            type="date"

                            value={bill.date}

                            readOnly

                        />

                    </div>


                    {/* ==========================================
                        VEHICLE NUMBER
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Vehicle Number
                        </label>

                        <input

                            type="text"

                            name="vehicleNo"

                            value={bill.vehicleNo}

                            onChange={handleChange}

                            placeholder="TN95 Q 4434"

                        />

                    </div>


                    {/* ==========================================
                        ATTENDER MAN
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Attender Man
                        </label>

                        <input

                            type="text"

                            name="attenderMan"

                            value={bill.attenderMan}

                            onChange={handleChange}

                            placeholder="Enter Attender Name"

                        />

                    </div>


                    {/* ==========================================
                        FROM
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            From
                        </label>

                        <input

                            type="text"

                            name="from"

                            value={bill.from}

                            onChange={handleChange}

                            placeholder="Enter source"

                        />

                    </div>


                    {/* ==========================================
                        TO
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            To
                        </label>

                        <input

                            type="text"

                            name="to"

                            value={bill.to}

                            onChange={handleChange}

                            placeholder="Enter Destination"

                        />

                    </div>


                    {/* ==========================================
                        SENDER NAME
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Sender Name
                        </label>

                        <input

                            type="text"

                            name="senderName"

                            value={bill.senderName}

                            onChange={handleChange}

                        />

                    </div>


                    {/* ==========================================
                        RECEIVER NAME
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Receiver Name
                        </label>

                        <input

                            type="text"

                            name="receiverName"

                            value={bill.receiverName}

                            onChange={handleChange}

                        />

                    </div>


                    {/* ==========================================
                        SENDER CONTACT
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Sender Contact
                        </label>

                        <input

                            type="text"

                            name="senderContact"

                            value={bill.senderContact}

                            onChange={handleChange}

                            maxLength={10}

                        />

                    </div>


                    {/* ==========================================
                        RECEIVER CONTACT
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Receiver Contact
                        </label>

                        <input

                            type="text"

                            name="receiverContact"

                            value={bill.receiverContact}

                            onChange={handleChange}

                            maxLength={10}

                        />

                    </div>

{/* ==========================================
    ARTICLE NAME
========================================== */}

<div className="form-group">

    <label>
        Article Name
    </label>

    <select
        value={articleType}
        onChange={(e) => {

            const value = e.target.value;

            setArticleType(value);

            if (value === "Others") {

                // Clear article name first
                setBill(prev => ({
                    ...prev,
                    articleName: ""
                }));

            } else {

                // Box / Bundle / Bag
                setBill(prev => ({
                    ...prev,
                    articleName: value
                }));

            }

        }}
    >

        <option value="">
            Select Article
        </option>

        <option value="Box">
            Box
        </option>

        <option value="Bundle">
            Bundle
        </option>

        <option value="Bag">
            Bag
        </option>

        <option value="Others">
            Others
        </option>

    </select>


    {/* ==========================================
        CUSTOM ARTICLE NAME
        ONLY WHEN OTHERS IS SELECTED
    ========================================== */}

    {articleType === "Others" && (

        <input
            type="text"
            name="articleName"
            value={bill.articleName || ""}
            onChange={handleChange}
            placeholder="Enter article name"
            autoFocus
        />

    )}

</div>

                    {/* ==========================================
                        QUANTITY
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Quantity
                        </label>

                        <input

                            type="number"

                            name="quantity"

                            value={bill.quantity}

                            onChange={handleChange}

                            placeholder="Enter Quantity"

                            min="0"

                        />

                    </div>


                    {/* ==========================================
                        AMOUNT
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Amount
                        </label>

                        <input

                            type="number"

                            name="Amount"

                            value={bill.Amount}

                            onChange={handleChange}

                            placeholder="Amount of one piece"

                            min="0"

                            step="0.01"

                        />

                    </div>


                    {/* ==========================================
                        PAYMENT STATUS
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Payment Status
                        </label>

                        <select

                            name="amountPaid"

                            value={bill.amountPaid}

                            onChange={handleChange}

                        >

                            <option value="">
                                Select Payment Status
                            </option>

                            <option value="To Pay">
                                To Pay
                            </option>

                            <option value="Paid">
                                Paid
                            </option>

                        </select>

                    </div>


                    {/* ==========================================
                        TOTAL
                    ========================================== */}

                    <div className="form-group full-width">

                        <label>
                            Total
                        </label>

                        <input

                            type="number"

                            value={bill.total}

                            readOnly

                        />

                    </div>


                    {/* ==========================================
                        GST
                        HIDDEN
                    ========================================== */}

                    {/*
                    <div className="form-group">

                        <label>GST</label>

                        <input
                            type="number"
                            name="gstBox"
                            value={bill.gstBox}
                            onChange={handleChange}
                        />

                    </div>
                    */}


                    {/* ==========================================
                        LOADING CHARGE
                        HIDDEN
                    ========================================== */}

                    {/*
                    <div className="form-group">

                        <label>
                            Loading Charge
                        </label>

                        <input
                            type="number"
                            name="loadingCharge"
                            value={bill.loadingCharge}
                            onChange={handleChange}
                        />

                    </div>
                    */}


                    {/* ==========================================
                        NET AMOUNT
                        HIDDEN
                    ========================================== */}

                    {/*
                    <div className="form-group">

                        <label>
                            Net Amount
                        </label>

                        <input
                            type="number"
                            value={bill.netAmount}
                            readOnly
                        />

                    </div>
                    */}


                </div>


                {/* ==========================================
                    BUTTONS

                    These are OUTSIDE print-area.
                    Therefore they won't appear in print.
                ========================================== */}

                <div className="button-group">

                    <button

                        type="button"

                        className="btn btn-preview"

                        onClick={handlePreview}

                    >

                        👁 Preview Bill

                    </button>


                    <button

                        type="button"

                        className="btn btn-print"

                        onClick={handlePrint}

                    >

                        🖨 Print Bill

                    </button>


                    <button

                        type="button"

                        className="btn btn-clear"

                        onClick={handleClear}

                    >

                        ✖ Clear

                    </button>

                </div>


            </div>


            {/* ==========================================
                PRINT AREA

                ONLY THIS PART WILL BE PRINTED
            ========================================== */}

            {previewBill && (

                <div

                    id="print-area"

                    ref={printRef}

                    className="preview-section"

                >

                    <BillPreview

                        bill={previewBill}

                    />

                </div>

            )}

        </div>

    );

};


export default CreateBill;