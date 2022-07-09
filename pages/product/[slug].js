import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
// import { useStateContext } from "../../lib/context";
// import { useContext } from "react";
// import ShopContext from "../../lib/context";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, onAdd, resetQty } from "../../action/action";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProductDetails = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("s14", state);
  useEffect(() => {
    dispatch(resetQty());
  }, []);
  // const {
  //   qty,
  //   increaseQty,
  //   decreaseQty,
  //   showCart,
  //   setShowCart,
  //   cartItems,
  //   onAdd,
  // } = useContext(ShopContext);
  // console.log("s9", qty, increaseQty);
  const router = useRouter();
  const { query } = router;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  console.log("s4a", results);

  const { data, fetching, error } = results;

  if (fetching) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>There is an error {error.message} ...</p>;
  }

  console.log("s4", data);
  const { title, description, image } = data.products.data[0].attributes;

  const notify = () => {
    toast.success(`${title} added to your cart`, {
      duration: 1500,
    });
  };

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        {/* <h6>{state}</h6> */}
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle
              onClick={() => {
                dispatch(decreaseQty());
              }}
            />
          </button>
          <p>{state.qty}</p>
          <button>
            <AiFillPlusCircle
              onClick={() => {
                dispatch(increaseQty());
              }}
            />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            dispatch(onAdd(data.products.data[0].attributes, state.qty));
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetails;
