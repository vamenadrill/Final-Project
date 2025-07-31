import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.log("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return (
      <div className="error-message">
        <h3>Product Not Found</h3>
        <button onClick={() => navigate(-1)} className="back-button">
          ↩ Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-background"></div>

      <div className="product-container">
        <div className="product-image-section">
          <div className="image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
              loading="lazy"
            />
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-name">{product.title}</h1>

          <div className="product-meta">
            <span className="category">{product.category}</span>
            <span className="rating">
              ⭐ {product.rating?.rate || "4.5"} (
              {product.rating?.count || "120"})
            </span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-button"
            >
              🛒 Add to Cart
            </button>
            <button onClick={() => navigate(-1)} className="back-button">
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Load
const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-info">
      <div className="skeleton-line large"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line small"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-line full"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export default ProductDetails;
