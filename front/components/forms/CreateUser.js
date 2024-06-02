import React, { useState } from "react";
import Router from "next/router";

import { api } from "@/utils/api";

const CreateUser = () => {
  const [userData, setUserData] = useState({});

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    api("http://localhost:8000/user/add", "POST", userData);
    Router.push("/");
  };

  return (
    <form className="w-5/12" onSubmit={handleCreateUser}>
      <div className="mt-6 flex justify-between">
        <label>Firstname</label>
        <input
          type="text"
          name="firstname"
          required
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>Lastname</label>
        <input
          type="text"
          name="lastname"
          required
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="flex justify-end">
        <button>Create User</button>
      </div>
    </form>
  );
};

export default CreateUser;
