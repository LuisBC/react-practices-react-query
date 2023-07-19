import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct } from "../api/products";

const ProductForm = ({ productUpdate, setProductUpdate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(false);

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries("products"), // This will refetch GET products query
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries("products"), // This will refetch GET products query
  });

  useEffect(() => {
    setName(productUpdate?.name || "");
    setDescription(productUpdate?.description || "");
    setPrice(productUpdate?.price || 0);
    setInStock(productUpdate?.inStock || false);
  }, [productUpdate]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setInStock(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    createProductMutation.mutate({
      name,
      description,
      price: Number(price),
      inStock,
    });
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProductMutation.mutate({
      id: productUpdate.id,
      name,
      description,
      price: Number(price),
      inStock,
    });
    resetForm();
    setProductUpdate(null);
  };

  const handleCancel = () => {
    setProductUpdate(null);
    resetForm();
  };

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="inStock">In Stock</label>
      <input
        type="checkbox"
        name="inStock"
        id="inStock"
        checked={inStock}
        onChange={(e) => setInStock(e.target.checked)}
      />

      {productUpdate ? (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
    </form>
  );
};

export default ProductForm;
