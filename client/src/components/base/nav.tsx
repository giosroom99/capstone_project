import { Link } from "react-router-dom";

export default function NavigationBar() {
  let isLoggedIn;
  const selectHeader = document.querySelector("#header");
  const userId = localStorage.getItem("userId");
  if (userId) {
    isLoggedIn = true;
  }
  if (selectHeader) {
    /* empty */
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to={"/home"}>
            <a className="navbar-brand" href="#">
              GhostPulse
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to={"/chat"}>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Feedback
                  </a>
                </li>
              </Link>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-bell-fill"></i> Activity
                </a>
              </li>

              {isLoggedIn === true ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => {
                      isLoggedIn = false;
                      localStorage.removeItem("userId");

                      window.location.reload();
                    }}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <Link to={"/"}>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Login
                    </a>
                  </li>
                </Link>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
