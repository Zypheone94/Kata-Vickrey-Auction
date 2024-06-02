import React from "react";

import Header from "@/components/common/Header";
import CreateUser from "@/components/forms/CreateUser";

const register = () => {
  return (
    <main className="flex">
      <Header />
      <CreateUser />
    </main>
  );
};

export default register;
