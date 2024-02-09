import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import { api } from "../../utils/apiCall";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post("login", { email, password });

      if (response.p_id) {
        localStorage.setItem("userId", response.p_id);
        navigate("/home");
      } else {
        alert(`Login failed: ${response.message}`);
      }
    } catch (error) {
      alert(`Error during login :${error.message}`);
    }
  };

  return (
    <div className="">
      <h4 className="fw-bold text-center">Login </h4>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Link to={`/reset/${email}`}>
          <a className="d-block text-center">Forgot password</a>
        </Link>
      </form>
    </div>
  );
}
