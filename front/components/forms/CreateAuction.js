import React, { useState } from "react";

const CreateAuction = () => {
  const [title, setTitle] = useState();

  return (
    <div>
      <form>
        <div>
          <label>Titre</label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {title}
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
