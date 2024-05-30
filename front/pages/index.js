import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await fetch("http://localhost:8000/list")
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          console.log("Error:", result.error);
          return false;
        }
        console.log(result);
        setUsers(result.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main>
        <div>
          {users &&
            users.map((item, index) => <div key={index}>{item.firstname} {item.lastname}</div>)}
        </div>
    </main>
  );
}
