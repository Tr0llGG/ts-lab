import React from "react";

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  age?: number;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  role,
  isActive,
  age,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
      <h3>
        #{id} — {name}
      </h3>
      <p>Email: {email}</p>
      <p>
        Роль: <strong>{role}</strong>
      </p>
      {age && <p>Возраст: {age}</p>}
      <span
        style={{
          background: isActive ? "#4caf50" : "#f44336",
          color: "white",
          padding: "4px 10px",
          borderRadius: "12px",
          fontSize: "13px",
        }}
      >
        {isActive ? "Активен" : "Неактивен"}
      </span>
    </div>
  );
};

export default UserCard;