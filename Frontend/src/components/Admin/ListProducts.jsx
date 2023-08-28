import { Typography } from "@material-tailwind/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../AuthLogic/authTokenUtil";
import { useEffect } from "react";
import axios from "axios";
import Alert from "@material-tailwind/react";
import ProductCardAdmin from "./ProductCardAdmin";

function ListProducts() {
  const [alertMessage, setAlertMessage] = useState(null);

  const navigateTo = useNavigate();

  const [products, setProducts] = useState([]);

  const token = getAuthToken();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.get("/api/products", { headers: headers });
      const products = data;
      setProducts(products);
      console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setAlertMessage({
          type: "warning",
          text: "Your session has expired. Please log in again.",
        });
      } else {
        errMsg = err.response.data.toString();
        setAlertMessage({
          type: "error",
          text: { errMsg },
        });
      }

      setTimeout(() => {
        navigateTo("/");
      }, 1000);
    }
  };

  return (
    <>
      <div className=' relative max-w-3xl md:mx-auto md:my-auto mx-4 pb-4 '>
        <div>
          <Typography className='font-bold mb-8 lg:text-2xl  text-orange-600'>
            Manage Products
          </Typography>
        </div>
        <div>
          <Typography className='flex items-center justify-center font-bold mb-8 lg:text-2xl  text-gray-900'>
            Product List
          </Typography>
        </div>

        <section className=' flex '>
          <div className='grid  grid-cols-1 md:grid-cols-2   rounded-lg  mt-2 mb-4  '>
            {products.length === 0 ? (
              <div className=' font-normal'>
                Oops there is no products available, please add new products to
                the list.
              </div>
            ) : (
              products.map(
                ({ id, productName, price, description, imageData }) => (
                  <ProductCardAdmin
                    id={id}
                    quantity={1} // Set the initial quantity to 1
                    key={id}
                    pName={productName}
                    price={price}
                    description={description}
                    url={`data:image/png;base64,${imageData}`}
                  ></ProductCardAdmin>
                )
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
}
export default ListProducts;
