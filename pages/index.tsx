import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import stadium from "../public/stadium.jpeg";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
import LandingLayout from "../components/LandingLayout";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="bg-[url('../public/stadium.jpg')] bg-cover min-h-[86vh] h-auto">
        <LandingLayout>
          <Landing />
        </LandingLayout>
      </main>
      <Footer />
    </>
  );
};

export default Home;
