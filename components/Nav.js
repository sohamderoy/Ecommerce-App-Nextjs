import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/NavStyles";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { showCart } from "../action/action";
const { AnimatePresence, motion } = require("framer-motion");
import User from "./User";
import { useUser } from "@auth0/nextjs-auth0";

const Nav = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();
  console.log("$31", user);
  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => dispatch(showCart())}>
          {state?.totalQuantity > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {state?.totalQuantity}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{state.showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
};

export default Nav;
