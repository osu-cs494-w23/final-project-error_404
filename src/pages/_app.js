import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../component/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";
import { SessionProvider } from "next-auth/react";

export default function App({session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
