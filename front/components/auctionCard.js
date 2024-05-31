import React from "react";
import Image from "next/image";

import Ibanez from "@/public/ibanez.jpg";

const AuctionCard = ({ auctionInfo }) => {
  return (
    <div className="border-2 border-orange-600 rounded-xl w-72 h-80">
      <div className="relative w-10/12 h-3/4 mx-auto">
        <Image
          src={Ibanez}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h2>{auctionInfo.title}</h2>
          <p>
            <b>{auctionInfo.reservePrice}</b> $
          </p>
        </div>
        <p>{auctionInfo.description}</p>
      </div>
    </div>
  );
};

export default AuctionCard;
