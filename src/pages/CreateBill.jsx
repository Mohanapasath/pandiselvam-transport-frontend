import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import BillPreview from "../components/BillPreview";

import "../styles/createbill.css";

const API = "http://127.0.0.1:8000/api";

const CreateBill = () => {

    /* ==========================================
       Navigation
    ========================================== */

    const navigate = useNavigate();


    /* ==========================================
       Today's Date
    ========================================== */

    const today = new Date().toISOString().split("T")[0];


    /* ==========================================
       Print Reference
    ========================================== */

    const printRef = useRef();


    /* ==========================================
       Bill State
    ========================================== */

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

        freight: "",

        loadingCharge: "",

        gstBox: "",

        attenderMan: "",

        netAmount: 0,

        amountPaid: "",

        total: 0

    });


    /* ==========================================
       Preview Bill
    ========================================== */

    const [previewBill, setPreviewBill] = useState(null);


    /* ==========================================
       Generate LR Number
    ========================================== */

    useEffect(() => {

        generateLRNumber();

    }, []);


    const generateLRNumber = () => {

        const number = Date.now().toString().slice(-6);

        setBill(prev => ({

            ...prev,

            lrNo: `LR${number}`

        }));

    };


    /* ==========================================
       Handle Input
    ========================================== */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setBill(prev => {

            const updated = {

                ...prev,

                [name]: value

            };


            /* ==========================================
               Amount Calculation

               Net Amount =
               Freight + Loading Charge + GST
            ========================================== */

            const freight =
                parseFloat(updated.freight || 0);

            const loading =
                parseFloat(updated.loadingCharge || 0);

            const gst =
                parseFloat(updated.gstBox || 0);

            const paid =
                parseFloat(updated.amountPaid || 0);


            /* Net Amount */

            updated.netAmount =
                freight +
                loading +
                gst;


            /* Total */

            updated.total =
                updated.netAmount -
                paid;


            return updated;

        });

    };


    /* ==========================================
       Preview Bill
    ========================================== */

    const handlePreview = async () => {

        try {

            const response = await axios.post(

                `${API}/preview`,

                bill

            );

            setPreviewBill(response.data.bill);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Preview Bill");

        }

    };


    /* ==========================================
       React Print
    ========================================== */

    const reactPrint = useReactToPrint({

        contentRef: printRef,

        documentTitle: bill.lrNo,

        onAfterPrint: () => {

            console.log(
                "Bill Printed Successfully"
            );

        }

    });


    /* ==========================================
       Print Bill
    ========================================== */

    const handlePrint = async () => {

        try {

            const response = await axios.post(

                `${API}/print`,

                bill

            );

            setPreviewBill(response.data.bill);


            setTimeout(() => {

                reactPrint();

            }, 300);

        }

        catch (error) {

            console.error(error);

        }

    };


    /* ==========================================
       Clear Form
    ========================================== */

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

            freight: "",

            loadingCharge: "",

            /*
             * Clear GST
             */
            gstBox: "",

            /*
             * Clear Attender
             */
            attenderMan: "",

            netAmount: 0,

            amountPaid: "",

            total: 0

        });


        setPreviewBill(null);

    };


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
                        LR Number
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            LR Number
                        </label>

                        <input
                            type="text"
                            name="lrNo"
                            value={bill.lrNo}
                            readOnly
                        />

                    </div>


                    {/* ==========================================
                        Date
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={bill.date}
                            readOnly
                        />

                    </div>


                    {/* ==========================================
                        Vehicle Number
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
                        GST AMOUNT
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            GST
                        </label>

                        <input
                            type="number"
                            name="gstBox"
                            value={bill.gstBox}
                            onChange={handleChange}
                            placeholder="GST NUMBER"
                            min="0"
                            step="0.01"
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
                        From
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
                        placeholder="Enter source "
                    />

                    </div>


                    {/* ==========================================
                        To
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
                        Sender Name
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
                        Receiver Name
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
                        Sender Contact
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
                        Receiver Contact
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
                        Article Name
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Article Name
                        </label>

                        <input
                            type="text"
                            name="articleName"
                            value={bill.articleName}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ==========================================
                        Quantity
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
                        />

                    </div>


                    {/* ==========================================
                        Freight
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Freight
                        </label>

                        <input
                            type="number"
                            name="freight"
                            value={bill.freight}
                            onChange={handleChange}
                            placeholder="Enter Freight Amount"
                        />

                    </div>


                    {/* ==========================================
                        Loading Charge
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Loading Charge
                        </label>

                        <input
                            type="number"
                            name="loadingCharge"
                            value={bill.loadingCharge}
                            onChange={handleChange}
                            placeholder="Enter Loading Charge"
                        />

                    </div>



                    {/* ==========================================
                        NET AMOUNT
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Net Amount
                        </label>

                        <input
                            type="number"
                            name="netAmount"
                            value={bill.netAmount}
                            readOnly
                        />

                    </div>


                    {/* ==========================================
                        AMOUNT PAID
                    ========================================== */}

                    <div className="form-group">

                        <label>
                            Amount Paid
                        </label>

                        <input
                            type="number"
                            name="amountPaid"
                            value={bill.amountPaid}
                            onChange={handleChange}
                            placeholder="Enter Paid Amount"
                        />

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
                            name="total"
                            value={bill.total}
                            readOnly
                        />

                    </div>


                </div>


                {/* ==========================================
                    ACTION BUTTONS
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
                BILL PREVIEW
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