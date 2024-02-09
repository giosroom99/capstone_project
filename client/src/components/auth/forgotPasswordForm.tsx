import { Link } from "react-router-dom"; // Import Link from React Router

export default function ForgotPasswordForm() {
  return (
    <div className="">
      <h4 className="fw-bold text-center">Reset Password</h4>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          ></input>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">
            Enter Password Again
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
          ></input>
        </div>

        <button type="submit" className="btn btn-primary mt-auto">
          Login
        </button>

        <Link to={"/login"}>
          <a className="d-block text-center">Login</a>
        </Link>
      </form>
    </div>
  );
}
