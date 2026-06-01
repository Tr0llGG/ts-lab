import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const increment = (): void => {
    setCount((prev) => prev + 1);
    setMessage(`Нажато ${count + 1} раз`);
  };

  const decrement = (): void => {
    setCount((prev) => prev - 1);
  };

  const reset = (): void => {
    setCount(0);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Счётчик: {count}</h2>
      {message && <p style={{ color: "gray" }}>{message}</p>}
      <button onClick={decrement}>−</button>
      <button onClick={reset} style={{ margin: "0 10px" }}>
        Сброс
      </button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;