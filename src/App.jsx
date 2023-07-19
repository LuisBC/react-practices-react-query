import { useState } from "react";
import ProductForm from "./components/ProductForm";
import Products from "./components/Products";

const App = () => {
  const [productUpdate, setProductUpdate] = useState(null);
  return (
    <>
      <ProductForm
        productUpdate={productUpdate}
        setProductUpdate={setProductUpdate}
      />
      <Products setProductUpdate={setProductUpdate} />
    </>
  );
};

export default App;
