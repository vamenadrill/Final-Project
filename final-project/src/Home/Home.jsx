import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="space-bg"></div>
      <div className="welcome-card">
        <h1 className="main-heading">
          Welcome to <span className="highlight">ITI Store</span>
        </h1>

        <p className="subheading">
          Check out our <span className="featured">exclusive products</span>{" "}
          with special deals <span className="sparkle">✨</span>
        </p>

        <Link
          to="/products"
          className="shop-button"
          aria-label="Browse our products"
        >
          🛍️ Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
