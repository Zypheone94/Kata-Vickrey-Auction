import React from "react";

const Header = () => {
  return (
    <header className="h-screen w-2/12 bg-base">
      <div>
        <a href="/">Logo</a>
      </div>
      <nav className="mt-12">
        <ul>
          <li>
            <a href="/auctions/create">Create Auction</a>
          </li>
          <li className="mt-6">
            <a href="/user/register">Register</a>
          </li>
          <li className="mt-6">
            <a href="/user/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
