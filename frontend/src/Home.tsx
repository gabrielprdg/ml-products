import { Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Aqui você pode adicionar a lógica de busca, como uma chamada à API
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
