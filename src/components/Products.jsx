import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, deleteProduct } from "../api/products";

const Products = ({ setProductUpdate }) => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (p) => p.sort((a, b) => b.id - a.id),
  });
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries("products"), // This will refetch GET products query
  });

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
    setProductUpdate(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return products.map((p) => {
    const { id, name, description, price, inStock } = p;
    return (
      <div key={id}>
        <h3>{id}</h3>
        <p>{name}</p>
        <p>{description}</p>
        <p>{price}</p>
        <input
          id={`inStock_${id}`}
          type="checkbox"
          checked={inStock}
          readOnly
        />
        <label htmlFor={`inStock_${id}`}>In Stock</label>
        <br />
        <button onClick={() => setProductUpdate(p)}>Update</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    );
  });
};

export default Products;
