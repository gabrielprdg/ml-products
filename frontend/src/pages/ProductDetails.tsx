import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { ArrowLeft } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`/product/from/${id}`);
        console.log(response)
        setProduct(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes do produto:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Carregando...</p>;
  if (!product) return <p className="text-center text-red-500 mt-6">Produto não encontrado.</p>;

  const getAttribute = (attrId: string) =>
    product.attributes?.find((attr: any) => attr.id === attrId)?.value_name || "Não informado";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer text-sm text-gray-600 hover:underline"
        >
          <ArrowLeft className="w-8 h-8 mr-1" />
        </button>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">{product.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {product.pictures?.map((pic: any) => (
          <img
            key={pic.id}
            src={pic.url}
            alt={product.name}
            className="w-full h-48 object-contain bg-white rounded-xl shadow-sm"
          />
        ))}
      </div>


      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Descrição</h1>
        <div className="mb-12">
          {product?.description?.content}
        </div>
      </div>

      <div className="space-y-6 mb-12">
        {product.pickers.map((picker: any) => (
          <div key={picker.picker_name}>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {picker.picker_name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {picker.products.map((product: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full border border-gray-300"
                >
                  {product.picker_label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm sm:text-base text-gray-700">
        <div>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${product.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700"
              }`}
          >
            {product.status}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Criado em:</span>{" "}
            {new Date(product.date_created).toLocaleDateString("pt-BR")}
          </div>
          <div>
            <span className="font-semibold">Última atualização:</span>{" "}
            {new Date(product.last_updated).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <a
          href={product.permalink}
          target="_blank"
          className="inline-block cursor-pointer bg-yellow-600 text-white px-4 py-2 rounded-lg mb-12"
        >
          Ver no Mercado Livre
        </a>
      </div>
    </div>
  );
}
