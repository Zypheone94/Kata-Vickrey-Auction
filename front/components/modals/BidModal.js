import React, { useState, useEffect, useRef } from "react";
import jwt from "jsonwebtoken";

const BidModal = ({ setShowModal }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.verify(token, "My_secret");

        // ajouter form d'envoi bid
      } catch (err) {
        console.log(err);
        setDisplayLogin(true);
      }
    } else {
      setDisplayLogin(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setShowModal]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-1/4 h-1/2 rounded-2xl border-2 p-4" ref={modalRef}>
        Enchérire
        {displayLogin && (
          <div className="flex flex-col items-center mt-4">
            <p className>Vous n'êtes pas authentifié</p>
            <div className="w-full flex justify-between px-8 mt-6">
              <a href="/user/login">
                <button className="border-2">Login</button>
              </a>
              <a href="/user/register">
                <button className="border-2">Register</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidModal;
