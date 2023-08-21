import {
  Card,
  CardHeader,
  CardContent,
  CardBody,
  CardFooter,
  Typography,
  Button,
  ButtonGroup,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartVisibility, addToCart } from "./Store/cartSlice";
import { getAuthToken } from "./AuthLogic/authTokenUtil";
import axios from "axios";

export default function ProductCard(props) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userDetails = useSelector((state) => state.user.payload);
  const role = userDetails.role.rname;
  console.log(role);
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

  const handleProductAction = async (action, productId) => {
    if (action === "delete") {
      let token = getAuthToken();
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const res = await axios.delete(`api/products/delete/${productId}`, {
          headers: headers,
        });
        console.log(res);
        alert(res.data);
        // Reload the page
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else if (action === "edit") {
      navigateTo("/admin/edit");
    }
  };
  return (
    <Card
      variant='filled'
      className='  flex flex-col  items-center justify-center ml-8 mr-8 my-8 ring ring-3 mb-2 shadow-lg  bg-zinc-100/95 overflow-visible '
    >
      <CardHeader
        shadow={false}
        floated={false}
        className='border-4 border-white '
      >
        <img
          src={props.url}
          alt={props.pName}
          className=' object-cover w-72 h-72'
        ></img>
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
          <div className='w-fit h-12 '>
            <Typography className='pb-2  '>{props.description}</Typography>
            <Typography className='font-medium pb-2'>
              $ {props.price.toFixed(2)}
            </Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className='mt-2'>
        {role === "USER" ? (
          <Button
            ripple={false}
            fullWidth={false}
            className='  h-5 text-xs text-center flex items-center justify-center rounded-md border border-transparent bg-amber/100 px-4 py-2   font-semibold text-white shadow-sm hover:scale-110   '
            onClick={handleCartClick}
          >
            Add to Cart
          </Button>
        ) : (
          <ButtonGroup className='gap-2'>
            <Button
              className=' bg-amber/100'
              onClick={() => handleProductAction("edit", props.id)}
            >
              Edit
            </Button>
            <Button
              className=' bg-amber/100'
              onClick={() => handleProductAction("delete", props.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        )}
      </CardFooter>
    </Card>
  );
}
