import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_ITEM,
  SHOW_CART,
  HIDE_CART,
  REMOVE_ITEM,
  RESET_QTY,
} from "./actionTypes";

const increaseQty = () => {
  return {
    type: INCREASE_QUANTITY,
  };
};
const decreaseQty = () => {
  return {
    type: DECREASE_QUANTITY,
  };
};
const showCart = () => {
  return {
    type: SHOW_CART,
  };
};
const hideCart = () => {
  return {
    type: HIDE_CART,
  };
};
const onAdd = (product, quantity) => {
  const data = { product, quantity };
  console.log("s15", data);
  return {
    type: ADD_ITEM,
    payload: data,
  };
};
const onRemove = (product) => {
  const data = { product };
  return {
    type: REMOVE_ITEM,
    payload: data,
  };
};
const resetQty = () => {
  return {
    type: RESET_QTY,
  };
};

export {
  increaseQty,
  decreaseQty,
  onAdd,
  onRemove,
  showCart,
  hideCart,
  resetQty,
};
