import Header from "./Header";
import Order from "./Order";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../AuthLogic/authTokenUtil";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../Store/cartSlice";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Breadcrumbs,
  Button,
} from "@material-tailwind/react";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
}

function UserOrders() {
  const [open, setOpen] = useState(0);
  const location = useLocation();
  const [latestFetchedOrderId, setLatestFetchedOrderId] = useState(null);

  const order = useSelector((state) => state.cart.order);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const fetchOrders = async () => {
    const token = getAuthToken();
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get("api/orders", { headers: headers });

      // Function to structure the state as per the desired format
      const structuredState = createState(response.data);
      console.log("StrOrder", structuredState);

      // Dispatch each order one by one
      structuredState.forEach((order) => {
        dispatch(addOrder(order));
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (order.length === 0) {
      fetchOrders();
    }
    console.log("****", location.state && location.state.fromCheckout === true);
  }, []);

  const createState = (orders) => {
    const OrdersArr = [];
    for (const key in orders) {
      const order = orders[key];
      const {
        oId,
        orders: {
          customer: { userId, firstName, lastName },
          orderId,
          totalPrice,
          paymentMethod,
          customerEmailId,
          orderDate,
        },
        pName,
        price,
        quantity,
      } = order;

      const existingOrder = OrdersArr.find(
        (currOrder) => currOrder.orderId === orderId
      );

      if (existingOrder) {
        existingOrder.orderItems.push({ pName, price, quantity });
      } else {
        OrdersArr.push({
          orderId,
          userId,
          firstName,
          lastName,
          customerEmailId,
          totalPrice,
          paymentMethod,
          orderDate,
          orderItems: [{ pName, price, quantity }],
        });
      }
    }

    return OrdersArr;
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const handleBacktoMenu = () => {
    navigateTo("/welcome");
  };

  return (
    <>
      <Header />
      <div className='max-w-3xl md:mx-auto md:my-auto mx-4'>
        <div>
          <Breadcrumbs className=' w-auto px-0 py-4 '>
            <a href='/welcome' className=' opacity-70 pr-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </a>

            <a href='#' className='pl-1'>
              Your Orders
            </a>
          </Breadcrumbs>
        </div>

        <div className='pb-4'>
          <h1 className='lg:text-2xl font-semibold text-orange-600'>
            Your Orders
          </h1>
        </div>
        <div className=' z-20'>
          {order.length === 0 ? (
            <div className='flex flex-col'>
              <div className=' text-center text-gray-500 font-semibold py-4'>
                Looks like you haven't ordered anything yet.
              </div>
              <div className='text-center'>
                <Button
                  className='  mr-auto ml-2 items-center justify-center rounded-md border border-transparent bg-btnprimary px-4 py-2 text-base font-medium text-white shadow-sm hover:scale-110 '
                  onClick={handleBacktoMenu}
                >
                  Back to Menu
                </Button>
              </div>
            </div>
          ) : (
            order.map((orderDetails) => (
              <Accordion
                key={orderDetails.orderId}
                open={open === orderDetails.orderId}
                animate={CUSTOM_ANIMATION}
                icon={<Icon id={orderDetails.orderId} open={open} />}
                className=' py-1 bg-gray-100/50 w-auto h-auto'
              >
                <AccordionHeader
                  onClick={() => handleOpen(orderDetails.orderId)}
                  className=' ring-gray-500 ring-2 pl-8 pr-8 font-medium'
                >
                  Order #{orderDetails.orderId}
                </AccordionHeader>
                <AccordionBody>
                  <Order orderDetail={orderDetails} />
                </AccordionBody>
              </Accordion>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default UserOrders;
