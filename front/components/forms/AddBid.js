import React, { useState } from "react";
import { api } from "@/utils/api";

const AddBid = ({ auctionId, userId, reservePrice, setShowModal }) => {
  const [amount, setAmount] = useState();

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    await api("http://localhost:8000/bid/add", "POST", {
      amount: parseFloat(amount),
      bidderId: userId,
      auctionId: auctionId,
    });
    setShowModal(false);
  };

  return (
    <form className="w-full" onSubmit={handleSubmitBid}>
      <div className="mt-6 flex flex-col justify-between">
        <label>Montant</label>
        <input
          type="number"
          name="amount"
          required
          onChange={(e) => setAmount(e.target.value)}
          defaultValue={reservePrice + 1}
          min={reservePrice}
          className="border-2 border-dashed w-full mt-6 number-input"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button>Create Auction</button>
      </div>
    </form>
  );
};

export default AddBid;
