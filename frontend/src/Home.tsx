import { Search } from "lucide-react";
import { useState } from "react";
import { api } from "../services/api";
import ProductList, { Product } from "./components/ProductList";


export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await api.get(`/product/search/${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-lg mx-auto mt-12">
      <img
        src="/logoweesu.png"
        alt="mainlogo"
        className="w-1/2 h-24 object-contain mb-2"
      />
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

      {loading ? (
        <p className="mt-6 text-blue-500 font-medium">Buscando produtos...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
