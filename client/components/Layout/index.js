import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <main className="container" style={{ minHeight: "70vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Social Media App By Techinfoyt",
};

export default Layout;
