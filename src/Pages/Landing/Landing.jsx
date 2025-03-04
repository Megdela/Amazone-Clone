import React from 'react'
import Layout from '../../Components/Layout/Layout';
import Carousel from '../../Components/Carousel/Carousel';
import Category from '../../Components/Category/Category';
import Product from '../../Components/Product/Product';
function Landing() {
  return (
    <div>
      <Carousel />
      <Category />
      <Product />
    </div>
  );
}

export default Landing
