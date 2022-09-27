import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DetailLoading = () => {
  return (
    <div>
      <Header />
      <main className="w-[100vw] h-[87vh]">
        <div className="container min-h-full p-10 mx-auto bg-transparent"></div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailLoading;
