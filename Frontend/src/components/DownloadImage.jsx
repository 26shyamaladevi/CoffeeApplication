import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "./AuthLogic/authTokenUtil";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    handledown();
  }, []);

  const handledown = () => {
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.get("/api/products", { headers: headers }).then((response) => {
      console.log("Product list");
      console.log(response.data);
      setProducts(response.data);
    });
  };

  return (
    <div>
      <h2>Product List</h2>
      {
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.productName}</h3>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              {product.imageData && (
                <img
                  src={`data:image/png;base64,${product.imageData}`}
                  alt={product.productName}
                />
              )}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}

export default ProductList;
