import React from "react";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Alert from "./Alert/Alert";
import CoffeeBanner from "../assets/CoffeeBanner.avif";
import coffeeGif from ".././assets/coffee_gif.gif";
import ".././index.css";
import ProductCard from "./ProductCard";
import ShoppingCart from "./ShoppingCart";
import { CartContext } from "./ContextAPI/CartContext";
//import { UserContext } from "./ContextAPI/UserContext";
import { Carousel, Button } from "@material-tailwind/react";
import { getAuthToken } from "./AuthLogic/authTokenUtil";
import { useSelector } from "react-redux";
import { addUserDetails } from "./Store/userSlice";

const WelcomePage = () => {
  //const location = useLocation();

  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  //const { isCartVisible } = useContext(CartContext);
  //const { userDetails } = useContext(UserContext);
  const userDetails = useSelector((state) => state.user.payload);
  const isCartVisible = useSelector((state) => state.cart.isCartVisible);

  console.log("User Details:", userDetails);
  console.log("First Name:", userDetails.firstName);

  const navigateTo = useNavigate();

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
      <Header />
      <div className=' flex   h-screen flex-col '>
        <div
          // className='  w-full sm:bg-cover bg-no-repeat sm:bg-center mt-2 object-none text-white pt-8 pb-8 md:pt-48 md:pb-56  shadow-inner shadow-black grid grid-cols-8 max-w-5xl mx-8 rounded-xl'
          className=' sm:bg-cover bg-no-repeat sm:bg-center mt-2 mb-2 object-none text-white sm:pt-48 sm:pb-56   shadow-inner shadow-black grid grid-cols-6 max-w-8xl mx-8 mr-8 rounded-xl'
          style={{
            backgroundImage: `url(${CoffeeBanner})`,
          }}
        >
          <div className='w-full px-20 pr-16 md:px-32 sm:pr-40 col-span-4'>
            <h1 className=' md:text-3xl font-extrabold'>
              Welcome{" "}
              <b>
                {userDetails.firstName} {userDetails.lastName}
              </b>{" "}
              to the Coffee App!
            </h1>
            <div className=' mt-4'></div>
            <p className=' md:text-base'>
              Explore our wide range of coffee options and find your perfect cup
              of joy!
            </p>
          </div>
        </div>
        <div className='container min-h-screen pb-52 mx-auto '>
          <div className='  mb-4 max-w-screen-2xl  h-auto overflow-visible pb-20 '>
            {/* <Header pageTitle='Coffee Shop Order Application' logoSrc={coffeeGif} /> */}
            {alertMessage && (
              <Alert
                message={alertMessage.text}
                type={alertMessage.type}
                onClose={() => setAlertMessage(null)}
              />
            )}

            <div className='mt-4 flex align-items-center justify-center text-2xl font-bold text-orange-600  capitalize'>
              Hot Classics
            </div>

            <section
              className={
                isCartVisible
                  ? "mt-8  flex  items-center justify-start"
                  : "mt-8  flex  items-center justify-center"
              }
            >
              <div
                div
                className={
                  isCartVisible
                    ? "w-4/5 grid grid-cols-1 md:grid-cols-2 xl:gap-12 xl:grid-cols-3 gap-2 rounded-lg "
                    : "grid grid-cols-1 md:grid-cols-2 xl:gap-12 xl:grid-cols-3 gap-2 rounded-lg "
                }
              >
                {products.map(
                  ({ id, productName, price, description, url }) => (
                    <div className='mt-2 mb-4'>
                      <ProductCard
                        id={id}
                        quantity={1} // Set the initial quantity to 1
                        key={id}
                        pName={productName}
                        price={price}
                        description={description}
                        url={url}
                      ></ProductCard>
                    </div>
                  )
                )}
              </div>
            </section>

            {isCartVisible && <ShoppingCart />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WelcomePage;
