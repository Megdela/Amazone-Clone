import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from '../../Api/endPoinsts'
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "20px" }}>Results</h1>
        <p style={{ padding: "10px" }}>Category/{categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
