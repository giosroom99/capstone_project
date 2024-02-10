import profileImage from "../../assets/img/profile.jpg";

export default function ProfileCard(props) {
  const userInfo = props.userInfo;
  if (!userInfo) {
    return (
      <div>
        <h1>OOPS! we couldnt get your info</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="card mb-3 m-1" style={{ maxWidth: "540px;" }}>
        <div className="row g-0">
          <div className="col-md-4 ">
            <img
              src={profileImage}
              className="img-fluid rounded-start"
              alt="..."
            ></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                {userInfo.f_name} {userInfo.l_name}
              </h5>
              <p className="card-text">
                <span className="fw-bold">Bio:</span> {userInfo.Bio}
              </p>
              <p className="card-text">
                <span className="fw-bold">Email: {"  "} </span>
                <small className="text-body-secondary"> {userInfo.email}</small>
              </p>

              <p className="card-text">
                <span className="fw-bold">LOB: </span>
                <small className="text-body-secondary">{userInfo.LOB}</small>
              </p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">
                Edit profile
              </a>
              <a href="#" className="card-link">
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
