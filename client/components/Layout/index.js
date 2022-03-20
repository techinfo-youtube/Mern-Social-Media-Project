import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Head from "next/head";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        {/* <meta name="description" content="Free Web tutorials" />
          <meta name="keywords" content="HTML, CSS, JavaScript" />
          <meta name="author" content="John Doe" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>

      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Social Media App By Techinfoyt",
};

export default Layout;
