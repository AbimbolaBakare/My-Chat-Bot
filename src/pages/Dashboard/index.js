/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { history } from "../../App";
import Client from "../../Client";
import { baseUrl } from "../../config";

export const Dashboard = () => {
  const authToken = sessionStorage.getItem("token");
  const redirect = () => history.push("/");
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const confirmUser = () => {
    axios
      .post(
        `${baseUrl}/auth/me`,
        {},
        {
          headers: {
            Authorization: "bearer " + authToken,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        sessionStorage.setItem("userType", res.data.role);
      });
  };

  const getAllUsers = () => {
    axios.get(`${baseUrl}/user`).then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    if (authToken) {
      confirmUser();
    } else {
      redirect();
    }
  }, [authToken]);
  useEffect(() => {
    if (user && user?.role === "Admin") {
      getAllUsers();
    }
  }, [user]);

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    history.push("/");
  };
  return (
    <div>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h1>
            {" "}
            <span className="fa fa-comment"> </span> <span>My Chat Bot</span>
          </h1>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <a href="/dashboard" className="active">
                <span className="fas fa-tachometer-alt"></span>
                <span>Dashboard</span>
              </a>
            </li>
            {user?.role === "Admin" ? (
              <li>
                <a href="/agent">
                  <span className="fas fa-users"></span>
                  <span>Agent/Admin Chat</span>
                </a>
              </li>
            ) : null}
            <li className="cursor">
              <a onClick={logout}>
                <span class="fas fa-sign-out-alt"></span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <h2 className="capital">
            <label htmlFor="nav-toggle">
              <span className="fas fa-bars"></span>
            </label>
            Welcome, {user?.name}
          </h2>

          <div className="user-wrapper">
            <img
              src="https://freesvg.org/img/1338526046.png"
              width="40px"
              height="40px"
              alt="profile-img"
            />
            <div>
              <h4 className="cursor" onClick={logout}>
                Logout
              </h4>
            </div>
          </div>
        </header>

        <main>
          <div className="cards">
            <div className="customers">
              <div className="card">
                <div className="card-header">
                  <h2>My Account</h2>
                </div>
                <div className="card-body">
                  <div className="info">
                    <div className="deet">
                      <small>Name</small>
                      <h4>{user?.name}</h4>
                    </div>
                    <div className="deet">
                      <small>Email Address</small>
                      <h4>{user?.email}</h4>
                    </div>
                    <div className="deet">
                      <small>Phone Number</small>
                      <h4>{user?.phone_no}</h4>
                    </div>
                    <div className="deet">
                      <small>Age</small>
                      <h4>{user?.age}</h4>
                    </div>
                    <div className="deet">
                      <small>Gender</small>
                      <h4>{user?.sex}</h4>
                    </div>
                    <div className="deet">
                      <small>Role</small>
                      <h4>{user?.role}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sec-cards">
              <div className="card-single">
                <div>
                  <h2>120</h2>
                  <span>Views</span>
                </div>
                <div>
                  <span className="fas fa-eye"></span>
                </div>
              </div>
              <div className="card-single">
                <div>
                  <h2>150</h2>
                  <span>Transactions</span>
                </div>
                <div>
                  <span className="fas fa-clipboard-check"></span>
                </div>
              </div>

              {user.role === "Admin" && (
                <>
                  <div className="card-single">
                    <div>
                      <h2>{users && users.length}</h2>
                      <span>Registered Users</span>
                    </div>
                    <div>
                      <span className="fas fa-users"></span>
                    </div>
                  </div>
                  <div className="card-single">
                    <div>
                      <h2> &#x20A6; 5,000.00</h2>
                      <span>Transaction Volume</span>
                    </div>
                    <div>
                      <span className="fas fa-wallet"></span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {user?.role === "Admin" ? (
            <div className="projects">
              <div className="card">
                <div className="card-header">
                  <h2>Latest Users</h2>
                  <button>
                    View All <span className="fas fa-arrow-right"></span>{" "}
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Email Address</td>
                          <td>Phone Number</td>
                          <td>Age</td>
                          <td>Gender</td>
                          <td>Role</td>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map((item, i) => (
                            <tr key={i}>
                              <td className="capital">{item?.name}</td>
                              <td>{item?.email}</td>
                              <td>{item?.phone_no}</td>
                              <td>{item?.age}</td>
                              <td>{item?.sex}</td>
                              <td>{item?.role}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
      {user?.role === "user" ||
      user?.role === "User" ||
      user?.role === "techy" ||
      user.role === "Agent" ||
      user.role === "fred" ? (
        <Client />
      ) : null}
    </div>
  );
};
