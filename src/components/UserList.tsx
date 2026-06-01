import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск по имени..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "16px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      />
      <p style={{ color: "gray" }}>Найдено: {filteredUsers.length}</p>
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "8px",
          }}
        >
          <h4>{user.name}</h4>
          <p>📧 {user.email}</p>
          <p>📞 {user.phone}</p>
          <p>🏢 {user.company.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;