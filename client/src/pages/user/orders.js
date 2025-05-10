import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
import { FiSearch } from "react-icons/fi"; // Import search icon

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [auth] = useAuth();
  const userEmail = auth?.user?.email;

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      const filteredProducts = data.products.filter(
        (p) => p.email === userEmail
      );
      setProducts(filteredProducts);
      setFilteredProducts(filteredProducts); // Initialize filtered products
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
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

  const handleDelete = async (productId) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this complaint? TYPE YES"
      );
      if (answer !== "YES") {
        toast.error("Type Correctly");
        return;
      }
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${productId}`
      );
      if (data?.success) {
        toast.success("Complaint Deleted Successfully");
        getAllProducts();
      } else {
        toast.error(data?.message || "Failed to delete complaint");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (userEmail) {
      getAllProducts();
    }
  }, [userEmail]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <h1 className="text-center mb-4">Your Complaints List</h1>
            
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

            <div className="d-flex flex-wrap">
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((p) => (
                  <div className="card m-2" style={{ width: "20rem" }} key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <h4 className="card-text text-dark">{p.shipping}</h4>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDelete(p._id)}
                      >
                        DELETE COMPLAINT
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-100 text-center">
                  <p className="text-muted">
                    {products.length === 0
                      ? "No complaints found for your account."
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