import type { NextPage } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Landing from "../components/Landing";
import LandingLayout from "../components/layout/LandingLayout";

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
