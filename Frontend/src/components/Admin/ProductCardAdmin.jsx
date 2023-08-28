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
import { useState } from "react";
import { Link } from "react-router-dom";

import { getAuthToken } from "../AuthLogic/authTokenUtil";
import axios from "axios";
import ProductUpload from "./ProductUpload";

function ProductCardAdmin(props) {
  const [isEdit, setisEdit] = useState(false);

  const userDetails = useSelector((state) => state.user.payload);
  const role = userDetails.role.rname;

  const handleProductAction = async (action, productId) => {
    console.log(action + " " + productId);
    if (action === "delete") {
      let token = getAuthToken();
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        console.log(productId);
        const res = await axios.delete(`/api/products/delete/${productId}`, {
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
      setisEdit(true);
    }
  };

  return (
    <>
      {isEdit ? (
        <div className=' mx-auto my-auto px-8  bg-zinc-100/95 ring ring-3 rounded-lg'>
          <ProductUpload
            onCancel={() => setisEdit(false)}
            onSubmit={() => setisEdit(false)}
            productDetails={props}
          />
        </div>
      ) : (
        <Card
          variant='filled'
          className='  flex flex-col  items-center justify-center ml-8 mr-8 my-8 ring ring-3 mb-2 shadow-lg  bg-zinc-100/95 overflow-visible '
        >
          <CardHeader
            shadow={false}
            floated={false}
            className='flex justify-center items-center  border-4 border-white '
          >
            <img
              src={props.url}
              alt={props.pName}
              className=' object-cover max-w-full max-h-full'
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
          </CardFooter>
        </Card>
      )}
    </>
  );
}
export default ProductCardAdmin;
