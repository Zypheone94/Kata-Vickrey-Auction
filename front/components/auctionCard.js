import React from 'react'

const auctionCard = ({auctionInfo}) => {
  return (
    <div className='border-2 border-orange-600 rounded-xl'>
        <div>
            <h2>{auctionInfo.title}</h2>
        </div>
        <div>
            <p>{auctionInfo.description}</p>
            <p><b>{auctionInfo.reservePrice}</b> $</p>
        </div>
    </div>
  )
}

export default auctionCard