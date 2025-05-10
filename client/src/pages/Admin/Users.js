import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi"; // Import search icon from react-icons

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-users`);
      setUsers(data.users);
      setFilteredUsers(data.users); // Initialize filtered users with all users
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Lifecycle method to fetch users
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="Users">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Users List</h1>
          
          {/* Search Bar */}
          <div className="mb-4 position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <FiSearch />
              </span>
            </div>
          </div>

          {/* Users List */}
          <div className="d-flex flex-wrap">
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user._id} className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                    <p className="card-text"><strong>Hostel Name:</strong> {user.address}</p>
                    <p className="card-text">
                      <strong>Role:</strong> {user.role === 1 ? "Admin" : "User"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-100 text-center">
                <p>No users found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;