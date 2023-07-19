import axios from "axios";

const productsApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const getProducts = async () => {
  const { data } = await productsApi.get("/");
  return data;
};

export const createProduct = async (product) =>
  await productsApi.post("/", product);

export const deleteProduct = (id) => productsApi.delete(`/${id}`);

export const updateProduct = (product) =>
  productsApi.put(`/${product.id}`, product);
