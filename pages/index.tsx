import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import stadium from "../public/stadium.jpeg";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Landing from "../components/Landing";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <main className="bg-[url('../public/stadium.jpg')] bg-cover min-h-full h-auto pb-16">
        <Landing />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
