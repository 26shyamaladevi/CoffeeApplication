import { useContext, useState } from "react";
import { CartContext } from "./ContextAPI/CartContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartVisibility, addToCart } from "./Store/cartSlice";

export default function ProductCard(props) {
  //const { cartItems, setCartVisibility, addToCart } = useContext(CartContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    const isProductInCart = cartItems.some((item) => item.id === props.id);

    if (isProductInCart) {
      console.log("Product already exist in cart");
    } else {
      console.log(props);
      dispatch(addToCart(props)); // Send the product details to the addToCart function
    }

    dispatch(setCartVisibility(true));
  };
  return (
    <Card
      variant='filled'
      className='  flex flex-col max-w-7xl items-center justify-center ml-8 mr-8 my-8 ring ring-3 mb-2 shadow-lg  bg-zinc-100/95 overflow-visible'
    >
      <CardHeader shadow={false} floated={false} className='h-40 w-40'>
        <img src={props.url}></img>
      </CardHeader>

      <CardBody className='mb-0 '>
        <div className='text-center'>
          <Typography
            className=' font-semibold mb-2'
            component='div'
            variant='h5'
          >
            {props.pName}
          </Typography>
          <div className='w-fit  max-h-12 '>
            <Typography className='pb-2 '>{props.description}</Typography>
            <Typography className='font-medium pb-2'>
              $ {props.price.toFixed(2)}
            </Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className='mt-2'>
        <Button
          ripple={false}
          fullWidth={false}
          className='  h-5 text-xs text-center flex items-center justify-center rounded-md border border-transparent bg-amber/100 px-4 py-2   font-semibold text-white shadow-sm hover:scale-110   '
          onClick={handleCartClick}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
