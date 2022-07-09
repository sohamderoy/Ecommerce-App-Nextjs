import "../styles/globals.css";
import { Provider as UrqlProvider, createClient } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import { Provider as StoreProvider } from "react-redux";
import store from "../store";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <UrqlProvider value={client}>
        <StoreProvider store={store}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </StoreProvider>
      </UrqlProvider>
    </UserProvider>
  );
}

export default MyApp;
