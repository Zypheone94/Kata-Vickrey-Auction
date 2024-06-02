import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import Header from "@/components/common/Header";
import Countdown from "@/components/Countdown";

const AuctionPage = () => {
  const router = useRouter();
  const auctionId = router.query.id;

  const [auctionValue, setAuctionValue] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    auctionId && getAuctionData();
    auctionId && getAuctionBidList();
  }, [auctionId]);

  const getAuctionData = async () => {
    const auctionData = await api(
      `http://localhost:8000/auction/readAuction/${auctionId}`
    );
    setAuctionValue(auctionData);
  };

  const getAuctionBidList = async () => {
    const bidList = await api(`http://localhost:8000/bid/list/${auctionId}`);
    setBidList(bidList);
  };

  return (
    <main className="flex">
      <Header />
      <div className="flex mt-8 ml-8 w-full">
        <div className="w-1/2">
          <h1>{auctionValue.title}</h1>
          <p>{auctionValue.description}</p>
          <p>Prix de réserve : {auctionValue.reservePrice}€</p>
          <Countdown
            expiration={auctionValue.expiration}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        </div>
        <div className="w-1/2">
          <h1>Bid List :</h1>
          <div>
            <ul>
              {bidList && bidList.length > 0 ? (
                bidList.map((bid, index) => <li key={index}>{bid.amount} $</li>)
              ) : (
                <li>No bid for this auction!</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuctionPage;
