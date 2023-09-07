import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Alert from "../Alert/Alert";
import CoffeeBanner from "../../assets/CoffeeBanner.avif";
import "../../../src/index.css";
import ProductCard from "../ProductCard";
import ShoppingCart from "../ShoppingCart";
import { getAuthToken } from "../AuthLogic/authTokenUtil";
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

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
        let errMsg = err.response.data.toString();
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
          className=' sm:bg-cover bg-no-repeat sm:bg-center mt-2 mb-2 object-none text-white  sm:pt-48 sm:pb-56   shadow-inner shadow-black grid grid-cols-6 max-w-8xl mx-8 mr-8 rounded-xl'
          style={{
            backgroundImage: `url(${CoffeeBanner})`,
          }}
        >
          <div className='w-full px-20 pr-16 md:px-32 sm:pr-40 col-span-4 z-30 '>
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

            <div className='mt-8 flex align-items-center justify-center text-3xl font-bold text-orange-600  capitalize z-30'>
              Our Hot Classics
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
                    ? "w-5/6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 rounded-lg items-center justify-center"
                    : "grid grid-cols-1 md:grid-cols-2 xl:gap-12 xl:grid-cols-3 gap-2 rounded-lg items-center justify-center "
                }
              >
                {products.map(
                  ({ id, productName, price, description, imageData }) => (
                    <div className='mt-2 mb-4 ' key={id}>
                      <ProductCard
                        id={id}
                        quantity={1} // Set the initial quantity to 1
                        key={id}
                        pName={productName}
                        price={price}
                        description={description}
                        url={`data:image/png;base64,${imageData}`}
                      ></ProductCard>
                    </div>
                  )
                )}
              </div>
            </section>

            {isCartVisible && <ShoppingCart />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WelcomePage;
