import { useEffect, useState } from "react";
import profileImage from "../../assets/img/profile.jpg";
import { api } from "../../utils/apiCall";

export default function ProfileCard(props) {
  const userData = props.useData;
  if (!userData) {
    return (
      <div>
        <h1>OOPS! we couldnt get your info</h1>
      </div>
    );
  }
  console.log(userData);
  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "540px;" }}>
        <div className="row g-0">
          <div className="col-md-4">
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
                {userData.f_name} {userData.l_name}
              </h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">{userData.email}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Report to: Nickole D More
                </small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">Claims</small>
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
