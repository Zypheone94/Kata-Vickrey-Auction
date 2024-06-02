import React, { useState } from "react";

const CreateUser = () => {
  const [userData, setUserData] = useState({});

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {
    return 
  }

  return (
    <form className="w-5/12" onSubmit={handleCreateUser}>
      <div className="mt-6 flex justify-between">
        <label>Firstname</label>
        <input
          type="text"
          name="firstname"
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>Lastname</label>
        <input
          type="text"
          name="lastname"
          onChange={handleChangeUserData}
          className="border-2 border-dashed"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <label>E-mail</label>
        <input
          type="text"
          name="email"
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
