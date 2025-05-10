import React, { useState, useEffect, useRef } from "react";
import Layout from "./../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Get user email from context
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.user?.email) {
      setEmail(auth.user.email);
    }
  }, [auth?.user]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setDescription(prev => prev + ' ' + transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast.error(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Toggle voice recognition
  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast.success("Voice input stopped");
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.success("Listening... Speak now");
    }
  };

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("email", email);
      productData.append("quantity", 0); // Default value
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", "Processing"); // Default value

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        setTimeout(() => {
          navigate("/dashboard/user/complaints");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register Complaint "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Register Complaint</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write Your & Hostel name e.g. Max-OLD V.S."
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Write complaint or use voice input"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`btn ms-2 ${isListening ? 'btn-danger' : 'btn-primary'}`}
                    style={{ height: 'fit-content' }}
                  >
                    {isListening ? <FaStopCircle /> : <FaMicrophone />}
                  </button>
                </div>
                {isListening && (
                  <div className="text-muted small">
                    <i className="fas fa-info-circle me-1"></i> Listening... Speak now
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={email}
                  placeholder="User Email"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;