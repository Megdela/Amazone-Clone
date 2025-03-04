import React, { useState,useEffect } from 'react'
import  classes from './ProductDetail.module.css'
import Layout from '../../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { productUrl } from "../../Api/endPoinsts";
import ProductCard from '../../Components/Product/ProductCard';

function ProductDetail() {
  const{productId}=useParams()
    const [product,setProduct]=useState({})
    useEffect(()=>{
      axios.get(`${productUrl}/products/${productId}`).then((res)=>{
      setProduct(res.data)
      
    }).catch((err)=>{
      console.log(err)
    })
  },[])
 
  return (
    <Layout>
      <ProductCard
      product={product}
      />

    
    </Layout>
  );
}

export default ProductDetail
