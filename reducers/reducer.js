import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_ITEM,
  REMOVE_ITEM,
  SHOW_CART,
  HIDE_CART,
  RESET_QTY,
} from "../action/actionTypes";
import { addItemToCart, removeItemFromCart } from "../lib/utilities";

const initialState = {
  qty: 1,
  cartItems: [],
  showCart: false,
  totalQuantity: 0,
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_QUANTITY:
      return {
        ...state,
        qty: state.qty + 1,
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        qty: state.qty - 1 < 1 ? 1 : state.qty - 1,
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newCartArray,
        totalQuantity: addItemToCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newTotalQuantity,
        totalPrice: addItemToCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newTotalPrice,
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newCartArray,
        totalQuantity: removeItemFromCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newTotalQuantity,
        totalPrice: removeItemFromCart(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice,
          action.payload
        )?.newTotalPrice,
      };
    case SHOW_CART:
      return {
        ...state,
        showCart: true,
      };
    case HIDE_CART:
      return {
        ...state,
        showCart: false,
      };
    case RESET_QTY:
      return {
        ...state,
        qty: 1,
      };
    default:
      return state;
  }
};

export default reducer;
