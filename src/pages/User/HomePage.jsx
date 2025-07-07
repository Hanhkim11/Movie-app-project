import React from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import ListMovie from "../../components/listMovie/ListMovie";
import Cinema from "../../components/cinema/Cinema";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <>
      <Carousel />
      <ListMovie />
      <Cinema />
    </>
  );
};

export default HomePage;
