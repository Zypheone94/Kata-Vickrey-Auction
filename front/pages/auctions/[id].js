import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { api } from "@/utils/api";

const AuctionPage = () => {
  const router = useRouter();
  const auctionId = router.query.id;

  const [auctionValue, setAuctionValue] = useState([]);

  useEffect(() => {
    auctionId && getAuctionData();
  }, [auctionId]);

  const getAuctionData = async () => {
    const auctionData = await api(
      `http://localhost:8000/auction/readAuction/${auctionId}`
    );
    setAuctionValue(auctionData);
  };

  return <div>{auctionValue && auctionValue.title}</div>;
};

export default AuctionPage;
