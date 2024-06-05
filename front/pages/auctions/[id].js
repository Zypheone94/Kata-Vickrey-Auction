import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

import Header from "@/components/common/Header";
import Countdown from "@/components/Countdown";

import BidModal from "@/components/modals/BidModal";

export const getServerSideProps = async (context) => {
  const auctionId = context.query.id;

  if (!auctionId) {
    return {
      props: {
        initialData: null,
      },
    };
  }

  const auctionData = await api(
    `http://localhost:8000/auction/readAuction/${auctionId}`
  );
  const bidList = await api(`http://localhost:8000/bid/list/${auctionId}`);

  return {
    props: {
      initialData: {
        auctionId,
        auctionData,
        bidList,
      },
    },
  };
};

const AuctionPage = ({ initialData }) => {
  const [auctionValue, setAuctionValue] = useState(
    initialData?.auctionData || []
  );
  const [bidList, setBidList] = useState(initialData?.bidList || []);
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState();
  console.log(winner);

  useEffect(() => {
    if (timeLeft === "L'enchère est terminée !") {
      setShowModal(false);
      if (bidList && timeLeft === "L'enchère est terminée !") {
        calculWinner();
      }
    }
  }, [timeLeft, bidList]);

  useEffect(() => {
    getAuctionBidList();
  }, [showModal]);

  const getAuctionBidList = async () => {
    const bidList = await api(
      `http://localhost:8000/bid/list/${initialData?.auctionId}`
    );
    setBidList(bidList);
  };

  const calculWinner = () => {
    if (bidList.length === 0) {
      setWinner(null);
      return null;
    }

    const orderedBids = bidList.sort((a, b) => b.amount - a.amount);

    const bidsByUser = {};

    orderedBids.forEach((bid) => {
      const { bidderId, amount } = bid;

      if (!bidsByUser[bidderId] || amount > bidsByUser[bidderId].amount) {
        bidsByUser[bidderId] = bid;
      }
    });

    const winners = Object.values(bidsByUser).sort(
      (a, b) => b.amount - a.amount
    );

    console.log(winners);

    if (winners.length === 1) {
      setWinner([winners[0]]);
    } else {
      const [highestBid, secondHighestBid] = winners;
      const winner = {
        bidderId: highestBid.bidderId,
        amount: secondHighestBid.amount,
      };
      setWinner([winner]);
    }
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
                    {bid.createdTime
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")
                      .slice(0, -5)}{" "}
                    {bid.createdTime.split("T")[1].split(".")[0].slice(0, -3)} |{" "}
                    {bid.amount} $
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
              <div>
                <p>
                  Les enchère pour ce produit sont terminés, vous ne pouvez plus
                  enchérire.
                </p>
                {winner ? (
                  <div>
                    <p>Le gagnant est : {winner[0].bidderId}</p>
                    <p>
                      Il remporte l'enchère avec une mise de :{" "}
                      {winner[0].amount} $
                    </p>
                    <p>Félicitation à lui !</p>
                  </div>
                ) : (
                  <div>
                    <p>
                      Il n'y a malheureusement pas eu d'enchère pour ce produit
                      pendant le temps imparti
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <BidModal
          setShowModal={setShowModal}
          auctionId={initialData.auctionId}
          reservePrice={auctionValue.reservePrice}
        />
      )}
    </main>
  );
};

export default AuctionPage;
