import { useState, useEffect } from "react";
import { api } from "@/utils/api";

// Import components :

import AuctionCard from "@/components/AuctionCard";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);

  const getUsers = async () => {
    const data = await api("http://localhost:8000/user/list");
    setUsers(data);
  };

  const getAuctions = async () => {
    const res = await api("http://localhost:8000/auction/list");
    setAuctions(res);
  };

  useEffect(() => {
    setLoader(true);
    getAuctions();
    getUsers();
    setLoader(false);
  }, []);

  return (
    <main>
      {loader ? (
        <div>Loading content...</div>
      ) : (
        <div>
          {/* <div>
        {users &&
          users.map((item, index) => (
            <div key={index}>
              {item.firstname} {item.lastname}
            </div>
          ))}
      </div> */}
          <div>
            {auctions &&
              auctions.map((auction, index) => (
                <a href={`/auctions/${auction.id}`}><AuctionCard key={index} auctionInfo={auction} /></a>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}
