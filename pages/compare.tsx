import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import CompareContainer from "../components/compare/CompareContainer";
import PageLayout from "../components/layout/PageLayout";

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
