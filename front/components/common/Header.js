import React from "react";

const Header = () => {
  return (
    <header className="h-screen w-2/12 bg-base">
      <div className="">Logo</div>
      <nav>
        <ul>
          <a href="/auctions/create">
            <li>Create Auction</li>
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
