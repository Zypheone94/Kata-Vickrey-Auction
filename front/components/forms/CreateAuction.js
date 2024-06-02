import React, { useState } from "react";
import { api } from "@/utils/api";

import Router from "next/router";

const CreateAuction = () => {
  const [auctionData, setAuctionData] = useState({});

  const handleChangeAuctionData = (e) => {
    const { name, value, type } = e.target;
    setAuctionData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleCreateAuction = async (e) => {
    e.preventDefault();
    const newAuction = await api(
      "http://localhost:8000/auction/create",
      "POST",
      auctionData
    );
    Router.push(`/auctions/${newAuction.id}`);
  };

  return (
    <form className="w-5/12" onSubmit={handleCreateAuction}>
      <div className="mt-6 flex justify-between">
        <label>Titre</label>
        <input
          type="text"
          name="title"
          onChange={handleChangeAuctionData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={handleChangeAuctionData}
          className="border-2 border-dashed"
        />
      </div>{" "}
      <div className="mt-6 flex justify-between">
        <label>Reserve Price</label>
        <input
          type="number"
          name="reservePrice"
          onChange={handleChangeAuctionData}
          className="border-2 border-dashed number-input"
        />
      </div>
      <div className="flex justify-end">
        <button>Create Auction</button>
      </div>
    </form>
  );
};

export default CreateAuction;
