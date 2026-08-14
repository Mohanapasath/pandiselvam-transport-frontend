import React, { useState } from "react";

const BillForm = ({
  bill,
  handleChange,
  handlePreview,
  handlePrint,
  handleClear,
}) => {
  // Check whether current article is one of the predefined options
  const predefinedArticles = ["Box", "Bundle", "Bag"];

  const isPredefinedArticle = predefinedArticles.includes(
    bill.articleName
  );

  // Article dropdown state
  const [articleType, setArticleType] = useState(
    isPredefinedArticle
      ? bill.articleName
      : bill.articleName
      ? "Others"
      : ""
  );

  // Custom article name for Others
  const [customArticle, setCustomArticle] = useState(
    !isPredefinedArticle ? bill.articleName || "" : ""
  );

  // -----------------------------------------
  // Common field update helper
  // -----------------------------------------
  const updateField = (name, value) => {
    handleChange({
      target: {
        name,
        value,
      },
    });
  };

  // -----------------------------------------
  // Quantity change
  // Automatically calculate total
  // -----------------------------------------
  const handleQuantityChange = (e) => {
    const quantity = Number(e.target.value) || 0;

    updateField("quantity", e.target.value);

    const amount = Number(bill.amount) || 0;

    const total = quantity * amount;

    updateField("total", total);
  };

  // -----------------------------------------
  // Amount per piece change
  // Automatically calculate total
  // -----------------------------------------
  const handleAmountChange = (e) => {
    const amount = Number(e.target.value) || 0;

    updateField("amount", e.target.value);

    const quantity = Number(bill.quantity) || 0;

    const total = quantity * amount;

    updateField("total", total);
  };

  // -----------------------------------------
  // ARTICLE TYPE CHANGE
  // -----------------------------------------
  const handleArticleTypeChange = (e) => {
    const value = e.target.value;

    setArticleType(value);

    if (value === "Others") {
      // Clear previous article
      setCustomArticle("");

      // IMPORTANT:
      // Do not store "Others" as articleName.
      // articleName should contain the actual custom name.
      updateField("articleName", "");
    } else {
      // Box / Bundle / Bag
      setCustomArticle("");

      updateField("articleName", value);
    }
  };

  // -----------------------------------------
  // CUSTOM ARTICLE CHANGE
  // -----------------------------------------
  const handleCustomArticleChange = (e) => {
    const value = e.target.value;

    // Keep local state
    setCustomArticle(value);

    // IMPORTANT:
    // Store the typed custom article in bill.articleName
    updateField("articleName", value);
  };

  // -----------------------------------------
  // PAYMENT STATUS
  // -----------------------------------------
  const handlePaymentStatusChange = (e) => {
    updateField("paymentStatus", e.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      {/* =========================================
          TITLE
      ========================================= */}
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Create Transport Bill
      </h2>


      <div className="grid md:grid-cols-2 gap-4">

        {/* =========================================
            LR NUMBER
        ========================================= */}
        <div>
          <label className="font-medium">
            LR Number
          </label>

          <input
            type="text"
            name="lrNo"
            value={bill.lrNo || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            DATE
        ========================================= */}
        <div>
          <label className="font-medium">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={bill.date || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            VEHICLE NUMBER
        ========================================= */}
        <div>
          <label className="font-medium">
            Vehicle Number
          </label>

          <input
            type="text"
            name="vehicleNo"
            value={bill.vehicleNo || ""}
            onChange={handleChange}
            placeholder="TN 95 Q 4434"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            FROM
        ========================================= */}
        <div>
          <label className="font-medium">
            From
          </label>

          <input
            type="text"
            name="from"
            value={bill.from || ""}
            onChange={handleChange}
            placeholder="Sivakasi"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            TO
        ========================================= */}
        <div>
          <label className="font-medium">
            To
          </label>

          <input
            type="text"
            name="to"
            value={bill.to || ""}
            onChange={handleChange}
            placeholder="Madurai"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            SENDER NAME
        ========================================= */}
        <div>
          <label className="font-medium">
            Sender Name
          </label>

          <input
            type="text"
            name="senderName"
            value={bill.senderName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            SENDER CONTACT
        ========================================= */}
        <div>
          <label className="font-medium">
            Sender Contact
          </label>

          <input
            type="text"
            name="senderContact"
            value={bill.senderContact || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            RECEIVER NAME
        ========================================= */}
        <div>
          <label className="font-medium">
            Receiver Name
          </label>

          <input
            type="text"
            name="receiverName"
            value={bill.receiverName || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            RECEIVER CONTACT
        ========================================= */}
        <div>
          <label className="font-medium">
            Receiver Contact
          </label>

          <input
            type="text"
            name="receiverContact"
            value={bill.receiverContact || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            ARTICLE NAME
        ========================================= */}
        <div>
          <label className="font-medium">
            Article Name
          </label>

          <select
            value={articleType}
            onChange={handleArticleTypeChange}
            className="w-full border rounded-lg p-2 mt-1"
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


          {/* =========================================
              OTHERS CUSTOM INPUT
          ========================================= */}
          {articleType === "Others" && (
            <input
              type="text"
              value={customArticle}
              onChange={handleCustomArticleChange}
              placeholder="Enter article name"
              autoFocus
              className="w-full border rounded-lg p-2 mt-2"
            />
          )}
        </div>


        {/* =========================================
            QUANTITY
        ========================================= */}
        <div>
          <label className="font-medium">
            Quantity
          </label>

          <input
            type="number"
            min="0"
            name="quantity"
            value={bill.quantity || ""}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            AMOUNT
            Amount of one piece
        ========================================= */}
        <div>
          <label className="font-medium">
            Amount
          </label>

          <input
            type="number"
            min="0"
            name="amount"
            value={bill.amount || ""}
            onChange={handleAmountChange}
            placeholder="Amount of one piece"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>


        {/* =========================================
            PAYMENT STATUS
        ========================================= */}
        <div>
          <label className="font-medium">
            Payment Status
          </label>

          <select
            name="paymentStatus"
            value={bill.paymentStatus || ""}
            onChange={handlePaymentStatusChange}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option value="">
              Select Payment Status
            </option>

            <option value="To Pay">
              To Pay
            </option>

            <option value="Paid Pay">
              Paid Pay
            </option>
          </select>
        </div>


        {/* =========================================
            TOTAL
            Quantity × Amount
        ========================================= */}
        <div className="md:col-span-2">
          <label className="font-medium">
            Total
          </label>

          <input
            type="number"
            name="total"
            value={bill.total || 0}
            readOnly
            className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>

      </div>


      {/* =========================================
          BUTTONS
      ========================================= */}
      <div className="flex gap-4 mt-8">

        {/* PREVIEW */}
        <button
          type="button"
          onClick={handlePreview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Preview
        </button>


        {/* PRINT */}
        <button
          type="button"
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Print
        </button>


        {/* CLEAR */}
        <button
          type="button"
          onClick={handleClear}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default BillForm;