import React from 'react'
import { useRouter } from "next/router";

const AuctionPage = () => {
    const router = useRouter();
    const room_id = router.query.id;

  return (
    <div>
        {room_id}
    </div>
  )
}

export default AuctionPage