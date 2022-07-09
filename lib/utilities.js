const addItemToCart = (
  currentCartItemsState,
  currentTotalQuantityState,
  currentTotalPriceState,
  payload
) => {
  console.log("s16aa", currentCartItemsState);
  console.log("s16ab", currentTotalQuantityState);
  console.log("s16ac", currentTotalPriceState);
  console.log("s16ad", payload);
  const exist = currentCartItemsState.find(
    (item) => item.slug === payload?.product.slug
  );
  console.log("s16c", exist);
  let newCartArray;
  if (exist) {
    newCartArray = currentCartItemsState.map((item) =>
      item.slug === payload?.product.slug
        ? { ...exist, quantity: exist.quantity + payload.quantity }
        : item
    );
  } else {
    newCartArray = [
      ...currentCartItemsState,
      { ...payload.product, quantity: payload.quantity },
    ];
  }
  console.log("s16d", newCartArray);
  const updatedData = {
    newCartArray: newCartArray,
    newTotalQuantity: currentTotalQuantityState + payload.quantity,
    newTotalPrice:
      currentTotalPriceState + payload?.quantity * payload?.product?.price,
  };
  console.log("s16e", updatedData.newCartArray);
  console.log("s16f", updatedData.newTotalQuantity);
  console.log("s16g", updatedData.newTotalPrice);
  return updatedData;
};

const removeItemFromCart = (
  currentCartItemsState,
  currentTotalQuantityState,
  currentTotalPriceState,
  payload
) => {
  console.log("$19a", currentCartItemsState);
  console.log("$19b", payload);
  const exist = currentCartItemsState.find(
    (item) => item.slug === payload?.product.slug
  );
  let newCartArray;
  if (exist.quantity === 1) {
    newCartArray = currentCartItemsState.filter(
      (item) => item.slug !== payload?.product.slug
    );
  } else {
    newCartArray = currentCartItemsState.map((item) =>
      item.slug === payload?.product.slug
        ? { ...exist, quantity: exist.quantity - 1 }
        : item
    );
  }
  const updatedData = {
    newCartArray: newCartArray,
    newTotalQuantity: currentTotalQuantityState - 1,
    newTotalPrice: currentTotalPriceState - payload?.product?.price,
  };
  return updatedData;
};

const formatMoney = (amount = 0) => {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = Intl.NumberFormat("en-US", options);
  return formatter.format(amount / 100);
};

export { addItemToCart, removeItemFromCart, formatMoney };
