import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
  Cards,
} from "../styles/CartStyles";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { hideCart, onAdd, onRemove } from "../action/action";
import { Quantity } from "../styles/ProductDetails";
import getStripe from "../lib/getStripe";

const card = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
};

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const Cart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("$17", state);

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        dispatch(hideCart());
      }}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {state.cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}

        <Cards Layout variants={cards} initial="hidden" animate="show">
          {state.cartItems.length >= 1 &&
            state.cartItems.map((item) => {
              return (
                <Card Layout variants={card} key={item.title}>
                  <img
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>$ {item.price}</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button>
                        <AiFillMinusCircle
                          onClick={() => {
                            dispatch(onRemove(item));
                          }}
                        />
                      </button>
                      <p>{item.quantity}</p>
                      <button>
                        <AiFillPlusCircle
                          onClick={() => {
                            dispatch(onAdd(item, 1));
                          }}
                        />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}
        </Cards>

        {state.cartItems.length >= 1 && (
          <Checkout Layout>
            <h3>Subtotal: $ {state.totalPrice}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
};

export default Cart;
