import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    if (!categoryName) return;

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [categoryName]); 

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "20px" }}>Results</h1>
        <p style={{ padding: "10px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results.length > 0 ? (
            results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
