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
        console.log(decoded)
      } catch (err) {
        console.log(err);
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
      <div className="w-1/4 h-1/2 rounded-2xl border-2" ref={modalRef}>
        Modal
        {displayLogin && (
          <p className="text-red">Vous n'êtes pas authentifié</p>
        )}
      </div>
    </div>
  );
};

export default BidModal;
