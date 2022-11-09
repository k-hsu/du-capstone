import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ToastManager from "../../components/ToastManager/ToastManager";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastManager />
    </>
  );
};

export default Layout;
