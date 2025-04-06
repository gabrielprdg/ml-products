import { useNavigate } from "react-router-dom";

export type Image = {
  id: string,
  url: string
}


export type Product = {
  id: string
  name: string
  date_created: string
  description: string
  status: string
  pictures: Image[]
}

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const navigate = useNavigate();

  if (products.length === 0) {
    return <p className="mt-6 text-gray-600">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="cursor-pointer border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white"
        >
          <img
            src={product.pictures[0]?.url || "/placeholder.png"}
            alt={product.name}
            className="w-full h-48 object-contain mb-2"
          />
          <h2 className="text-lg font-semibold text-gray-600">{product.name}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            Criado em: {new Date(product.date_created).toLocaleDateString()}
          </p>
          <span
            className={`inline-block px-2 py-1 mt-2 text-xs font-semibold rounded-full ${product.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
              }`}
          >
            {product.status}
          </span>
        </div>
      ))}
    </div>
  );
}

