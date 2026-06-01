import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "food";
  inStock: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const categoryLabel: Record<Product["category"], string> = {
  electronics: "⚡ Электроника",
  clothing: "👕 Одежда",
  food: "🍎 Еда",
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      style={{
        border: isSelected ? "2px solid #1976d2" : "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        background: isSelected ? "#e3f2fd" : "white",
      }}
    >
      <h3>{product.name}</h3>
      <p>
        💰 Цена: <strong>{product.price.toLocaleString()} ₸</strong>
      </p>
      <p>Категория: {categoryLabel[product.category]}</p>
      {product.description && (
        <p style={{ color: "gray", fontSize: "14px" }}>
          {product.description}
        </p>
      )}
      <span
        style={{
          background: product.inStock ? "#4caf50" : "#f44336",
          color: "white",
          padding: "3px 10px",
          borderRadius: "12px",
          fontSize: "13px",
          marginRight: "10px",
        }}
      >
        {product.inStock ? "В наличии" : "Нет в наличии"}
      </span>
      <button
        onClick={() => onToggleSelect(product.id)}
        style={{
          padding: "4px 12px",
          background: isSelected ? "#1976d2" : "#eee",
          color: isSelected ? "white" : "black",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isSelected ? "✓ Выбрано" : "Выбрать"}
      </button>
    </div>
  );
};

export default ProductCard;