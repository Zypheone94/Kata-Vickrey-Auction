import React, { useState } from "react";
import Router from "next/router";

import { api } from "@/utils/api";

const LoginUser = () => {
  const [userData, setUserData] = useState({});

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loggedUser = await api(
      "http://localhost:8000/user/login",
      "POST",
      userData
    );
    Router.push("/");
  };

  return (
    <form className="w-5/12" onSubmit={handleLogin}>
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
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginUser;
