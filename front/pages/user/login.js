import React from "react";

import Header from "@/components/common/Header";
import LoginUser from "@/components/forms/LoginUser";

const login = () => {
  return (
    <main className="flex">
      <Header />
      <LoginUser />
    </main>
  );
};

export default login;
