import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import Header from "@/components/common/Header";
import Countdown from "@/components/Countdown";

import BidModal from "@/components/modals/BidModal";

const AuctionPage = () => {
  const router = useRouter();
  const auctionId = router.query.id;

  const [auctionValue, setAuctionValue] = useState([]);
  const [bidList, setBidList] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    auctionId && getAuctionData();
    auctionId && getAuctionBidList();
  }, [auctionId]);

  useEffect(() => {
    timeLeft === "L'enchère est terminée !" && setShowModal(false);
  }, [timeLeft]);

  useEffect(() => {
    getAuctionBidList();
  }, [showModal]);

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
      <div className={`flex mt-8 ml-8 w-full ${showModal ? "blur-lg" : null}`}>
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
                bidList.map((bid, index) => (
                  <li key={index}>
                    {bid.createdTime.split("T")[0].split("-").reverse().join("/").slice(0, -5)}{" "}
                    {bid.createdTime.split("T")[1].split(".")[0].slice(0, -3)} | {bid.amount}{" "}
                    $
                  </li>
                ))
              ) : (
                <li>No bid for this auction!</li>
              )}
            </ul>
          </div>
          <div>
            {timeLeft != "L'enchère est terminée !" ? (
              <button className="border-2" onClick={() => setShowModal(true)}>
                Enchérire !
              </button>
            ) : (
              <p>
                Les enchère pour ce produit sont terminés, vous ne pouvez plus
                enchérire.
              </p>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <BidModal
          setShowModal={setShowModal}
          auctionId={auctionId}
          reservePrice={auctionValue.reservePrice}
        />
      )}
    </main>
  );
};

export default AuctionPage;
