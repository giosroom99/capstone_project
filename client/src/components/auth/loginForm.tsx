import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import { api } from "../../utils/apiCall";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("login", loginData);

      if (response.data) {
        localStorage.setItem("userId", response.data);
        navigate("/home");
        window.location.reload();
      } else {
        alert(
          `${response.error}: Please make sure to enter your login information correctly`
        );
        console.error("Login response does not contain necessary data");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="">
      <h4 className="fw-bold text-center">Login </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={loginData.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-auto">
          Login
        </button>
        {/* <Link to={`/reset/${email}`}>
          <a className="d-block text-center">Forgot password</a>
        </Link> */}
      </form>
    </div>
  );
}
