import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Import search icon

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
      setFilteredProducts(data.products); // Initialize filtered products
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products.");
    }
  };

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const readDescription = (description) => {
    const speech = new SpeechSynthesisUtterance(description);
    window.speechSynthesis.speak(speech);
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Complaints</h1>
            
            {/* Search Bar */}
            <div className="mb-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search complaints by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text bg-primary text-white">
                  <FiSearch />
                </span>
              </div>
            </div>

            <div className="row g-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="col-md-4" key={product._id}>
                    <div className="card h-100 shadow-sm">
                      <Link
                        to={`/dashboard/admin/complaints/${product.slug}`}
                        className="text-decoration-none"
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title text-dark">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.description.length > 60
                            ? `${product.description.substring(0, 60)}...`
                            : product.description}
                        </p>
                        <h4 className="card-title text-dark">{product.shipping}</h4>
                        <button
                          className="btn btn-secondary mt-2"
                          onClick={() => readDescription(product.description)}
                        >
                          🔊 Listen
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p className="text-muted">
                    {products.length === 0
                      ? "No complaints found."
                      : "No complaints match your search."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;