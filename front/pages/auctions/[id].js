import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import Header from "@/components/common/Header";
import Countdown from "@/components/Countdown";

const AuctionPage = () => {
  const router = useRouter();
  const auctionId = router.query.id;

  const [auctionValue, setAuctionValue] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    auctionId && getAuctionData();
  }, [auctionId]);

  const getAuctionData = async () => {
    const auctionData = await api(
      `http://localhost:8000/auction/readAuction/${auctionId}`
    );
    setAuctionValue(auctionData);
  };

  return (
    <main className="flex">
      <Header />
      <div className="mt-8 ml-8">
        <h1>{auctionValue.title}</h1>
        <p>{auctionValue.description}</p>
        <p>Prix de réserve : {auctionValue.reservePrice}€</p>
        <Countdown expiration={auctionValue.expiration} timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
      </div>
    </main>
  );
};

export default AuctionPage;
