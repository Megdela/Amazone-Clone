import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import classes from "./Carsousel.module.css";
import Layout from "../Layout/Layout";

function CarouselEffect() {
  return (
    <Layout>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </Layout>
  );
}

export default CarouselEffect;
