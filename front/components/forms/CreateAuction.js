import React, { useState } from "react";
import { api } from "@/utils/api";

import Header from "../common/Header";

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reservePrice, setReservePrice] = useState(0);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    api("http://localhost:8000/auction/create", "POST", {
      title: title,
      description: description,
      reservePrice: parseFloat(reservePrice),
    });
  };

  return (
    <main className="flex">
      <Header />
      <form className="w-5/12" onSubmit={handleCreateAuction}>
        <div className="mt-6 flex justify-between">
          <label>Titre</label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-dashed"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border-2 border-dashed"
          />
        </div>{" "}
        <div className="mt-6 flex justify-between">
          <label>Reserve Price</label>
          <input
            type="number"
            onChange={(e) => {
              setReservePrice(e.target.value);
            }}
            className="border-2 border-dashed number-input"
          />
        </div>
        <div className="flex justify-end">
          <button>Create Auction</button>
        </div>
      </form>
    </main>
  );
};

export default CreateAuction;
