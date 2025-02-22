import React from "react";

import Header from "@/components/common/Header";
import CreateAuction from "@/components/forms/CreateAuction";

const create = () => {
  return (
    <main className="flex">
      <Header />
      <CreateAuction />
    </main>
  );
};

export default create;
