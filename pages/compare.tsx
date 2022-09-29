import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

import CompareContainer from "../components/compare/CompareContainer";
import PageLayout from "../components/PageLayout";

const Detail: NextPage = () => {
  return (
    <div>
      <Header />
      <main>
        <PageLayout>
          <CompareContainer />
        </PageLayout>
      </main>
      <Footer />
    </div>
  );
};

export default Detail;
