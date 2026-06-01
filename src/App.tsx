import React, { useState } from "react";
import UserCard from "./components/UserCard";
import Counter from "./components/Counter";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import ProductCard from "./components/ProductCard";

type TabType = "cards" | "counter" | "users" | "products";
type CategoryType = "all" | "electronics" | "clothing" | "food";
type SortType = "asc" | "desc" | null;

interface Product {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "food";
  inStock: boolean;
  description?: string;
}

const allProducts: Product[] = [
  { id: 1, name: "Ноутбук Lenovo", price: 350000, category: "electronics", inStock: true, description: "15.6 дюймов, 16GB RAM, 512GB SSD" },
  { id: 2, name: "Кроссовки Nike", price: 45000, category: "clothing", inStock: true, description: "Размер 42, белые" },
  { id: 3, name: "Яблоки 1кг", price: 800, category: "food", inStock: false },
  { id: 4, name: "Наушники Sony", price: 28000, category: "electronics", inStock: true, description: "Беспроводные, с шумоподавлением" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("cards");
  const [searchResult, setSearchResult] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<CategoryType>("all");
  const [sortOrder, setSortOrder] = useState<SortType>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSearch = (query: string): void => {
    setSearchResult(query);
  };

  const filtered = filterCategory === "all"
    ? allProducts
    : allProducts.filter((p) => p.category === filterCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const toggleSelect = (id: number): void => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalSum = allProducts
    .filter((p) => selectedIds.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const tabLabels: Record<TabType, string> = {
    cards: "Карточки",
    counter: "Счётчик",
    users: "Пользователи",
    products: "Товары",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>TypeScript + React</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {(["cards", "counter", "users", "products"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              background: activeTab === tab ? "#1976d2" : "#eee",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {activeTab === "cards" && (
        <div>
          <UserCard id={1} name="Половец Владислав" email="vlad@mail.ru" role="admin" isActive={true} age={17} />
          <UserCard id={2} name="Жакупов Адиль" email="adil@mail.ru" role="user" isActive={false} />
          <UserCard id={3} name="Базарбай Нурдаулет" email="nurda@mail.ru" role="moderator" isActive={true} age={17} />
        </div>
      )}

      {activeTab === "counter" && (
        <div>
          <Counter />
          <hr />
          <SearchBar placeholder="Введите запрос..." onSearch={handleSearch} />
          {searchResult && <p>Вы искали: <strong>{searchResult}</strong></p>}
        </div>
      )}

      {activeTab === "users" && <UserList />}

      {activeTab === "products" && (
        <div>
          <div style={{ marginBottom: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as CategoryType)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            >
              <option value="all">Все категории</option>
              <option value="electronics">Электроника</option>
              <option value="clothing">Одежда</option>
              <option value="food">Еда</option>
            </select>

            <button
              onClick={() => setSortOrder("asc")}
              style={{ padding: "8px 12px", background: sortOrder === "asc" ? "#1976d2" : "#eee", color: sortOrder === "asc" ? "white" : "black", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Цена ↑
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              style={{ padding: "8px 12px", background: sortOrder === "desc" ? "#1976d2" : "#eee", color: sortOrder === "desc" ? "white" : "black", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Цена ↓
            </button>
            <button
              onClick={() => setSortOrder(null)}
              style={{ padding: "8px 12px", background: "#eee", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Сброс
            </button>
          </div>

          {selectedIds.length > 0 && (
            <div style={{ background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: "8px", padding: "12px", marginBottom: "16px" }}>
              ✅ Выбрано: <strong>{selectedIds.length}</strong> &nbsp;|&nbsp;
              Итого: <strong>{totalSum.toLocaleString()} ₸</strong>
            </div>
          )}

          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedIds.includes(product.id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;