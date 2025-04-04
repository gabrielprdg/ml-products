import { Search } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api"; // Importa o Axios configurado

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const AUTH_TOKEN = "Bearer APP_USR-2836918273915819-040223-f800d3cfa24444a2b85f6f8939140bb5-1064208989";

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await api.get(`/sites/MLB/search?q=${query}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      console.log(response)
      setProducts(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-lg mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Search for Products</h1>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-10 border rounded-2xl shadow-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
        >
          <Search />
        </button>
      </div>
    </div>
  );
}
