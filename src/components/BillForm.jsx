import React from "react";

const BillForm = ({
  bill,
  handleChange,
  handlePreview,
  handlePrint,
  handleClear,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Create Transport Bill
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {/* LR Number */}

        <div>
          <label className="font-medium">LR Number</label>
          <input
            type="text"
            name="lrNo"
            value={bill.lrNo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Date */}

        <div>
          <label className="font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={bill.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Vehicle */}

        <div>
          <label className="font-medium">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNo"
            value={bill.vehicleNo}
            onChange={handleChange}
            placeholder="TN 95 Q 4434"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>
        

        {/* From */}

        <div>
          <label className="font-medium">From</label>
          <input
            type="text"
            name="from"
            value={bill.from}
            onChange={handleChange}
            placeholder="Sivakasi"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* To */}

        <div>
          <label className="font-medium">To</label>
          <input
            type="text"
            name="to"
            value={bill.to}
            onChange={handleChange}
            placeholder="Madurai"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Sender */}

        <div>
          <label className="font-medium">Sender Name</label>
          <input
            type="text"
            name="senderName"
            value={bill.senderName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Sender Contact */}

        <div>
          <label className="font-medium">Sender Contact</label>
          <input
            type="text"
            name="senderContact"
            value={bill.senderContact}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Receiver */}

        <div>
          <label className="font-medium">Receiver Name</label>
          <input
            type="text"
            name="receiverName"
            value={bill.receiverName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Receiver Contact */}

        <div>
          <label className="font-medium">Receiver Contact</label>
          <input
            type="text"
            name="receiverContact"
            value={bill.receiverContact}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Article */}

        <div>
          <label className="font-medium">Article</label>
          <input
            type="text"
            name="article"
            value={bill.article}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Quantity */}

        <div>
          <label className="font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={bill.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Freight */}

        <div>
          <label className="font-medium">Freight</label>
          <input
            type="number"
            name="freight"
            value={bill.freight}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Loading */}

        <div>
          <label className="font-medium">Loading Charge</label>
          <input
            type="number"
            name="loadingCharge"
            value={bill.loadingCharge}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Net Amount */}

        <div>
          <label className="font-medium">Net Amount</label>
          <input
            type="number"
            name="netAmount"
            value={bill.netAmount}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Amount Paid */}

        <div>
          <label className="font-medium">Amount Paid</label>
          <input
            type="number"
            name="amountPaid"
            value={bill.amountPaid}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        {/* Total */}

        <div className="md:col-span-2">
          <label className="font-medium">Total</label>
          <input
            type="number"
            name="total"
            value={bill.total}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-8">

        <button
          onClick={handlePreview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Preview
        </button>

        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Print
        </button>

        <button
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