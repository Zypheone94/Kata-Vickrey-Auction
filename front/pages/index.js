import { useState, useEffect } from "react";
import { api } from "@/utils/api";

export default function Home() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await api("http://localhost:8000/user/list");
    setUsers(data)
  };

  useEffect(() => {
    getUsers();
    console.log(users)
  }, []);

  return (
    <main>
      <div>
        {users &&
          users.map((item, index) => (
            <div key={index}>
              {item.firstname} {item.lastname}
            </div>
          ))}
      </div>
    </main>
  );
}
